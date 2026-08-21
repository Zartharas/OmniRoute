export type OperationsFloorRequest = {
  id?: string | null;
  provider?: string | null;
  model?: string | null;
  tokensInput?: number | null;
  tokensOutput?: number | null;
  latencyMs?: number | null;
  status?: string | null;
  error?: string | null;
  comboName?: string | null;
  timestamp?: number | null;
};

export type OperationsFloorConnection = {
  id?: string | null;
  provider?: string | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | Date | null;
};

export type OperationsFloorComboEvent = {
  comboName?: string | null;
  targetIndex?: number | null;
  provider?: string | null;
  model?: string | null;
  type?: "attempt" | "succeeded" | "failed" | string | null;
  error?: string | null;
  timestamp?: number | null;
};

export type OperationsLane = "primary" | "protected";
export type OperationsAttentionSeverity = "info" | "warning" | "error";

export type OperationsAttentionItem = {
  id: string;
  severity: OperationsAttentionSeverity;
  kind: "provider" | "request" | "fallback";
  title: string;
  detail: string;
  provider?: string;
  requestId?: string;
  timestamp?: number;
};

export const PROTECTED_OPENAI_PROVIDER_IDS = new Set([
  "codex",
  "openai",
  "chatgpt-web",
  "chatgpt-web-codex",
]);

export function normalizeOperationsProviderId(provider: unknown): string {
  return typeof provider === "string" ? provider.trim().toLowerCase() : "";
}

export function isProtectedOpenAiProvider(provider: unknown): boolean {
  const id = normalizeOperationsProviderId(provider);
  return PROTECTED_OPENAI_PROVIDER_IDS.has(id);
}

export function getOperationsLane(provider: unknown): OperationsLane | null {
  const id = normalizeOperationsProviderId(provider);
  if (!id) return null;
  return isProtectedOpenAiProvider(id) ? "protected" : "primary";
}

export function summarizeOpenAiPreservation(requests: OperationsFloorRequest[]) {
  let openAiRequests = 0;
  let nonOpenAiRequests = 0;
  let observedInputTokens = 0;
  let observedOutputTokens = 0;

  for (const request of requests) {
    const provider = normalizeOperationsProviderId(request.provider);
    if (!provider) continue;

    if (isProtectedOpenAiProvider(provider)) openAiRequests += 1;
    else nonOpenAiRequests += 1;

    if (typeof request.tokensInput === "number" && Number.isFinite(request.tokensInput)) {
      observedInputTokens += Math.max(0, request.tokensInput);
    }
    if (typeof request.tokensOutput === "number" && Number.isFinite(request.tokensOutput)) {
      observedOutputTokens += Math.max(0, request.tokensOutput);
    }
  }

  const observedRequests = openAiRequests + nonOpenAiRequests;
  const nonOpenAiShare = observedRequests > 0 ? nonOpenAiRequests / observedRequests : 0;

  return {
    observedRequests,
    openAiRequests,
    nonOpenAiRequests,
    nonOpenAiShare,
    observedInputTokens,
    observedOutputTokens,
  };
}

function rateLimitDeadline(value: OperationsFloorConnection["rateLimitedUntil"]): number | null {
  if (value instanceof Date) return Number.isFinite(value.getTime()) ? value.getTime() : null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Build a compact operator queue from observed provider/request/combo state.
 * This intentionally reports evidence only: it does not infer token savings,
 * invent retry causes, or claim that an action is available when the backend
 * has not exposed one.
 */
export function buildOperationsAttentionItems(
  connections: OperationsFloorConnection[],
  requests: OperationsFloorRequest[],
  comboEvents: OperationsFloorComboEvent[],
  now = Date.now()
): OperationsAttentionItem[] {
  const items: OperationsAttentionItem[] = [];
  const providerErrors = new Map<string, number>();
  const providerRateLimits = new Map<string, number>();

  for (const connection of connections) {
    const provider = normalizeOperationsProviderId(connection.provider);
    if (!provider) continue;

    const status = typeof connection.testStatus === "string" ? connection.testStatus.toLowerCase() : "";
    if (["error", "failed", "invalid", "unauthorized"].includes(status)) {
      providerErrors.set(provider, (providerErrors.get(provider) ?? 0) + 1);
    }

    const deadline = rateLimitDeadline(connection.rateLimitedUntil);
    if (deadline !== null && deadline > now) {
      const existing = providerRateLimits.get(provider) ?? 0;
      providerRateLimits.set(provider, Math.max(existing, deadline));
    }
  }

  for (const [provider, count] of providerErrors) {
    items.push({
      id: `provider-error:${provider}`,
      severity: "error",
      kind: "provider",
      provider,
      title: `${provider} connection issue`,
      detail: `${count} connection${count === 1 ? "" : "s"} currently report a failed test state.`,
    });
  }

  for (const [provider, deadline] of providerRateLimits) {
    items.push({
      id: `provider-rate-limit:${provider}`,
      severity: "warning",
      kind: "provider",
      provider,
      title: `${provider} is rate limited`,
      detail: `At least one connection is cooling down until ${new Date(deadline).toISOString()}.`,
      timestamp: deadline,
    });
  }

  for (const request of requests.slice(0, 12)) {
    if (request.status !== "error") continue;
    const provider = normalizeOperationsProviderId(request.provider);
    const requestId = typeof request.id === "string" ? request.id : undefined;
    items.push({
      id: `request-error:${requestId ?? `${provider}:${request.timestamp ?? items.length}`}`,
      severity: "error",
      kind: "request",
      provider: provider || undefined,
      requestId,
      title: `Request failed${provider ? ` on ${provider}` : ""}`,
      detail: request.error?.trim() || "The live request stream reported an error without additional detail.",
      timestamp: typeof request.timestamp === "number" ? request.timestamp : undefined,
    });
  }

  const protectedAttempt = comboEvents.find(
    (event) => event.type === "attempt" && isProtectedOpenAiProvider(event.provider)
  );
  if (protectedAttempt) {
    const provider = normalizeOperationsProviderId(protectedAttempt.provider);
    items.push({
      id: `protected-fallback:${protectedAttempt.comboName ?? "combo"}:${protectedAttempt.timestamp ?? 0}`,
      severity: "warning",
      kind: "fallback",
      provider: provider || undefined,
      title: "Protected OpenAI lane was reached",
      detail: `${protectedAttempt.comboName || "A combo"} attempted ${provider || "an OpenAI-family provider"}${protectedAttempt.model ? `/${protectedAttempt.model}` : ""}.`,
      timestamp: typeof protectedAttempt.timestamp === "number" ? protectedAttempt.timestamp : undefined,
    });
  }

  const failedCombo = comboEvents.find((event) => event.type === "failed");
  if (failedCombo) {
    const provider = normalizeOperationsProviderId(failedCombo.provider);
    const failureStage =
      typeof failedCombo.targetIndex === "number"
        ? failedCombo.targetIndex > 0
          ? "fallback attempt failed"
          : "primary target failed"
        : "target failed";
    items.push({
      id: `combo-failed:${failedCombo.comboName ?? "combo"}:${failedCombo.timestamp ?? 0}`,
      severity: "warning",
      kind: "fallback",
      provider: provider || undefined,
      title: `${failedCombo.comboName || "Combo"} ${failureStage}`,
      detail: failedCombo.error?.trim() || `${provider || "The selected provider"} did not complete the combo attempt.`,
      timestamp: typeof failedCombo.timestamp === "number" ? failedCombo.timestamp : undefined,
    });
  }

  const rank: Record<OperationsAttentionSeverity, number> = { error: 0, warning: 1, info: 2 };
  return items.sort((a, b) => rank[a.severity] - rank[b.severity] || (b.timestamp ?? 0) - (a.timestamp ?? 0));
}
