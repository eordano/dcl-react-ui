import { useCallback, useEffect, useState } from "react";
import Tabs from "../components/Tabs.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import { hexToColor3 } from "../../data/catalyst/backpack.js";
import { catalystBase, signedFetch } from "../../data/catalyst/client.js";
import Lightbox from "../components/Lightbox.jsx";
import "./passport.css";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "badges", label: "Badges" },
  { id: "photos", label: "Photos" },
];

const BASE_RAR = "#b7c0cc";

function EditPencil() {
  return (
    <button
      className="ps__edit"
      aria-label="Edit"
      disabled
      title="Profile editing isn't available here yet"
    >
      ✎
    </button>
  );
}

export default function Passport({
  avatarPreview = null,
  identity = null,
  equipped = [],
  badges = [],
  base = null,
  onClose,
}) {
  const [tab, setTab] = useState("overview");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const ppAddress = identity?.address || null;
  const loadPhotos = useCallback(async () => {
    if (!ppAddress) return;
    setPhotosLoading(true);
    try {
      const { status, body } = await signedFetch(
        `${catalystBase()}/camera-reel/api/users/${ppAddress}/images`,
        { method: "GET" }
      );
      if (status >= 200 && status < 300) {
        const data = JSON.parse(body);
        setPhotos(Array.isArray(data?.images) ? data.images : []);
      }
    } catch {
    } finally {
      setPhotosLoading(false);
    }
  }, [ppAddress]);

  useEffect(() => {
    if (tab === "photos") loadPhotos();
  }, [tab, loadPhotos]);

  const displayName = identity?.name || base?.name || "Guest";

  function startEditName() {
    setNameDraft(identity?.name || base?.name || "");
    setEditingName(true);
  }

  function saveName() {
    const next = nameDraft.trim();
    setEditingName(false);
    if (!next || next === (identity?.name || base?.name || "")) return;
    try {
      window.dclBridge?.send?.("SetAvatar", {
        base: {
          bodyShapeUrn:
            base?.bodyShape ??
            "urn:decentraland:off-chain:base-avatars:BaseMale",
          name: next,
          skinColor: hexToColor3(base?.skinColor ?? "#c98c63"),
          hairColor: hexToColor3(base?.hairColor ?? "#5c3824"),
          eyesColor: hexToColor3(base?.eyeColor ?? "#3a6ea5"),
        },
      });
    } catch {
    }
  }

  return (
    <div className="ep__backdrop">
      <div className="ps">
        <button className="ep__close ps__close" aria-label="Close" onClick={onClose}>×</button>

        <div className={"ps__preview" + (avatarPreview ? "" : " ps__preview--empty")}>
          {avatarPreview ? (
            avatarPreview
          ) : (
            <Avatar size={184} name={displayName} className="ps__avatar" />
          )}
        </div>

        <div className="ps__main">
          <header className="ps__head">
            <div className="ps__id">
              <div className="ps__idline">
                {editingName ? (
                  <input
                    className="ps__nameedit"
                    aria-label="Edit name"
                    autoFocus
                    maxLength={15}
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    onBlur={saveName}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveName();
                      else if (e.key === "Escape") setEditingName(false);
                    }}
                    style={{
                      font: "inherit",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#fff",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      borderRadius: 6,
                      padding: "2px 8px",
                      width: "12ch",
                      maxWidth: "100%",
                    }}
                  />
                ) : (
                  <>
                    <h2 className="ps__name">{displayName}{identity?.tag ? <span className="ps__tag">{identity.tag}</span> : null}</h2>
                    <button className="ps__icon" aria-label="Edit name" onClick={startEditName}>✎</button>
                  </>
                )}
              </div>
              {(identity?.wallet || identity?.address) ? (
                <div className="ps__addrline">
                  <span className="ps__addr">{identity.wallet || identity.address}</span>
                  <button
                    className="ps__icon ps__icon--sm"
                    aria-label="Copy address"
                    title="Copy address"
                    onClick={() => {
                      const addr = identity?.address || identity?.wallet;
                      if (addr) {
                        try {
                          navigator.clipboard?.writeText(addr);
                        } catch {
                        }
                      }
                    }}
                  >
                    ⧉
                  </button>
                </div>
              ) : null}
            </div>
            <button className="ps__claim" disabled title="Name claiming isn't available here yet">
              <svg className="ps__claimicon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 1.5l2.36 1.7 2.9-.28 1.13 2.68 2.68 1.13-.28 2.9 1.7 2.37-1.7 2.36.28 2.9-2.68 1.13-1.13 2.68-2.9-.28L12 22.5l-2.36-1.7-2.9.28-1.13-2.68-2.68-1.13.28-2.9L1.5 12l1.7-2.37-.28-2.9 2.68-1.13L6.74 2.92l2.9.28L12 1.5z"
                />
                <path
                  fill="none" stroke="#ff4d63" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                  d="M8.5 12.2l2.4 2.4 4.6-4.9"
                />
              </svg>
              CLAIM NAME
            </button>
          </header>

          <Tabs tabs={TABS} active={tab} onChange={setTab} variant="underline" />

          <div className="ps__modules">
            {tab === "photos" ? (
              photos.length > 0 ? (
                <div className="ps__photos">
                  {photos.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="ps__photo"
                      title={p.metadata?.dateTime || "Photo"}
                      onClick={() => setLightbox(p.url)}
                    >
                      <img src={p.thumbnailUrl || p.url} alt="Reel photo" loading="lazy" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="ps__empty">
                  {photosLoading ? "Loading photos…" : "No photos yet."}
                </p>
              )
            ) : (
            <>
            <section className="ps__mod">
              <h3 className="ps__modtitle">Badges</h3>
              {badges.length === 0 ? (
                <p className="ps__empty">No badges yet.</p>
              ) : (
                <div className="ps__badges">
                  {badges.map((b) => (
                    <div
                      className="ps__badge"
                      key={b.id}
                      title={b.tier ? `${b.name} — ${b.tier}` : b.name}
                    >
                      {b.image ? (
                        <img className="ps__badgeimg" src={b.image} alt={b.name} />
                      ) : (
                        <span className="ps__badgeinitial" aria-hidden="true">
                          {(b.name || "?").slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="ps__mod">
              <div className="ps__modhead">
                <h3 className="ps__modtitle">About me</h3>
                <EditPencil />
              </div>
              <p className="ps__empty">No intro.</p>
            </section>

            <section className="ps__mod">
              <div className="ps__modhead">
                <h3 className="ps__modtitle">Links</h3>
                <EditPencil />
              </div>
              <p className="ps__empty">No links.</p>
            </section>

            <section className="ps__mod">
              <h3 className="ps__modtitle">Equipped items</h3>
              <div className="ps__equipped">
                {equipped.length === 0 ? (
                  <p className="ps__empty">No items equipped.</p>
                ) : (
                  equipped.map((it) => (
                    <div className="ps__eqcard" key={it.urn} style={{ "--rar": BASE_RAR }}>
                      <div className="ps__eqart">
                        {it.thumbnail ? (
                          <img
                            src={it.thumbnail}
                            alt={it.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        ) : (
                          <span className="ps__eqcat" aria-hidden="true">◇</span>
                        )}
                      </div>
                      <div className="ps__eqname u-truncate" title={it.name}>{it.name}</div>
                      <span className="ps__eqrarity">
                        {(it.rarity || "base").toUpperCase()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
            </>
            )}
          </div>
        </div>
      </div>
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
