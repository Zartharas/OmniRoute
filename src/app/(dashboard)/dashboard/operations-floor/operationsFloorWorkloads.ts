import { normalizeOperationsProviderId } from "./operationsFloorModel";

export type OperationsWorkloadScope = "personal" | "mta";

export type OperationsWorkloadModel = {
  id: string;
  displayName: string;
  description: string;
  downstreamModel: string;
  routeProvider: string;
  scope: OperationsWorkloadScope;
  modalities: string[];
  contextWindow: number | null;
  priority: number;
};

export type OperationsProtectedNativeModel = {
  key: string;
  displayName: string;
  description: string;
  status: "protected-native";
};

export type OperationsWorkloadHealth =
  | "ready"
  | "error"
  | "offline"
  | "isolated";

type ProviderHealthDesk = {
  id: string;
  connected: number;
  errors: number;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asContextWindow(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value > 0
    ? value
    : null;
}

function asPriority(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : Number.MAX_SAFE_INTEGER;
}

function asModalities(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeOperationsWorkloadPolicy(
  value: unknown
): OperationsWorkloadModel[] {
  if (!value || typeof value !== "object") return [];

  const rawModels = (value as { models?: unknown }).models;

  if (!Array.isArray(rawModels)) return [];

  const models: OperationsWorkloadModel[] = [];

  for (const raw of rawModels) {
    if (!raw || typeof raw !== "object") continue;

    const record = raw as Record<string, unknown>;

    const id = asText(
      record.alias ??
        record.slug ??
        record.id
    );

    if (!id || id === "select-a-model-first") continue;

    const downstreamModel = asText(
      record.model ??
        record.downstream_model ??
        record.downstreamModel
    );

    if (!downstreamModel) continue;

    const routeProvider = normalizeOperationsProviderId(
      downstreamModel.split("/", 1)[0]
    );

    if (!routeProvider) continue;

    const credential = asText(record.credential).toLowerCase();

    const scope: OperationsWorkloadScope =
      credential === "mta" || id.startsWith("mta/")
        ? "mta"
        : "personal";

    const displayName =
      asText(
        record.display_name ??
          record.displayName
      ) || id;

    models.push({
      id,
      displayName,
      description: asText(record.description),
      downstreamModel,
      routeProvider,
      scope,
      modalities: asModalities(
        record.modalities ??
          record.input_modalities
      ),
      contextWindow: asContextWindow(
        record.context ??
          record.context_window ??
          record.contextWindow
      ),
      priority: asPriority(record.priority),
    });
  }

  return models.sort(
    (a, b) =>
      a.priority - b.priority ||
      a.displayName.localeCompare(b.displayName)
  );
}

export function normalizeOperationsProtectedNativePolicy(
  value: unknown
): OperationsProtectedNativeModel[] {
  if (!value || typeof value !== "object") return [];

  const rawEntries = (
    value as {
      protected_native_chatgpt?: unknown;
    }
  ).protected_native_chatgpt;

  if (!Array.isArray(rawEntries)) return [];

  const entries: OperationsProtectedNativeModel[] = [];

  for (const raw of rawEntries) {
    if (!raw || typeof raw !== "object") continue;

    const record =
      raw as Record<string, unknown>;

    const key = asText(record.key);

    const displayName = asText(
      record.display_name ??
        record.displayName
    );

    if (!key || !displayName) continue;

    if (
      asText(record.status) !==
      "protected-native"
    ) {
      continue;
    }

    entries.push({
      key,
      displayName,
      description:
        asText(record.description),
      status: "protected-native",
    });
  }

  return entries;
}

export function deriveOperationsWorkloadHealth(
  workload: OperationsWorkloadModel,
  desks: ProviderHealthDesk[]
): OperationsWorkloadHealth {
  if (workload.scope === "mta") return "isolated";

  const desk = desks.find(
    (candidate) =>
      normalizeOperationsProviderId(candidate.id) ===
      workload.routeProvider
  );

  if (!desk || desk.connected < 1) return "offline";
  if (desk.errors > 0) return "error";

  return "ready";
}
