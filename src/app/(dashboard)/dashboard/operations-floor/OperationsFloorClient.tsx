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
            Live routing observability with a protected OpenAI/Codex lane. The scene is driven by real OmniRoute request and combo events; it does not import ChatGPT credentials or synthesize traffic.
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
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-text-main">Live routing floor</h2>
              <p className="text-xs text-text-muted">
                Original OmniRoute visualization inspired by event-driven agent floors; no third-party pixel-art assets are used.
              </p>
            </div>
            <Link href="/dashboard/combos/live" className="text-xs text-primary hover:underline">
              open Combo Studio
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-5">
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
            />
          )}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Recent routing</h2>
            <span className="text-[11px] text-text-muted">
              last {Math.min(completedRequests.length, 6)} completed
            </span>
          </div>
          <div className="space-y-2">
            {completedRequests.slice(0, 6).map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-bg-subtle/30 px-3 py-2 text-xs"
              >
                <ProviderIcon providerId={request.provider} size={16} type="color" />
                <span className="min-w-0 flex-1 truncate text-text-main">
                  {request.provider} · {request.model}
                </span>
                <span
                  className={request.status === "success" ? "text-emerald-500" : "text-red-500"}
                >
                  {request.status}
                </span>
              </div>
            ))}
            {completedRequests.length === 0 && (
              <div className="py-6 text-center text-xs text-text-muted">
                No completed live requests observed in this session yet.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-main">Recent fallback cascade</h2>
            <Link
              href="/dashboard/analytics/compression"
              className="text-[11px] text-primary hover:underline"
            >
              compression analytics
            </Link>
          </div>
          <div className="space-y-2">
            {recentCombo.map((event, index) => (
              <div
                key={`${event.comboName}-${event.timestamp}-${index}`}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-bg-subtle/30 px-3 py-2 text-xs"
              >
                <span
                  className={`size-2 rounded-full ${
                    event.type === "succeeded"
                      ? "bg-emerald-500"
                      : event.type === "failed"
                        ? "bg-red-500"
                        : "animate-pulse bg-amber-500"
                  }`}
                />
                <span className="min-w-0 flex-1 truncate text-text-main">
                  {event.comboName} → {event.provider}/{event.model}
                </span>
                <span className="text-text-muted">{event.type}</span>
              </div>
            ))}
            {recentCombo.length === 0 && (
              <div className="py-6 text-center text-xs text-text-muted">
                No combo cascade events observed in this session yet.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
