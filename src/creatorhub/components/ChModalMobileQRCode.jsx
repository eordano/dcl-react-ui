import { useEffect, useState } from "react";
import "./chmodalmobileqrcode.css";

const COPY = {
  title: "Connect Mobile Debug Session",
  description: "Scan this QR code with your mobile device to preview the scene",
  disclaimer: "Both your computer and mobile device must be on the same network",
  waiting: "Waiting for mobile connection...",
};

const CancelRoundedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.59 13.59L12 13.41l-3.59 3.59-1.42-1.41L10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12l3.59 3.59-1.41 1.41z"
    />
  </svg>
);

function makeQrDataUri(seed = 0) {
  const N = 25;
  const M = 8;
  const dark = "#000000";
  let rng = 2166136261 ^ seed;
  const next = () => {
    rng ^= rng << 13;
    rng ^= rng >>> 17;
    rng ^= rng << 5;
    return ((rng >>> 0) % 1000) / 1000;
  };
  const inFinder = (x, y) => {
    const eye = (ox, oy) => {
      const dx = x - ox;
      const dy = y - oy;
      if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
      const border = dx === 0 || dy === 0 || dx === 6 || dy === 6;
      const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      return border || core;
    };
    const a = eye(0, 0);
    if (a !== null) return a;
    const b = eye(N - 7, 0);
    if (b !== null) return b;
    const c = eye(0, N - 7);
    if (c !== null) return c;
    return undefined;
  };
  const isQuiet = (x, y) =>
    (x <= 7 && y <= 7) ||
    (x >= N - 8 && y <= 7) ||
    (x <= 7 && y >= N - 8);
  let rects = "";
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const f = inFinder(x, y);
      let on;
      if (f !== undefined) {
        on = f;
      } else if (isQuiet(x, y)) {
        on = false;
      } else {
        on = next() > 0.52;
      }
      if (on) rects += `<rect x="${x * M}" y="${y * M}" width="${M}" height="${M}"/>`;
    }
  }
  const px = N * M;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 ${px} ${px}">` +
    `<rect width="${px}" height="${px}" fill="#ffffff"/>` +
    `<g fill="${dark}">${rects}</g>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function ChModalMobileQRCode({
  open = true,
  url = "http://192.168.1.42:8000/?realm=LocalPreview&position=0,0",
  qr = makeQrDataUri(7),
  sessions = [],
  simulateLive = false,
  onClose = () => {},
}) {
  const [liveSessions, setLiveSessions] = useState(sessions);

  useEffect(() => {
    setLiveSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    if (!open) {
      setLiveSessions(sessions);
      return undefined;
    }
    if (!simulateLive || sessions.length > 0) return undefined;
    const t = setTimeout(() => {
      setLiveSessions([{ id: 1, messageCount: 1284 }]);
    }, 1600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, simulateLive]);

  if (!open) return null;

  return (
    <div className="chqr" role="presentation">
      <div
        className="chqr__paper"
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title}
      >
        <div className="chqr__titlebar">
          <span className="chqr__back" aria-hidden="true" />
          <h2 className="chqr__title">{COPY.title}</h2>
          <button
            type="button"
            className="chqr__close"
            aria-label="close"
            onClick={onClose}
          >
            <CancelRoundedIcon />
          </button>
        </div>

        <p className="chqr__subtitle">{COPY.description}</p>

        <div className="chqr__content">
          <div className="chqr__qrcontainer">
            <img src={qr} alt="QR Code" className="chqr__qrimage" />
          </div>

          <span className="chqr__url">{url}</span>

          <div className="chqr__sessions">
            {liveSessions.length === 0 ? (
              <span className="chqr__status chqr__status--waiting">
                {COPY.waiting}
              </span>
            ) : (
              liveSessions.map((s) => (
                <div key={s.id} className="chqr__session">
                  <span className="chqr__badge chqr__badge--connected">
                    Session #{s.id}
                  </span>
                  <span className="chqr__messages">
                    {s.messageCount.toLocaleString()} entries
                  </span>
                </div>
              ))
            )}
          </div>

          <span className="chqr__disclaimer">{COPY.disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
