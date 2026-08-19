export type OperationsFloorSimulationConnection = {
  id: string;
  provider: string;
  name: string;
  isActive: boolean;
  testStatus: "success" | "error";
};

export type OperationsFloorSimulationRequest = {
  id: string;
  model: string;
  provider: string;
  timestamp: number;
  status: "pending" | "running" | "success" | "error";
  tokensInput?: number;
  tokensOutput?: number;
  latencyMs?: number;
  error?: string;
  comboName?: string;
};

export type OperationsFloorSimulationComboEvent = {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  type: "attempt" | "succeeded" | "failed";
  strategy?: string;
  latencyMs?: number;
  error?: string;
  timestamp: number;
};

export type OperationsFloorSimulationSnapshot = {
  step: number;
  label: string;
  detail: string;
  connections: OperationsFloorSimulationConnection[];
  activeRequests: OperationsFloorSimulationRequest[];
  completedRequests: OperationsFloorSimulationRequest[];
  comboEvents: OperationsFloorSimulationComboEvent[];
};

export const OPERATIONS_FLOOR_SIMULATION_FINAL_STEP = 4;

const BASE_CONNECTIONS: OperationsFloorSimulationConnection[] = [
  {
    id: "simulation-deepseek-web",
    provider: "deepseek-web",
    name: "DeepSeek primary · simulation",
    isActive: true,
    testStatus: "success",
  },
  {
    id: "simulation-zai",
    provider: "zai",
    name: "Z.AI alternate · simulation",
    isActive: true,
    testStatus: "success",
  },
  {
    id: "simulation-mistral",
    provider: "mistral",
    name: "Mistral alternate · simulation",
    isActive: true,
    testStatus: "success",
  },
  {
    id: "simulation-codex",
    provider: "codex",
    name: "Codex protected fallback · simulation",
    isActive: true,
    testStatus: "success",
  },
];

function request(
  overrides: Partial<OperationsFloorSimulationRequest> & Pick<OperationsFloorSimulationRequest, "id" | "provider" | "model" | "timestamp" | "status">
): OperationsFloorSimulationRequest {
  return {
    comboName: "zero-call-preservation-demo",
    ...overrides,
  };
}

function event(
  overrides: Partial<OperationsFloorSimulationComboEvent> & Pick<OperationsFloorSimulationComboEvent, "provider" | "model" | "type" | "timestamp">
): OperationsFloorSimulationComboEvent {
  return {
    comboName: "zero-call-preservation-demo",
    targetIndex: 0,
    strategy: "fallback",
    ...overrides,
  };
}

export function buildOperationsFloorSimulation(
  requestedStep: number,
  now = Date.now()
): OperationsFloorSimulationSnapshot {
  const step = Math.max(0, Math.min(OPERATIONS_FLOOR_SIMULATION_FINAL_STEP, Math.trunc(requestedStep)));
  const startedAt = now - 4_000;
  const failedAt = now - 2_800;
  const fallbackAt = now - 1_700;
  const completedAt = now - 500;

  const deepSeekActive = request({
    id: "simulation-request-primary",
    provider: "deepseek-web",
    model: "deepseek-reasoner",
    timestamp: startedAt,
    status: "running",
  });
  const deepSeekFailed = request({
    ...deepSeekActive,
    status: "error",
    error: "Simulated primary-provider failure",
    latencyMs: 1_200,
  });
  const codexActive = request({
    id: "simulation-request-protected",
    provider: "codex",
    model: "gpt-5",
    timestamp: fallbackAt,
    status: "running",
  });
  const codexSucceeded = request({
    ...codexActive,
    status: "success",
    latencyMs: 1_100,
  });

  const primaryAttempt = event({
    provider: "deepseek-web",
    model: "deepseek-reasoner",
    type: "attempt",
    timestamp: startedAt,
    targetIndex: 0,
  });
  const primaryFailed = event({
    provider: "deepseek-web",
    model: "deepseek-reasoner",
    type: "failed",
    timestamp: failedAt,
    targetIndex: 0,
    latencyMs: 1_200,
    error: "Simulated primary-provider failure",
  });
  const protectedAttempt = event({
    provider: "codex",
    model: "gpt-5",
    type: "attempt",
    timestamp: fallbackAt,
    targetIndex: 1,
  });
  const protectedSucceeded = event({
    provider: "codex",
    model: "gpt-5",
    type: "succeeded",
    timestamp: completedAt,
    targetIndex: 1,
    latencyMs: 1_100,
  });

  const connections = BASE_CONNECTIONS.map((connection) => ({ ...connection }));

  if (step === 0) {
    return {
      step,
      label: "ready",
      detail: "Local desks are staged; no request has been emitted.",
      connections,
      activeRequests: [],
      completedRequests: [],
      comboEvents: [],
    };
  }

  if (step === 1) {
    return {
      step,
      label: "primary route",
      detail: "A local-only request is moving from ingress to DeepSeek.",
      connections,
      activeRequests: [deepSeekActive],
      completedRequests: [],
      comboEvents: [primaryAttempt],
    };
  }

  connections[0] = { ...connections[0], testStatus: "error" };

  if (step === 2) {
    return {
      step,
      label: "primary failure",
      detail: "The simulated DeepSeek attempt failed; fallback evidence is now visible.",
      connections,
      activeRequests: [],
      completedRequests: [deepSeekFailed],
      comboEvents: [primaryFailed, primaryAttempt],
    };
  }

  if (step === 3) {
    return {
      step,
      label: "protected fallback",
      detail: "The protected Codex lane is active in simulation only; no provider call was sent.",
      connections,
      activeRequests: [codexActive],
      completedRequests: [deepSeekFailed],
      comboEvents: [protectedAttempt, primaryFailed, primaryAttempt],
    };
  }

  connections[0] = { ...connections[0], testStatus: "success" };
  return {
    step,
    label: "completed",
    detail: "The simulated protected fallback completed and the primary desk recovered.",
    connections,
    activeRequests: [],
    completedRequests: [codexSucceeded, deepSeekFailed],
    comboEvents: [protectedSucceeded, protectedAttempt, primaryFailed, primaryAttempt],
  };
}
