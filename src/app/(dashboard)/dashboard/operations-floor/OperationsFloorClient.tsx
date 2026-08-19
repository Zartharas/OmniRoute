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
import {
  isProtectedOpenAiProvider,
  normalizeOperationsProviderId,
  summarizeOpenAiPreservation,
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

function providerLabel(providerId: string): string {
  const config = (AI_PROVIDERS as Record<string, { name?: string }>)[providerId];
  return config?.name || providerId;
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function ProviderDeskCard({
  desk,
  activeCount,
  activeModel,
  protectedLane,
}: {
  desk: ProviderDesk;
  activeCount: number;
  activeModel?: string;
  protectedLane: boolean;
}) {
  const healthy = desk.connected > 0 && desk.errors === 0;
  const statusClass =
    desk.errors > 0
      ? "border-red-500/50 bg-red-500/5"
      : healthy
        ? "border-emerald-500/40 bg-emerald-500/5"
        : "border-border bg-bg";

  return (
    <Link
      href={`/dashboard/providers/${encodeURIComponent(desk.id)}`}
      className={`relative min-h-[126px] rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${statusClass}`}
    >
      {activeCount > 0 && (
        <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow">
          {activeCount}
        </span>
      )}

      <div className="mb-3 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface">
          <ProviderIcon providerId={desk.id} size={18} type="color" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-text-main">{desk.label}</div>
          <div className="text-[10px] uppercase tracking-[0.12em] text-text-muted">
            {protectedLane ? "protected fallback" : "provider desk"}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border/70 bg-bg-subtle/40 p-2">
        <div className="mb-1 flex items-center justify-between text-[11px]">
          <span className="text-text-muted">connections</span>
          <span className="font-mono text-text-main">{desk.connected}/{desk.connections}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span
            className={`size-2 rounded-full ${
              desk.errors > 0 ? "bg-red-500" : healthy ? "bg-emerald-500" : "bg-text-muted"
            } ${activeCount > 0 ? "animate-pulse" : ""}`}
          />
          <span className="truncate text-text-muted">
            {activeCount > 0 ? activeModel || "routing now" : desk.errors > 0 ? "needs attention" : healthy ? "ready" : "idle"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function OperationsFloorClient() {
  const [connections, setConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const activeByProvider = useMemo(() => {
    const map = new Map<string, { count: number; model?: string }>();
    for (const request of activeRequests) {
      const id = normalizeOperationsProviderId(request.provider);
      if (!id) continue;
      const current = map.get(id) || { count: 0 };
      current.count += 1;
      current.model = request.model || current.model;
      map.set(id, current);
    }
    return map;
  }, [activeRequests]);

  const regularDesks = desks.filter((desk) => !isProtectedOpenAiProvider(desk.id));
  const protectedDesks = desks.filter((desk) => isProtectedOpenAiProvider(desk.id));
  const preservation = summarizeOpenAiPreservation(completedRequests);
  const recentCombo = comboEvents.slice(0, 5);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">hub</span>
            <h1 className="text-2xl font-semibold text-text-main">Operations Floor</h1>
          </div>
          <p className="max-w-3xl text-sm text-text-muted">
            Live routing observability with a protected OpenAI/Codex lane. This first phase is read-only: it visualizes real OmniRoute traffic without changing routing behavior or importing ChatGPT credentials.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className={`size-2 rounded-full ${liveConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span className="text-text-muted">{liveConnected ? "live telemetry connected" : "live telemetry reconnecting"}</span>
          {!liveConnected && (
            <button className="text-primary hover:underline" onClick={reconnect}>reconnect</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">live requests</div>
          <div className="mt-1 text-2xl font-semibold text-text-main">{activeCount}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">observed non-OpenAI</div>
          <div className="mt-1 text-2xl font-semibold text-emerald-500">{preservation.nonOpenAiRequests}</div>
          <div className="text-[11px] text-text-muted">{formatPercent(preservation.nonOpenAiShare)} of recent routed calls</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">OpenAI-family calls</div>
          <div className="mt-1 text-2xl font-semibold text-amber-500">{preservation.openAiRequests}</div>
          <div className="text-[11px] text-text-muted">observed only — not estimated savings</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-[0.12em] text-text-muted">provider desks</div>
          <div className="mt-1 text-2xl font-semibold text-text-main">{desks.length}</div>
          <div className="text-[11px] text-text-muted">{desks.filter((d) => d.connected > 0).length} currently ready</div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-text-main">Live routing floor</h2>
              <p className="text-xs text-text-muted">Original OmniRoute visualization inspired by event-driven agent floors; no third-party pixel-art assets are used.</p>
            </div>
            <Link href="/dashboard/combos/live" className="text-xs text-primary hover:underline">open Combo Studio</Link>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden bg-bg-subtle/20 p-4 sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:22px_22px]" />

          <div className="relative mx-auto mb-8 max-w-md rounded-2xl border-2 border-primary/40 bg-primary/5 p-4 text-center shadow-sm">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <span className="material-symbols-outlined">route</span>
            </div>
            <div className="font-semibold text-text-main">OmniRoute Dispatch</div>
            <div className="mt-1 text-xs text-text-muted">routes first · protects premium fallback</div>
            {activeCount > 0 && <div className="mt-2 inline-flex rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">{activeCount} in flight</div>}
          </div>

          <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-semibold text-text-main">Primary provider floor</h3>
                <span className="text-xs text-text-muted">use these before protected OpenAI capacity</span>
              </div>
              {loading ? (
                <div className="rounded-xl border border-border bg-bg/70 p-8 text-center text-sm text-text-muted">Loading provider desks…</div>
              ) : loadError ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-400">Provider inventory unavailable: {loadError}</div>
              ) : regularDesks.length === 0 ? (
                <div className="rounded-xl border border-border bg-bg/70 p-8 text-center text-sm text-text-muted">No non-OpenAI provider connections are configured yet.</div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {regularDesks.map((desk) => {
                    const live = activeByProvider.get(desk.id);
                    return <ProviderDeskCard key={desk.id} desk={desk} activeCount={live?.count || 0} activeModel={live?.model} protectedLane={false} />;
                  })}
                </div>
              )}
            </section>

            <aside className="rounded-2xl border border-amber-500/35 bg-amber-500/5 p-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                  <span className="material-symbols-outlined">shield_lock</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-main">Protected OpenAI lane</h3>
                  <p className="mt-1 text-xs leading-5 text-text-muted">Reserved for difficult work after the configured providers are insufficient.</p>
                </div>
              </div>

              <div className="space-y-3">
                {protectedDesks.map((desk) => {
                  const live = activeByProvider.get(desk.id);
                  return <ProviderDeskCard key={desk.id} desk={desk} activeCount={live?.count || 0} activeModel={live?.model} protectedLane />;
                })}

                <div className="rounded-xl border border-dashed border-amber-500/50 bg-bg/80 p-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-amber-500">terminal</span>
                    <span className="text-sm font-semibold text-text-main">ChatGPT Plus · Codex</span>
                  </div>
                  <div className="mt-2 text-[11px] leading-5 text-text-muted">
                    Reserved external fallback. Phase 1 does not copy your Codex/ChatGPT credentials into OmniRoute. The supported-client bridge is intentionally still disabled until we validate the host-to-container boundary.
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 px-2 py-1 text-[10px] font-medium text-amber-500">
                    <span className="size-1.5 rounded-full bg-amber-500" /> bridge pending
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Recent routing</h2>
            <span className="text-[11px] text-text-muted">last {Math.min(completedRequests.length, 6)} completed</span>
          </div>
          <div className="space-y-2">
            {completedRequests.slice(0, 6).map((request) => (
              <div key={request.id} className="flex items-center gap-3 rounded-lg border border-border/70 bg-bg-subtle/30 px-3 py-2 text-xs">
                <ProviderIcon providerId={request.provider} size={16} type="color" />
                <span className="min-w-0 flex-1 truncate text-text-main">{request.provider} · {request.model}</span>
                <span className={request.status === "success" ? "text-emerald-500" : "text-red-500"}>{request.status}</span>
              </div>
            ))}
            {completedRequests.length === 0 && <div className="py-6 text-center text-xs text-text-muted">No completed live requests observed in this session yet.</div>}
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Recent fallback cascade</h2>
            <Link href="/dashboard/analytics/compression" className="text-[11px] text-primary hover:underline">compression analytics</Link>
          </div>
          <div className="space-y-2">
            {recentCombo.map((event, index) => (
              <div key={`${event.comboName}-${event.timestamp}-${index}`} className="flex items-center gap-3 rounded-lg border border-border/70 bg-bg-subtle/30 px-3 py-2 text-xs">
                <span className={`size-2 rounded-full ${event.type === "succeeded" ? "bg-emerald-500" : event.type === "failed" ? "bg-red-500" : "bg-amber-500 animate-pulse"}`} />
                <span className="min-w-0 flex-1 truncate text-text-main">{event.comboName} → {event.provider}/{event.model}</span>
                <span className="text-text-muted">{event.type}</span>
              </div>
            ))}
            {recentCombo.length === 0 && <div className="py-6 text-center text-xs text-text-muted">No combo cascade events observed in this session yet.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
