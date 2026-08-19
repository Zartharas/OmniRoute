"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Card } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import {
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} from "@/shared/utils/providerConnectionStatus";
import { useLiveComboStatus, useLiveRequests } from "@/hooks/useLiveDashboard";
import OperationsFloorScene from "./OperationsFloorScene";
import OperationsFloorInspector, {
  type OperationsFloorSelection,
} from "./OperationsFloorInspector";
import {
  buildOperationsAttentionItems,
  isProtectedOpenAiProvider,
  normalizeOperationsProviderId,
  summarizeOpenAiPreservation,
  type OperationsAttentionItem,
} from "./operationsFloorModel";

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

type ControlTab = "live" | "attention" | "requests" | "fallbacks";

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

  const {
    activeRequests,
    completedRequests,
    activeCount,
    isConnected: liveConnected,
    reconnect,
  } = useLiveRequests();
  const { comboEvents } = useLiveComboStatus();

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

  const desks = useMemo(() => {
    const grouped = new Map<string, ProviderDesk>();
    for (const connection of connections) {
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
  }, [connections]);

  const regularDesks = desks.filter((desk) => !isProtectedOpenAiProvider(desk.id));
  const protectedDesks = desks.filter((desk) => isProtectedOpenAiProvider(desk.id));
  const preservation = summarizeOpenAiPreservation(completedRequests);
  const attention = useMemo(
    () => buildOperationsAttentionItems(connections, completedRequests, comboEvents),
    [connections, completedRequests, comboEvents]
  );
  const allRequests = useMemo(
    () => [...activeRequests, ...completedRequests],
    [activeRequests, completedRequests]
  );
  const selectedProviderId = selection?.kind === "provider" ? selection.providerId : null;

  const selectProvider = useCallback((providerId: string) => {
    setSelection({ kind: "provider", providerId: normalizeOperationsProviderId(providerId) });
  }, []);

  const selectRequest = useCallback((requestId: string) => {
    setSelection({ kind: "request", requestId });
  }, []);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">hub</span>
            <h1 className="text-2xl font-semibold text-text-main">Operations Floor</h1>
            {attention.length > 0 && (
              <button
                onClick={() => setControlTab("attention")}
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-500"
              >
                <span className="size-1.5 rounded-full bg-amber-500" />
                {attention.length} need attention
              </button>
            )}
          </div>
          <p className="max-w-3xl text-sm text-text-muted">
            A live control surface for routing, provider health, fallback evidence, and protected OpenAI/Codex usage. Click the floor instead of hunting through disconnected logs.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`size-2 rounded-full ${liveConnected ? "bg-emerald-500" : "bg-amber-500"}`}
          />
          <span className="text-text-muted">
            {liveConnected ? "live telemetry connected" : "live telemetry reconnecting"}
          </span>
          {!liveConnected && (
            <button className="text-primary hover:underline" onClick={reconnect}>
              reconnect
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">live requests</div>
          <div className="mt-1 text-2xl font-semibold text-text-main">{activeCount}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">
            observed non-OpenAI
          </div>
          <div className="mt-1 text-2xl font-semibold text-emerald-500">
            {preservation.nonOpenAiRequests}
          </div>
          <div className="text-[11px] text-text-muted">
            {formatPercent(preservation.nonOpenAiShare)} of recent routed calls
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">
            OpenAI-family calls
          </div>
          <div className="mt-1 text-2xl font-semibold text-amber-500">
            {preservation.openAiRequests}
          </div>
          <div className="text-[11px] text-text-muted">observed only — not estimated savings</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">provider desks</div>
          <div className="mt-1 text-2xl font-semibold text-text-main">{desks.length}</div>
          <div className="text-[11px] text-text-muted">
            {desks.filter((desk) => desk.connected > 0).length} currently ready
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-text-main">Live routing floor</h2>
              <p className="text-xs text-text-muted">
                Animated traffic is real session telemetry. Provider desks are now inspectable control-surface objects.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/combos/live" className="text-xs text-primary hover:underline">
                Combo Studio
              </Link>
              <Link href="/dashboard/analytics/compression" className="text-xs text-primary hover:underline">
                Compression
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            {loading ? (
              <div className="rounded-xl border border-border bg-bg-subtle/30 p-10 text-center text-sm text-text-muted">
                Loading provider floor…
              </div>
            ) : loadError ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-400">
                Provider inventory unavailable: {loadError}
              </div>
            ) : (
              <OperationsFloorScene
                regularDesks={regularDesks}
                protectedDesks={protectedDesks}
                activeRequests={activeRequests}
                comboEvents={comboEvents.slice(0, 12)}
                selectedProviderId={selectedProviderId}
                onSelectProvider={selectProvider}
              />
            )}
          </div>

          <OperationsFloorInspector
            selection={selection}
            desks={desks}
            connections={connections}
            requests={allRequests}
            comboEvents={comboEvents}
            attention={attention}
            onSelectProvider={selectProvider}
            onSelectRequest={selectRequest}
            onClear={() => setSelection(null)}
          />
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-bg-subtle/20 px-3 py-2">
          <ControlTabButton active={controlTab === "live"} onClick={() => setControlTab("live")} label="Live" count={activeRequests.length} />
          <ControlTabButton active={controlTab === "attention"} onClick={() => setControlTab("attention")} label="Needs attention" count={attention.length} alert={attention.length > 0} />
          <ControlTabButton active={controlTab === "requests"} onClick={() => setControlTab("requests")} label="Requests" count={completedRequests.length} />
          <ControlTabButton active={controlTab === "fallbacks"} onClick={() => setControlTab("fallbacks")} label="Fallbacks" count={comboEvents.length} />
          <div className="ml-auto hidden text-[10px] text-text-muted md:block">
            session evidence · newest first
          </div>
        </div>

        <div className="max-h-[420px] overflow-auto p-3 sm:p-4">
          {controlTab === "live" && (
            <div className="space-y-2">
              {activeRequests.map((request) => (
                <RequestRow key={request.id} request={request} onClick={() => selectRequest(request.id)} />
              ))}
              {comboEvents.filter((event) => event.type === "attempt").slice(0, 10).map((event, index) => (
                <ComboRow key={`${event.comboName}-${event.timestamp}-${index}`} event={event} onClick={() => selectProvider(event.provider)} />
              ))}
              {activeRequests.length === 0 && comboEvents.filter((event) => event.type === "attempt").length === 0 && (
                <EmptyRow>Nothing is actively routing or cascading right now.</EmptyRow>
              )}
            </div>
          )}

          {controlTab === "attention" && (
            <div className="space-y-2">
              {attention.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.requestId) selectRequest(item.requestId);
                    else if (item.provider) selectProvider(item.provider);
                  }}
                  disabled={!item.requestId && !item.provider}
                  className="flex w-full items-start gap-3 rounded-xl border border-border/70 bg-bg-subtle/20 px-3 py-2.5 text-left transition hover:border-primary/40"
                >
                  <span className={`mt-1 size-2 shrink-0 rounded-full ${attentionTone(item)}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-text-main">{item.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-text-muted">{item.detail}</span>
                  </span>
                  <span className="shrink-0 text-[10px] text-text-muted">{formatClock(item.timestamp)}</span>
                </button>
              ))}
              {attention.length === 0 && <EmptyRow>No observed issue currently needs operator attention.</EmptyRow>}
            </div>
          )}

          {controlTab === "requests" && (
            <div className="space-y-2">
              {completedRequests.map((request) => (
                <RequestRow key={request.id} request={request} onClick={() => selectRequest(request.id)} />
              ))}
              {completedRequests.length === 0 && <EmptyRow>No completed requests observed in this browser session yet.</EmptyRow>}
            </div>
          )}

          {controlTab === "fallbacks" && (
            <div className="space-y-2">
              {comboEvents.map((event, index) => (
                <ComboRow key={`${event.comboName}-${event.timestamp}-${index}`} event={event} onClick={() => selectProvider(event.provider)} />
              ))}
              {comboEvents.length === 0 && <EmptyRow>No combo cascade events observed in this browser session yet.</EmptyRow>}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function ControlTabButton({
  active,
  onClick,
  label,
  count,
  alert = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  alert?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
        active ? "bg-primary text-white" : "text-text-muted hover:bg-bg-subtle hover:text-text-main"
      }`}
    >
      {label}
      <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${active ? "bg-white/20" : alert ? "bg-amber-500/15 text-amber-500" : "bg-bg-subtle text-text-muted"}`}>
        {count}
      </span>
    </button>
  );
}

function RequestRow({ request, onClick }: { request: ReturnType<typeof useLiveRequests>["completedRequests"][number]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-border/70 bg-bg-subtle/20 px-3 py-2.5 text-left transition hover:border-primary/40"
    >
      <ProviderIcon providerId={request.provider} size={17} type="color" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-text-main">{request.provider} · {request.model}</span>
        <span className="mt-0.5 block truncate text-[10px] text-text-muted">
          {request.comboName ? `combo ${request.comboName}` : "direct route"}
          {request.latencyMs !== undefined ? ` · ${request.latencyMs.toLocaleString()} ms` : ""}
        </span>
      </span>
      <span className={`text-[10px] font-medium ${request.status === "error" ? "text-red-400" : request.status === "success" ? "text-emerald-500" : "text-primary"}`}>
        {request.status}
      </span>
      <span className="w-[72px] shrink-0 text-right text-[10px] text-text-muted">{formatClock(request.timestamp)}</span>
    </button>
  );
}

function ComboRow({ event, onClick }: { event: ReturnType<typeof useLiveComboStatus>["comboEvents"][number]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-border/70 bg-bg-subtle/20 px-3 py-2.5 text-left transition hover:border-primary/40"
    >
      <span className={`size-2 shrink-0 rounded-full ${event.type === "failed" ? "bg-red-500" : event.type === "succeeded" ? "bg-emerald-500" : "bg-amber-500"}`} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-text-main">{event.comboName}</span>
        <span className="mt-0.5 block truncate text-[10px] text-text-muted">
          {event.type} → {event.provider}/{event.model}
          {event.error ? ` · ${event.error}` : ""}
        </span>
      </span>
      <span className="w-[72px] shrink-0 text-right text-[10px] text-text-muted">{formatClock(event.timestamp)}</span>
    </button>
  );
}

function EmptyRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-text-muted">
      {children}
    </div>
  );
}
