import { useEffect, useRef, useState } from "react";

import LobbyNew from "../explorer/workflows/LobbyNew.jsx";
import Loading from "../explorer/workflows/Loading.jsx";
import "./bootgate.css";

// Tell the bevy host (main.js) NOT to auto-start the world: it should wait for
// JUMP IN so the scene-load is shown on the ui3 Loading screen instead of
// happening invisibly behind the lobby. Set as early as the module loads.
if (typeof window !== "undefined") window.dclDeferStart = true;

// Boot phases over the bevy client:
//   lobby   — ui3 "Welcome" screen (always shown). wasm pre-loads behind it.
//   loading — JUMP IN starts the engine; this screen shows REAL progress:
//             wasm% (engine.js `dcl-loading`) for the first half, then the
//             engine's scene-load % (`loading` bridge push from web.rs) for the
//             second half, completing when the player's scene reports ready.
//   world   — live world; render the app (sidebar/chrome overlay).
const MIN_LOADING_MS = 600;
const LOADING_TIMEOUT_MS = 60000;

export default function BootGate({ children }) {
  const [phase, setPhase] = useState("lobby");
  const [wasmPct, setWasmPct] = useState(
    typeof window !== "undefined" && typeof window.dclLoadingProgress === "number"
      ? window.dclLoadingProgress
      : 0,
  );
  const [scenePct, setScenePct] = useState(0);
  const [ready, setReady] = useState(false);
  const jumpedAt = useRef(0);

  // wasm load progress from the bevy client (ui.js updateOverallProgress()).
  useEffect(() => {
    const onLoading = (e) => {
      const p = e?.detail?.percent;
      if (typeof p === "number") setWasmPct(p);
    };
    window.addEventListener("dcl-loading", onLoading);
    return () => window.removeEventListener("dcl-loading", onLoading);
  }, []);

  // Engine bridge: `loading` push carries real scene-load percent + a `ready`
  // flag (player's parcel scene running); `scene` push is a ready fallback. The
  // bridge replays its last state to late subscribers, so this resolves even if
  // the push happened just before we attached.
  useEffect(() => {
    let unsub;
    let cancelled = false;
    let tries = 0;
    const attach = () => {
      if (cancelled) return;
      const b = window.dclBridge;
      if (b && typeof b.onState === "function") {
        unsub = b.onState((push) => {
          if (!push) return;
          if (push.kind === "loading") {
            if (typeof push.percent === "number") setScenePct(push.percent);
            if (push.ready) setReady(true);
          } else if (push.kind === "scene") {
            setReady(true);
          }
        });
        return;
      }
      if (tries++ < 240) setTimeout(attach, 250); // bridge appears after JUMP IN
    };
    attach();
    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, []);

  // Reveal the world once ready (with a min display), or after a safety timeout.
  useEffect(() => {
    if (phase !== "loading") return undefined;
    const fallback = setTimeout(() => setPhase("world"), LOADING_TIMEOUT_MS);
    let revealT;
    if (ready) {
      const elapsed = Date.now() - jumpedAt.current;
      revealT = setTimeout(
        () => setPhase("world"),
        Math.max(0, MIN_LOADING_MS - elapsed),
      );
    }
    return () => {
      clearTimeout(fallback);
      if (revealT) clearTimeout(revealT);
    };
  }, [phase, ready]);

  const jumpIn = () => {
    jumpedAt.current = Date.now();
    setPhase("loading");
    // Start the engine (gated on JUMP IN). If wasm isn't ready yet, start as
    // soon as it is — the Loading screen covers the gap with real wasm%.
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
    // wasm = first half, scene-load = second half; pin to 100 only when ready.
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
