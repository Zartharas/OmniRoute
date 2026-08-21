"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Card } from "@/shared/components";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { useLiveComboStatus, useLiveRequests } from "@/hooks/useLiveDashboard";
import {
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} from "@/shared/utils/providerConnectionStatus";
import OperationsFloorInspector, {
  type OperationsConnectionTestState,
  type OperationsFloorSelection,
} from "../OperationsFloorInspector";
import {
  buildOperationsAttentionItems,
  isProtectedOpenAiProvider,
  normalizeOperationsProviderId,
} from "../operationsFloorModel";
import OperationsFloorTiledOffice, { type PixelOfficeDesk } from "./OperationsFloorTiledOffice";

type ProviderConnection = {
  id: string;
  provider: string;
  name?: string | null;
  isActive?: boolean | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | Date | null;
};

type ProviderTestResponse = {
  valid?: boolean;
  error?: string | null;
  latencyMs?: number;
  testedAt?: string;
  diagnosis?: { message?: string | null } | null;
};

function providerLabel(providerId: string): string {
  const config = (AI_PROVIDERS as Record<string, { name?: string }>)[providerId];
  return config?.name || providerId;
}

export default function PixelOfficePreviewClient() {
  const [connections, setConnections] = useState<ProviderConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<OperationsFloorSelection>(null);
  const [tests, setTests] = useState<Record<string, OperationsConnectionTestState>>({});
  const { activeRequests, completedRequests, isConnected, reconnect } = useLiveRequests();
  const { comboEvents } = useLiveComboStatus();

  const loadProviders = useCallback(async () => {
    try {
      const response = await fetch("/api/providers?limit=1000", { cache: "no-store" });
      const body = response.ok ? await response.json() : {};
      setConnections(Array.isArray(body?.connections) ? body.connections : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProviders();
    const timer = window.setInterval(() => void loadProviders(), 15_000);
    return () => window.clearInterval(timer);
  }, [loadProviders]);

  const desks = useMemo<PixelOfficeDesk[]>(() => {
    const grouped = new Map<string, PixelOfficeDesk>();
    for (const connection of connections) {
      const id = normalizeOperationsProviderId(connection.provider);
      if (!id) continue;
      const desk = grouped.get(id) ?? {
        id,
        label: providerLabel(id),
        connections: 0,
        connected: 0,
        errors: 0,
      };
      desk.connections += 1;
      if (isProviderConnectionConnected(connection)) desk.connected += 1;
      if (isProviderConnectionErrored(connection)) desk.errors += 1;
      grouped.set(id, desk);
    }
    return [...grouped.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [connections]);

  const regularDesks = desks.filter((desk) => !isProtectedOpenAiProvider(desk.id));
  const protectedDesks = desks.filter((desk) => isProtectedOpenAiProvider(desk.id));
  const attention = useMemo(
    () => buildOperationsAttentionItems(connections, completedRequests, comboEvents),
    [connections, completedRequests, comboEvents]
  );
  const requests = useMemo(() => [...activeRequests, ...completedRequests], [activeRequests, completedRequests]);
  const selectedProviderId = selection?.kind === "provider" ? selection.providerId : null;

  const selectProvider = useCallback((providerId: string) => {
    const normalized = normalizeOperationsProviderId(providerId);
    if (normalized) setSelection({ kind: "provider", providerId: normalized });
  }, []);

  const selectRequest = useCallback((requestId: string) => setSelection({ kind: "request", requestId }), []);

  const testConnection = useCallback(async (connectionId: string) => {
    setTests((current) => ({ ...current, [connectionId]: { status: "running" } }));
    try {
      const response = await fetch(`/api/providers/${encodeURIComponent(connectionId)}/test`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      });
      const data = (await response.json().catch(() => ({}))) as ProviderTestResponse;
      const passed = response.ok && data.valid === true;
      setTests((current) => ({
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
      setTests((current) => ({
        ...current,
        [connectionId]: {
          status: "error",
          message: error instanceof Error ? error.message : "Connection test failed",
        },
      }));
    }
  }, [loadProviders]);

  return (
    <div className="space-y-3 pb-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-amber-500">PIXEL OFFICE LAB</span>
            <span className="text-xs text-text-muted">Tiled map runtime preview</span>
          </div>
          <p className="mt-1 max-w-3xl text-[11px] leading-5 text-text-muted">
            Local-only office map, provider seats, real WebSocket request envelopes, zoom, click-to-inspect, and protected Codex station.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 text-text-muted">
            <span className={`size-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
            {isConnected ? "telemetry connected" : "telemetry reconnecting"}
          </span>
          {!isConnected && <button onClick={reconnect} className="text-primary hover:underline">reconnect</button>}
          <Link href="/dashboard/operations-floor" className="text-primary hover:underline">native floor</Link>
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border px-3 py-2 text-[10px] text-text-muted">
            {loading ? "Loading providers…" : `${desks.length} provider desk(s) · ${activeRequests.length} live request(s) · ${attention.length} attention item(s)`}
          </div>
          <div className="p-3">
            <OperationsFloorTiledOffice
              regularDesks={regularDesks}
              protectedDesks={protectedDesks}
              activeRequests={activeRequests}
              comboEvents={comboEvents.slice(0, 16)}
              selectedProviderId={selectedProviderId}
              onSelectProvider={selectProvider}
            />
          </div>
        </Card>

        <OperationsFloorInspector
          selection={selection}
          desks={desks}
          connections={connections}
          requests={requests}
          comboEvents={comboEvents}
          attention={attention}
          connectionTests={tests}
          onSelectProvider={selectProvider}
          onSelectRequest={selectRequest}
          onTestConnection={(connectionId) => void testConnection(connectionId)}
          onClear={() => setSelection(null)}
        />
      </div>
    </div>
  );
}
