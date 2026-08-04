import { BRANDS, calculateTuning, type Brand, type Model, type Stage } from "./tuning-data";

type UnknownRecord = Record<string, unknown>;

export type RegistrationVehicle = {
  registration: string;
  make: string;
  model: string;
  year: number | null;
  hp: number | null;
};

const TRANSPORTSTYRELSEN_URL =
  "https://fordon-fu-regnr.transportstyrelsen.se/UppgifterAnnatFordon/TillbakaTillFordonsuppgifter";

const BRAND_ALIASES: Record<string, string> = {
  mercedes: "mercedes benz",
  mercedesbenz: "mercedes benz",
  mini: "mini",
  vw: "volkswagen",
};

function asRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null ? (value as UnknownRecord) : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return null;
}

function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractTechnicalValue(html: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(
    new RegExp(
      `<strong[^>]*>(?:(?!<\\/strong>)[\\s\\S])*?${escapedLabel}(?:(?!<\\/strong>)[\\s\\S])*?<\\/strong>\\s*<br\\s*\\/?>\\s*([^<\\r\\n]+)`,
      "i",
    ),
  );
  return match?.[1]?.trim() || null;
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeBrand(value: string) {
  const normalized = normalize(value);
  return BRAND_ALIASES[normalized.replaceAll(" ", "")] ?? normalized;
}

function findBrand(make: string) {
  const wanted = normalizeBrand(make);
  return BRANDS.find((brand) => normalizeBrand(brand.name) === wanted) ?? null;
}

function scoreModel(model: Model, vehicleModel: string) {
  const candidate = normalize(model.name);
  const vehicle = normalize(vehicleModel);
  const primary = candidate
    .split(/\s(?:i{1,3}|iv|v|vi|vii|viii|ix|x|mk\d|[a-z]\d{1,3})\b/)[0]
    .trim();
  const tokens = candidate.split(" ").filter((token) => token.length > 1);
  let score = tokens.reduce((total, token) => total + (vehicle.includes(token) ? 8 : 0), 0);

  if (primary.length > 1 && vehicle.includes(primary)) score += 60;
  if (vehicle.includes(candidate) || candidate.includes(vehicle)) score += 80;
  return score;
}

function findModel(brand: Brand, vehicleModel: string) {
  const ranked = brand.models
    .map((model) => ({ model, score: scoreModel(model, vehicleModel) }))
    .sort((left, right) => right.score - left.score);
  return ranked[0]?.score > 0 ? ranked[0] : null;
}

function findEngine(model: Model, hp: number | null) {
  if (!model.engines.length) return null;
  if (!hp) return { engine: model.engines[0], difference: null };

  const ranked = model.engines
    .map((engine) => ({ engine, difference: Math.abs(engine.hp - hp) }))
    .sort((left, right) => left.difference - right.difference);
  const closest = ranked[0];
  const acceptableDifference = Math.max(20, hp * 0.22);
  return closest && closest.difference <= acceptableDifference ? closest : null;
}

function matchCatalog(vehicle: RegistrationVehicle) {
  const brand = findBrand(vehicle.make);
  if (!brand) return null;

  const modelMatch = findModel(brand, vehicle.model);
  if (!modelMatch) return null;

  const engineMatch = findEngine(modelMatch.model, vehicle.hp);
  if (!engineMatch) return null;

  const exactModel = modelMatch.score >= 60;
  const exactEngine = engineMatch.difference === null || engineMatch.difference <= 8;
  return {
    brand,
    model: modelMatch.model,
    engine: engineMatch.engine,
    confidence: exactModel && exactEngine ? ("exact" as const) : ("suggested" as const),
  };
}

async function lookupTransportstyrelsen(registration: string): Promise<RegistrationVehicle> {
  const response = await fetch(
    `${TRANSPORTSTYRELSEN_URL}?Registreringsnummer=${encodeURIComponent(registration)}`,
    {
      headers: {
        Accept: "text/html",
        "User-Agent": "TuningCenterOrebro/1.0",
      },
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) {
    throw new Error("Fordonsuppgifterna kunde inte hämtas just nu. Välj bilen manuellt i stället.");
  }

  const html = decodeHtml(await response.text());
  const make = extractTechnicalValue(html, "Fabrikat");
  const model = extractTechnicalValue(html, "Handelsbeteckning");
  const yearText = extractTechnicalValue(html, "Fordonsår");
  const powerText = extractTechnicalValue(html, "Motoreffekt");
  const year = yearText?.match(/\b(?:19|20)\d{2}\b/)?.[0];
  const powerKw = powerText?.match(/([\d,.]+)\s*kW/i)?.[1]?.replace(",", ".");

  if (!make || !model) {
    throw new Error("Vi hittade inget aktivt fordon med det registreringsnumret.");
  }

  return {
    registration,
    make,
    model,
    year: year ? Number(year) : null,
    hp: powerKw ? Math.round(Number(powerKw) * 1.35962) : null,
  };
}

async function lookupBiluppgifter(
  registration: string,
  apiKey: string,
): Promise<RegistrationVehicle> {
  const response = await fetch(
    `https://api.biluppgifter.se/api/v1/vehicle/regno/${encodeURIComponent(registration)}?active=1&include=basic,technical&country_code=SE`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "User-Agent": "TuningCenterOrebro/1.0",
      },
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) throw new Error("Biluppgifter lookup failed");

  const payload = asRecord(await response.json());
  const data = asRecord(payload.data);
  const attributes = asRecord(data.attributes);
  const basic = asRecord(asRecord(data.basic).data);
  const technical = asRecord(asRecord(data.technical).data);
  const make = asString(basic.make);
  const model = asString(basic.model);

  if (!make || !model) throw new Error("Biluppgifter response was incomplete");

  const powerKw = asNumber(technical.power_kw_1);
  return {
    registration: asString(attributes.regno) ?? registration,
    make,
    model,
    year: asNumber(basic.model_year) ?? asNumber(basic.vehicle_year),
    hp:
      asNumber(technical.power_hp_1) ??
      asNumber(technical.power_hp) ??
      (powerKw ? Math.round(powerKw * 1.35962) : null),
  };
}

export async function lookupAndEstimateRegistration(registration: string, stage: Stage) {
  const apiKey = process.env.BILUPPGIFTER_API_KEY?.trim();
  let vehicle: RegistrationVehicle;

  if (apiKey) {
    try {
      vehicle = await lookupBiluppgifter(registration, apiKey);
    } catch {
      vehicle = await lookupTransportstyrelsen(registration);
    }
  } else {
    vehicle = await lookupTransportstyrelsen(registration);
  }

  const match = matchCatalog(vehicle);
  if (!match) return { vehicle, match: null, estimate: null };

  return {
    vehicle,
    match: {
      brand: match.brand.name,
      model: match.model.name,
      engine: match.engine.name,
      confidence: match.confidence,
    },
    estimate: {
      brand: match.brand.name,
      model: match.model.name,
      engine: match.engine.name,
      fuel: match.engine.fuel,
      stage,
      ...calculateTuning(match.engine, stage),
    },
  };
}
