import { useEffect, useRef } from "react";
import "./chmodalupdateavailable.css";

const COPY = {
  title: "Update Available",
  version: (version) => `Version: ${version}`,
  install: "Install now",
  autoRestart: "Creator Hub will auto-restart after the update.",
};

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </svg>
);

const InfoOutlinedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    />
  </svg>
);

const InfluenceArt = () => (
  <svg
    className="chmua__art"
    viewBox="0 0 496 428"
    role="img"
    aria-label="Update available"
  >
    <defs>
      <radialGradient id="chmua-sphere-a" cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#ffd27a" />
        <stop offset="55%" stopColor="#ff9b3d" />
        <stop offset="100%" stopColor="#e06f12" />
      </radialGradient>
      <radialGradient id="chmua-sphere-b" cx="35%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#ffd9c2" />
        <stop offset="55%" stopColor="#ff9e6e" />
        <stop offset="100%" stopColor="#e06a3a" />
      </radialGradient>
      <linearGradient id="chmua-pyr-big" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff63e6" />
        <stop offset="55%" stopColor="#d61ad6" />
        <stop offset="100%" stopColor="#8c0fb0" />
      </linearGradient>
      <linearGradient id="chmua-pyr-small" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff7bea" />
        <stop offset="100%" stopColor="#c016c0" />
      </linearGradient>
      <linearGradient id="chmua-hand" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9a6a4e" />
        <stop offset="60%" stopColor="#6e4733" />
        <stop offset="100%" stopColor="#4a2d1f" />
      </linearGradient>
      <radialGradient id="chmua-glow" cx="50%" cy="55%" r="60%">
        <stop offset="0%" stopColor="#ff5cd8" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#ff5cd8" stopOpacity="0" />
      </radialGradient>
    </defs>

    <ellipse cx="248" cy="250" rx="200" ry="120" fill="url(#chmua-glow)" />

    <circle cx="140" cy="70" r="22" fill="url(#chmua-sphere-a)" />
    <circle cx="216" cy="40" r="34" fill="url(#chmua-sphere-b)" />

    <polygon
      points="248,84 320,196 176,196"
      fill="url(#chmua-pyr-big)"
    />
    <polygon points="248,84 320,196 248,196" fill="#a30fc7" opacity="0.45" />

    <polygon
      points="150,128 198,196 102,196"
      fill="url(#chmua-pyr-small)"
    />
    <polygon points="150,128 198,196 150,196" fill="#9d12bd" opacity="0.45" />

    <path
      d="M40 196c-14 6-26 22-26 50 0 60 50 116 120 120 22 1 40-8 52-22-30-18-60-50-72-86-8-24-30-46-74-62z"
      fill="url(#chmua-hand)"
    />
    <path
      d="M456 196c14 6 26 22 26 50 0 60-50 116-120 120-22 1-40-8-52-22 30-18 60-50 72-86 8-24 30-46 74-62z"
      fill="url(#chmua-hand)"
    />
    <ellipse cx="150" cy="252" rx="74" ry="44" fill="#ff3ad0" opacity="0.7" />
    <ellipse cx="346" cy="252" rx="74" ry="44" fill="#ff3ad0" opacity="0.7" />
    <ellipse cx="150" cy="248" rx="50" ry="26" fill="#ffa6ef" opacity="0.55" />
    <ellipse cx="346" cy="248" rx="50" ry="26" fill="#ffa6ef" opacity="0.55" />
  </svg>
);

export default function ChModalUpdateAvailable({
  open = true,
  version = "1.7.0",
  onClose = () => {},
  onInstall = () => {},
}) {
  const paperRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    paperRef.current && paperRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev && prev.focus && prev.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="chmua" role="presentation">
      <div
        className="chmua__paper"
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title}
        tabIndex={-1}
        ref={paperRef}
      >
        <div className="chmua__box">
          <div className="chmua__close-container">
            <button
              type="button"
              className="chmua__close"
              aria-label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          <h2 className="chmua__title">{COPY.title}</h2>

          <p className="chmua__version">{COPY.version(version)}</p>

          <div className="chmua__image-button">
            <InfluenceArt />

            <div className="chmua__button-container">
              <button
                type="button"
                className="chmua__action-button"
                onClick={onInstall}
              >
                {COPY.install}
              </button>

              <div className="chmua__message">
                <InfoOutlinedIcon />
                <span className="chmua__message-text">{COPY.autoRestart}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
