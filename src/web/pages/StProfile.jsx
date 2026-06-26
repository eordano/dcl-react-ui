import SitesChrome from "../frames/SitesChrome.jsx";
import "./stprofile.css";

import NftCard from "../../marketplace/components/NftCard.jsx";

const PROFILE = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  hasClaimedName: true,
  nameColor: "#FF8362",
  mutualCount: 3,
  badges: [
    { id: "b1", name: "Open for Business", grad: "linear-gradient(135deg,#ffc95b,#ff743a)" },
    { id: "b2", name: "Land Architect", grad: "linear-gradient(135deg,#b05cff,#438fff)" },
    { id: "b3", name: "Emotionista", grad: "linear-gradient(135deg,#ff4bed,#982de2)" },
    { id: "b4", name: "Wearable Designer", grad: "linear-gradient(135deg,#34ce76,#73d3d3)" },
    { id: "b5", name: "Event Enthusiast", grad: "linear-gradient(135deg,#ff2d55,#ff743a)" },
  ],
  bio: "Builder, collector and occasional DJ. Hanging out in Decentraland since the beginning — find me at my plaza most evenings. Always up for a scene jam.",
  info: [
    { key: "country", label: "Country", value: "Argentina", icon: "globe" },
    { key: "language", label: "Language", value: "Spanish, English", icon: "translate" },
    { key: "pronouns", label: "Pronouns", value: "they/them", icon: "pronouns" },
    { key: "gender", label: "Gender", value: "Non-binary", icon: "gender" },
    { key: "profession", label: "Profession", value: "Game Designer", icon: "games" },
    { key: "favorite_hobby", label: "Favorite hobby", value: "Building scenes", icon: "heart" },
  ],
  links: [
    { title: "Twitter", url: "#" },
    { title: "personal-site.xyz", url: "#" },
  ],
  equipped: [
    { id: "w1", name: "Cyber Halo", collection: "Neon Dreams", price: "350", rarity: "epic" },
    { id: "w2", name: "Aurora Jacket", collection: "Polar Series", price: "1,200", rarity: "legendary" },
    { id: "w3", name: "Glitch Sneakers", collection: "Static Lab", price: "85", rarity: "rare" },
    { id: "w4", name: "Founders Crown", collection: "DCL Originals", rarity: "mythic" },
  ],
};

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "creations", label: "Creations" },
  { id: "communities", label: "Communities" },
  { id: "places", label: "Places" },
  { id: "photos", label: "Photos" },
];

function truncateAddress(addr) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

const WalletGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm14 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const CopyGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const VerifiedGlyph = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
    <path d="m6 12 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PersonAddGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <circle cx="9" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M18 8v6M15 11h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const MoreGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="5" r="1.6" fill="currentColor" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <circle cx="12" cy="19" r="1.6" fill="currentColor" />
  </svg>
);
const LinkGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1.5-1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const INFO_GLYPHS = {
  globe: (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.8 10h14.4M10 2.8c2 2 2 12.4 0 14.4M10 2.8c-2 2-2 12.4 0 14.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  translate: (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M3 5h7M6.5 3v2M8.5 5c0 4-3 6.5-5.5 7.5M5 8c.5 2 2.5 3.5 4.5 4.2M11 17l3.2-8 3.2 8M12.2 14h4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pronouns: (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="8.4" cy="7.5" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="5.4" cy="12.5" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="11.5" cy="12.5" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  gender: (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="9" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 13.2V18M7.5 16h5M13.5 5.5 16.5 2.5M14 2.5h2.5V5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  games: (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <rect x="2" y="6.5" width="16" height="8.5" rx="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 9.5v3M4 11h3M13 10h.01M15.5 11.5h.01" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M10 16.5S3 12.5 3 7.8A3.6 3.6 0 0 1 10 6a3.6 3.6 0 0 1 7 1.8c0 4.7-7 8.7-7 8.7Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

export default function StProfile({
  profile = PROFILE,
  tabs = TABS,
  activeTab = "overview",
  isOwnProfile = false,
  loading = false,
  avatarPreview = null,
}) {
  const initial = (profile.name || profile.address).charAt(0).toUpperCase();

  return (
    <SitesChrome active="legal" overlayNav>
      <div className="stp">
        <div className="stp__content">
          <div className="stp__card">
            <header className="stp__header">
              <div className="stp__identity">
                <span
                  className="stp__avatar"
                  style={{ background: profile.nameColor }}
                  aria-hidden="true"
                >
                  <span className="stp__avatarinitial">{initial}</span>
                </span>
                <div className="stp__nameblock">
                  <div className="stp__namerow">
                    <span className="stp__name" style={{ color: profile.nameColor }}>
                      {profile.name}
                    </span>
                    {profile.hasClaimedName ? (
                      <span
                        className="stp__verified"
                        style={{ background: profile.nameColor }}
                        title="Verified"
                      >
                        <VerifiedGlyph />
                      </span>
                    ) : (
                      <span className="stp__discriminator">
                        #{profile.address.slice(-4)}
                      </span>
                    )}
                  </div>
                  <div className="stp__addrrow">
                    <span className="stp__walleticon"><WalletGlyph /></span>
                    <span className="stp__addr">{truncateAddress(profile.address)}</span>
                    <button type="button" className="stp__copy" aria-label="Copy address">
                      <CopyGlyph />
                    </button>
                  </div>
                </div>
              </div>

              <div className="stp__actions">
                {!isOwnProfile && profile.mutualCount > 0 ? (
                  <button type="button" className="stp__mutual" aria-label={`${profile.mutualCount} Mutual`}>
                    <span className="stp__mutualstack">
                      {Array.from({ length: Math.min(3, profile.mutualCount) }).map((_, i) => (
                        <span
                          key={i}
                          className="stp__mutualpic"
                          style={{
                            background: ["#73d3d3", "#ff8362", "#b05cff"][i % 3],
                            marginLeft: i ? -8 : 0,
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </span>
                    <span className="stp__mutualtext">
                      <strong>{profile.mutualCount}</strong> Mutual
                    </span>
                  </button>
                ) : null}
                <button type="button" className="stp__cta">
                  <PersonAddGlyph />
                  Add friend
                </button>
                <button type="button" className="stp__more" aria-label="More actions">
                  <MoreGlyph />
                </button>
              </div>
            </header>

            <nav className="stp__tabs" aria-label="Profile sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={"stp__tab" + (tab.id === activeTab ? " is-active" : "")}
                  aria-current={tab.id === activeTab ? "page" : undefined}
                >
                  {tab.label}
                  {tab.id === activeTab ? <span className="stp__tabbar" aria-hidden="true" /> : null}
                </button>
              ))}
            </nav>

            <div className="stp__body">
              <aside className="stp__aside">
                <div className="stp__render" aria-label="Avatar preview">
                  {avatarPreview ? (
                    avatarPreview
                  ) : (
                    <>
                      <span className="stp__renderglow" aria-hidden="true" />
                      <span
                        className="stp__renderfig"
                        style={{ background: profile.nameColor }}
                        aria-hidden="true"
                      >
                        {initial}
                      </span>
                    </>
                  )}
                </div>
              </aside>

              <div className="stp__main">
                {loading ? (
                  <div className="stp__surface stp__loadingrow">
                    <span className="u-skel" style={{ width: "100%" }}>
                      <span className="u-skel__line" style={{ width: "40%" }} />
                      <span className="u-skel__line" style={{ width: "90%" }} />
                      <span className="u-skel__line" style={{ width: "75%" }} />
                    </span>
                  </div>
                ) : (
                  <>
                    <section className="stp__surface">
                      <div className="stp__section">
                        <h2 className="stp__sectitle">Badges</h2>
                        {profile.badges.length > 0 ? (
                          <div className="stp__badges">
                            {profile.badges.map((b) => (
                              <span
                                key={b.id}
                                className="stp__badge"
                                style={{ background: b.grad }}
                                title={b.name}
                                tabIndex={0}
                                aria-label={b.name}
                              >
                                <span className="stp__badgeinit">{b.name.charAt(0)}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="stp__empty">
                            No badges yet. Jump in world and start collecting badges!
                          </p>
                        )}
                      </div>

                      <div className="stp__section">
                        <h2 className="stp__sectitle">About</h2>
                        {profile.bio ? (
                          <p className="stp__bio">{profile.bio}</p>
                        ) : (
                          <p className="stp__empty">This member has not added a bio yet.</p>
                        )}
                        {profile.info.length > 0 ? (
                          <div className="stp__infogrid">
                            {profile.info.map((f) => (
                              <div key={f.key} className="stp__infoitem">
                                <span className="stp__infolabel">
                                  <span className="stp__infoicon">{INFO_GLYPHS[f.icon]}</span>
                                  {f.label}
                                </span>
                                <span className="stp__infovalue">{f.value}</span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {profile.links.length > 0 ? (
                        <div className="stp__section">
                          <h2 className="stp__sectitle">Links</h2>
                          <div className="stp__links">
                            {profile.links.map((l) => (
                              <a
                                key={l.title}
                                className="stp__linkpill"
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="stp__linkicon"><LinkGlyph /></span>
                                {l.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </section>

                    <section className="stp__surface">
                      <div className="stp__section">
                        <h2 className="stp__sectitle">Equipped items</h2>
                        {profile.equipped.length > 0 ? (
                          <div className="stp__equipped">
                            {profile.equipped.map((item) => (
                              <NftCard
                                key={item.id}
                                name={item.name}
                                collection={item.collection}
                                price={item.price}
                                rarity={item.rarity}
                                network="polygon"
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="stp__empty">No equipped items yet.</p>
                        )}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SitesChrome>
  );
}
