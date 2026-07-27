import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import LobbyNew from "../explorer/workflows/LobbyNew";
import Loading from "../explorer/workflows/Loading";
import PlacesPicker from "../explorer/workflows/PlacesPicker";
import type { PickedDestination } from "../explorer/workflows/PlacesPicker";
import type { OverlayPush } from "../generated/bridge/OverlayPush";
import { hexToColor3 } from "../data/catalyst/backpack";
import {
  IDENTITY_STORAGE_KEY,
  initEngineAuth,
  shouldAutoJumpIn,
} from "../data/auth/engineLogin";
import { randomName } from "../data/randomIdentity";
import "./bootgate.css";

function bootWin(): Window | null {
  return typeof window !== "undefined" ? window : null;
}

if (typeof window !== "undefined") {
  window.dclDeferStart = true;
}

const MIN_LOADING_MS = 2200;
const SCENE_GRACE_MS = 5000;
const LOADING_TIMEOUT_MS = 20000;
const PARCEL_SIZE = 16;

const ONBOARD_BODY_SHAPE = {
  A: "urn:decentraland:off-chain:base-avatars:BaseMale",
  B: "urn:decentraland:off-chain:base-avatars:BaseFemale",
} as const;
const ONBOARD_DEFAULT_COLORS = {
  skinColor: "#c98c63",
  hairColor: "#5c3824",
  eyesColor: "#3a6ea5",
};

type PendingAvatar = {
  name?: string;
  fallbackName?: string;
  bodyShapeUrn: string;
  skinColor: unknown;
  hairColor: unknown;
  eyesColor: unknown;
  wearables: string[] | null;
};

type JumpInArg = {
  name?: string;
  body?: "A" | "B";
  base?: {
    bodyShapeUrn?: string;
    name?: string;
    skinColor?: unknown;
    hairColor?: unknown;
    eyesColor?: unknown;
  };
  wearables?: string[];
};

export function buildJumpInAvatarPayload(pending: PendingAvatar): {
  base: Record<string, unknown>;
  equip?: Record<string, unknown>;
} {
  const base: Record<string, unknown> = {
    bodyShapeUrn: pending.bodyShapeUrn,
    skinColor: pending.skinColor,
    hairColor: pending.hairColor,
    eyesColor: pending.eyesColor,
    name: pending.name || pending.fallbackName || randomName(),
  };
  const payload: { base: Record<string, unknown>; equip?: Record<string, unknown> } =
    { base };
  if (Array.isArray(pending.wearables) && pending.wearables.length) {
    payload.equip = {
      wearableUrns: pending.wearables,
      emoteUrns: [],
      forceRender: [],
    };
  }
  return payload;
}

// The engine glue's start() reads the host page's #position input as the boot
// spawn. Booting directly at a picked parcel skips the default Genesis Plaza
// spawn — a multi-MB entities/active discovery pass the post-boot Teleport
// would immediately redo at the destination.
export function primeBootPosition(dest: PickedDestination): boolean {
  if (dest?.kind !== "parcel") return false;
  const input =
    typeof document !== "undefined" ? document.getElementById("position") : null;
  if (!(input instanceof HTMLInputElement)) return false;
  input.value = `${dest.x},${dest.y}`;
  return true;
}

type BootGateProps = { children: ReactNode };

export default function BootGate({ children }: BootGateProps) {
  const [autoJump] = useState(() => {
    try {
      return shouldAutoJumpIn(localStorage.getItem(IDENTITY_STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const [phase, setPhase] = useState<"lobby" | "picking" | "loading" | "world" | "stalled">(
    autoJump ? "loading" : "lobby",
  );
  const [wasmPct, setWasmPct] = useState(() => {
    const w = bootWin();
    return typeof w?.dclLoadingProgress === "number" ? w.dclLoadingProgress : 0;
  });
  const [scenePct, setScenePct] = useState(0);
  const [ready, setReady] = useState(false);
  const [avatarReady, setAvatarReady] = useState(false);
  const [engineAlive, setEngineAlive] = useState(false);
  const engineAliveAt = useRef(0);
  const jumpedAt = useRef(0);
  const pendingAvatarRef = useRef<PendingAvatar | null>(null);
  const avatarAppliedRef = useRef(false);
  const avatarSignalSeenRef = useRef(false);
  const pendingDestinationRef = useRef<PickedDestination>(null);
  const destinationAppliedRef = useRef(false);

  const applyPendingAvatar = () => {
    const pending = pendingAvatarRef.current;
    if (!pending || avatarAppliedRef.current) return;
    avatarAppliedRef.current = true;
    try {
      bootWin()?.dclBridge?.send?.("SetAvatar", buildJumpInAvatarPayload(pending));
    } catch {
    }
  };

  const applyPendingDestination = () => {
    const dest = pendingDestinationRef.current;
    if (!dest || destinationAppliedRef.current) return;
    destinationAppliedRef.current = true;
    try {
      if (dest.kind === "world") {
        bootWin()?.dclBridge?.send?.("ChangeRealm", { realm: dest.realm });
      } else {
        bootWin()?.dclBridge?.send?.("Teleport", {
          x: dest.x * PARCEL_SIZE + PARCEL_SIZE / 2,
          z: dest.y * PARCEL_SIZE + PARCEL_SIZE / 2,
        });
      }
    } catch {
    }
  };

  const startEngine = () => {
    const bw = bootWin();
    if (bw?.dclEngineReady) bw.dclEngineStart?.();
    else
      window.addEventListener(
        "dcl-engine-ready",
        () => bootWin()?.dclEngineStart?.(),
        { once: true },
      );
  };

  useEffect(() => {
    const onLoading = (e: Event) => {
      const p = (e as CustomEvent<{ percent?: number }>).detail?.percent;
      if (typeof p === "number") setWasmPct(p);
    };
    window.addEventListener("dcl-loading", onLoading);
    return () => window.removeEventListener("dcl-loading", onLoading);
  }, []);

  useEffect(() => {
    initEngineAuth();
    if (window.location.search.includes("authResult=")) {
      void import("../data/auth/socialRedirect").then((m) =>
        m.completeSocialRedirectLogin(),
      );
    }
  }, []);

  useEffect(() => {
    if (!autoJump) return;
    jumpedAt.current = Date.now();
    startEngine();
  }, [autoJump]);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    const attach = () => {
      if (cancelled) return;
      const b = bootWin()?.dclBridge;
      if (b && typeof b.onState === "function") {
        unsub = b.onState((raw) => {
          const push = raw as OverlayPush | null;
          if (!push) return;
          if (push.kind === "loading") {
            if (engineAliveAt.current === 0) engineAliveAt.current = Date.now();
            setEngineAlive(true);
            if (typeof push.percent === "number") setScenePct(push.percent);
            if (push.ready) setReady(true);
            if (typeof push.avatarLoaded === "boolean") {
              avatarSignalSeenRef.current = true;
              if (push.avatarLoaded) setAvatarReady(true);
            }
          } else if (push.kind === "identity") {
            if (push.name) {
              applyPendingAvatar();
              applyPendingDestination();
            }
          }
        });
        return;
      }
      setTimeout(attach, 250);
    };
    attach();
    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return undefined;
    const fallback = setTimeout(
      () => setPhase(engineAliveAt.current > 0 ? "world" : "stalled"),
      LOADING_TIMEOUT_MS,
    );
    let revealT: ReturnType<typeof setTimeout> | undefined;
    const avatarGateSatisfied = !avatarSignalSeenRef.current || avatarReady;
    if ((ready || engineAlive) && avatarGateSatisfied) {
      const minDone = jumpedAt.current + MIN_LOADING_MS;
      const target = ready
        ? minDone
        : Math.max(minDone, engineAliveAt.current + SCENE_GRACE_MS);
      revealT = setTimeout(() => setPhase("world"), Math.max(0, target - Date.now()));
    }
    return () => {
      clearTimeout(fallback);
      if (revealT) clearTimeout(revealT);
    };
  }, [phase, ready, engineAlive, avatarReady]);

  const handleAvatarChosen = ({ name, body, base, wearables }: JumpInArg = {}) => {
    const trimmed = (name ?? "").trim();
    pendingAvatarRef.current = {
      name: trimmed,
      fallbackName: base?.name,
      bodyShapeUrn:
        base?.bodyShapeUrn ?? (body ? ONBOARD_BODY_SHAPE[body] : undefined) ?? ONBOARD_BODY_SHAPE.A,
      skinColor: base?.skinColor ?? hexToColor3(ONBOARD_DEFAULT_COLORS.skinColor),
      hairColor: base?.hairColor ?? hexToColor3(ONBOARD_DEFAULT_COLORS.hairColor),
      eyesColor: base?.eyesColor ?? hexToColor3(ONBOARD_DEFAULT_COLORS.eyesColor),
      wearables: Array.isArray(wearables) ? wearables : null,
    };
    avatarAppliedRef.current = false;
    setPhase("picking");
  };

  const handleDestinationChosen = (dest: PickedDestination) => {
    pendingDestinationRef.current = primeBootPosition(dest) ? null : dest;
    destinationAppliedRef.current = false;
    jumpedAt.current = Date.now();
    setPhase("loading");
    startEngine();
  };

  if (phase === "lobby") {
    return (
      <div className="boot">
        <LobbyNew onJumpIn={handleAvatarChosen} />
      </div>
    );
  }
  if (phase === "picking") {
    return <PlacesPicker onPick={handleDestinationChosen} />;
  }
  if (phase === "loading") {
    const pct = ready
      ? 100
      : Math.min(99, Math.round(scenePct > 0 ? 50 + scenePct * 0.5 : wasmPct * 0.5));
    return (
      <div className="boot">
        <Loading progress={pct} />
      </div>
    );
  }
  if (phase === "stalled") {
    return (
      <div className="boot">
        <div className="boot__stalled" role="alert">
          <h1 className="boot__stalled-title">The world couldn’t start</h1>
          <p className="boot__stalled-body">
            The 3D engine didn’t come up. This usually means the browser
            couldn’t access the GPU — check that hardware acceleration is
            enabled, or try another Chrome-based browser.
          </p>
          <div className="boot__stalled-actions">
            <button
              type="button"
              className="boot__stalled-btn boot__stalled-btn--primary"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
            <button
              type="button"
              className="boot__stalled-btn"
              onClick={() => setPhase("lobby")}
            >
              Back to lobby
            </button>
          </div>
        </div>
      </div>
    );
  }
  return children;
}
