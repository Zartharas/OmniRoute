"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import { Card } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import {
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} from "@/shared/utils/providerConnectionStatus";
import { useLiveComboStatus, useLiveRequests } from "@/hooks/useLiveDashboard";
import OperationsFloorWorkspaceScene from "./OperationsFloorWorkspaceScene";
import OperationsFloorSystemTelemetry, {
  useOperationsFloorSystemTelemetry,
} from "./OperationsFloorSystemTelemetry";
import OperationsFloorInspector, {
  type OperationsConnectionTestState,
  type OperationsFloorSelection,
} from "./OperationsFloorInspector";
import {
  buildOperationsAttentionItems,
  isProtectedOpenAiProvider,
  normalizeOperationsProviderId,
  summarizeOpenAiPreservation,
  type OperationsAttentionItem,
} from "./operationsFloorModel";
import {
  buildOperationsFloorSimulation,
  OPERATIONS_FLOOR_SIMULATION_FINAL_STEP,
} from "./operationsFloorSimulation";

type ProviderConnection = {
  id: string;
  provider: string;
  name?: string | null;
  isActive?: boolean | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | Date | null;
};

type ProviderDesk = {
  id: string;
  label: string;
  connections: number;
  connected: number;
  errors: number;
};

type ProviderTestResponse = {
  valid?: boolean;
  error?: string | null;
  latencyMs?: number;
  testedAt?: string;
  diagnosis?: {
    message?: string | null;
  } | null;
};

type ControlTab = "live" | "attention" | "requests" | "fallbacks";
type LiveRequest = ReturnType<typeof useLiveRequests>["activeRequests"][number];
type ComboEvent = ReturnType<typeof useLiveComboStatus>["comboEvents"][number];

function providerLabel(providerId: string): string {
  const config = (AI_PROVIDERS as Record<string, { name?: string }>)[providerId];
  return config?.name || providerId;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function formatClock(timestamp: number | undefined): string {
  if (typeof timestamp !== "number" || !Number.isFinite(timestamp)) return "—";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function attentionTone(item: OperationsAttentionItem): string {
  if (item.severity === "error") return "bg-red-500";
  if (item.severity === "warning") return "bg-amber-500";
  return "bg-primary";
}

export default function OperationsFloorClient() {
  const [connections, setConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selection, setSelection] = useState<OperationsFloorSelection>(null);
  const [controlTab, setControlTab] = useState<ControlTab>("live");
  const [connectionTests, setConnectionTests] = useState<Record<string, OperationsConnectionTestState>>({});
  const [simulationEnabled, setSimulationEnabled] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const {
    activeRequests: liveActiveRequests,
    completedRequests: liveCompletedRequests,
    isConnected: liveConnected,
    reconnect,
  } = useLiveRequests();
  const { comboEvents: liveComboEvents } = useLiveComboStatus();
  const systemTelemetry = useOperationsFloorSystemTelemetry(simulationEnabled);

  const simulation = useMemo(
    () => buildOperationsFloorSimulation(simulationStep),
    [simulationStep]
  );
  const simulationPlaying = simulationEnabled && simulationStep < OPERATIONS_FLOOR_SIMULATION_FINAL_STEP;

  useEffect(() => {
    if (!simulationPlaying) return;
    const timer = window.setTimeout(() => {
      setSimulationStep((current) => Math.min(current + 1, OPERATIONS_FLOOR_SIMULATION_FINAL_STEP));
    }, 1_700);
    return () => window.clearTimeout(timer);
  }, [simulationPlaying, simulationStep]);

  const startSimulation = useCallback(() => {
    setSimulationEnabled(true);
    setSimulationStep(0);
    setSelection(null);
    setControlTab("live");
    setConnectionTests({});
  }, []);

  const replaySimulation = useCallback(() => {
    setSimulationStep(0);
    setSelection(null);
    setControlTab("live");
    setConnectionTests({});
  }, []);

  const stopSimulation = useCallback(() => {
    setSimulationEnabled(false);
    setSimulationStep(0);
    setSelection(null);
    setControlTab("live");
    setConnectionTests({});
  }, []);

  const loadProviders = useCallback(async () => {
    try {
      const response = await fetch("/api/providers?limit=1000", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const body = await response.json();
      setConnections(Array.isArray(body?.connections) ? body.connections : []);
      setLoadError(null);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load providers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProviders();
    const timer = setInterval(loadProviders, 15_000);
    return () => clearInterval(timer);
  }, [loadProviders]);

  const observedConnections: ProviderConnection[] = simulationEnabled
    ? simulation.connections
    : connections;
  const observedActiveRequests: LiveRequest[] = simulationEnabled
    ? simulation.activeRequests
    : liveActiveRequests;
  const observedCompletedRequests: LiveRequest[] = simulationEnabled
    ? simulation.completedRequests
    : liveCompletedRequests;
  const observedComboEvents: ComboEvent[] = simulationEnabled
    ? simulation.comboEvents
    : liveComboEvents;

  const desks = useMemo(() => {
    const grouped = new Map<string, ProviderDesk>();
    for (const connection of observedConnections) {
      const providerId = normalizeOperationsProviderId(connection.provider);
      if (!providerId) continue;
      const desk = grouped.get(providerId) || {
        id: providerId,
        label: providerLabel(providerId),
        connections: 0,
        connected: 0,
        errors: 0,
      };
      desk.connections += 1;
      if (isProviderConnectionConnected(connection)) desk.connected += 1;
      if (isProviderConnectionErrored(connection)) desk.errors += 1;
      grouped.set(providerId, desk);
    }
    return [...grouped.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [observedConnections]);

  const regularDesks = desks.filter((desk) => !isProtectedOpenAiProvider(desk.id));
  const protectedDesks = desks.filter((desk) => isProtectedOpenAiProvider(desk.id));
  const preservation = summarizeOpenAiPreservation(observedCompletedRequests);
  const attention = useMemo(
    () => buildOperationsAttentionItems(observedConnections, observedCompletedRequests, observedComboEvents),
    [observedConnections, observedCompletedRequests, observedComboEvents]
  );
  const allRequests = useMemo(
    () => [...observedActiveRequests, ...observedCompletedRequests],
    [observedActiveRequests, observedCompletedRequests]
  );
  const selectedProviderId = selection?.kind === "provider" ? selection.providerId : null;
  const readyDeskCount = desks.filter((desk) => desk.connected > 0).length;
  const activeCount = observedActiveRequests.length;
  const evidenceLabel = simulationEnabled ? "scenario evidence" : "attention";
  const evidenceDetail = simulationEnabled ? "retained scenario flags" : "operator items";

  const selectProvider = useCallback((providerId: string) => {
    setSelection({ kind: "provider", providerId: normalizeOperationsProviderId(providerId) });
  }, []);

  const selectRequest = useCallback((requestId: string) => {
    setSelection({ kind: "request", requestId });
  }, []);

  const testConnection = useCallback(
    async (connectionId: string) => {
      if (simulationEnabled) {
        setConnectionTests((current) => ({
          ...current,
          [connectionId]: {
            status: "error",
            message: "Simulation mode: no provider connection test was sent.",
          },
        }));
        return;
      }

      setConnectionTests((current) => ({
        ...current,
        [connectionId]: { status: "running" },
      }));

      try {
        const response = await fetch(`/api/providers/${encodeURIComponent(connectionId)}/test`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{}",
        });
        const data = (await response.json().catch(() => ({}))) as ProviderTestResponse;
        if (!response.ok) {
          throw new Error(data.error || `Connection test failed with HTTP ${response.status}`);
        }

        const passed = data.valid === true;
        setConnectionTests((current) => ({
          ...current,
          [connectionId]: {
            status: passed ? "success" : "error",
            message: data.error || data.diagnosis?.message || undefined,
            latencyMs: data.latencyMs,
            testedAt: data.testedAt,
          },
        }));
        await loadProviders();
      } catch (error) {
        setConnectionTests((current) => ({
          ...current,
          [connectionId]: {
            status: "error",
            message: error instanceof Error ? error.message : "Connection test failed",
          },
        }));
      }
    },
    [loadProviders, simulationEnabled]
  );

  return (
    <div className="space-y-3 pb-5">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-3xl text-xs leading-5 text-text-muted">
          Live routing, provider health, fallback evidence, and protected OpenAI/Codex usage in one operator workspace.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {simulationEnabled ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-violet-400">
              <span className="size-2 rounded-full bg-violet-500 animate-pulse" />
              simulation local · zero provider calls
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 text-text-muted">
                <span className={`size-2 rounded-full ${liveConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
                {liveConnected ? "telemetry connected" : "telemetry reconnecting"}
              </span>
              {!liveConnected && (
                <button className="text-primary hover:underline" onClick={reconnect}>
                  reconnect
                </button>
              )}
            </>
          )}
          {simulationEnabled ? (
            <>
              <button className="text-violet-400 hover:underline" onClick={replaySimulation}>Replay simulation</button>
              <button className="text-text-muted hover:text-text-main" onClick={stopSimulation}>Stop</button>
            </>
          ) : (
            <button className="text-violet-400 hover:underline" onClick={startSimulation}>Run zero-call simulation</button>
          )}
          <Link href="/dashboard/combos/live" className="text-primary hover:underline">Combo Studio</Link>
          <Link href="/dashboard/analytics/compression" className="text-primary hover:underline">Compression</Link>
        </div>
      </div>

      {simulationEnabled && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-2">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-400">
              Visual scenario · step {simulation.step}/{OPERATIONS_FLOOR_SIMULATION_FINAL_STEP}
            </div>
            <div className="mt-0.5 text-xs font-medium text-text-main">{simulation.label}</div>
            <div className="mt-0.5 text-[10px] text-text-muted">{simulation.detail}</div>
          </div>
          <div className="rounded-full border border-violet-500/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-violet-400">
            {simulationPlaying ? "playing" : "complete"}
          </div>
        </div>
      )}

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-5 sm:divide-y-0">
          <StatusCell label="live" value={String(activeCount)} detail={simulationEnabled ? "simulated requests" : "requests"} tone={activeCount > 0 ? "primary" : "normal"} />
          <StatusCell label="providers" value={`${readyDeskCount}/${desks.length}`} detail={simulationEnabled ? "simulated ready desks" : "ready desks"} tone={readyDeskCount > 0 ? "good" : "normal"} />
          <StatusCell label="non-OpenAI" value={String(preservation.nonOpenAiRequests)} detail={simulationEnabled ? `${formatPercent(preservation.nonOpenAiShare)} simulation` : `${formatPercent(preservation.nonOpenAiShare)} observed`} tone="good" />
          <StatusCell label="OpenAI family" value={String(preservation.openAiRequests)} detail={simulationEnabled ? "simulation records" : "observed calls"} tone="warning" />
          <button
            type="button"
            onClick={() => setControlTab("attention")}
            className="col-span-2 p-2.5 text-left transition hover:bg-bg-subtle/30 sm:col-span-1"
          >
            <div className="text-[9px] uppercase tracking-[0.12em] text-text-muted">{evidenceLabel}</div>
            <div className={`mt-0.5 text-lg font-semibold ${attention.length > 0 ? "text-amber-500" : "text-emerald-500"}`}>{attention.length}</div>
            <div className="text-[9px] text-text-muted">{evidenceDetail}</div>
          </button>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3.5 py-2.5">
          <div>
            <div className="text-sm font-semibold text-text-main">{simulationEnabled ? "Local visual simulation" : "Live operations workspace"}</div>
            <div className="text-[10px] text-text-muted">
              {simulationEnabled
                ? "Deterministic browser-only routing evidence; provider tests are blocked and no LLM request is issued."
                : "Click desks and evidence rows to inspect; connection tests run only when explicitly requested."}
            </div>
          </div>
          {attention.length > 0 && (
            <button
              onClick={() => setControlTab("attention")}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-500"
            >
              <span className="size-1.5 rounded-full bg-amber-500" />
              {simulationEnabled ? `${attention.length} scenario flags` : `${attention.length} need attention`}
            </button>
          )}
        </div>

        <div className="grid gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-2">
            <OperationsFloorSystemTelemetry simulationMode={simulationEnabled} telemetry={systemTelemetry} />
            {!simulationEnabled && loading ? (
              <div className="rounded-xl border border-border bg-bg-subtle/30 p-10 text-center text-sm text-text-muted">Loading provider floor…</div>
            ) : !simulationEnabled && loadError ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-400">Provider inventory unavailable: {loadError}</div>
            ) : (
              <OperationsFloorWorkspaceScene
                regularDesks={regularDesks}
                protectedDesks={protectedDesks}
                activeRequests={observedActiveRequests}
                comboEvents={observedComboEvents.slice(0, 12)}
                systemSignals={systemTelemetry.signals}
                selectedProviderId={selectedProviderId}
                onSelectProvider={selectProvider}
              />
            )}
          </div>

          <OperationsFloorInspector
            selection={selection}
            desks={desks}
            connections={observedConnections}
            requests={allRequests}
            comboEvents={observedComboEvents}
            attention={attention}
            connectionTests={connectionTests}
            simulationMode={simulationEnabled}
            onSelectProvider={selectProvider}
            onSelectRequest={selectRequest}
            onTestConnection={(connectionId) => void testConnection(connectionId)}
            onClear={() => setSelection(null)}
          />
        </div>

        <div className="border-t border-border">
          <div className="flex flex-wrap items-center gap-1 bg-bg-subtle/20 px-3 py-2">
            <ControlTabButton active={controlTab === "live"} onClick={() => setControlTab("live")} label="Live" count={observedActiveRequests.length} />
            <ControlTabButton active={controlTab === "attention"} onClick={() => setControlTab("attention")} label={simulationEnabled ? "Scenario evidence" : "Needs attention"} count={attention.length} alert={attention.length > 0} />
            <ControlTabButton active={controlTab === "requests"} onClick={() => setControlTab("requests")} label="Requests" count={observedCompletedRequests.length} />
            <ControlTabButton active={controlTab === "fallbacks"} onClick={() => setControlTab("fallbacks")} label="Fallbacks" count={observedComboEvents.length} />
            <div className="ml-auto hidden text-[9px] text-text-muted md:block">
              {simulationEnabled ? "local simulation evidence · zero provider calls" : "session evidence · newest first"}
            </div>
          </div>

          <div className="max-h-[210px] overflow-auto p-3">
            {controlTab === "live" && (
              <div className="space-y-1.5">
                {observedActiveRequests.map((request) => (
                  <RequestRow key={request.id} request={request} onClick={() => selectRequest(request.id)} />
                ))}
                {observedComboEvents.filter((event) => event.type === "attempt").slice(0, 10).map((event, index) => (
                  <ComboRow key={`${event.comboName}-${event.timestamp}-${index}`} event={event} onClick={() => selectProvider(event.provider)} />
                ))}
                {observedActiveRequests.length === 0 && observedComboEvents.filter((event) => event.type === "attempt").length === 0 && (
                  <EmptyRow>{simulationEnabled ? "Simulation is staged and waiting for the next local step." : "Nothing is actively routing or cascading right now."}</EmptyRow>
                )}
              </div>
            )}

            {controlTab === "attention" && (
              <div className="space-y-1.5">
                {attention.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.requestId) selectRequest(item.requestId);
                      else if (item.provider) selectProvider(item.provider);
                    }}
                    disabled={!item.requestId && !item.provider}
                    className="flex w-full items-start gap-3 rounded-lg border border-border/70 bg-bg-subtle/20 px-3 py-2 text-left transition hover:border-primary/40"
                  >
                    <span className={`mt-1 size-2 shrink-0 rounded-full ${attentionTone(item)}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-text-main">{item.title}</span>
                      <span className="mt-0.5 block text-[10px] leading-4 text-text-muted">{item.detail}</span>
                    </span>
                    <span className="shrink-0 text-[9px] text-text-muted">{formatClock(item.timestamp)}</span>
                  </button>
                ))}
                {attention.length === 0 && (
                  <EmptyRow>
                    {simulationEnabled
                      ? "No scenario evidence has been retained in this step."
                      : "No observed issue currently needs operator attention."}
                  </EmptyRow>
                )}
              </div>
            )}

            {controlTab === "requests" && (
              <div className="space-y-1.5">
                {observedCompletedRequests.map((request) => (
                  <RequestRow key={request.id} request={request} onClick={() => selectRequest(request.id)} />
                ))}
                {observedCompletedRequests.length === 0 && <EmptyRow>{simulationEnabled ? "No simulated request has completed yet." : "No completed requests observed in this browser session yet."}</EmptyRow>}
              </div>
            )}

            {controlTab === "fallbacks" && (
              <div className="space-y-1.5">
                {observedComboEvents.map((event, index) => (
                  <ComboRow key={`${event.comboName}-${event.timestamp}-${index}`} event={event} onClick={() => selectProvider(event.provider)} />
                ))}
                {observedComboEvents.length === 0 && <EmptyRow>{simulationEnabled ? "No simulated fallback event has occurred yet." : "No combo cascade events observed in this browser session yet."}</EmptyRow>}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function StatusCell({
  label,
  value,
  detail,
  tone = "normal",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "normal" | "primary" | "good" | "warning";
}) {
  const toneClass = tone === "primary" ? "text-primary" : tone === "good" ? "text-emerald-500" : tone === "warning" ? "text-amber-500" : "text-text-main";
  return (
    <div className="p-2.5">
      <div className="text-[9px] uppercase tracking-[0.12em] text-text-muted">{label}</div>
      <div className={`mt-0.5 text-lg font-semibold ${toneClass}`}>{value}</div>
      <div className="text-[9px] text-text-muted">{detail}</div>
    </div>
  );
}

function ControlTabButton({ active, onClick, label, count, alert = false }: { active: boolean; onClick: () => void; label: string; count: number; alert?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${active ? "bg-primary text-white" : "text-text-muted hover:bg-bg-subtle hover:text-text-main"}`}
    >
      {label}
      <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${active ? "bg-white/20" : alert ? "bg-amber-500/15 text-amber-500" : "bg-bg-subtle text-text-muted"}`}>{count}</span>
    </button>
  );
}

function RequestRow({ request, onClick }: { request: LiveRequest; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-lg border border-border/70 bg-bg-subtle/20 px-3 py-2 text-left transition hover:border-primary/40">
      <ProviderIcon providerId={request.provider} size={17} type="color" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-text-main">{request.provider} · {request.model}</span>
        <span className="mt-0.5 block truncate text-[10px] text-text-muted">
          {request.comboName ? `combo ${request.comboName}` : "direct route"}
          {request.latencyMs !== undefined ? ` · ${request.latencyMs.toLocaleString()} ms` : ""}
        </span>
      </span>
      <span className={`text-[10px] font-medium ${request.status === "error" ? "text-red-400" : request.status === "success" ? "text-emerald-500" : "text-primary"}`}>{request.status}</span>
      <span className="w-[72px] shrink-0 text-right text-[9px] text-text-muted">{formatClock(request.timestamp)}</span>
    </button>
  );
}

function ComboRow({ event, onClick }: { event: ComboEvent; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 rounded-lg border border-border/70 bg-bg-subtle/20 px-3 py-2 text-left transition hover:border-primary/40">
      <span className={`size-2 shrink-0 rounded-full ${event.type === "failed" ? "bg-red-500" : event.type === "succeeded" ? "bg-emerald-500" : "bg-amber-500"}`} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-text-main">{event.comboName}</span>
        <span className="mt-0.5 block truncate text-[10px] text-text-muted">
          {event.type} → {event.provider}/{event.model}{event.error ? ` · ${event.error}` : ""}
        </span>
      </span>
      <span className="w-[72px] shrink-0 text-right text-[9px] text-text-muted">{formatClock(event.timestamp)}</span>
    </button>
  );
}

function EmptyRow({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-text-muted">{children}</div>;
}
