"use client";

import ProviderIcon from "@/shared/components/ProviderIcon";
import { getOperationsLane } from "./operationsFloorModel";

type SceneDesk = {
  id: string;
  label: string;
  connections: number;
  connected: number;
  errors: number;
};

type SceneRequest = {
  id: string;
  provider?: string | null;
  model?: string | null;
};

type SceneComboEvent = {
  provider?: string | null;
  type: "attempt" | "succeeded" | "failed";
};

function DeskChip({
  desk,
  selected,
  onSelect,
}: {
  desk: SceneDesk;
  selected: boolean;
  onSelect: () => void;
}) {
  const healthy = desk.connected > 0 && desk.errors === 0;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-w-0 items-center gap-2 rounded-lg border bg-bg/90 px-2.5 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 ${
        selected ? "border-primary ring-1 ring-primary/35" : "border-border/80"
      }`}
    >
      <ProviderIcon providerId={desk.id} size={16} type="color" />
      <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-text-main">
        {desk.label}
      </span>
      <span
        className={`size-1.5 shrink-0 rounded-full ${
          desk.errors > 0 ? "bg-red-500" : healthy ? "bg-emerald-500" : "bg-text-muted"
        }`}
      />
    </button>
  );
}

function Packet({
  path,
  request,
  delay,
  protectedLane = false,
}: {
  path: string;
  request: SceneRequest;
  delay: number;
  protectedLane?: boolean;
}) {
  return (
    <circle
      r="6"
      className={`motion-reduce:hidden ${protectedLane ? "fill-amber-500" : "fill-primary"}`}
    >
      <title>{`${request.provider || "provider"}${request.model ? ` · ${request.model}` : ""}`}</title>
      <animateMotion
        dur={protectedLane ? "2.8s" : "2.3s"}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
    </circle>
  );
}

const PRIMARY_PATH = "M 145 164 C 285 164, 330 92, 680 92";
const PROTECTED_PATH = "M 145 164 C 285 164, 340 238, 680 238";
const FALLBACK_PATH = "M 760 126 C 850 145, 850 202, 760 220";

export default function OperationsFloorScene({
  regularDesks,
  protectedDesks,
  activeRequests,
  comboEvents,
  selectedProviderId,
  onSelectProvider,
}: {
  regularDesks: SceneDesk[];
  protectedDesks: SceneDesk[];
  activeRequests: SceneRequest[];
  comboEvents: SceneComboEvent[];
  selectedProviderId?: string | null;
  onSelectProvider: (providerId: string) => void;
}) {
  const primaryRequests = activeRequests
    .filter((request) => getOperationsLane(request.provider) === "primary")
    .slice(0, 5);
  const protectedRequests = activeRequests
    .filter((request) => getOperationsLane(request.provider) === "protected")
    .slice(0, 4);
  const protectedFallbackActive = comboEvents.some(
    (event) => event.type === "attempt" && getOperationsLane(event.provider) === "protected"
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-subtle/20">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative hidden min-h-[390px] lg:block">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 1000 330"
          preserveAspectRatio="none"
        >
          <path
            d={PRIMARY_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="text-primary/35"
          />
          <path
            d={PROTECTED_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="text-amber-500/35"
          />
          <path
            d={FALLBACK_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 8"
            className="text-amber-500/30"
          />

          {primaryRequests.map((request, index) => (
            <Packet
              key={`primary-${request.id}`}
              path={PRIMARY_PATH}
              request={request}
              delay={index * 0.25}
            />
          ))}
          {protectedRequests.map((request, index) => (
            <Packet
              key={`protected-${request.id}`}
              path={PROTECTED_PATH}
              request={request}
              delay={index * 0.32}
              protectedLane
            />
          ))}
          {protectedFallbackActive && (
            <circle r="5" className="fill-amber-500 motion-reduce:hidden">
              <animateMotion dur="1.4s" repeatCount="indefinite" path={FALLBACK_PATH} />
            </circle>
          )}
        </svg>

        <div className="absolute left-[3%] top-1/2 w-[15%] -translate-y-1/2 rounded-2xl border border-border bg-bg/95 p-3 shadow-md">
          <div className="mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">terminal</span>
            <div>
              <div className="text-xs font-semibold text-text-main">Clients</div>
              <div className="text-[10px] text-text-muted">Codex · IDE · API</div>
            </div>
          </div>
          <div className="text-[10px] leading-4 text-text-muted">
            Live packets appear only while OmniRoute has an in-flight request.
          </div>
        </div>

        <div className="absolute left-[31%] top-1/2 w-[22%] -translate-y-1/2 rounded-2xl border-2 border-primary/45 bg-primary/8 p-4 text-center shadow-lg">
          <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <span className="material-symbols-outlined">route</span>
          </div>
          <div className="text-sm font-semibold text-text-main">OmniRoute Dispatch</div>
          <div className="mt-1 text-[10px] text-text-muted">route · retry · cascade</div>
          {activeRequests.length > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white">
              <span className="size-1.5 animate-pulse rounded-full bg-white" />
              {activeRequests.length} in flight
            </div>
          )}
        </div>

        <section className="absolute right-[3%] top-[7%] w-[29%] rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-text-main">Primary provider floor</span>
            </div>
            <span className="text-[10px] text-text-muted">{regularDesks.length} desks</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {regularDesks.slice(0, 6).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
          </div>
          {regularDesks.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-3 text-center text-[10px] text-text-muted">
              No primary provider connections configured.
            </div>
          )}
          {regularDesks.length > 6 && (
            <div className="mt-2 text-right text-[10px] text-text-muted">
              +{regularDesks.length - 6} more providers
            </div>
          )}
        </section>

        <section className="absolute bottom-[7%] right-[3%] w-[29%] rounded-2xl border border-amber-500/35 bg-amber-500/5 p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[17px] text-amber-500">shield_lock</span>
              <span className="text-xs font-semibold text-text-main">Protected OpenAI lane</span>
            </div>
            {protectedFallbackActive && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-medium text-amber-500">
                fallback active
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {protectedDesks.slice(0, 3).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-amber-500/45 bg-bg/90 px-2.5 py-2">
              <span className="material-symbols-outlined text-[16px] text-amber-500">terminal</span>
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-text-main">
                ChatGPT Plus · Codex
              </span>
              <span className="size-1.5 rounded-full bg-amber-500" />
            </div>
          </div>
          <div className="mt-2 text-[10px] leading-4 text-text-muted">
            Subscription-backed Codex remains reserved; the supported-client bridge is not enabled yet.
          </div>
        </section>
      </div>

      <div className="relative grid gap-4 p-4 lg:hidden">
        <div className="rounded-xl border-2 border-primary/40 bg-primary/8 p-4 text-center">
          <div className="font-semibold text-text-main">OmniRoute Dispatch</div>
          <div className="mt-1 text-xs text-text-muted">{activeRequests.length} request(s) in flight</div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold text-text-main">Primary provider floor</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {regularDesks.slice(0, 8).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-amber-500/35 bg-amber-500/5 p-3">
          <div className="mb-2 text-xs font-semibold text-text-main">Protected OpenAI lane</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {protectedDesks.slice(0, 4).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
            <div className="rounded-lg border border-dashed border-amber-500/45 bg-bg/90 px-3 py-2 text-[11px] text-text-main">
              ChatGPT Plus · Codex · bridge pending
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-border bg-bg/70 px-4 py-2 text-[10px] text-text-muted">
        <span>Animated packets = actual in-flight WebSocket request events.</span>
        <span>Click a desk to inspect its observed state.</span>
      </div>
    </div>
  );
}
