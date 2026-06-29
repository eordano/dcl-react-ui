import { useState } from "react";
import "./primitives.css";

export const rarityColor = (r) => `var(--rar-${r})`;
export const rarityBg = (r) => `var(--rar-bg-${r})`;
export const rarityVars = (r) => ({ "--r": rarityColor(r), "--rb": rarityBg(r) });

export function hueFromSeed(seed = "") {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

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
