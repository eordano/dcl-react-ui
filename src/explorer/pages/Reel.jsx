import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import "./reel.css";

const STORAGE_MAX = 500;

export default function Reel() {
  const [tab, setTab] = useState("gallery");
  const total = 0;
  const pct = Math.round((total / STORAGE_MAX) * 100);

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="rl">
        <div className="rl__head">
          <h1 className="rl__title">Gallery</h1>
          <div className="rl__storage">
            <div className="rl__storagetxt">
              Storage <b>{total}</b>/{STORAGE_MAX} photos taken
            </div>
            <div className="rl__storagebar">
              <span className="rl__storagefill" style={{ width: pct + "%" }} />
            </div>
          </div>
        </div>

        <div className="rl__body">
          <div className="rl__empty">
            <div className="rl__emptyicon">
              <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                <defs>
                  <linearGradient id="rl-emptygrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff2d8e" />
                    <stop offset="1" stopColor="#a524b3" />
                  </linearGradient>
                </defs>
                <rect x="2.5" y="4.5" width="19" height="15" rx="4" fill="none" stroke="url(#rl-emptygrad)" strokeWidth="2" />
                <circle cx="8.2" cy="9.6" r="1.9" fill="url(#rl-emptygrad)" />
                <path d="M3.5 18.5l5.2-5.4 3.5 3.6 3.6-3.7 4.7 4.9" fill="none" stroke="url(#rl-emptygrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="rl__emptytitle">There are no photos yet</div>
            <div className="rl__emptynote">
              Use the <b>camera</b> to save incredible memories with your friends!
            </div>
          </div>
        </div>
      </div>
    </ExploreChrome>
  );
}
