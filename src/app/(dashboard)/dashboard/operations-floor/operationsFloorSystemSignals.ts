export type OperationsFloorSystemEvent = {
  event: string;
  channel: string;
  data: unknown;
  timestamp: number;
};

export type OperationsFloorAuthSignal = {
  key: string;
  timestamp: number;
  provider: string | null;
  oldStatus: string | null;
  newStatus: string | null;
};

export type OperationsFloorCompressionSignal = {
  key: string;
  timestamp: number;
  event: "compression.step" | "compression.completed";
  mode: string | null;
  engine: string | null;
  state: string | null;
  savingsPercent: number | null;
  originalTokens: number | null;
  compressedTokens: number | null;
  stepIndex: number | null;
  totalSteps: number | null;
};

export type OperationsFloorSystemSignals = {
  auth: OperationsFloorAuthSignal | null;
  compression: OperationsFloorCompressionSignal | null;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function eventTimestamp(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function deriveOperationsFloorSystemSignals(
  events: readonly OperationsFloorSystemEvent[]
): OperationsFloorSystemSignals {
  let auth: OperationsFloorAuthSignal | null = null;
  let compression: OperationsFloorCompressionSignal | null = null;

  for (let index = events.length - 1; index >= 0 && (!auth || !compression); index -= 1) {
    const event = events[index];
    const data = asRecord(event.data);
    const timestamp = eventTimestamp(event.timestamp);

    if (!auth && event.event === "credential.health.changed") {
      const provider = asText(data?.provider);
      const oldStatus = asText(data?.oldStatus);
      const newStatus = asText(data?.newStatus);
      auth = {
        key: `auth:${timestamp}:${provider || "unknown"}:${newStatus || "unknown"}`,
        timestamp,
        provider,
        oldStatus,
        newStatus,
      };
      continue;
    }

    if (
      !compression &&
      event.channel === "compression" &&
      (event.event === "compression.step" || event.event === "compression.completed")
    ) {
      compression = {
        key: `compression:${event.event}:${timestamp}:${asText(data?.mode) || asText(data?.engine) || "unknown"}`,
        timestamp,
        event: event.event,
        mode: asText(data?.mode),
        engine: asText(data?.engine),
        state: asText(data?.state),
        savingsPercent: asNumber(data?.savingsPercent),
        originalTokens: asNumber(data?.originalTokens),
        compressedTokens: asNumber(data?.compressedTokens),
        stepIndex: asNumber(data?.stepIndex),
        totalSteps: asNumber(data?.totalSteps),
      };
    }
  }

  return { auth, compression };
}

export function isFreshOperationsFloorSystemSignal(
  signal: { timestamp: number } | null,
  now = Date.now(),
  windowMs = 15_000
): boolean {
  if (!signal || !Number.isFinite(signal.timestamp) || !Number.isFinite(now) || !Number.isFinite(windowMs)) {
    return false;
  }
  const age = now - signal.timestamp;
  return age >= 0 && age <= Math.max(0, windowMs);
}
