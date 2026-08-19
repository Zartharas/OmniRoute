export type OperationsFloorRequest = {
  provider?: string | null;
  tokensInput?: number | null;
  tokensOutput?: number | null;
  status?: string | null;
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
