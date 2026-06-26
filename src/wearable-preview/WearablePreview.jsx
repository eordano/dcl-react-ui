import { useEffect, useRef, useState } from "react";

/**
 * Size-aware Decentraland avatar preview as a plain React component (no iframe).
 *
 *   <WearablePreview profile="0x..." />
 *   <WearablePreview urns={[...]} body="urn:...:BaseFemale" />
 *   <WearablePreview model="https://.../model.glb" />
 *
 * three.js is loaded lazily (dynamic import of ./avatar.js) the first time a
 * preview mounts, so it's a separate chunk and never weighs down the host's main
 * bundle. SSR-safe: the WebGL scene is only created in an effect (client-only);
 * the server just renders the sized container.
 */
export default function WearablePreview({
  profile,
  urns,
  body,
  outfit,
  model,
  emote,
  base,
  // camera / view
  zoom,
  yaw,
  pitch,
  fov,
  targetY,
  controls = true,
  pan = false,
  spin = true,
  spinSpeed,
  // a CSS color makes the canvas opaque; omit for a transparent background
  background,
  className,
  style,
  onStatus,
}) {
  const ref = useRef(null);
  const [status, setStatus] = useState("loading");

  // re-init only when the avatar identity / view changes
  const key = JSON.stringify([
    profile, Array.isArray(urns) ? urns : urns ?? null, body, outfit ?? null, model, emote, base,
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div
      ref={ref}
      className={className}
      data-status={status}
      style={{ width: "100%", height: "100%", position: "relative", ...style }}
    />
  );
}
