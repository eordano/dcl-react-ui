import { useState } from "react";
import "./dcleditorchrome.css";

export default function DclEditorChrome({
  children,
  viewportSrc =(null),
  viewportRef = null,
}) {
  const [rendererBooting, setRendererBooting] = useState(true);
  return (
    <div className="eui-root eui-viewport ui2" role="region" aria-label="DCL Editor">
      {viewportSrc ? (
        <>
          <iframe
            ref={viewportRef}
            className="eui-vp-frame"
            src={viewportSrc}
            title="Scene viewport"
            allow="cross-origin-isolated; autoplay; fullscreen; clipboard-read; clipboard-write; xr-spatial-tracking; gamepad; microphone; camera"
            onLoad={() => setRendererBooting(false)}
          />
          {rendererBooting ? (
            <div className="eui-boot">Editor — starting renderer…</div>
          ) : null}
        </>
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
      {children}
    </div>
  );
}
