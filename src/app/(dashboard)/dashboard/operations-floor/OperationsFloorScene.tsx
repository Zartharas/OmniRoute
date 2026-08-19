"use client";

import type { ReactNode } from "react";
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

type PixelTone = "primary" | "amber" | "emerald" | "muted";

const PIXEL_TONES: Record<PixelTone, { body: string; glow: string; dot: string }> = {
  primary: {
    body: "bg-primary",
    glow: "shadow-[0_0_14px_rgba(244,63,94,0.3)]",
    dot: "bg-primary",
  },
  amber: {
    body: "bg-amber-500",
    glow: "shadow-[0_0_14px_rgba(245,158,11,0.3)]",
    dot: "bg-amber-500",
  },
  emerald: {
    body: "bg-emerald-500",
    glow: "shadow-[0_0_14px_rgba(16,185,129,0.25)]",
    dot: "bg-emerald-500",
  },
  muted: {
    body: "bg-text-muted",
    glow: "",
    dot: "bg-text-muted",
  },
};

function PixelOperator({ tone = "primary", active = false }: { tone?: PixelTone; active?: boolean }) {
  const palette = PIXEL_TONES[tone];
  return (
    <div
      aria-hidden="true"
      className={`relative h-8 w-6 shrink-0 ${active ? "motion-safe:animate-[pulse_1.6s_ease-in-out_infinite]" : ""}`}
    >
      <span className="absolute left-1.5 top-0 size-3 rounded-[2px] border border-black/25 bg-[#f0c7a5]" />
      <span className={`absolute left-1 top-3 h-3.5 w-4 rounded-[2px] ${palette.body} ${palette.glow}`} />
      <span className={`absolute bottom-0 left-1 h-2 w-1.5 rounded-b-[1px] ${palette.body}`} />
      <span className={`absolute bottom-0 right-1 h-2 w-1.5 rounded-b-[1px] ${palette.body}`} />
    </div>
  );
}

function WorkstationShell({ children, tone = "primary" }: { children: ReactNode; tone?: PixelTone }) {
  const palette = PIXEL_TONES[tone];
  return (
    <div className="relative rounded-md border border-black/35 bg-[#17191f]/95 p-2 shadow-[0_4px_0_rgba(0,0,0,0.28)]">
      <div className="absolute -top-1 left-2 right-2 h-1 rounded-t-sm bg-black/35" />
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className={`size-1.5 rounded-full ${palette.dot}`} />
        <span className="h-1 flex-1 rounded-full bg-white/5" />
      </div>
      {children}
    </div>
  );
}

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
  const tone: PixelTone = desk.errors > 0 ? "amber" : healthy ? "emerald" : "muted";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group min-w-0 rounded-lg border p-1.5 text-left transition motion-safe:hover:-translate-y-0.5 ${
        selected
          ? "border-primary bg-primary/10 ring-1 ring-primary/35"
          : "border-white/10 bg-black/15 hover:border-primary/45"
      }`}
    >
      <WorkstationShell tone={tone}>
        <div className="flex min-w-0 items-end gap-2">
          <PixelOperator tone={tone} active={healthy} />
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex h-6 items-center gap-1.5 rounded-sm border border-white/10 bg-black/50 px-1.5">
              <ProviderIcon providerId={desk.id} size={14} type="color" />
              <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-white/90">
                {desk.label}
              </span>
            </div>
            <div className="flex items-center justify-between gap-1 text-[8px] text-white/45">
              <span>{desk.connected}/{desk.connections} ready</span>
              {desk.errors > 0 && <span className="text-amber-400">{desk.errors} err</span>}
            </div>
          </div>
        </div>
      </WorkstationShell>
    </button>
  );
}

function VacantDesk({ index }: { index: number }) {
  return (
    <div className="rounded-lg border border-dashed border-white/8 bg-black/10 p-1.5 opacity-60">
      <WorkstationShell tone="muted">
        <div className="flex items-end gap-2">
          <div className="h-8 w-6 shrink-0 rounded-sm border border-dashed border-white/10" />
          <div className="min-w-0 flex-1">
            <div className="flex h-6 items-center justify-center rounded-sm border border-white/5 bg-black/30 text-[8px] text-white/25">
              VACANT {String(index).padStart(2, "0")}
            </div>
            <div className="mt-1 h-1 rounded-full bg-white/5" />
          </div>
        </div>
      </WorkstationShell>
    </div>
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
  const stroke = protectedLane ? "#f59e0b" : "#f43f5e";
  return (
    <g className="motion-reduce:hidden">
      <title>{`${request.provider || "provider"}${request.model ? ` · ${request.model}` : ""}`}</title>
      <rect x="-7" y="-5" width="14" height="10" rx="2" fill={stroke} opacity="0.95" />
      <path d="M-5 -2 L0 1.5 L5 -2" fill="none" stroke="white" strokeWidth="1.1" opacity="0.85" />
      <animateMotion
        dur={protectedLane ? "2.8s" : "2.3s"}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
    </g>
  );
}

const PRIMARY_PATH = "M 150 230 C 285 230, 355 130, 680 130";
const PROTECTED_PATH = "M 150 230 C 300 230, 360 345, 710 345";
const FALLBACK_PATH = "M 800 170 C 890 190, 895 290, 800 315";

function ZoneLabel({ icon, title, detail }: { icon: string; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-[15px] text-white/65">{icon}</span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">{title}</div>
        <div className="text-[8px] text-white/35">{detail}</div>
      </div>
    </div>
  );
}

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
  const vacantCount = Math.max(0, 4 - regularDesks.slice(0, 6).length);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-[#0d1016] shadow-inner">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(45deg, rgba(244,63,94,0.018) 25%, transparent 25%, transparent 75%, rgba(244,63,94,0.018) 75%)",
          backgroundSize: "18px 18px, 18px 18px, 36px 36px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.05] to-transparent" />

      <div className="relative hidden min-h-[520px] lg:block">
        <div className="absolute left-4 top-3 z-20 flex items-center gap-3 rounded-md border border-white/8 bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[9px] font-semibold tracking-[0.16em] text-white/65">
            OMNIROUTE OPS // LIVE FLOOR
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="flex items-center gap-1 text-[8px] text-white/40">
            <span className={`size-1.5 rounded-full ${activeRequests.length > 0 ? "bg-emerald-400 motion-safe:animate-pulse" : "bg-white/20"}`} />
            {activeRequests.length > 0 ? `${activeRequests.length} ACTIVE` : "IDLE"}
          </span>
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 size-full"
          viewBox="0 0 1000 470"
          preserveAspectRatio="none"
        >
          <path d={PRIMARY_PATH} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="7 9" opacity="0.24" />
          <path d={PROTECTED_PATH} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="7 9" opacity="0.3" />
          <path d={FALLBACK_PATH} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 8" opacity="0.22" />

          {primaryRequests.map((request, index) => (
            <Packet key={`primary-${request.id}`} path={PRIMARY_PATH} request={request} delay={index * 0.25} />
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
            <g className="motion-reduce:hidden">
              <circle r="5" fill="#f59e0b" />
              <circle r="9" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.35" />
              <animateMotion dur="1.4s" repeatCount="indefinite" path={FALLBACK_PATH} />
            </g>
          )}
        </svg>

        <section className="absolute left-[2.5%] top-[30%] z-20 w-[15%] rounded-lg border border-cyan-400/15 bg-[#111722]/95 p-3 shadow-[0_8px_25px_rgba(0,0,0,0.28)]">
          <ZoneLabel icon="terminal" title="Ingress bay" detail="Codex · IDE · API" />
          <div className="mt-3 rounded-md border border-cyan-400/10 bg-black/30 p-2">
            <div className="mb-2 flex items-center gap-2">
              <PixelOperator tone="primary" active={activeRequests.length > 0} />
              <div className="min-w-0 flex-1">
                <div className="h-5 rounded-sm border border-cyan-400/15 bg-[#07141b] px-1.5 font-mono text-[8px] leading-5 text-cyan-300/70">
                  REQUEST QUEUE
                </div>
                <div className="mt-1 flex items-center justify-between text-[8px] text-white/35">
                  <span>in flight</span>
                  <span className="font-mono text-white/65">{activeRequests.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="absolute left-[25%] top-[28%] z-20 w-[22%] rounded-xl border-2 border-primary/35 bg-[#17121a]/95 p-4 shadow-[0_12px_35px_rgba(244,63,94,0.1)]">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 shadow-[0_0_20px_rgba(244,63,94,0.12)]">
              <span className="material-symbols-outlined text-primary">route</span>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary/70">Dispatch core</div>
              <div className="text-sm font-semibold text-white/90">OmniRoute Router</div>
              <div className="text-[9px] text-white/35">classify · route · retry · cascade</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              ["route", "ROUTE"],
              ["sync_alt", "RETRY"],
              ["account_tree", "CASCADE"],
            ].map(([icon, label]) => (
              <div key={label} className="rounded border border-white/7 bg-black/20 px-1 py-1.5 text-center">
                <span className="material-symbols-outlined block text-[14px] text-primary/60">{icon}</span>
                <span className="font-mono text-[7px] text-white/35">{label}</span>
              </div>
            ))}
          </div>
          {activeRequests.length > 0 && (
            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-md border border-primary/25 bg-primary/10 py-1.5 font-mono text-[8px] font-semibold text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              {activeRequests.length} PACKET{activeRequests.length === 1 ? "" : "S"} ROUTING
            </div>
          )}
        </section>

        <section className="absolute bottom-[7%] left-[22%] z-20 w-[15%] rounded-lg border border-violet-400/15 bg-[#14121d]/95 p-3">
          <ZoneLabel icon="compress" title="Compression bay" detail="RTK · Caveman · context" />
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["RTK", "CAVE", "CTX"].map((label) => (
              <div key={label} className="rounded-sm border border-violet-400/10 bg-black/25 py-1 text-center font-mono text-[7px] text-violet-300/55">
                {label}
              </div>
            ))}
          </div>
        </section>

        <section className="absolute bottom-[7%] left-[39%] z-20 w-[14%] rounded-lg border border-emerald-400/15 bg-[#101a17]/95 p-3">
          <ZoneLabel icon="shield_lock" title="Auth Keeper" detail="refresh · health · recovery" />
          <div className="mt-2 flex items-center gap-2 rounded-md border border-emerald-400/10 bg-black/25 p-2">
            <PixelOperator tone="muted" />
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[8px] text-white/50">INTEGRATION POINT</div>
              <div className="mt-1 rounded-sm border border-dashed border-white/10 px-1 py-0.5 font-mono text-[7px] text-white/25">
                LIVE STATE NOT WIRED
              </div>
            </div>
          </div>
        </section>

        <section className="absolute right-[2.5%] top-[7%] z-20 w-[38%] rounded-xl border border-emerald-400/18 bg-[#101715]/95 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.24)]">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <ZoneLabel icon="dns" title="Provider bullpen" detail="primary routing pool" />
            <span className="rounded-sm border border-emerald-400/15 bg-emerald-400/5 px-1.5 py-1 font-mono text-[8px] text-emerald-300/65">
              {regularDesks.length} DESKS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {regularDesks.slice(0, 6).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
            {Array.from({ length: vacantCount }, (_, index) => (
              <VacantDesk key={`vacant-${index}`} index={regularDesks.length + index + 1} />
            ))}
          </div>
          {regularDesks.length === 0 && (
            <div className="mt-2 text-center font-mono text-[8px] text-white/30">
              No primary provider connections configured in this preview data set.
            </div>
          )}
          {regularDesks.length > 6 && (
            <div className="mt-2 text-right font-mono text-[8px] text-white/35">
              +{regularDesks.length - 6} MORE DESKS OFF FLOOR
            </div>
          )}
        </section>

        <section className="absolute bottom-[7%] right-[2.5%] z-20 w-[38%] rounded-xl border border-amber-400/25 bg-[#1b1710]/95 p-3 shadow-[0_8px_30px_rgba(245,158,11,0.06)]">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <ZoneLabel icon="encrypted" title="OpenAI vault" detail="protected subscription lane" />
            {protectedFallbackActive ? (
              <span className="rounded-sm border border-amber-400/25 bg-amber-400/10 px-1.5 py-1 font-mono text-[8px] text-amber-300">
                FALLBACK ACTIVE
              </span>
            ) : (
              <span className="rounded-sm border border-amber-400/12 px-1.5 py-1 font-mono text-[8px] text-amber-300/45">
                RESERVED
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {protectedDesks.slice(0, 2).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
            <div className="rounded-lg border border-amber-400/18 bg-amber-400/[0.035] p-1.5">
              <WorkstationShell tone="amber">
                <div className="flex items-end gap-2">
                  <PixelOperator tone="amber" active={protectedRequests.length > 0 || protectedFallbackActive} />
                  <div className="min-w-0 flex-1">
                    <div className="flex h-6 items-center gap-1 rounded-sm border border-amber-400/15 bg-black/45 px-1.5">
                      <span className="material-symbols-outlined text-[13px] text-amber-400">terminal</span>
                      <span className="truncate text-[8px] font-semibold text-amber-100/85">ChatGPT Plus · Codex</span>
                    </div>
                    <div className="mt-1 font-mono text-[7px] text-amber-200/35">SUPPORTED BRIDGE PENDING</div>
                  </div>
                </div>
              </WorkstationShell>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 font-mono text-[8px] leading-4 text-amber-100/35">
            <span className="material-symbols-outlined text-[12px] text-amber-400/55">policy</span>
            Reserved for hard reasoning and fallback; observed traffic only, no invented savings.
          </div>
        </section>

        <div className="pointer-events-none absolute bottom-[3%] left-[3%] z-20 flex items-center gap-2 font-mono text-[7px] text-white/25">
          <span className="inline-block size-1 rounded-full bg-primary" />
          LIVE REQUEST ENVELOPES
          <span className="ml-2 inline-block size-1 rounded-full bg-amber-500" />
          PROTECTED LANE
        </div>
      </div>

      <div className="relative grid gap-4 p-4 lg:hidden">
        <div className="rounded-xl border border-primary/25 bg-[#17121a] p-4">
          <div className="flex items-center gap-3">
            <PixelOperator tone="primary" active={activeRequests.length > 0} />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary/70">Dispatch core</div>
              <div className="font-semibold text-white/90">OmniRoute Router</div>
              <div className="text-xs text-white/35">{activeRequests.length} request(s) in flight</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-400/15 bg-[#101715] p-3">
          <div className="mb-2 text-xs font-semibold text-white/80">Provider bullpen</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {regularDesks.slice(0, 8).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
            {regularDesks.length === 0 && <VacantDesk index={1} />}
          </div>
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-[#1b1710] p-3">
          <div className="mb-2 text-xs font-semibold text-amber-100/80">OpenAI vault</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {protectedDesks.slice(0, 4).map((desk) => (
              <DeskChip
                key={desk.id}
                desk={desk}
                selected={selectedProviderId === desk.id}
                onSelect={() => onSelectProvider(desk.id)}
              />
            ))}
            <div className="rounded-lg border border-dashed border-amber-400/25 bg-black/20 px-3 py-2 font-mono text-[9px] text-amber-100/55">
              ChatGPT Plus · Codex · supported bridge pending
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-violet-400/15 bg-[#14121d] p-3 text-[10px] text-violet-200/55">
            Compression Bay · RTK / Caveman
          </div>
          <div className="rounded-lg border border-emerald-400/15 bg-[#101a17] p-3 text-[10px] text-emerald-200/55">
            Auth Keeper · integration point
          </div>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-white/8 bg-black/25 px-4 py-2 font-mono text-[8px] text-white/30">
        <span>Animated envelopes = actual in-flight WebSocket request events.</span>
        <span>Original OmniRoute graphics · no third-party pixel assets.</span>
      </div>
    </div>
  );
}
