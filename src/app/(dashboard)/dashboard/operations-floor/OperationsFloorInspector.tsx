"use client";

import Link from "next/link";

import ProviderIcon from "@/shared/components/ProviderIcon";
import type { OperationsAttentionItem } from "./operationsFloorModel";
import { isProtectedOpenAiProvider, normalizeOperationsProviderId } from "./operationsFloorModel";

export type OperationsFloorSelection =
  | { kind: "provider"; providerId: string }
  | { kind: "request"; requestId: string }
  | null;

export type OperationsConnectionTestState = {
  status: "running" | "success" | "error";
  message?: string;
  latencyMs?: number;
  testedAt?: string;
};

type InspectorDesk = {
  id: string;
  label: string;
  connections: number;
  connected: number;
  errors: number;
};

type InspectorConnection = {
  id: string;
  provider: string;
  name?: string | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | Date | null;
};

type InspectorRequest = {
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

type InspectorComboEvent = {
  comboName: string;
  provider: string;
  model: string;
  type: "attempt" | "succeeded" | "failed";
  latencyMs?: number;
  error?: string;
  timestamp: number;
};

function fmtNumber(value: number | undefined): string {
  return typeof value === "number" && Number.isFinite(value) ? value.toLocaleString() : "—";
}

function fmtTime(value: number | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function severityClasses(severity: OperationsAttentionItem["severity"]): string {
  if (severity === "error") return "border-red-500/30 bg-red-500/5 text-red-400";
  if (severity === "warning") return "border-amber-500/30 bg-amber-500/5 text-amber-500";
  return "border-primary/30 bg-primary/5 text-primary";
}

function rateLimited(connection: InspectorConnection): boolean {
  if (!connection.rateLimitedUntil) return false;
  const deadline = connection.rateLimitedUntil instanceof Date
    ? connection.rateLimitedUntil.getTime()
    : typeof connection.rateLimitedUntil === "number"
      ? connection.rateLimitedUntil
      : Date.parse(connection.rateLimitedUntil);
  return Number.isFinite(deadline) && deadline > Date.now();
}

function connectedStatus(status: string | null | undefined): boolean {
  return status === "active" || status === "success" || status === "connected";
}

function connectionDot(connection: InspectorConnection, test: OperationsConnectionTestState | undefined) {
  if (test?.status === "running") return "bg-primary animate-pulse";
  if (test?.status === "success") return "bg-emerald-500";
  if (test?.status === "error") return "bg-red-500";
  if (connectedStatus(connection.testStatus)) return "bg-emerald-500";
  if (connection.testStatus) return "bg-amber-500";
  return "bg-text-muted";
}

export default function OperationsFloorInspector({
  selection,
  desks,
  connections,
  requests,
  comboEvents,
  attention,
  connectionTests,
  simulationMode = false,
  onSelectProvider,
  onSelectRequest,
  onTestConnection,
  onClear,
}: {
  selection: OperationsFloorSelection;
  desks: InspectorDesk[];
  connections: InspectorConnection[];
  requests: InspectorRequest[];
  comboEvents: InspectorComboEvent[];
  attention: OperationsAttentionItem[];
  connectionTests: Record<string, OperationsConnectionTestState>;
  simulationMode?: boolean;
  onSelectProvider: (providerId: string) => void;
  onSelectRequest: (requestId: string) => void;
  onTestConnection: (connectionId: string) => void;
  onClear: () => void;
}) {
  const header = (
    <div className="flex items-center justify-between gap-2 border-b border-border px-3.5 py-2.5">
      <div>
        <div className="text-[10px] uppercase tracking-[0.12em] text-text-muted">Inspector</div>
        <div className="mt-0.5 text-sm font-semibold text-text-main">
          {selection?.kind === "provider"
            ? "Provider details"
            : selection?.kind === "request"
              ? "Request evidence"
              : "Operations summary"}
        </div>
      </div>
      {selection && (
        <button onClick={onClear} className="text-xs text-text-muted hover:text-text-main">
          clear
        </button>
      )}
    </div>
  );

  if (selection?.kind === "provider") {
    const providerId = normalizeOperationsProviderId(selection.providerId);
    const desk = desks.find((candidate) => candidate.id === providerId);
    const providerConnections = connections.filter(
      (connection) => normalizeOperationsProviderId(connection.provider) === providerId
    );
    const limited = providerConnections.filter(rateLimited).length;
    const recent = requests
      .filter((request) => normalizeOperationsProviderId(request.provider) === providerId)
      .slice(0, 5);

    return (
      <aside className="h-full overflow-hidden rounded-xl border border-border bg-bg">
        {header}
        <div className="max-h-[445px] space-y-3 overflow-auto p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-bg-subtle/40">
              <ProviderIcon providerId={providerId} size={22} type="color" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-text-main">{desk?.label || providerId}</div>
              <div className="text-[11px] text-text-muted">
                {isProtectedOpenAiProvider(providerId) ? "protected OpenAI lane" : "primary provider lane"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <Metric label="connections" value={desk?.connections ?? providerConnections.length} />
            <Metric label="ready" value={desk?.connected ?? 0} tone="good" />
            <Metric label="errors" value={desk?.errors ?? 0} tone={(desk?.errors ?? 0) > 0 ? "bad" : "normal"} />
          </div>

          {limited > 0 && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-[11px] text-amber-500">
              {limited} connection{limited === 1 ? " is" : "s are"} currently rate limited.
            </div>
          )}

          <section>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">
              Connections · explicit checks only
            </div>
            <div className="space-y-1.5">
              {providerConnections.slice(0, 6).map((connection) => {
                const test = connectionTests[connection.id];
                return (
                  <div key={connection.id} className="rounded-lg border border-border/70 px-2.5 py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`size-1.5 shrink-0 rounded-full ${connectionDot(connection, test)}`} />
                      <span className="min-w-0 flex-1 truncate text-text-main">{connection.name || connection.id}</span>
                      <span className="text-[9px] text-text-muted">{connection.testStatus || "unknown"}</span>
                      <button
                        type="button"
                        disabled={test?.status === "running"}
                        onClick={() => onTestConnection(connection.id)}
                        className="rounded-md border border-border px-2 py-1 text-[10px] font-medium text-primary transition hover:border-primary/40 disabled:cursor-wait disabled:opacity-50"
                      >
                        {test?.status === "running" ? "Testing…" : "Test"}
                      </button>
                    </div>
                    {test && test.status !== "running" && (
                      <div className={`mt-1.5 pl-3.5 text-[10px] leading-4 ${test.status === "success" ? "text-emerald-500" : "text-red-400"}`}>
                        {test.status === "success" ? "Connection test passed" : test.message || "Connection test failed"}
                        {test.latencyMs !== undefined ? ` · ${test.latencyMs.toLocaleString()} ms` : ""}
                      </div>
                    )}
                  </div>
                );
              })}
              {providerConnections.length === 0 && (
                <div className="text-xs text-text-muted">No matching connection records.</div>
              )}
            </div>
          </section>

          <section>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">
              Recent requests
            </div>
            <div className="space-y-1.5">
              {recent.map((request) => (
                <button
                  key={request.id}
                  onClick={() => onSelectRequest(request.id)}
                  className="flex w-full items-center gap-2 rounded-lg border border-border/70 px-2.5 py-2 text-left text-xs transition hover:border-primary/40"
                >
                  <span className={`size-1.5 rounded-full ${request.status === "error" ? "bg-red-500" : request.status === "success" ? "bg-emerald-500" : "bg-primary"}`} />
                  <span className="min-w-0 flex-1 truncate text-text-main">{request.model || "unknown model"}</span>
                  <span className="text-[10px] text-text-muted">{fmtTime(request.timestamp)}</span>
                </button>
              ))}
              {recent.length === 0 && <div className="text-xs text-text-muted">No observed requests for this provider.</div>}
            </div>
          </section>

          <Link
            href={`/dashboard/providers/${encodeURIComponent(providerId)}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            open provider configuration
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </Link>
        </div>
      </aside>
    );
  }

  if (selection?.kind === "request") {
    const request = requests.find((candidate) => candidate.id === selection.requestId);
    if (!request) {
      return (
        <aside className="h-full overflow-hidden rounded-xl border border-border bg-bg">
          {header}
          <div className="p-4 text-xs text-text-muted">That request is no longer retained in the live session buffer.</div>
        </aside>
      );
    }

    const relatedCombos = comboEvents
      .filter((event) => request.comboName && event.comboName === request.comboName)
      .slice(0, 8);

    return (
      <aside className="h-full overflow-hidden rounded-xl border border-border bg-bg">
        {header}
        <div className="max-h-[445px] space-y-3 overflow-auto p-3.5">
          <div className="flex items-center gap-3">
            <ProviderIcon providerId={request.provider} size={24} type="color" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-text-main">{request.provider} · {request.model}</div>
              <div className="truncate text-[10px] text-text-muted">{request.id}</div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${request.status === "error" ? "bg-red-500/10 text-red-400" : request.status === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary"}`}>
              {request.status}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            <Fact label="started" value={fmtTime(request.timestamp)} />
            <Fact label="latency" value={request.latencyMs !== undefined ? `${request.latencyMs.toLocaleString()} ms` : "—"} />
            <Fact label="input tokens" value={fmtNumber(request.tokensInput)} />
            <Fact label="output tokens" value={fmtNumber(request.tokensOutput)} />
            <Fact label="combo" value={request.comboName || "direct"} />
            <Fact label="lane" value={isProtectedOpenAiProvider(request.provider) ? "protected" : "primary"} />
          </dl>

          {request.error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-400">
              <div className="mb-1 font-semibold">Observed error</div>
              <div className="break-words text-red-300/90">{request.error}</div>
            </div>
          )}

          {relatedCombos.length > 0 && (
            <section>
              <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">
                Combo evidence
              </div>
              <div className="space-y-1.5">
                {[...relatedCombos].reverse().map((event, index) => (
                  <div key={`${event.timestamp}-${index}`} className="flex items-center gap-2 rounded-lg border border-border/70 px-2.5 py-2 text-xs">
                    <span className={`size-1.5 rounded-full ${event.type === "failed" ? "bg-red-500" : event.type === "succeeded" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    <span className="min-w-0 flex-1 truncate text-text-main">
                      {event.type} → {event.provider}/{event.model}
                    </span>
                    <span className="text-[10px] text-text-muted">{fmtTime(event.timestamp)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={() => onSelectProvider(request.provider)} className="text-xs font-medium text-primary hover:underline">
              inspect provider
            </button>
            {request.comboName && (
              <Link href="/dashboard/combos/live" className="text-xs font-medium text-primary hover:underline">
                open Combo Studio
              </Link>
            )}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-full overflow-hidden rounded-xl border border-border bg-bg">
      {header}
      <div className="max-h-[445px] space-y-3 overflow-auto p-3.5">
        <div className="rounded-lg border border-border bg-bg-subtle/30 p-3 text-[11px] leading-5 text-text-muted">
          Select a provider desk, request, or {simulationMode ? "scenario evidence item" : "attention item"}. Provider connection tests are available only after selecting a configured provider and run only when you click Test.
        </div>

        <section>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">{simulationMode ? "Scenario evidence" : "Needs attention"}</div>
            <span className="text-[10px] text-text-muted">{attention.length}</span>
          </div>
          <div className="space-y-2">
            {attention.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.requestId) onSelectRequest(item.requestId);
                  else if (item.provider) onSelectProvider(item.provider);
                }}
                disabled={!item.requestId && !item.provider}
                className={`w-full rounded-lg border p-2.5 text-left transition hover:brightness-110 ${severityClasses(item.severity)}`}
              >
                <div className="text-xs font-semibold">{item.title}</div>
                <div className="mt-1 text-[11px] leading-4 opacity-80">{item.detail}</div>
              </button>
            ))}
            {attention.length === 0 && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-500">
                {simulationMode
                  ? "No scenario evidence has been retained in this step."
                  : "No provider, request, or fallback evidence currently requires attention."}
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">Quick inspect</div>
          <div className="flex flex-wrap gap-2">
            {desks.slice(0, 8).map((desk) => (
              <button
                key={desk.id}
                onClick={() => onSelectProvider(desk.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2 py-1.5 text-[11px] text-text-main transition hover:border-primary/40"
              >
                <ProviderIcon providerId={desk.id} size={14} type="color" />
                {desk.label}
              </button>
            ))}
            {desks.length === 0 && <span className="text-[11px] text-text-muted">No configured provider desks in this data set.</span>}
          </div>
        </section>
      </div>
    </aside>
  );
}

function Metric({ label, value, tone = "normal" }: { label: string; value: number; tone?: "normal" | "good" | "bad" }) {
  const toneClass = tone === "good" ? "text-emerald-500" : tone === "bad" ? "text-red-400" : "text-text-main";
  return (
    <div className="rounded-lg border border-border bg-bg-subtle/30 p-2">
      <div className={`text-lg font-semibold ${toneClass}`}>{value}</div>
      <div className="text-[9px] uppercase tracking-[0.08em] text-text-muted">{label}</div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.08em] text-text-muted">{label}</dt>
      <dd className="mt-0.5 break-words text-text-main">{value}</dd>
    </div>
  );
}
