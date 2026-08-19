"use client";

import { useEffect, useMemo, useState } from "react";

export type LocalPixelCharacter = "Adam" | "Alex" | "Amelia" | "Bob";

type LocalPackManifest = {
  schemaVersion?: number;
  sourceRepo?: string;
  sourceCommit?: string;
  license?: string;
};

const LOCAL_PACK_ROOT = "/local-assets/operations-floor";
const PINNED_SOURCE_REPO = "chaitanyagiri/munder-difflin";
const PINNED_SOURCE_COMMIT = "cdec9de8173e24f7d8843776da06b7d501929e4c";
const FRAME_WIDTH = 16;
const FRAME_HEIGHT = 32;
const WALK_ROW = 1;
const FRAMES_PER_DIRECTION = 6;
const DOWN_DIRECTION_GROUP = 3;

function isExpectedManifest(value: unknown): value is LocalPackManifest {
  if (!value || typeof value !== "object") return false;
  const manifest = value as LocalPackManifest;
  return (
    manifest.schemaVersion === 1 &&
    manifest.sourceRepo === PINNED_SOURCE_REPO &&
    manifest.sourceCommit === PINNED_SOURCE_COMMIT
  );
}

export function useOperationsFloorLocalPixelPack() {
  const [manifest, setManifest] = useState<LocalPackManifest | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${LOCAL_PACK_ROOT}/manifest.json`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((value) => {
        if (!cancelled && isExpectedManifest(value)) {
          setManifest(value);
        }
      })
      .catch(() => {
        // Optional local-only asset pack; the native OmniRoute renderer remains the fallback.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    installed: manifest !== null,
    manifest,
  };
}

export function providerCharacter(providerId: string): LocalPixelCharacter {
  const characters: LocalPixelCharacter[] = ["Adam", "Alex", "Amelia", "Bob"];
  let hash = 0;
  for (let index = 0; index < providerId.length; index += 1) {
    hash = (hash * 31 + providerId.charCodeAt(index)) >>> 0;
  }
  return characters[hash % characters.length];
}

export default function OperationsFloorLocalPixelAgent({
  character,
  active = false,
  scale = 1.8,
  className = "",
}: {
  character: LocalPixelCharacter;
  active?: boolean;
  scale?: number;
  className?: string;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!active) {
      setFrame(0);
      return;
    }
    const timer = window.setInterval(() => {
      setFrame((current) => (current + 1) % FRAMES_PER_DIRECTION);
    }, 150);
    return () => window.clearInterval(timer);
  }, [active]);

  const backgroundPosition = useMemo(() => {
    const groupStart = DOWN_DIRECTION_GROUP * FRAMES_PER_DIRECTION;
    const x = (groupStart + frame) * FRAME_WIDTH;
    const y = WALK_ROW * FRAME_HEIGHT;
    return `-${x}px -${y}px`;
  }, [frame]);

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        backgroundImage: `url(${LOCAL_PACK_ROOT}/characters/${character}_walk.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition,
        imageRendering: "pixelated",
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
      }}
    />
  );
}
