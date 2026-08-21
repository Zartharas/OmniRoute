"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import ProviderIcon from "@/shared/components/ProviderIcon";
import OperationsFloorLocalPixelAgent, {
  providerCharacter,
  useOperationsFloorLocalPixelPack,
} from "../OperationsFloorLocalPixelAgent";
import { getOperationsLane, normalizeOperationsProviderId } from "../operationsFloorModel";
import {
  isFreshOperationsFloorSystemSignal,
  type OperationsFloorSystemSignals,
} from "../operationsFloorSystemSignals";

const ROOT = "/local-assets/operations-floor";
const FLIP_H = 0x80000000;
const FLIP_V = 0x40000000;
const FLIP_D = 0x20000000;
const TILE_MASK = 0x1fffffff;
const TILE_LAYERS = ["floor", "walls", "furniture-below", "furniture-above"] as const;
const MIN_ZOOM = 0.9;
const DEFAULT_ZOOM = 1.55;
const MAX_ZOOM = 2.4;
const PRIMARY_SEATS = [
  "pc-1",
  "pc-2",
  "pc-3",
  "pc-4",
  "pc-5",
  "pc-6",
  "desk-chief-architect",
  "desk-product-manager",
  "desk-team-lead",
  "desk-backend-engineer",
  "desk-ui-ux-expert",
  "desk-data-engineer",
] as const;

export type PixelOfficeDesk = {
  id: string;
  label: string;
  connections: number;
  connected: number;
  errors: number;
};

export type PixelOfficeRequest = {
  id: string;
  provider?: string | null;
  model?: string | null;
};

export type PixelOfficeComboEvent = {
  provider?: string | null;
  type: "attempt" | "succeeded" | "failed";
};

type Point = { x: number; y: number };
type TiledObject = { name?: string; x?: number; y?: number };
type TiledLayer = {
  name: string;
  type: "tilelayer" | "objectgroup" | string;
  data?: number[];
  objects?: TiledObject[];
};
type TiledTileset = {
  firstgid: number;
  image?: string;
  imagewidth?: number;
  imageheight?: number;
  tilewidth?: number;
  tileheight?: number;
  columns?: number;
  tilecount?: number;
};
type TiledMap = {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: TiledLayer[];
  tilesets: TiledTileset[];
};

type LoadedMap = {
  map: TiledMap;
  images: HTMLImageElement[];
  spawns: Map<string, Point>;
};

type PanState = {
  pointerId: number;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
};

const EXTRA_TILESETS: TiledTileset[] = [
  {
    firstgid: 513,
    image: "a5-office-floors-walls.png",
    imagewidth: 256,
    imageheight: 512,
    tilewidth: 16,
    tileheight: 16,
    columns: 16,
    tilecount: 512,
  },
  {
    firstgid: 1025,
    image: "interiors.png",
    imagewidth: 256,
    imageheight: 1424,
    tilewidth: 16,
    tileheight: 16,
    columns: 16,
    tilecount: 1424,
  },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load ${src}`));
    image.src = src;
  });
}

function patchTilesets(map: TiledMap): TiledMap {
  const embedded = map.tilesets?.[0];
  if (!embedded) throw new Error("office.tmj does not contain its embedded base tileset");
  return {
    ...map,
    tilesets: [embedded, ...EXTRA_TILESETS],
  };
}

function parseSpawns(map: TiledMap): Map<string, Point> {
  const spawns = new Map<string, Point>();
  const layer = map.layers.find((candidate) => candidate.name === "spawn-points" && candidate.type === "objectgroup");
  for (const object of layer?.objects ?? []) {
    if (!object.name) continue;
    spawns.set(object.name, {
      x: Math.floor((object.x ?? 0) / map.tilewidth),
      y: Math.floor((object.y ?? 0) / map.tileheight),
    });
  }
  return spawns;
}

function resolveTileset(map: TiledMap, tileId: number): { index: number; tileset: TiledTileset } | null {
  for (let index = map.tilesets.length - 1; index >= 0; index -= 1) {
    if (tileId >= map.tilesets[index].firstgid) return { index, tileset: map.tilesets[index] };
  }
  return null;
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  map: TiledMap,
  images: HTMLImageElement[],
  rawValue: number,
  tileX: number,
  tileY: number
) {
  const raw = rawValue >>> 0;
  const tileId = raw & TILE_MASK;
  if (!tileId) return;
  const resolved = resolveTileset(map, tileId);
  if (!resolved) return;

  const { index, tileset } = resolved;
  const image = images[index];
  if (!image) return;
  const tileWidth = tileset.tilewidth ?? map.tilewidth;
  const tileHeight = tileset.tileheight ?? map.tileheight;
  const columns = tileset.columns ?? Math.max(1, Math.floor(image.width / tileWidth));
  const localId = tileId - tileset.firstgid;
  const sourceX = (localId % columns) * tileWidth;
  const sourceY = Math.floor(localId / columns) * tileHeight;
  const destX = tileX * map.tilewidth;
  const destY = tileY * map.tileheight;
  const flipH = (raw & FLIP_H) !== 0;
  const flipV = (raw & FLIP_V) !== 0;
  const flipD = (raw & FLIP_D) !== 0;

  if (!flipH && !flipV && !flipD) {
    ctx.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, destX, destY, map.tilewidth, map.tileheight);
    return;
  }

  ctx.save();
  ctx.translate(destX + map.tilewidth / 2, destY + map.tileheight / 2);
  if (flipD) {
    if (flipH && !flipV) ctx.rotate(Math.PI / 2);
    else if (!flipH && flipV) ctx.rotate(-Math.PI / 2);
    else if (flipH && flipV) {
      ctx.rotate(Math.PI / 2);
      ctx.scale(1, -1);
    } else {
      ctx.rotate(Math.PI / 2);
      ctx.scale(-1, 1);
    }
  } else {
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  }
  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    tileWidth,
    tileHeight,
    -map.tilewidth / 2,
    -map.tileheight / 2,
    map.tilewidth,
    map.tileheight
  );
  ctx.restore();
}

function renderMap(canvas: HTMLCanvasElement, loaded: LoadedMap) {
  const { map, images } = loaded;
  canvas.width = map.width * map.tilewidth;
  canvas.height = map.height * map.tileheight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas is unavailable");
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const layerName of TILE_LAYERS) {
    const layer = map.layers.find((candidate) => candidate.name === layerName && candidate.type === "tilelayer");
    if (!layer?.data) continue;
    for (let y = 0; y < map.height; y += 1) {
      for (let x = 0; x < map.width; x += 1) {
        drawTile(ctx, map, images, layer.data[y * map.width + x] ?? 0, x, y);
      }
    }
  }
}

function pct(point: Point, map: TiledMap) {
  return {
    left: `${((point.x + 0.5) / map.width) * 100}%`,
    top: `${((point.y + 0.8) / map.height) * 100}%`,
  };
}

function fallbackPoint(index: number): Point {
  return { x: 10 + (index % 4) * 3, y: 7 + Math.floor(index / 4) * 4 };
}

function requestTarget(
  request: PixelOfficeRequest,
  regularDesks: PixelOfficeDesk[],
  spawns: Map<string, Point>
): Point {
  if (getOperationsLane(request.provider) === "protected") {
    return spawns.get("desk-ceo") ?? { x: 5, y: 4 };
  }
  const provider = normalizeOperationsProviderId(request.provider);
  const index = Math.max(0, regularDesks.findIndex((desk) => desk.id === provider));
  return spawns.get(PRIMARY_SEATS[index % PRIMARY_SEATS.length]) ?? fallbackPoint(index);
}

function clampZoom(value: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("button,a,input,select,textarea,[role='button']"));
}

function Envelope({ from, to, protectedLane, index }: { from: Point; to: Point; protectedLane: boolean; index: number }) {
  const color = protectedLane ? "#f59e0b" : "#f43f5e";
  const controlX = (from.x + to.x) / 2;
  const controlY = Math.min(from.y, to.y) - 3 - (index % 3);
  const path = `M ${from.x * 16 + 8} ${from.y * 16 + 8} Q ${controlX * 16 + 8} ${controlY * 16 + 8} ${to.x * 16 + 8} ${to.y * 16 + 8}`;
  return (
    <g className="motion-reduce:hidden">
      <path d={path} fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 4" opacity="0.25" />
      <g>
        <rect x="-5" y="-3.5" width="10" height="7" rx="1" fill={color} />
        <path d="M-4 -2 L0 1 L4 -2" fill="none" stroke="white" strokeWidth="0.8" opacity="0.8" />
        <animateMotion dur={protectedLane ? "3s" : "2.5s"} begin={`${index * 0.25}s`} repeatCount="indefinite" path={path} />
      </g>
    </g>
  );
}

function SystemPacket({
  from,
  to,
  color,
  label,
}: {
  from: Point;
  to: Point;
  color: string;
  label: string;
}) {
  const controlX = (from.x + to.x) / 2;
  const controlY = Math.min(from.y, to.y) - 2.5;
  const path = `M ${from.x * 16 + 8} ${from.y * 16 + 8} Q ${controlX * 16 + 8} ${controlY * 16 + 8} ${to.x * 16 + 8} ${to.y * 16 + 8}`;
  return (
    <g className="motion-reduce:hidden">
      <path d={path} fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="2 3" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0.25;0" dur="2.4s" repeatCount="1" fill="freeze" />
      </path>
      <g opacity="0">
        <circle r="5" fill={color} />
        <text x="0" y="1.5" textAnchor="middle" fontSize="4" fontWeight="700" fill="white">{label}</text>
        <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" repeatCount="1" fill="freeze" />
        <animateMotion dur="2.4s" repeatCount="1" fill="freeze" path={path} />
      </g>
    </g>
  );
}

export default function OperationsFloorTiledOffice({
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const panRef = useRef<PanState | null>(null);
  const { installed, manifest } = useOperationsFloorLocalPixelPack();
  const [loaded, setLoaded] = useState<LoadedMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    if (!installed) return;
    let cancelled = false;
    Promise.all([
      fetch(`${ROOT}/maps/office.tmj`, { cache: "no-store" }).then(async (response) => {
        if (!response.ok) throw new Error(`office.tmj HTTP ${response.status}`);
        return patchTilesets((await response.json()) as TiledMap);
      }),
      loadImage(`${ROOT}/tilesets/office-tileset.png`),
      loadImage(`${ROOT}/tilesets/a5-office-floors-walls.png`),
      loadImage(`${ROOT}/tilesets/interiors.png`),
    ])
      .then(([map, ...images]) => {
        if (cancelled) return;
        setLoaded({ map, images, spawns: parseSpawns(map) });
        setError(null);
      })
      .catch((reason) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Unable to load local office map");
      });
    return () => {
      cancelled = true;
    };
  }, [installed]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const frame = window.requestAnimationFrame(() => {
      try {
        renderMap(canvas, loaded);
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : "Unable to render local office map");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [loaded]);

  const providerPositions = useMemo(() => {
    if (!loaded) return new Map<string, Point>();
    const positions = new Map<string, Point>();
    regularDesks.forEach((desk, index) => {
      positions.set(desk.id, loaded.spawns.get(PRIMARY_SEATS[index % PRIMARY_SEATS.length]) ?? fallbackPoint(index));
    });
    protectedDesks.forEach((desk, index) => {
      positions.set(desk.id, loaded.spawns.get(index === 0 ? "desk-ceo" : "desk-project-manager") ?? { x: 5 + index * 2, y: 4 });
    });
    return positions;
  }, [loaded, protectedDesks, regularDesks]);

  const activeProviderIds = useMemo(() => {
    const providers = new Set<string>();
    for (const request of activeRequests) {
      const provider = normalizeOperationsProviderId(request.provider);
      if (provider) providers.add(provider);
    }
    return providers;
  }, [activeRequests]);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!event.metaKey && !event.ctrlKey) return;
    event.preventDefault();
    if (event.deltaY === 0) return;
    setZoom((value) => clampZoom(value + (event.deltaY < 0 ? 0.12 : -0.12)));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || isInteractiveTarget(event.target)) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    panRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPanning(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pan = panRef.current;
    const viewport = viewportRef.current;
    if (!pan || !viewport || pan.pointerId !== event.pointerId) return;
    event.preventDefault();
    viewport.scrollLeft = pan.scrollLeft - (event.clientX - pan.startX);
    viewport.scrollTop = pan.scrollTop - (event.clientY - pan.startY);
  };

  const endPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pan = panRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    panRef.current = null;
    setIsPanning(false);
  };

  if (!installed) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-bg-subtle/20 p-8 text-center text-sm text-text-muted">
        Local pixel pack is not installed. Use the native Operations Floor or install the optional personal/non-commercial pack.
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 text-sm text-red-400">
        Pixel office map unavailable: {error}
      </div>
    );
  }

  if (!loaded) {
    return <div className="rounded-xl border border-border bg-bg-subtle/20 p-8 text-center text-sm text-text-muted">Loading Tiled office…</div>;
  }

  const entrance = loaded.spawns.get("entrance") ?? { x: 18, y: 20 };
  const codexPoint = loaded.spawns.get("desk-ceo") ?? { x: 5, y: 4 };
  const dispatchPoint = { x: loaded.map.width / 2 - 0.5, y: loaded.map.height / 2 - 0.8 };
  const authPoint = { x: loaded.map.width - 2.6, y: 4.2 };
  const compressionPoint = { x: loaded.map.width - 5.3, y: loaded.map.height - 3.2 };
  const authFresh = isFreshOperationsFloorSystemSignal(systemSignals.auth);
  const compressionFresh = isFreshOperationsFloorSystemSignal(systemSignals.compression);
  const protectedRequestActive = activeRequests.some((request) => getOperationsLane(request.provider) === "protected");
  const protectedFallbackActive = comboEvents.some((event) => event.type === "attempt" && getOperationsLane(event.provider) === "protected");
  const protectedActive = protectedRequestActive || protectedFallbackActive;
  const protectedState = protectedFallbackActive ? "FALLBACK" : protectedRequestActive ? "ACTIVE" : "RESERVED";
  const authState = systemSignals.auth?.newStatus || (systemSignals.auth ? "OBSERVED" : "STANDBY");
  const compressionState = systemSignals.compression
    ? systemSignals.compression.event === "compression.completed"
      ? "COMPLETE"
      : "STEP"
    : "STANDBY";
  const worldWidth = loaded.map.width * loaded.map.tilewidth;
  const worldHeight = loaded.map.height * loaded.map.tileheight;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#080b0f]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-black/35 px-3 py-2">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] text-white/60">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          TILED OFFICE · LOCAL PACK
          <span className="text-white/25">{loaded.map.width}×{loaded.map.height} tiles</span>
          <span className="hidden text-white/25 md:inline">drag to pan · ⌘/Ctrl + wheel to zoom</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom((value) => clampZoom(value - 0.15))} className="rounded border border-white/10 px-2 py-1 text-[10px] text-white/55 hover:bg-white/5">−</button>
          <button onClick={() => setZoom(DEFAULT_ZOOM)} className="rounded border border-white/10 px-2 py-1 font-mono text-[9px] text-white/45 hover:bg-white/5" title="Reset zoom">{Math.round(zoom * 100)}%</button>
          <button onClick={() => setZoom((value) => clampZoom(value + 0.15))} className="rounded border border-white/10 px-2 py-1 text-[10px] text-white/55 hover:bg-white/5">+</button>
        </div>
      </div>

      <div
        ref={viewportRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        className={`max-h-[540px] overflow-auto bg-[#090d11] p-3 ${isPanning ? "cursor-grabbing select-none" : "cursor-grab"}`}
        aria-label="Pixel office viewport. Drag the background to pan; hold Control or Command while scrolling to zoom."
      >
        <div
          className="relative mx-auto origin-top-left shadow-[0_18px_45px_rgba(0,0,0,0.4)]"
          style={{ width: worldWidth * zoom, height: worldHeight * zoom }}
        >
          <div className="absolute inset-0 origin-top-left" style={{ width: worldWidth, height: worldHeight, transform: `scale(${zoom})` }}>
            <canvas ref={canvasRef} className="absolute inset-0" style={{ imageRendering: "pixelated" }} />

            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" viewBox={`0 0 ${worldWidth} ${worldHeight}`} preserveAspectRatio="none">
              {activeRequests.slice(0, 8).map((request, index) => (
                <Envelope
                  key={request.id}
                  from={entrance}
                  to={requestTarget(request, regularDesks, loaded.spawns)}
                  protectedLane={getOperationsLane(request.provider) === "protected"}
                  index={index}
                />
              ))}
              {protectedFallbackActive && (
                <Envelope from={loaded.spawns.get("pc-1") ?? { x: 12, y: 10 }} to={codexPoint} protectedLane index={0} />
              )}
              {authFresh && systemSignals.auth && (
                <SystemPacket key={systemSignals.auth.key} from={authPoint} to={dispatchPoint} color="#10b981" label="A" />
              )}
              {compressionFresh && systemSignals.compression && (
                <SystemPacket key={systemSignals.compression.key} from={compressionPoint} to={dispatchPoint} color="#8b5cf6" label="C" />
              )}
            </svg>

            <div className="absolute z-20" style={pct(entrance, loaded.map)}>
              <div className="-translate-x-1/2 -translate-y-full rounded bg-cyan-950/90 px-1.5 py-1 font-mono text-[7px] text-cyan-200 shadow">
                INGRESS · {activeRequests.length}
              </div>
              <div className="pointer-events-none flex -translate-x-1/2 -translate-y-1 items-end justify-center">
                <OperationsFloorLocalPixelAgent character="Adam" active={activeRequests.length > 0} scale={1.05} />
              </div>
            </div>

            {regularDesks.map((desk) => {
              const point = providerPositions.get(desk.id);
              if (!point) return null;
              const healthy = desk.connected > 0 && desk.errors === 0;
              const working = activeProviderIds.has(desk.id);
              const state = desk.errors > 0 ? "ERROR" : working ? "WORKING" : healthy ? "READY" : "OFFLINE";
              return (
                <button
                  key={desk.id}
                  type="button"
                  onClick={() => onSelectProvider(desk.id)}
                  className="absolute z-30 -translate-x-1/2 -translate-y-full text-left"
                  style={pct(point, loaded.map)}
                  title={`${desk.label}: ${desk.connected}/${desk.connections} ready · ${state.toLowerCase()}`}
                >
                  <div className={`mb-0.5 flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[6px] shadow ${selectedProviderId === desk.id ? "border-primary bg-primary/85 text-white" : working ? "border-cyan-400/50 bg-cyan-950/90 text-cyan-100" : desk.errors > 0 ? "border-amber-400/50 bg-amber-950/90 text-amber-200" : "border-black/40 bg-black/80 text-white/75"}`}>
                    <ProviderIcon providerId={desk.id} size={9} type="color" />
                    <span className="max-w-[68px] truncate">{desk.label}</span>
                    <span className="text-[5px] text-current/60">{state}</span>
                    <span className={`size-1 rounded-full ${desk.errors > 0 ? "bg-amber-400" : working ? "bg-cyan-300" : healthy ? "bg-emerald-400" : "bg-white/30"}`} />
                  </div>
                  <div className="flex justify-center">
                    <OperationsFloorLocalPixelAgent character={providerCharacter(desk.id)} active={working} scale={1.05} />
                  </div>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => protectedDesks[0] && onSelectProvider(protectedDesks[0].id)}
              className="absolute z-30 -translate-x-1/2 -translate-y-full text-left"
              style={pct(codexPoint, loaded.map)}
              disabled={protectedDesks.length === 0}
              title="Protected ChatGPT Plus / Codex station"
            >
              <div className={`mb-0.5 rounded border border-amber-400/60 bg-amber-950/90 px-1.5 py-0.5 font-mono text-[6px] text-amber-100 shadow ${protectedActive ? "animate-pulse" : ""}`}>
                CODEX · {protectedState}
              </div>
              <div className="flex justify-center">
                <OperationsFloorLocalPixelAgent character="Bob" active={protectedActive} scale={1.05} />
              </div>
            </button>

            <div className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full" style={pct(authPoint, loaded.map)}>
              <div className="rounded border border-emerald-400/45 bg-emerald-950/90 px-1.5 py-0.5 font-mono text-[6px] text-emerald-100 shadow">
                AUTH KEEPER · {authState.toUpperCase()}
              </div>
              <div className="mt-0.5 text-center font-mono text-[5px] text-emerald-100/70">
                {systemSignals.auth?.provider || "credential health"}
              </div>
            </div>

            <div className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full" style={pct(compressionPoint, loaded.map)}>
              <div className="rounded border border-violet-400/45 bg-violet-950/90 px-1.5 py-0.5 font-mono text-[6px] text-violet-100 shadow">
                COMPRESSION · {compressionState}
              </div>
              <div className="mt-0.5 text-center font-mono text-[5px] text-violet-100/70">
                {systemSignals.compression?.engine || systemSignals.compression?.mode || "RTK · Caveman"}
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded border border-primary/35 bg-[#180d14]/90 px-2 py-1.5 text-center shadow-[0_0_18px_rgba(244,63,94,0.16)]">
              <div className="font-mono text-[7px] font-semibold text-primary">OMNIROUTE DISPATCH</div>
              <div className="text-[6px] text-white/45">route · retry · cascade</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/35 px-3 py-2 font-mono text-[8px] text-white/35">
        <span>Canvas renderer uses the local Tiled office map and locally installed LimeZu pack.</span>
        <span>source {manifest?.sourceCommit?.slice(0, 8) ?? "unknown"} · assets remain Git-ignored</span>
      </div>
    </div>
  );
}
