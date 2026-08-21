"use client";

import { useMemo } from "react";

import { useLiveDashboard } from "@/hooks/useLiveDashboard";
import {
  deriveOperationsFloorSystemSignals,
  type OperationsFloorAuthSignal,
  type OperationsFloorCompressionSignal,
  type OperationsFloorSystemSignals,
} from "./operationsFloorSystemSignals";

export function useOperationsFloorSystemTelemetry(simulationMode: boolean) {
  const { connection, events } = useLiveDashboard({
    enabled: !simulationMode,
    channels: ["credentials", "compression"],
  });

  const signals = useMemo<OperationsFloorSystemSignals>(
    () => simulationMode ? { auth: null, compression: null } : deriveOperationsFloorSystemSignals(events),
    [events, simulationMode]
  );

  return { connection, events, signals };
}

export type OperationsFloorSystemTelemetryState = ReturnType<typeof useOperationsFloorSystemTelemetry>;

function AuthSignal({ signal }: { signal: OperationsFloorAuthSignal | null }) {
  return (
    <div className="min-w-0 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.035] px-2.5 py-2">
      <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-500">
        <span className="material-symbols-outlined text-[14px]">shield_lock</span>
        Auth Keeper signal
      </div>
      <div className="mt-1 truncate text-[10px] text-text-main">
        {signal?.provider ? `${signal.provider}${signal.newStatus ? ` · ${signal.newStatus}` : ""}` : "Awaiting credential health event"}
      </div>
      <div className="mt-0.5 truncate font-mono text-[8px] text-text-muted">
        {signal
          ? signal.oldStatus && signal.newStatus
            ? `${signal.oldStatus} → ${signal.newStatus}`
            : "credential.health.changed observed"
          : "live evidence only · no inferred refresh state"}
      </div>
    </div>
  );
}

function CompressionSignal({ signal }: { signal: OperationsFloorCompressionSignal | null }) {
  let headline = "Awaiting compression event";
  let detail = "RTK · Caveman · stacked pipeline evidence";

  if (signal) {
    if (signal.event === "compression.completed") {
      headline = `${signal.mode || "compression"}${signal.savingsPercent !== null ? ` · ${Math.round(signal.savingsPercent)}% observed` : ""}`;
      detail = signal.originalTokens !== null && signal.compressedTokens !== null
        ? `${signal.originalTokens.toLocaleString()} → ${signal.compressedTokens.toLocaleString()} tokens`
        : "compression.completed observed";
    } else {
      headline = `${signal.engine || signal.mode || "compression"}${signal.state ? ` · ${signal.state}` : ""}`;
      detail = signal.stepIndex !== null && signal.totalSteps !== null
        ? `step ${signal.stepIndex + 1}/${signal.totalSteps} · compression.step`
        : "compression.step observed";
    }
  }

  return (
    <div className="min-w-0 rounded-lg border border-violet-500/15 bg-violet-500/[0.035] px-2.5 py-2">
      <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-violet-400">
        <span className="material-symbols-outlined text-[14px]">compress</span>
        Compression signal
      </div>
      <div className="mt-1 truncate text-[10px] text-text-main">{headline}</div>
      <div className="mt-0.5 truncate font-mono text-[8px] text-text-muted">{detail}</div>
    </div>
  );
}

export default function OperationsFloorSystemTelemetry({
  simulationMode,
  telemetry,
}: {
  simulationMode: boolean;
  telemetry: OperationsFloorSystemTelemetryState;
}) {
  if (simulationMode) {
    return (
      <div className="rounded-lg border border-violet-500/20 bg-violet-500/[0.035] px-3 py-2 text-[10px] text-violet-300/80">
        Live Auth Keeper and compression telemetry is paused in the local zero-call simulation so scenario evidence stays isolated.
      </div>
    );
  }

  const { connection, events, signals } = telemetry;

  return (
    <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
      <AuthSignal signal={signals.auth} />
      <CompressionSignal signal={signals.compression} />
      <div className="flex min-w-[128px] items-center gap-2 rounded-lg border border-border bg-bg-subtle/20 px-2.5 py-2">
        <span className={`size-2 shrink-0 rounded-full ${connection.isConnected ? "bg-emerald-500" : connection.isConnecting ? "bg-amber-500 animate-pulse" : "bg-red-500"}`} />
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-text-muted">System stream</div>
          <div className="mt-0.5 text-[10px] text-text-main">
            {connection.isConnected ? "live" : connection.isConnecting ? "connecting" : "disconnected"}
          </div>
          <div className="font-mono text-[8px] text-text-muted">{events.length} retained event{events.length === 1 ? "" : "s"}</div>
        </div>
      </div>
    </div>
  );
}
