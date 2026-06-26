import { useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./stprofilemobilenavigationroot.css";

const PersonGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const WorkGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
  </svg>
);
const BrushGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37-1.34-1.34a.996.996 0 0 0-1.41 0L9 12l3 3 8.71-8.71c.39-.39.39-1.02 0-1.41z" />
  </svg>
);
const GroupsGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
  </svg>
);
const LandscapeGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
  </svg>
);
const PhotoGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
);
const GiftGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
  </svg>
);

const TAB_ICONS = {
  overview: PersonGlyph,
  assets: WorkGlyph,
  creations: BrushGlyph,
  communities: GroupsGlyph,
  places: LandscapeGlyph,
  photos: PhotoGlyph,
  "referral-rewards": GiftGlyph,
};

const ChevronRightGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);
const ArrowBackGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="m11.67 3.87 1.41 1.41L7.16 11.2H21v2H7.16l5.92 5.92-1.41 1.41L3.34 12l8.33-8.13z" transform="scale(0.85) translate(2 2)" />
    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);
const CopyGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);
const PeopleGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);
const ShareGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
  </svg>
);
const PersonAddGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const LogoutGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const MEMBER_TABS = [
  { id: "overview", label: "Overview" },
  { id: "creations", label: "Creations" },
  { id: "communities", label: "Communities" },
  { id: "places", label: "Places" },
  { id: "photos", label: "Photos" },
];

const MY_TABS = [
  { id: "overview", label: "Overview" },
  { id: "assets", label: "My Assets" },
  { id: "communities", label: "My Communities" },
  { id: "places", label: "My Places" },
  { id: "photos", label: "My Photos" },
  { id: "referral-rewards", label: "Referral Rewards" },
];

const PROFILE = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  nameColor: "#FF8362",
  friendsCount: 42,
  mutualCount: 3,
  mutualColors: ["#73d3d3", "#b05cff", "#34ce76"],
};

function shortenAddress(value) {
  if (value.length < 12) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

function TabRow({ tab, active, onSelect }) {
  const Leading = TAB_ICONS[tab.id];
  return (
    <button
      type="button"
      className={"smnr__tab" + (active ? " is-active" : "")}
      onClick={() => onSelect(tab.id)}
    >
      <span className="smnr__tableading">{Leading ? <Leading /> : null}</span>
      <span className="smnr__tablabel">{tab.label}</span>
      <span className="smnr__tabchevron"><ChevronRightGlyph /></span>
    </button>
  );
}

export default function StProfileMobileNavigationRoot({
  profile = PROFILE,
  isOwnProfile = false,
}) {
  const tabs = isOwnProfile ? MY_TABS : MEMBER_TABS;
  const [openTab, setOpenTab] = useState(null);
  const [addrCopied, setAddrCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const initial = (profile.name || profile.address).charAt(0).toUpperCase();
  const activeTab = openTab ? tabs.find((t) => t.id === openTab) : null;

  function copyAddress() {
    setAddrCopied(true);
    setTimeout(() => setAddrCopied(false), 1500);
  }
  function shareProfile() {
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1500);
  }

  return (
    <SitesChrome active="legal" overlayNav>
      <div className="smnr">
        <div className="smnr__page">
          <div className="smnr__frame">
            {activeTab ? (
              <>
                <div className="smnr__tabheader">
                  <button
                    type="button"
                    className="smnr__back"
                    onClick={() => setOpenTab(null)}
                    aria-label="Back"
                  >
                    <span className="smnr__backicon"><ArrowBackGlyph /></span>
                    <span className="smnr__backlabel">{activeTab.label}</span>
                  </button>
                </div>
                <div className="smnr__subbody">
                  <span className="smnr__subicon" aria-hidden="true">
                    {(() => {
                      const Leading = TAB_ICONS[activeTab.id];
                      return Leading ? <Leading /> : null;
                    })()}
                  </span>
                  <p className="smnr__subhint">
                    {activeTab.label} renders here as its own sub-screen. Tap the back
                    chevron to return to the navigation root.
                  </p>
                </div>
              </>
            ) : (
              <div className="smnr__nav">
                <div className="smnr__userblock">
                  <span
                    className="smnr__avatar"
                    style={{ background: profile.nameColor }}
                    aria-hidden="true"
                  >
                    <span className="smnr__avatarinitial">{initial}</span>
                  </span>
                  <div className="smnr__usercol">
                    <span className="smnr__username">{profile.name || profile.address}</span>
                    <div className="smnr__addrrow">
                      <span className="smnr__addrtext">{shortenAddress(profile.address)}</span>
                      <button
                        type="button"
                        className="smnr__copybtn"
                        aria-label="Copy address"
                        title={addrCopied ? "Address copied!" : "Copy address"}
                        onClick={copyAddress}
                      >
                        <CopyGlyph />
                      </button>
                    </div>
                  </div>
                </div>

                {isOwnProfile ? (
                  <div className="smnr__ctarow">
                    <button type="button" className="smnr__cta">
                      <PeopleGlyph />
                      {profile.friendsCount} Friends
                    </button>
                    <button type="button" className="smnr__cta" onClick={shareProfile}>
                      <ShareGlyph />
                      {shareCopied ? "Link Copied!" : "Share Profile"}
                    </button>
                  </div>
                ) : (
                  <>
                    {profile.mutualCount > 0 ? (
                      <button
                        type="button"
                        className="smnr__mutual"
                        aria-label={`${profile.mutualCount} Mutual`}
                      >
                        <span className="smnr__mutualstack">
                          {profile.mutualColors
                            .slice(0, Math.min(3, profile.mutualCount))
                            .map((color, i) => (
                              <span
                                key={i}
                                className="smnr__mutualdot"
                                style={{ background: color, marginLeft: i ? -8 : 0 }}
                                aria-hidden="true"
                              />
                            ))}
                        </span>
                        <span className="smnr__mutualtext">
                          <strong>{profile.mutualCount}</strong> Mutual
                        </span>
                      </button>
                    ) : null}
                    <div className="smnr__ctarow">
                      <button type="button" className="smnr__cta smnr__cta--primary">
                        <PersonAddGlyph />
                        Add friend
                      </button>
                    </div>
                  </>
                )}

                <div className="smnr__divider" aria-hidden="true" />

                <div className="smnr__tablist">
                  {tabs.map((tab) => (
                    <TabRow key={tab.id} tab={tab} active={false} onSelect={setOpenTab} />
                  ))}
                </div>

                {isOwnProfile ? (
                  <button type="button" className="smnr__logout">
                    <span className="smnr__tableading">
                      <LogoutGlyph />
                    </span>
                    <span className="smnr__tablabel">Logout</span>
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </SitesChrome>
  );
}
