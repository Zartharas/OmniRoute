"use client";

import { useState } from "react";

import OperationsFloorScene from "./OperationsFloorScene";
import { useOperationsFloorLocalPixelPack } from "./OperationsFloorLocalPixelAgent";
import type { OperationsFloorSystemSignals } from "./operationsFloorSystemSignals";
import OperationsFloorTiledOffice, {
  type PixelOfficeComboEvent,
  type PixelOfficeDesk,
  type PixelOfficeRequest,
} from "./pixel/OperationsFloorTiledOffice";

type FloorView = "preferred" | "native";

export default function OperationsFloorWorkspaceScene({
  regularDesks,
  protectedDesks,
  activeRequests,
  comboEvents,
  systemSignals,
  selectedProviderId,
  onSelectProvider,
}: {
  regularDesks: PixelOfficeDesk[];
  protectedDesks: PixelOfficeDesk[];
  activeRequests: PixelOfficeRequest[];
  comboEvents: PixelOfficeComboEvent[];
  systemSignals: OperationsFloorSystemSignals;
  selectedProviderId?: string | null;
  onSelectProvider: (providerId: string) => void;
}) {
  const { installed } = useOperationsFloorLocalPixelPack();
  const [view, setView] = useState<FloorView>("preferred");
  const pixelActive = installed && view === "preferred";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-bg-subtle/20 px-2.5 py-1.5">
        <div className="flex items-center gap-2 text-[10px] text-text-muted">
          <span className={`size-1.5 rounded-full ${pixelActive ? "bg-amber-500" : "bg-primary"}`} />
          <span className="font-medium text-text-main">Floor view</span>
          <span>{pixelActive ? "local pixel office" : "native topology"}</span>
        </div>
        <div className="inline-flex rounded-lg border border-border bg-bg p-0.5">
          <button
            type="button"
            onClick={() => setView("preferred")}
            disabled={!installed}
            className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
              pixelActive
                ? "bg-amber-500/15 text-amber-500"
                : installed
                  ? "text-text-muted hover:text-text-main"
                  : "cursor-not-allowed text-text-muted/40"
            }`}
            title={installed ? "Use the locally installed pixel office" : "Local pixel pack is not installed"}
          >
            Pixel office
          </button>
          <button
            type="button"
            onClick={() => setView("native")}
            className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition ${
              !pixelActive ? "bg-primary/10 text-primary" : "text-text-muted hover:text-text-main"
            }`}
          >
            Native
          </button>
        </div>
      </div>

      {pixelActive ? (
        <OperationsFloorTiledOffice
          regularDesks={regularDesks}
          protectedDesks={protectedDesks}
          activeRequests={activeRequests}
          comboEvents={comboEvents}
          systemSignals={systemSignals}
          selectedProviderId={selectedProviderId}
          onSelectProvider={onSelectProvider}
        />
      ) : (
        <OperationsFloorScene
          regularDesks={regularDesks}
          protectedDesks={protectedDesks}
          activeRequests={activeRequests}
          comboEvents={comboEvents}
          selectedProviderId={selectedProviderId}
          onSelectProvider={onSelectProvider}
        />
      )}
    </div>
  );
}
