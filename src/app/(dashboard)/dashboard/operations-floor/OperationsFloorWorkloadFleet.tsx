"use client";

import { Card } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";

import {
  deriveOperationsWorkloadHealth,
  type OperationsProtectedNativeModel,
  type OperationsWorkloadModel,
} from "./operationsFloorWorkloads";

type ProviderDesk = {
  id: string;
  label: string;
  connections: number;
  connected: number;
  errors: number;
};

function shortName(workload: OperationsWorkloadModel): string {
  return workload.displayName
    .replace(/^Personal\s*•\s*/i, "")
    .replace(/^MTA\s*•\s*/i, "");
}

function stateClasses(
  state: ReturnType<typeof deriveOperationsWorkloadHealth>
): string {
  if (state === "ready") {
    return "border-emerald-500/30 bg-emerald-500/5 text-emerald-500";
  }

  if (state === "error") {
    return "border-red-500/30 bg-red-500/5 text-red-400";
  }

  if (state === "isolated") {
    return "border-violet-500/30 bg-violet-500/5 text-violet-400";
  }

  return "border-border bg-bg-subtle/20 text-text-muted";
}

export default function OperationsFloorWorkloadFleet({
  workloads,
  protectedNative,
  desks,
  selectedWorkloadId,
  loading,
  error,
  onSelectWorkload,
}: {
  workloads: OperationsWorkloadModel[];
  protectedNative: OperationsProtectedNativeModel[];
  desks: ProviderDesk[];
  selectedWorkloadId?: string | null;
  loading: boolean;
  error?: string | null;
  onSelectWorkload: (workloadId: string) => void;
}) {
  const personalCount = workloads.filter(
    (workload) => workload.scope === "personal"
  ).length;

  const mtaCount = workloads.filter(
    (workload) => workload.scope === "mta"
  ).length;

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3.5 py-2.5">
        <div>
          <div className="text-sm font-semibold text-text-main">
            CC workload fleet
          </div>
          <div className="text-[10px] text-text-muted">
            Curated model choices mapped onto their current OmniRoute routes.
            Protected native Codex remains outside this primary fleet.
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <span>{personalCount} personal</span>
          <span>·</span>
          <span>{mtaCount} MTA</span>
          <span>·</span>
          <span>
            {protectedNative.length} protected native
          </span>
        </div>
      </div>

      {loading ? (
        <div className="px-3.5 py-5 text-xs text-text-muted">
          Loading unified workload policy…
        </div>
      ) : error && workloads.length === 0 ? (
        <div className="px-3.5 py-5 text-xs text-amber-500">
          {error}
        </div>
      ) : (
        <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-4">
          {workloads.map((workload) => {
            const state =
              deriveOperationsWorkloadHealth(
                workload,
                desks
              );

            const selected =
              selectedWorkloadId === workload.id;

            return (
              <button
                key={workload.id}
                type="button"
                onClick={() =>
                  onSelectWorkload(workload.id)
                }
                className={`min-w-0 rounded-lg border p-2.5 text-left transition ${
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border/70 hover:border-primary/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-bg-subtle/30">
                    <ProviderIcon
                      providerId={workload.routeProvider}
                      size={17}
                      type="color"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-semibold text-text-main">
                      {shortName(workload)}
                    </div>

                    <div className="mt-0.5 truncate text-[9px] text-text-muted">
                      {workload.routeProvider} ·{" "}
                      {workload.scope}
                    </div>
                  </div>

                  <span
                    className={`rounded border px-1.5 py-0.5 text-[8px] font-semibold uppercase ${stateClasses(
                      state
                    )}`}
                  >
                    {state}
                  </span>
                </div>

                <div className="mt-2 truncate font-mono text-[9px] text-text-muted">
                  {workload.downstreamModel}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5">
          <div>
            <div className="text-xs font-semibold text-text-main">
              Protected Native ChatGPT
            </div>

            <div className="text-[9px] text-text-muted">
              Native ChatGPT fallback presentation only.
              These entries are not OmniRoute routes and are
              not selectable through the unified router.
            </div>
          </div>

          <span className="rounded border border-amber-500/30 bg-amber-500/5 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-amber-500">
            protected boundary
          </span>
        </div>

        <div className="grid gap-2 px-3 pb-3 sm:grid-cols-3">
          {protectedNative.map((model) => (
            <div
              key={model.key}
              className="rounded-lg border border-amber-500/20 bg-amber-500/[0.03] p-2.5"
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-500">
                  <span className="material-symbols-outlined text-[17px]">
                    shield_lock
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-text-main">
                    {model.displayName}
                  </div>

                  <div className="mt-0.5 text-[9px] text-text-muted">
                    native ChatGPT · protected fallback
                  </div>
                </div>

                <span className="rounded border border-amber-500/30 bg-amber-500/5 px-1.5 py-0.5 text-[8px] font-semibold uppercase text-amber-500">
                  protected
                </span>
              </div>

              <div className="mt-2 text-[9px] leading-4 text-text-muted">
                {model.description}
              </div>
            </div>
          ))}

          {protectedNative.length === 0 && (
            <div className="col-span-full rounded-lg border border-border/70 bg-bg-subtle/20 px-3 py-3 text-[10px] text-text-muted">
              No protected native ChatGPT presentation
              entries are configured.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
