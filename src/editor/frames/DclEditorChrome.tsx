import type { ReactNode, RefObject } from "react";
import { useEffect, useReducer, useState } from "react";
import EngineViewport from "./EngineViewport";
import MobileEditorGate from "../../components/MobileEditorGate";
import { BOOT_TIMEOUT_MS, BOOT_PROGRESS_POLL_MS } from "../editor-config";
import { bootReducer, bootOverlay, INITIAL_BOOT } from "../boot-machine";
import "./dcleditorchrome.css";

function readEngineWindow(
  ref: RefObject<HTMLIFrameElement | null> | null,
): { progress: number | null; ready: boolean } {
  try {
    const w = ref?.current?.contentWindow as
      | (Window & { dclLoadingProgress?: unknown; dclEngineReady?: unknown })
      | null
      | undefined;
    if (!w) return { progress: null, ready: false };
    const p = w.dclLoadingProgress;
    return {
      progress: typeof p === "number" && isFinite(p) ? p : null,
      ready: w.dclEngineReady === true,
    };
  } catch {
    return { progress: null, ready: false };
  }
}

export interface DclEditorChromeProps {
  children?: ReactNode;
  viewportSrc?: string | null;
  viewportRef?: RefObject<HTMLIFrameElement | null> | null;
  sceneReady?: boolean;
  loading?: boolean;
}

export default function DclEditorChrome({
  children,
  viewportSrc = null,
  viewportRef = null,
  sceneReady = undefined,
  loading = false,
}: DclEditorChromeProps) {
  const [bootNonce, setBootNonce] = useState(0);
  const [boot, dispatchBoot] = useReducer(bootReducer, INITIAL_BOOT);

  useEffect(() => {
    dispatchBoot({ type: "viewport", src: viewportSrc });
  }, [viewportSrc, bootNonce]);

  useEffect(() => {
    if (sceneReady) dispatchBoot({ type: "scene-ready" });
  }, [sceneReady]);

  useEffect(() => {
    if (!viewportSrc || boot.phase === "ready") return undefined;
    const id = setInterval(() => {
      const { progress, ready } = readEngineWindow(viewportRef);
      if (progress != null) dispatchBoot({ type: "progress", pct: progress });
      if (ready) dispatchBoot({ type: "engine-ready" });
    }, BOOT_PROGRESS_POLL_MS);
    return () => clearInterval(id);
  }, [viewportSrc, viewportRef, boot.phase, bootNonce]);

  useEffect(() => {
    if (!viewportSrc || boot.phase === "ready" || boot.phase === "error") return undefined;
    const id = setTimeout(() => dispatchBoot({ type: "timeout" }), BOOT_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [viewportSrc, boot.phase, bootNonce]);

  const retryBoot = () => {
    dispatchBoot({ type: "retry" });
    setBootNonce((n) => n + 1);
  };

  const overlay =
    loading && !viewportSrc
      ? ({ show: true, kind: "loading", text: "Loading scene editor…" } as const)
      : bootOverlay(boot);

  return (
    <div className="eui-root eui-viewport ui2" role="region" aria-label="DCL Editor">
      {viewportSrc ? (
        <EngineViewport
          key={bootNonce}
          viewportRef={viewportRef}
          src={viewportSrc}
          onLoad={() => dispatchBoot({ type: "iframe-load" })}
        />
      ) : (
        <>
          <div className="eui-vp-horizon" aria-hidden="true" />
          <div className="eui-vp-grid" aria-hidden="true" />
          <div className="eui-vp-object" aria-hidden="true">
            <div className="eui-vp-cube" />
            <div className="eui-vp-gizmo">
              <i className="ax-z" />
              <i className="ax-x" />
              <i className="ax-y" />
            </div>
          </div>
        </>
      )}
      {overlay.show && overlay.kind === "loading" ? (
        <div className="eui-boot" role="status">
          <span className="eui-boot-spinner" aria-hidden="true" />
          {overlay.text}
        </div>
      ) : null}
      {overlay.show && overlay.kind === "error" ? (
        <div className="eui-boot eui-boot--error" role="alert">
          <span>{overlay.text} This sometimes happens on first load.</span>
          <button className="eui-btn primary" type="button" onClick={retryBoot}>
            Retry
          </button>
        </div>
      ) : null}
      {children}
      <MobileEditorGate
        title="Open the scene editor on a desktop"
        message="The scene editor needs a wider screen and a WebGPU-capable desktop browser to run the 3D engine. Come back on a laptop or desktop to keep building."
        backHref="/create/scenes"
        backLabel="Back to your scenes"
      />
    </div>
  );
}
