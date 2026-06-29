import { useCallback, useRef, useState } from "react";
import { useAvatarPreview } from "../../data/hooks/useAvatarPreview.js";
import { sendBridge } from "../../overlay/bridge.js";
import "./engineavatarpreview.css";

const YAW_PER_PX = 0.012;

export default function EngineAvatarPreview({ className = "", alt = "Your avatar" }) {
  const dataUrl = useAvatarPreview();
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, lastX: 0, yaw: 0, raf: 0 });

  const flushYaw = useCallback(() => {
    drag.current.raf = 0;
    sendBridge("RotateAvatarPreview", { yaw: drag.current.yaw });
  }, []);

  const onPointerDown = useCallback((e) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      drag.current.lastX = e.clientX;
      drag.current.yaw += dx * YAW_PER_PX;
      if (!drag.current.raf)
        drag.current.raf = requestAnimationFrame(flushYaw);
    },
    [flushYaw],
  );

  const endDrag = useCallback((e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }, []);

  return (
    <div
      className={
        "eav" + (className ? " " + className : "") + (dragging ? " is-dragging" : "")
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label={alt + " — drag to rotate"}
    >
      {dataUrl ? (
        <img className="eav__img" src={dataUrl} alt={alt} draggable={false} />
      ) : (
        <div className="eav__loading" role="status" aria-label="Rendering avatar…">
          <span className="eav__spinner" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
