import { useState } from "react";
import Tabs from "../components/Tabs.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./passportphotos.css";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "photos", label: "Photos" },
];

const PHOTOS = [];

export default function PassportPhotos({ avatarPreview = null }) {
  const [tab, setTab] = useState("photos");

  return (
    <div className="ep__backdrop">
      <div className="pp2">
        <button className="pp2__close" aria-label="Close">✕</button>

        <div className="pp2__preview">
          {avatarPreview ? (
            avatarPreview
          ) : (
            <Avatar size={184} name="Evaristo" className="pp2__avatar" />
          )}
        </div>

        <div className="pp2__main">
          <header className="pp2__head">
            <div className="pp2__ident">
              <div className="pp2__idline">
                <h2 className="pp2__name">Evaristo<span className="pp2__tag">#d5f0</span></h2>
                <button className="pp2__icon" aria-label="Edit name">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path d="M4 16.5 14.5 6l3.5 3.5L7.5 20H4v-3.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="m13 7.5 3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="pp2__addr">
                0x34…7d95
                <button className="pp2__icon" aria-label="Copy address">
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <button className="pp2__claim">
              <svg className="pp2__claimicon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".7" />
                <path d="M12 9.2v5.6M9.7 12h4.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              CLAIM NAME
            </button>
          </header>

          <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />

          <div className="pp2__pane">
            {PHOTOS.length === 0 ? (
              <div className="pp2__empty">
                <div className="pp2__emptyicon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                    <path d="M4.5 3.5h15A2.5 2.5 0 0 1 22 6v12a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18V6a2.5 2.5 0 0 1 2.5-2.5Zm0 14.7 4.4-4.4a1 1 0 0 1 1.4 0l2 2 3.6-3.6a1 1 0 0 1 1.4 0l3.3 3.3V6a.5.5 0 0 0-.5-.5H4.5A.5.5 0 0 0 4 6v12c0 .07.01.14.04.2ZM8.5 7.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                  </svg>
                </div>
                <div className="pp2__emptytext">There are no photos to show yet</div>
              </div>
            ) : (
              <div className="pp2__grid">
                {PHOTOS.map((hue, i) => (
                  <span className="pp2__photo" key={i} style={{ "--hue": hue }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
