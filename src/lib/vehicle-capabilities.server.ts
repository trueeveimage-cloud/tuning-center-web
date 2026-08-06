import type { RegistrationVehicle } from "./vehicle-lookup.server";

/**
 * Normalized vehicle-capability layer.
 *
 * Provider-verified data is used as the primary source whenever an optional
 * provider is configured through environment variables. When no provider is
 * configured (or the call fails) we fall back to a deliberately conservative
 * mapping based on registration data - nothing is ever presented as verified
 * fact unless it came from the provider.
 */

export const CAPABILITY_STATUSES = [
  "Tillgänglig",
  "Ej tillämplig",
  "Kräver kontroll",
  "Provider-verifierad",
] as const;

export type CapabilityStatus = (typeof CAPABILITY_STATUSES)[number];

export type CapabilityItem = {
  key: string;
  label: string;
  status: CapabilityStatus;
};

export type VehicleCapabilities = {
  source: "provider" | "fallback";
  sourceLabel: string;
  ecu: {
    label: string;
    status: CapabilityStatus;
  };
  items: CapabilityItem[];
  disclaimer: string;
};

const FALLBACK_DISCLAIMER =
  "Styrenhet och emissionsfunktioner är inte verifierade av extern leverantör för just detta fordon. Uppgifterna kräver manuell kontroll i verkstaden innan något arbete bokas.";

const PROVIDER_DISCLAIMER =
  "Uppgifterna kommer från vår fordonsleverantörs databas. Slutlig bekräftelse sker alltid vid inläsning av bilens styrenhet.";

function isStatus(value: unknown): value is CapabilityStatus {
  return (
    typeof value === "string" && (CAPABILITY_STATUSES as readonly string[]).includes(value)
  );
}

const ITEM_LABELS: Array<{ key: string; label: string }> = [
  { key: "adblue", label: "AdBlue" },
  { key: "dpf", label: "DPF" },
  { key: "egr", label: "EGR" },
  { key: "coding", label: "Kodning" },
  { key: "diagnostics", label: "Diagnostik" },
  { key: "repair", label: "Reparation" },
];

function fallbackCapabilities(vehicle: RegistrationVehicle): VehicleCapabilities {
  const electric = vehicle.fuel === "electric";
  const diesel = vehicle.fuel === "diesel";
  const combustion = diesel || vehicle.fuel === "bensin";
  const modernDiesel = diesel && (vehicle.year ?? 0) >= 2015;

  const statusFor = (key: string): CapabilityStatus => {
    if (key === "adblue") {
      if (!diesel) return "Ej tillämplig";
      return modernDiesel ? "Kräver kontroll" : "Ej tillämplig";
    }
    if (key === "dpf") return diesel ? "Kräver kontroll" : "Ej tillämplig";
    if (key === "egr") return combustion ? "Kräver kontroll" : "Ej tillämplig";
    if (key === "coding") return electric ? "Kräver kontroll" : "Tillgänglig";
    return "Tillgänglig";
  };

  return {
    source: "fallback",
    sourceLabel: "Uppskattat från fordonsregistret",
    ecu: { label: "Kräver manuell kontroll", status: "Kräver kontroll" },
    items: ITEM_LABELS.map((item) => ({ ...item, status: statusFor(item.key) })),
    disclaimer: FALLBACK_DISCLAIMER,
  };
}

async function providerCapabilities(
  vehicle: RegistrationVehicle,
): Promise<VehicleCapabilities | null> {
  const endpoint = process.env['VEHICLE_CAPABILITY_API_URL']?.trim();
  const apiKey = process.env['VEHICLE_CAPABILITY_API_KEY']?.trim();
  if (!endpoint || !apiKey) return null;

  try {
    const response = await fetch(
      `${endpoint.replace(/\/$/, "")}/${encodeURIComponent(vehicle.registration)}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "TuningCenterOrebro/1.0",
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) return null;

    const payload = (await response.json()) as Record<string, unknown>;
    const data = (
      typeof payload['data'] === "object" && payload['data'] !== null ? payload['data'] : payload
    ) as Record<string, unknown>;

    const ecuLabel = typeof data['ecu'] === "string" && data['ecu'].trim() ? data['ecu'].trim() : null;
    const rawItems =
      typeof data['capabilities'] === "object" && data['capabilities'] !== null
        ? (data['capabilities'] as Record<string, unknown>)
        : {};

    const items = ITEM_LABELS.map((item) => {
      const value = rawItems[item.key];
      return {
        ...item,
        status: isStatus(value) ? value : ("Kräver kontroll" as CapabilityStatus),
      };
    });

    return {
      source: "provider",
      sourceLabel: "Provider-verifierad fordonsdata",
      ecu: {
        label: ecuLabel ?? "Kräver manuell kontroll",
        status: ecuLabel ? "Provider-verifierad" : "Kräver kontroll",
      },
      items,
      disclaimer: PROVIDER_DISCLAIMER,
    };
  } catch {
    return null;
  }
}

export async function resolveVehicleCapabilities(
  vehicle: RegistrationVehicle,
): Promise<VehicleCapabilities> {
  return (await providerCapabilities(vehicle)) ?? fallbackCapabilities(vehicle);
}
