import {
  BRANDS,
  calculateTuning,
  type Brand,
  type Engine,
  type Fuel,
  type Model,
  type Stage,
} from "./tuning-data";
import { resolveVehicleCapabilities } from "./vehicle-capabilities.server";


type UnknownRecord = Record<string, unknown>;

export type RegistrationVehicle = {
  registration: string;
  make: string;
  model: string;
  year: number | null;
  hp: number | null;
  fuel: Fuel | "electric" | "other" | null;
  fuelLabel: string | null;
  displacementCc: number | null;
  transmission: string | null;
  vehicleType: string | null;
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

function firstValue(record: UnknownRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return value;
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

function parseFuel(value: string | null): RegistrationVehicle["fuel"] {
  if (!value) return null;
  const fuel = normalize(value);
  if (fuel.includes("diesel")) return "diesel";
  if (
    fuel.includes("bensin") ||
    fuel.includes("petrol") ||
    fuel.includes("gasoline") ||
    fuel.includes("etanol") ||
    fuel.includes("e85") ||
    fuel.includes("fordonsgas") ||
    fuel.includes("lpg")
  ) {
    return "bensin";
  }
  if (fuel.includes("el") || fuel.includes("electric")) return "electric";
  return "other";
}

function parseFirstNumber(value: string | null) {
  const match = value
    ?.replace(/\s/g, "")
    .match(/([\d,.]+)/)?.[1]
    ?.replace(",", ".");
  return match && Number.isFinite(Number(match)) ? Number(match) : null;
}

function findBrand(make: string) {
  const wanted = normalizeBrand(make);
  return BRANDS.find((brand) => normalizeBrand(brand.name) === wanted) ?? null;
}

function scoreModel(model: Model, vehicleModel: string) {
  const candidate = normalize(model.name);
  const vehicle = normalize(vehicleModel);
  const primary = (
    candidate.split(/\s(?:i{1,3}|iv|v|vi|vii|viii|ix|x|mk\d|[a-z]\d{1,3})\b/)[0] ?? candidate
  ).trim();
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
  const top = ranked[0];
  return top && top.score > 0 ? top : null;
}

function findEngine(model: Model, hp: number | null) {
  if (!model.engines.length) return null;
  if (!hp) return { engine: model.engines[0]!, difference: null };

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
  const fuelLabel = extractTechnicalValue(html, "Drivmedel");
  const displacementText = extractTechnicalValue(html, "Slagvolym");
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
    fuel: parseFuel(fuelLabel),
    fuelLabel,
    displacementCc: parseFirstNumber(displacementText),
    transmission: extractTechnicalValue(html, "Växellåda"),
    vehicleType: extractTechnicalValue(html, "Fordonsslag"),
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
  const data = asRecord(payload['data']);
  const attributes = asRecord(data['attributes']);
  const basic = asRecord(asRecord(data['basic'])['data']);
  const technical = asRecord(asRecord(data['technical'])['data']);
  const make = asString(basic['make']);
  const model = asString(basic['model']);

  if (!make || !model) throw new Error("Biluppgifter response was incomplete");

  const powerKw = asNumber(firstValue(technical, ["power_kw_1", "power_kw", "engine_power_kw"]));
  const fuelLabel = asString(
    firstValue(technical, ["fuel_1", "fuel", "fuel_type", "primary_fuel"]) ??
      firstValue(basic, ["fuel", "fuel_type"]),
  );
  return {
    registration: asString(attributes['regno']) ?? registration,
    make,
    model,
    year: asNumber(basic['model_year']) ?? asNumber(basic['vehicle_year']),
    hp:
      asNumber(technical['power_hp_1']) ??
      asNumber(technical['power_hp']) ??
      (powerKw ? Math.round(powerKw * 1.35962) : null),
    fuel: parseFuel(fuelLabel),
    fuelLabel,
    displacementCc: asNumber(
      firstValue(technical, [
        "cylinder_volume",
        "engine_volume",
        "displacement",
        "displacement_cc",
        "volume",
      ]),
    ),
    transmission: asString(firstValue(technical, ["gearbox", "transmission", "transmission_type"])),
    vehicleType: asString(firstValue(basic, ["vehicle_type", "vehicle_category", "type"])),
  };
}

function roundToFive(value: number) {
  return Math.round(value / 5) * 5;
}

function inferTurbo(vehicle: RegistrationVehicle, fuel: Fuel) {
  if (fuel === "diesel") return true;
  const description = normalize(`${vehicle.make} ${vehicle.model}`);
  const turboMarkers = [
    "turbo",
    "tbi",
    "tsi",
    "tfsi",
    "tce",
    "gdi",
    "ecoboost",
    "kompressor",
    "compressor",
  ];
  if (turboMarkers.some((marker) => description.includes(marker))) return true;
  if (vehicle.hp && vehicle.displacementCc) {
    return vehicle.hp / (vehicle.displacementCc / 1000) >= 95;
  }
  return (vehicle.year ?? 0) >= 2015;
}

function estimateStockTorque(vehicle: RegistrationVehicle, fuel: Fuel, turbo: boolean) {
  const hp = vehicle.hp ?? 0;
  const displacementLitres = (vehicle.displacementCc ?? 0) / 1000;
  if (fuel === "diesel") {
    return roundToFive(Math.max(hp * 2.15, displacementLitres * 170));
  }
  if (turbo) return roundToFive(Math.max(hp * 1.4, displacementLitres * 150));
  return roundToFive(Math.max(hp * 1.05, displacementLitres * 105));
}

function buildRegistryEngine(vehicle: RegistrationVehicle): Engine | null {
  if (!vehicle.hp || (vehicle.fuel !== "diesel" && vehicle.fuel !== "bensin")) return null;
  const turbo = inferTurbo(vehicle, vehicle.fuel);
  const size = vehicle.displacementCc ? `${(vehicle.displacementCc / 1000).toFixed(1)} ` : "";
  const fuelName = vehicle.fuel === "diesel" ? "Diesel" : "Bensin";
  return {
    name: `${size}${fuelName} · ${vehicle.hp} hk`,
    fuel: vehicle.fuel,
    turbo,
    hp: vehicle.hp,
    nm: estimateStockTorque(vehicle, vehicle.fuel, turbo),
  };
}

export async function lookupAndEstimateRegistration(registration: string, stage: Stage) {
  const apiKey = process.env['BILUPPGIFTER_API_KEY']?.trim();
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
  const registryEngine = buildRegistryEngine(vehicle);
  const capabilities = await resolveVehicleCapabilities(vehicle);

  if (!registryEngine) {
    const reason =
      vehicle.fuel === "electric"
        ? "Elbilar kräver en separat effektanalys och kan inte beräknas med motoroptimeringens stegmodell."
        : "Fordonets effekt eller drivmedel saknas i fordonsregistret. Ring oss så identifierar vi motorn direkt.";
    return { vehicle, match: null, estimate: null, capabilities, reason };
  }

  const exactCatalogMatch = match?.confidence === "exact";
  const engine = exactCatalogMatch ? match.engine : registryEngine;

  return {
    vehicle,
    match: match
      ? {
          brand: match.brand.name,
          model: match.model.name,
          engine: match.engine.name,
          confidence: match.confidence,
        }
      : null,
    capabilities,
    estimate: {
      brand: vehicle.make,
      model: vehicle.model,
      engine: exactCatalogMatch ? match.engine.name : registryEngine.name,
      fuel: engine.fuel,
      stage,
      source: exactCatalogMatch ? ("catalog" as const) : ("registry" as const),
      ...calculateTuning(engine, stage),
    },
    reason: null,
  };
}

