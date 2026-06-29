import { useEffect, useRef, useState } from "react";

import LobbyNew from "../explorer/workflows/LobbyNew.jsx";
import Loading from "../explorer/workflows/Loading.jsx";
import { hexToColor3 } from "../data/catalyst/backpack.js";
import "./bootgate.css";

if (typeof window !== "undefined") window.dclDeferStart = true;

const MIN_LOADING_MS = 2200;
const SCENE_GRACE_MS = 5000;
const LOADING_TIMEOUT_MS = 20000;

const ONBOARD_BODY_SHAPE = {
  A: "urn:decentraland:off-chain:base-avatars:BaseMale",
  B: "urn:decentraland:off-chain:base-avatars:BaseFemale",
};
const ONBOARD_DEFAULT_COLORS = {
  skinColor: "#c98c63",
  hairColor: "#5c3824",
  eyesColor: "#3a6ea5",
};

export default function BootGate({ children }) {
  const [phase, setPhase] = useState("lobby");
  const [wasmPct, setWasmPct] = useState(
    typeof window !== "undefined" && typeof window.dclLoadingProgress === "number"
      ? window.dclLoadingProgress
      : 0,
  );
  const [scenePct, setScenePct] = useState(0);
  const [ready, setReady] = useState(false);
  const [engineAlive, setEngineAlive] = useState(false);
  const engineAliveAt = useRef(0);
  const jumpedAt = useRef(0);
  const pendingAvatarRef = useRef(null);
  const avatarAppliedRef = useRef(false);

  const applyPendingAvatar = () => {
    const pending = pendingAvatarRef.current;
    if (!pending || avatarAppliedRef.current) return;
    avatarAppliedRef.current = true;
    try {
      window.dclBridge?.send?.("SetAvatar", {
        base: {
          bodyShapeUrn: pending.bodyShapeUrn,
          name: pending.name,
          skinColor: hexToColor3(ONBOARD_DEFAULT_COLORS.skinColor),
          hairColor: hexToColor3(ONBOARD_DEFAULT_COLORS.hairColor),
          eyesColor: hexToColor3(ONBOARD_DEFAULT_COLORS.eyesColor),
        },
      });
    } catch {
    }
  };

  useEffect(() => {
    const onLoading = (e) => {
      const p = e?.detail?.percent;
      if (typeof p === "number") setWasmPct(p);
    };
    window.addEventListener("dcl-loading", onLoading);
    return () => window.removeEventListener("dcl-loading", onLoading);
  }, []);

  useEffect(() => {
    let unsub;
    let cancelled = false;
    const attach = () => {
      if (cancelled) return;
      const b = window.dclBridge;
      if (b && typeof b.onState === "function") {
        unsub = b.onState((push) => {
          if (!push) return;
          if (push.kind === "loading") {
            if (engineAliveAt.current === 0) engineAliveAt.current = Date.now();
            setEngineAlive(true);
            if (typeof push.percent === "number") setScenePct(push.percent);
            if (push.ready) setReady(true);
          } else if (push.kind === "identity") {
            if (push.name) applyPendingAvatar();
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
    const fallback = setTimeout(() => setPhase("world"), LOADING_TIMEOUT_MS);
    let revealT;
    if (ready || engineAlive) {
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
  }, [phase, ready, engineAlive]);

  const jumpIn = ({ name, body } = {}) => {
    jumpedAt.current = Date.now();
    const trimmed = (name ?? "").trim();
    if (trimmed) {
      pendingAvatarRef.current = {
        name: trimmed,
        bodyShapeUrn: ONBOARD_BODY_SHAPE[body] ?? ONBOARD_BODY_SHAPE.A,
      };
      avatarAppliedRef.current = false;
    }
    setPhase("loading");
    if (window.dclEngineReady) window.dclEngineStart?.();
    else
      window.addEventListener(
        "dcl-engine-ready",
        () => window.dclEngineStart?.(),
        { once: true },
      );
  };

  if (phase === "lobby") {
    return (
      <div className="boot">
        <LobbyNew onJumpIn={jumpIn} />
      </div>
    );
  }
  if (phase === "loading") {
    const pct = ready
      ? 100
      : Math.min(99, Math.round(wasmPct * 0.5 + scenePct * 0.5));
    return (
      <div className="boot">
        <Loading progress={pct} />
      </div>
    );
  }
  return children;
}
