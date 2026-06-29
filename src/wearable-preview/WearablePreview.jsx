import { useEffect, useRef, useState } from "react";

export default function WearablePreview({
  profile,
  urns,
  body,
  outfit,
  model,
  emote,
  emoteNonce = 0,
  base,
  zoom,
  yaw,
  pitch,
  fov,
  targetY,
  controls = true,
  pan = false,
  spin = true,
  spinSpeed,
  background,
  className,
  style,
  onStatus,
}) {
  const ref = useRef(null);
  const sceneRef = useRef(null);
  const [status, setStatus] = useState("loading");

  const key = JSON.stringify([
    profile, Array.isArray(urns) ? urns : urns ?? null, body, outfit ?? null, model, base,
    zoom, yaw, pitch, fov, targetY, controls, pan, spin, spinSpeed, background,
  ]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let scene = null;
    let ro = null;
    let cancelled = false;
    setStatus("loading");

    import("./avatar.js")
      .then(({ createAvatarScene }) => {
        if (cancelled || !ref.current) return;
        scene = createAvatarScene(ref.current, {
          profile,
          urns,
          body,
          outfit,
          model,
          emote,
          base,
          zoom,
          yaw,
          pitch,
          fov,
          targetY,
          controls,
          pan,
          spin,
          spinSpeed,
          background,
          onStatus: (s) => {
            if (cancelled) return;
            setStatus(s);
            onStatus?.(s);
          },
        });
        sceneRef.current = scene;
        ro = new ResizeObserver(() => scene && scene.resize());
        ro.observe(ref.current);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[WearablePreview]", err);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
      if (ro) ro.disconnect();
      if (scene) scene.dispose();
      sceneRef.current = null;
    };
  }, [key]);

  useEffect(() => {
    sceneRef.current?.setEmote?.(emote);
  }, [emote, emoteNonce]);

  return (
    <div
      ref={ref}
      className={className}
      data-status={status}
      style={{ width: "100%", height: "100%", position: "relative", ...style }}
    />
  );
}
