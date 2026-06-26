import { useState } from "react";
import "./primitives.css";

export const rarityColor = (r) => `var(--rar-${r})`;
export const rarityBg = (r) => `var(--rar-bg-${r})`;
export const rarityVars = (r) => ({ "--r": rarityColor(r), "--rb": rarityBg(r) });

// Deterministic hue (0-359) from an arbitrary seed (name/address/etc.) so a
// missing-image avatar still gets a stable, distinct colour instead of nothing.
export function hueFromSeed(seed = "") {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

// Avatar ALWAYS renders a sensible visual. Layering, back-to-front:
//   1. gradient/colour disc (CSS .u-avatar background — never blank)
//   2. initials, when a name/initials/seed is supplied
//   3. the image, when a non-broken `src` is supplied (hidden on load error,
//      revealing the gradient + initials underneath)
//   4. caller `children` + status dot
// With no props it is still a coloured gradient disc, so it can never be empty.
export function Avatar({
  hue,
  size = 40,
  status,
  src,
  name,
  initials,
  seed,
  alt = "",
  children,
  className = "",
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const seedStr = seed ?? name ?? "";
  const resolvedHue = hue ?? (seedStr ? hueFromSeed(seedStr) : 280);
  const label = (initials ?? (name ? name.trim().slice(0, 2) : "")).toUpperCase();
  const showImg = Boolean(src) && failedSrc !== src;

  return (
    <span className={"u-avatar " + className} style={{ "--hue": resolvedHue, "--sz": size + "px" }}>
      {label && !children ? (
        <span className="u-avatar__initials" aria-hidden="true">{label}</span>
      ) : null}
      {showImg ? (
        <img
          className="u-avatar__img"
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(src)}
        />
      ) : null}
      {status && <StatusDot status={status} ring />}
      {children}
    </span>
  );
}

export function StatusDot({ status = "online", ring = false }) {
  return <span className={"u-dot u-dot--" + status + (ring ? " u-dot--ring" : "")} />;
}

export function Badge({ tone = "ruby", children }) {
  return children ? (
    <span className={"u-badge" + (tone !== "ruby" ? " u-badge--" + tone : "")}>{children}</span>
  ) : null;
}

export function Pill({ variant = "default", children }) {
  return <span className={"u-pill u-pill--" + variant}>{children}</span>;
}

export function WalletChip({ address = "0x1…a92", onCopy }) {
  return <button type="button" className="u-wallet" onClick={onCopy}>{address} ⧉</button>;
}

export function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 ? 1 : 0) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(n % 1e3 ? 1 : 0) + "K";
  return String(n);
}

export function ProgressBar({ value = 0, danger = false }) {
  return (
    <span className="u-progress">
      <span className={danger ? "is-danger" : ""} style={{ width: Math.min(100, Math.max(0, value)) + "%" }} />
    </span>
  );
}

export function Skeleton({ lines = 2, width = 200 }) {
  return (
    <span className="u-skel" style={{ width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <span className="u-skel__line" key={i} style={{ width: 90 - i * 25 + "%" }} />
      ))}
    </span>
  );
}

export function Tooltip({ label, children }) {
  return <span className="u-tip">{children}<span className="u-tip__bubble">{label}</span></span>;
}
