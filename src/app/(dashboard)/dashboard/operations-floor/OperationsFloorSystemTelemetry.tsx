"use client";

import { useMemo } from "react";

import { useLiveDashboard, type WsEventPayload } from "@/hooks/useLiveDashboard";

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

function latestEvent(events: WsEventPayload[], predicate: (event: WsEventPayload) => boolean) {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    if (predicate(events[index])) return events[index];
  }
  return null;
}

function AuthSignal({ event }: { event: WsEventPayload | null }) {
  const data = asRecord(event?.data);
  const provider = asText(data?.provider);
  const oldStatus = asText(data?.oldStatus);
  const newStatus = asText(data?.newStatus);

  return (
    <div className="min-w-0 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.035] px-2.5 py-2">
      <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-500">
        <span className="material-symbols-outlined text-[14px]">shield_lock</span>
        Auth Keeper signal
      </div>
      <div className="mt-1 truncate text-[10px] text-text-main">
        {event && provider ? `${provider}${newStatus ? ` · ${newStatus}` : ""}` : "Awaiting credential health event"}
      </div>
      <div className="mt-0.5 truncate font-mono text-[8px] text-text-muted">
        {event
          ? oldStatus && newStatus
            ? `${oldStatus} → ${newStatus}`
            : "credential.health.changed observed"
          : "live evidence only · no inferred refresh state"}
      </div>
    </div>
  );
}

function CompressionSignal({ event }: { event: WsEventPayload | null }) {
  const data = asRecord(event?.data);
  const mode = asText(data?.mode);
  const engine = asText(data?.engine);
  const state = asText(data?.state);
  const savings = asNumber(data?.savingsPercent);
  const stepIndex = asNumber(data?.stepIndex);
  const totalSteps = asNumber(data?.totalSteps);
  const completed = event?.event === "compression.completed";

  let headline = "Awaiting compression event";
  let detail = "RTK · Caveman · stacked pipeline evidence";

  if (event) {
    if (completed) {
      headline = `${mode || "compression"}${savings !== null ? ` · ${Math.round(savings)}% observed` : ""}`;
      const original = asNumber(data?.originalTokens);
      const compressed = asNumber(data?.compressedTokens);
      detail = original !== null && compressed !== null
        ? `${original.toLocaleString()} → ${compressed.toLocaleString()} tokens`
        : "compression.completed observed";
    } else {
      headline = `${engine || mode || "compression"}${state ? ` · ${state}` : ""}`;
      detail = stepIndex !== null && totalSteps !== null
        ? `step ${stepIndex + 1}/${totalSteps} · compression.step`
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

export default function OperationsFloorSystemTelemetry({ simulationMode }: { simulationMode: boolean }) {
  const { connection, events } = useLiveDashboard({
    enabled: !simulationMode,
    channels: ["credentials", "compression"],
  });

  const credentialEvent = useMemo(
    () => latestEvent(events, (event) => event.event === "credential.health.changed"),
    [events]
  );
  const compressionEvent = useMemo(
    () => latestEvent(events, (event) => event.channel === "compression"),
    [events]
  );

  if (simulationMode) {
    return (
      <div className="rounded-lg border border-violet-500/20 bg-violet-500/[0.035] px-3 py-2 text-[10px] text-violet-300/80">
        Live Auth Keeper and compression telemetry is paused in the local zero-call simulation so scenario evidence stays isolated.
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
      <AuthSignal event={credentialEvent} />
      <CompressionSignal event={compressionEvent} />
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
