import { useState } from "react";
import Tabs from "../components/Tabs.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./chatprofile.css";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "photos", label: "Photos" },
];

const BADGES = [
  { name: "Open For Business", tint: "#e23a6a", shape: "x" },
  { name: "Emotionally Started", tint: "#3fc06a", shape: "gem" },
  { name: "Fashionista", tint: "#cfd6df", shape: "card" },
  { name: "Traveler", tint: "#c9a24a", shape: "x" },
  { name: "Open Sky", tint: "#8a5bd6", shape: "gem" },
  { name: "Trooper", tint: "#3a3f4a", shape: "x" },
  { name: "Gift Giver", tint: "#e2643a", shape: "card" },
  { name: "Collector", tint: "#9aa3b0", shape: "x" },
  { name: "Voyager", tint: "#b06cf2", shape: "gem" },
];

const INFO = [
  { icon: "⚲", label: "Gender", value: "Male" },
  { icon: "⚥", label: "Pronouns", value: "He / Him" },
  { icon: "🗣", label: "Language", value: "French" },
  { icon: "💼", label: "Profession", value: "Multiple" },
  { icon: "🏢", label: "Employment Status", value: "Indie" },
  { icon: "★", label: "Favorite Hobby", value: "building stuff" },
];

const LINKS = ["Introduction", "X", "An Yē La"];

const EQUIPPED = [
  { name: "Knit Beanie", rar: "#3a8fff" },
  { name: "Studio Tee", rar: "#3a8fff" },
  { name: "Patch Shorts", rar: "#3a8fff" },
  { name: "City Sneakers", rar: "#ff6a3a" },
  { name: "Neon Shades", rar: "#a05bff" },
  { name: "Skate Backpack", rar: "#a05bff" },
];

function VerifiedCheck() {
  return (
    <svg className="cp2__verified" viewBox="0 0 24 24" aria-label="Verified" width="16" height="16">
      <path
        fill="#3a8fff"
        d="M12 1.5l2.36 1.7 2.9-.28 1.13 2.68 2.68 1.13-.28 2.9 1.7 2.37-1.7 2.36.28 2.9-2.68 1.13-1.13 2.68-2.9-.28L12 22.5l-2.36-1.7-2.9.28-1.13-2.68-2.68-1.13.28-2.9L1.5 12l1.7-2.37-.28-2.9 2.68-1.13L6.74 2.92l2.9.28L12 1.5z"
      />
      <path
        fill="none" stroke="#fff" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        d="M8.5 12.2l2.4 2.4 4.6-4.9"
      />
    </svg>
  );
}

export default function ChatProfile({ avatarPreview = null }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="cp2__backdrop">
      <div className="cp2">
        <div className="cp2__topbar">
          <button className="cp2__accept">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg>
            ACCEPT FRIEND
          </button>
          <button className="cp2__icon" aria-label="React">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8" strokeLinecap="round" /><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" /></svg>
          </button>
          <button className="cp2__icon" aria-label="Call">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 3.5l3 .5 1 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1 .5 3a2 2 0 0 1-2.2 2.2A16 16 0 0 1 4.3 5.7 2 2 0 0 1 6.5 3.5z" /></svg>
          </button>
          <button className="cp2__icon" aria-label="More">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
          </button>
          <button className="cp2__icon cp2__icon--close" aria-label="Close" data-sb-linkto="Explorer/Frames/Chat">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="cp2__preview">
          {avatarPreview ? (
            avatarPreview
          ) : (
            <Avatar size={200} name="sobga" className="cp2__mannequin" />
          )}
        </div>

        <div className="cp2__main">
          <header className="cp2__head">
            <div className="cp2__idline">
              <h2 className="cp2__name">sobga</h2>
              <VerifiedCheck />
            </div>
            <div className="cp2__addrline">
              <span className="cp2__addr">0x565…bc465</span>
              <button className="cp2__copy" aria-label="Copy address">⧉</button>
            </div>
            <div className="cp2__mutual">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5.6M17.5 19a5.5 5.5 0 0 0-3-4.9" /></svg>
              2 Mutual
            </div>
          </header>

          <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />

          <div className="cp2__modules">
            <section className="cp2__mod">
              <h3 className="cp2__modtitle">Badges</h3>
              <div className="cp2__badges">
                {BADGES.map((b) => (
                  <div
                    className={"cp2__badge cp2__badge--" + b.shape}
                    key={b.name}
                    title={b.name}
                    style={{ "--t": b.tint }}
                    data-sb-linkto="Explorer/Pages/BadgesDetails"
                  >
                    <span className="cp2__badgeart" />
                  </div>
                ))}
              </div>
            </section>

            <section className="cp2__mod">
              <h3 className="cp2__modtitle">About me</h3>
              <p className="cp2__about">Hey,<br />Let's build the metaverse together.</p>

              <div className="cp2__info">
                {INFO.map((f) => (
                  <div className="cp2__field" key={f.label}>
                    <span className="cp2__fieldicon" aria-hidden="true">{f.icon}</span>
                    <div className="cp2__fieldbody">
                      <div className="cp2__fieldlabel">{f.label}</div>
                      <div className="cp2__fieldvalue">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="cp2__mod">
              <h3 className="cp2__modtitle">Links</h3>
              <div className="cp2__links">
                {LINKS.map((l) => (
                  <a className="cp2__link" key={l} href="#">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7L11.3 7" /><path d="M14 10a4 4 0 0 0-5.7 0L5.7 12.6a4 4 0 0 0 5.7 5.7l1.3-1.3" /></svg>
                    {l}
                  </a>
                ))}
              </div>
            </section>

            <section className="cp2__mod">
              <h3 className="cp2__modtitle">Equipped items</h3>
              <div className="cp2__equipped">
                {EQUIPPED.map((it) => (
                  <div className="cp2__eqcard" key={it.name} style={{ "--rar": it.rar }}>
                    <div className="cp2__eqart" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
