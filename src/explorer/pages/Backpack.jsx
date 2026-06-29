import { useEffect, useMemo, useState } from "react";
import { asset } from "../../asset.js";
import SearchField from "../../atoms/SearchField.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import { hexToColor3, baseItemUrn } from "../../data/catalyst/backpack.js";
import "./backpack.css";

const SLOTS = [
  { id: "body_shape", label: "Body" },
  { id: "hair", label: "Hair" },
  { id: "eyebrows", label: "Eyebrows" },
  { id: "eyes", label: "Eyes" },
  { id: "mouth", label: "Mouth" },
  { id: "facial_hair", label: "Facial Hair" },
  { id: "upper_body", label: "Upper Body" },
  { id: "hands_wear", label: "Handwear" },
  { id: "lower_body", label: "Lower Body" },
  { id: "feet", label: "Feet" },
  { id: "hat", label: "Hat" },
  { id: "eyewear", label: "Eyewear" },
  { id: "earring", label: "Earring" },
  { id: "mask", label: "Mask" },
  { id: "tiara", label: "Tiara" },
  { id: "helmet", label: "Helmet" },
  { id: "top_head", label: "Top Head" },
  { id: "skin", label: "Skin" },
];
const ICON_ID = {
  body_shape: "body",
  facial_hair: "facial",
  upper_body: "upper",
  hands_wear: "hands",
  lower_body: "lower",
  top_head: "hat",
  skin: "body",
};
const iconFor = (id) => ICON_ID[id] ?? id;

const EMOTE_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const PAGE_SIZE = 24;

const OUTFIT_SLOTS = [0, 1, 2, 3, 4];

const COLOR_CATS = new Set(["skin", "hair", "eyes"]);
const COLOR_FIELD = { skin: "skinColor", hair: "hairColor", eyes: "eyeColor" };

const SKIN_PALETTE = [
  "#FFE4C6", "#FFDDBC", "#F2C2A5", "#DDB18F", "#CC9B77",
  "#9A765B", "#7D5D47", "#704C38", "#532C1C", "#3C2216",
];
const HAIR_PALETTE = [
  "#1C1C1C", "#3C210B", "#5B310F", "#7B4818", "#985F37",
  "#8C2014", "#E98234", "#FFBE28", "#FAD281", "#D4D4D4",
];
const EYE_PALETTE = [
  "#362626", "#5F3932", "#866142", "#BF9E5A", "#878078",
  "#AFC5C7", "#20B3F6", "#397CB0", "#48DC75", "#3B9F50",
];
const PALETTE = { skin: SKIN_PALETTE, hair: HAIR_PALETTE, eyes: EYE_PALETTE };

function rarityLabel(r) {
  return r ? r.charAt(0).toUpperCase() + r.slice(1) : "";
}

function prettyCat(c) {
  return c ? c.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) : "";
}

function shortenAddr(a) {
  return a && a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a || "";
}

function creatorInfo(w) {
  if (w?.rarity === "base") return null;
  const p = String(w?.urn || "").split(":");
  if (p.length >= 6 && /^collections-v[12]$/.test(p[3])) {
    return {
      label: w.creator ? shortenAddr(w.creator) : "View on Marketplace",
      url: `https://decentraland.org/marketplace/contracts/${p[4]}/items/${p[5]}`,
    };
  }
  return null;
}

const SORT_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "name-asc", label: "Name (A–Z)" },
  { id: "name-desc", label: "Name (Z–A)" },
  { id: "rarity", label: "Rarity" },
];
const RARITY_RANK = {
  unique: 7, mythic: 6, legendary: 5, exotic: 4, epic: 3, rare: 2, uncommon: 1, common: 0, base: 0,
};

function openExternal(url) {
  if (typeof window !== "undefined")
    window.open(url, "_blank", "noopener,noreferrer");
}

const SORT_MENU_STYLE = {
  position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30,
  margin: 0, padding: 6, listStyle: "none", minWidth: 180,
  background: "rgba(20,20,24,0.97)", border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10, boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
};
function sortItemStyle(active) {
  return {
    width: "100%", textAlign: "left", padding: "8px 10px",
    background: active ? "rgba(255,255,255,0.08)" : "none",
    border: "none", borderRadius: 6, color: "#fff", font: "inherit",
    fontSize: 13, cursor: "pointer",
  };
}

export default function Backpack({
  avatarPreview = null,
  avatarName = "",
  catalog = [],
  equipped = null,
  emoteCatalog = [],
  loading = false,
  error = null,
  onEquippedChange = null,
  onPlayEmote = null,
  emoteLoadout = [],
  onEmoteLoadoutChange = null,
  onBaseChange = null,
  outfits = [],
  onOutfitsChange = null,
  renderOutfitPreview = null,
}) {
  const [kind, setKind] = useState("wearables");
  const [sub, setSub] = useState("categories");
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedUrn, setSelectedUrn] = useState(null);
  const [sort, setSort] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [localEquipped, setLocalEquipped] = useState(null);
  const [activeSlot, setActiveSlot] = useState(EMOTE_SLOTS[0]);
  const [localLoadout, setLocalLoadout] = useState(null);
  const [localOutfits, setLocalOutfits] = useState(null);
  const [selectedOutfitSlot, setSelectedOutfitSlot] = useState(null);
  const [currentOutfitSlot, setCurrentOutfitSlot] = useState(null);
  const [localBase, setLocalBase] = useState(null);

  const equippedWearables = useMemo(
    () => (localEquipped ?? equipped?.wearables ?? []).map(baseItemUrn),
    [localEquipped, equipped],
  );
  const equippedSet = useMemo(
    () => new Set(equippedWearables),
    [equippedWearables],
  );

  const equippedByCat = useMemo(() => {
    const map = {};
    for (const urn of equippedWearables) {
      const w = catalog.find((c) => c.urn === urn);
      if (w && w.category && !map[w.category]) map[w.category] = w;
    }
    return map;
  }, [equippedWearables, catalog]);

  const curBodyShape =
    localBase?.bodyShape ??
    equipped?.bodyShape ??
    "urn:decentraland:off-chain:base-avatars:BaseMale";
  const curName = localBase?.name ?? equipped?.name ?? avatarName ?? "";
  const curColors = {
    skin: localBase?.skinColor ?? equipped?.skinColor ?? "#c98c63",
    hair: localBase?.hairColor ?? equipped?.hairColor ?? "#5c3824",
    eyes: localBase?.eyeColor ?? equipped?.eyeColor ?? "#3a6ea5",
  };

  function commitBase(next) {
    setLocalBase(next);
    onBaseChange?.(next);
    try {
      window.dclBridge?.send?.("SetAvatar", {
        base: {
          bodyShapeUrn: next.bodyShape,
          name: next.name,
          skinColor: hexToColor3(next.skinColor),
          hairColor: hexToColor3(next.hairColor),
          eyesColor: hexToColor3(next.eyeColor),
        },
      });
    } catch {
    }
  }

  function setColor(catId, hex) {
    const field = COLOR_FIELD[catId];
    if (!field) return;
    commitBase({
      bodyShape: curBodyShape,
      name: curName,
      skinColor: curColors.skin,
      hairColor: curColors.hair,
      eyeColor: curColors.eyes,
      [field]: hex,
    });
  }

  function setBodyShape(urn) {
    if (!urn) return;
    commitBase({
      bodyShape: urn,
      name: curName,
      skinColor: curColors.skin,
      hairColor: curColors.hair,
      eyeColor: curColors.eyes,
    });
  }

  function playEmote(urn) {
    if (!urn) return;
    onPlayEmote?.(urn);
    try {
      window.dclBridge?.send?.("PlayEmote", { urn });
    } catch {
    }
  }

  const items = kind === "emotes" ? emoteCatalog : catalog;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((w) => {
      if (kind === "wearables" && cat !== "all" && w.category !== cat)
        return false;
      if (
        q &&
        !(w.name || "").toLowerCase().includes(q) &&
        !(w.urn || "").toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [items, kind, cat, query]);

  const sorted = useMemo(() => {
    if (sort === "default") return filtered;
    const arr = [...filtered];
    if (sort === "name-asc")
      arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    else if (sort === "name-desc")
      arr.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    else if (sort === "rarity")
      arr.sort(
        (a, b) =>
          (RARITY_RANK[(b.rarity || "").toLowerCase()] ?? 0) -
          (RARITY_RANK[(a.rarity || "").toLowerCase()] ?? 0),
      );
    return arr;
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageItems = useMemo(
    () =>
      sorted.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE),
    [sorted, currentPage],
  );
  useEffect(() => {
    setPage(0);
  }, [kind, cat, query, sort]);

  const selected = useMemo(
    () => items.find((w) => w.urn === selectedUrn) ?? null,
    [items, selectedUrn],
  );
  const selectedCreator = selected ? creatorInfo(selected) : null;

  const loadout = localLoadout ?? emoteLoadout ?? [];
  const emoteByUrn = useMemo(() => {
    const m = {};
    for (const e of emoteCatalog) m[e.urn] = e;
    return m;
  }, [emoteCatalog]);
  const loadoutBySlot = useMemo(() => {
    const m = {};
    for (const b of loadout) m[b.slot] = b;
    return m;
  }, [loadout]);
  const slotByUrn = useMemo(() => {
    const m = {};
    for (const b of loadout) m[b.urn] = b.slot;
    return m;
  }, [loadout]);
  const selectedSlot = useMemo(() => {
    const b = loadout.find((x) => x.urn === selectedUrn);
    return b ? b.slot : null;
  }, [loadout, selectedUrn]);

  function assignEmote(slot, emote) {
    if (!emote) return;
    const next = loadout
      .filter((b) => b.slot !== slot && b.urn !== emote.urn)
      .concat({ slot, urn: emote.urn, name: emote.name });
    setLocalLoadout(next);
    onEmoteLoadoutChange?.(next);
  }

  const outfitsList = localOutfits ?? outfits ?? [];
  const outfitsBySlot = useMemo(() => {
    const m = {};
    for (const o of outfitsList) m[o.slot] = o;
    return m;
  }, [outfitsList]);
  const catalogByUrn = useMemo(() => {
    const m = {};
    for (const w of catalog) m[w.urn] = w;
    return m;
  }, [catalog]);

  function saveOutfit() {
    const slot = OUTFIT_SLOTS.find((s) => !outfitsBySlot[s]);
    if (slot === undefined) return;
    const next = [
      ...outfitsList,
      {
        slot,
        bodyShape: curBodyShape,
        wearables: [...equippedWearables],
        skinColor: curColors.skin,
        hairColor: curColors.hair,
        eyeColor: curColors.eyes,
      },
    ];
    setLocalOutfits(next);
    onOutfitsChange?.(next);
  }

  function wearOutfit(o) {
    if (!o) return;
    const urns = [...(o.wearables || [])];
    setLocalEquipped(urns);
    onEquippedChange?.(urns);
    commitBase({
      bodyShape: o.bodyShape || curBodyShape,
      name: curName,
      skinColor: o.skinColor || curColors.skin,
      hairColor: o.hairColor || curColors.hair,
      eyeColor: o.eyeColor || curColors.eyes,
    });
    try {
      window.dclBridge?.send?.("SetAvatar", {
        equip: {
          wearableUrns: urns,
          emoteUrns: o.emotes ?? equipped?.emotes ?? [],
          forceRender: [],
        },
      });
    } catch {
    }
  }

  function removeOutfit(slot) {
    const next = outfitsList.filter((o) => o.slot !== slot);
    setLocalOutfits(next);
    onOutfitsChange?.(next);
    if (selectedOutfitSlot === slot) setSelectedOutfitSlot(null);
    if (currentOutfitSlot === slot) setCurrentOutfitSlot(null);
  }

  function previewOutfit(slot, o) {
    setSelectedOutfitSlot(slot);
    wearOutfit(o);
  }
  function wearOutfitAsCurrent(slot, o) {
    previewOutfit(slot, o);
    setCurrentOutfitSlot(slot);
  }

  function toggleEquip(w) {
    if (!w) return;
    const set = new Set(equippedWearables);
    if (set.has(w.urn)) {
      set.delete(w.urn);
    } else {
      for (const urn of [...set]) {
        const cw = catalog.find((c) => c.urn === urn);
        if (cw && cw.category === w.category) set.delete(urn);
      }
      set.add(w.urn);
    }
    const next = [...set];
    setLocalEquipped(next);
    onEquippedChange?.(next);
    setSelectedOutfitSlot(null);
    setCurrentOutfitSlot(null);
    try {
      window.dclBridge?.send?.("SetAvatar", {
        equip: {
          wearableUrns: next,
          emoteUrns: equipped?.emotes ?? [],
          forceRender: [],
        },
      });
    } catch {
    }
  }

  return (
      <div className="bp">
        <div className="bp__sub">
          <h1 className="bp__title">Backpack</h1>
          <div className="bp__kinds" role="tablist" aria-label="Backpack section">
            <button
              role="tab"
              aria-selected={kind === "wearables"}
              className={"bp__kind" + (kind === "wearables" ? " is-active" : "")}
              onClick={() => {
                setKind("wearables");
                setSelectedUrn(null);
              }}
            >
              <span className="bp__kindicon" aria-hidden>◇</span> Wearables
            </button>
            <button
              role="tab"
              aria-selected={kind === "emotes"}
              className={"bp__kind" + (kind === "emotes" ? " is-active" : "")}
              onClick={() => {
                setKind("emotes");
                setSelectedUrn(null);
              }}
            >
              <span className="bp__kindicon" aria-hidden>♪</span> Emotes
            </button>
          </div>
          <div className="bp__subright">
            <div style={{ position: "relative" }}>
              <button
                className="bp__filter"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((o) => !o)}
              >
                Filter &amp; Sort <span className="bp__caret" aria-hidden>▾</span>
              </button>
              {sortOpen && (
                <ul role="listbox" aria-label="Sort items" style={SORT_MENU_STYLE}>
                  {SORT_OPTIONS.map((o) => (
                    <li key={o.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={sort === o.id}
                        style={sortItemStyle(sort === o.id)}
                        onClick={() => {
                          setSort(o.id);
                          setSortOpen(false);
                        }}
                      >
                        {o.label}
                        {sort === o.id ? " ✓" : ""}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bp__search">
              <SearchField
                placeholder="Search item"
                value={query}
                onChange={setQuery}
              />
            </div>
            <button
              className="bp__marketplace"
              type="button"
              onClick={() => openExternal("https://decentraland.org/marketplace")}
            >
              <span className="bp__mkticon" aria-hidden>🛍</span> Marketplace
            </button>
          </div>
        </div>

        <div className="bp__panes">
          <div className="bp__preview">
            <div className="bp__stage">
              {avatarPreview ? (
                avatarPreview
              ) : (
                <Avatar size={180} name="DCL Avatar" className="bp__avatar" />
              )}
            </div>
            <button className="bp__help" type="button" aria-label="Help">
              ?
            </button>
          </div>

          <section className="bp__center">
            {kind === "wearables" ? (
              <div className="bp__subtabs" role="tablist" aria-label="Browse">
                <button
                  role="tab"
                  aria-selected={sub === "categories"}
                  className={
                    "bp__subtab" + (sub === "categories" ? " is-active" : "")
                  }
                  onClick={() => setSub("categories")}
                >
                  ☰ Categories
                </button>
                <button
                  role="tab"
                  aria-selected={sub === "outfits"}
                  className={
                    "bp__subtab" + (sub === "outfits" ? " is-active" : "")
                  }
                  onClick={() => {
                    setSub("outfits");
                    setSelectedUrn(null);
                  }}
                >
                  ⬓ Saved Outfits
                </button>
              </div>
            ) : null}

            <div className="bp__browse">
              {sub === "outfits" && kind === "wearables" ? (
                <div className="bp__outfits">
                  <div className="bp__oslots">
                    <button
                      type="button"
                      className="bp__oslot bp__oslot--save"
                      onClick={saveOutfit}
                      disabled={OUTFIT_SLOTS.every((s) => outfitsBySlot[s])}
                      title="Save the current look as an outfit"
                    >
                      <span className="bp__oplus" aria-hidden>
                        +
                      </span>
                      <span className="bp__oslotlabel">SAVE OUTFIT</span>
                    </button>
                    {OUTFIT_SLOTS.map((s) => {
                      const o = outfitsBySlot[s];
                      if (!o)
                        return (
                          <div
                            key={s}
                            className="bp__oslot bp__oslot--empty"
                          >
                            <svg
                              className="bp__osil"
                              viewBox="0 0 60 130"
                              width="42"
                              height="92"
                              aria-hidden
                            >
                              <circle cx="30" cy="20" r="14" />
                              <path d="M14 56c0-9 7-16 16-16s16 7 16 16v34c0 6-32 6-32 0V56Z" />
                            </svg>
                            <span className="bp__oemptylabel">Empty Slot</span>
                          </div>
                        );
                      const thumbs = (o.wearables || [])
                        .map((u) => catalogByUrn[u]?.thumbnail)
                        .filter(Boolean)
                        .slice(0, 4);
                      const isCurrent = currentOutfitSlot === s;
                      const isSelected =
                        selectedOutfitSlot === s && !isCurrent;
                      return (
                        <div
                          key={s}
                          className={
                            "bp__oslot bp__oslot--filled" +
                            (isCurrent
                              ? " is-current"
                              : isSelected
                                ? " is-selected"
                                : "")
                          }
                        >
                          <div
                            className="bp__opreview"
                            role="button"
                            tabIndex={0}
                            title={`Preview Outfit ${s + 1}`}
                            onClick={() => previewOutfit(s, o)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                previewOutfit(s, o);
                              }
                            }}
                          >
                            {renderOutfitPreview ? (
                              renderOutfitPreview(o)
                            ) : (
                              <span className="bp__ocollage">
                                {thumbs.map((src, i) => (
                                  <img key={i} src={src} alt="" loading="lazy" />
                                ))}
                              </span>
                            )}
                          </div>
                          <span className="bp__oslotlabel">Outfit {s + 1}</span>
                          <div className="bp__oactions">
                            {isCurrent ? (
                              <button
                                type="button"
                                className="bp__owear is-current"
                                disabled
                              >
                                Current
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="bp__owear"
                                onClick={() => wearOutfitAsCurrent(s, o)}
                              >
                                Wear
                              </button>
                            )}
                            {isSelected ? (
                              <button
                                type="button"
                                className="bp__oremovebtn"
                                onClick={() => removeOutfit(s)}
                              >
                                Remove
                              </button>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="bp__opromo">
                    <div className="bp__opromotitle">
                      Unlock 5 more Outfit slots by getting a NAME!
                    </div>
                    <p className="bp__opromotext">
                      NAMEs are unique Decentraland usernames that come with a
                      badge, the ability to create Communities, 5 more Outfit
                      slots, and 100 Voting Power in the DAO.
                    </p>
                    <button
                      type="button"
                      className="bp__getname"
                      onClick={() =>
                        openExternal("https://decentraland.org/marketplace/names")
                      }
                    >
                      GET A NAME
                    </button>
                  </div>
                </div>
              ) : (
                <>
              {kind === "wearables" ? (
                <nav className="bp__rail" aria-label="Categories">
                  {SLOTS.map((s) => (
                    <button
                      key={s.id}
                      className={"bp__cat" + (cat === s.id ? " is-active" : "")}
                      onClick={() => setCat(s.id)}
                      title={s.label}
                      aria-label={s.label}
                    >
                      <span
                        className="bp__catglyph u-mask-icon"
                        aria-hidden
                        style={{
                          "--i": `url(${asset("assets/categories/" + iconFor(s.id) + ".png")})`,
                        }}
                      />
                      <span className="bp__catslot" aria-hidden>
                        {equippedByCat[s.id]?.thumbnail ? (
                          <img
                            className="bp__catthumb"
                            src={equippedByCat[s.id].thumbnail}
                            alt=""
                            loading="lazy"
                          />
                        ) : null}
                      </span>
                    </button>
                  ))}
                </nav>
              ) : null}

              {kind === "emotes" ? (
                <nav className="bp__emoteslots" aria-label="Emote wheel slots">
                  {EMOTE_SLOTS.map((n) => {
                    const b = loadoutBySlot[n];
                    const e = b ? emoteByUrn[b.urn] : null;
                    const label = e?.name || b?.name || "Empty";
                    return (
                      <button
                        key={n}
                        type="button"
                        className={"bp__eslot" + (activeSlot === n ? " is-active" : "")}
                        onClick={() => {
                          setActiveSlot(n);
                          setSelectedUrn(b?.urn ?? null);
                        }}
                        aria-pressed={activeSlot === n}
                        title={label}
                      >
                        <span className="bp__eslotnum">{n}</span>
                        <span className="bp__eslotname u-truncate">{label}</span>
                        <span className="bp__eslotart" aria-hidden>
                          {e?.thumbnail ? (
                            <img src={e.thumbnail} alt="" loading="lazy" />
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              ) : null}

              <div className="bp__gridcol">
                {kind === "wearables" && !COLOR_CATS.has(cat) ? (
                  <button
                    className="bp__allpill"
                    onClick={() => setCat("all")}
                    aria-pressed={cat === "all"}
                    type="button"
                  >
                    <span className="bp__allinfinity" aria-hidden>∞</span> ALL
                  </button>
                ) : null}

                {kind === "wearables" && COLOR_CATS.has(cat) ? (
                  <div
                    className="bp__swatches"
                    role="list"
                    aria-label={`${cat} colors`}
                  >
                    {(PALETTE[cat] ?? []).map((hex) => {
                      const isSel =
                        (curColors[cat] || "").toLowerCase() ===
                        hex.toLowerCase();
                      return (
                        <button
                          key={hex}
                          type="button"
                          role="listitem"
                          title={hex}
                          aria-label={hex}
                          aria-pressed={isSel}
                          className={"bp__swatch" + (isSel ? " is-on" : "")}
                          style={{ background: hex }}
                          onClick={() => setColor(cat, hex)}
                        />
                      );
                    })}
                  </div>
                ) : null}

                {kind === "wearables" && cat === "skin" ? null : loading &&
                  items.length === 0 ? (
                  <div className="bp__items" role="list">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span key={i} className="bp__item" role="listitem" />
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div
                    className="bp__empty"
                    style={{ padding: 24, opacity: 0.7 }}
                  >
                    {error ? `Couldn't load items: ${error}` : "No items found"}
                  </div>
                ) : (
                  <>
                    <div className="bp__items" role="list">
                      {pageItems.map((w) => {
                        const assignedSlot =
                          kind === "emotes" ? slotByUrn[w.urn] : undefined;
                        const isAssigned = assignedSlot !== undefined;
                        const isEquipped =
                          equippedSet.has(w.urn) ||
                          (w.category === "body_shape" &&
                            (curBodyShape || "").toLowerCase() ===
                              (w.urn || "").toLowerCase());
                        return (
                          <button
                            key={w.urn}
                            className={
                              "bp__item" +
                              (selectedUrn === w.urn ? " is-selected" : "") +
                              (isEquipped ? " is-equipped" : "") +
                              (isAssigned ? " is-assigned" : "")
                            }
                            role="listitem"
                            title={
                              kind === "emotes" ? `Preview ${w.name}` : w.name
                            }
                            type="button"
                            onClick={() => {
                              setSelectedUrn((cur) =>
                                cur === w.urn ? null : w.urn,
                              );
                              if (kind === "emotes") playEmote(w.urn);
                            }}
                          >
                            {w.thumbnail ? (
                              <img src={w.thumbnail} alt={w.name} loading="lazy" />
                            ) : null}
                            {isAssigned ? (
                              <span className="bp__slotbadge" aria-hidden>
                                {assignedSlot}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                    {pageCount > 1 ? (
                      <div className="bp__pager">
                        <button
                          type="button"
                          className="bp__pagebtn"
                          aria-label="Previous page"
                          disabled={currentPage === 0}
                          onClick={() => setPage((p) => Math.max(0, p - 1))}
                        >
                          ‹
                        </button>
                        <span className="bp__pageinfo">
                          {currentPage + 1} / {pageCount}
                        </span>
                        <button
                          type="button"
                          className="bp__pagebtn"
                          aria-label="Next page"
                          disabled={currentPage >= pageCount - 1}
                          onClick={() =>
                            setPage((p) => Math.min(pageCount - 1, p + 1))
                          }
                        >
                          ›
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
                </>
              )}
            </div>
          </section>

          <aside
            className={"bp__info" + (selected ? " is-open" : "")}
            aria-hidden={!selected}
          >
            {selected ? (
              <div className="bp__infosel">
                <button
                  type="button"
                  className="bp__infoclose"
                  aria-label="Deselect item"
                  title="Deselect"
                  onClick={() => setSelectedUrn(null)}
                >
                  ×
                </button>
                <div className="bp__infothumb">
                  {selected.thumbnail ? (
                    <img src={selected.thumbnail} alt={selected.name} />
                  ) : null}
                </div>
                <div className="bp__infoname">{selected.name}</div>
                <div className="bp__infometa">
                  {kind === "emotes"
                    ? `Emote · ${prettyCat(selected.category)}`
                    : prettyCat(selected.category)}
                  {selected.rarity ? ` · ${rarityLabel(selected.rarity)}` : ""}
                </div>
                {kind === "emotes" && selected.loop ? (
                  <div className="bp__emotetag">🔁 Loops</div>
                ) : null}
                {selected.description ? (
                  <p className="bp__infodesc">{selected.description}</p>
                ) : null}
                {selectedCreator ? (
                  <button
                    type="button"
                    className="bp__creatorlink"
                    onClick={() => openExternal(selectedCreator.url)}
                  >
                    <span className="bp__creatorlabel">Creator</span>
                    <span className="bp__creatorval">
                      {selectedCreator.label} ↗
                    </span>
                  </button>
                ) : null}
                {kind === "wearables" && selected.category === "body_shape" ? (
                  (() => {
                    const isCurrent =
                      (curBodyShape || "").toLowerCase() ===
                      (selected.urn || "").toLowerCase();
                    return (
                      <button
                        type="button"
                        disabled={isCurrent}
                        className={"bp__actionbtn" + (isCurrent ? " is-on" : "")}
                        onClick={() => setBodyShape(selected.urn)}
                      >
                        {isCurrent ? "Current Body" : "Use Body Shape"}
                      </button>
                    );
                  })()
                ) : kind === "wearables" ? (
                  <button
                    type="button"
                    className={
                      "bp__actionbtn" +
                      (equippedSet.has(selected.urn) ? " is-on" : "")
                    }
                    onClick={() => toggleEquip(selected)}
                  >
                    {equippedSet.has(selected.urn) ? "Unequip" : "Equip"}
                  </button>
                ) : selectedSlot === activeSlot ? (
                  <button
                    type="button"
                    className="bp__assignbtn is-current"
                    disabled
                  >
                    Currently in Slot {activeSlot}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="bp__assignbtn"
                      onClick={() => assignEmote(activeSlot, selected)}
                    >
                      Assign to Slot {activeSlot}
                    </button>
                    {selectedSlot != null ? (
                      <div className="bp__assigned">
                        Currently in Slot {selectedSlot}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </aside>
        </div>
      </div>
  );
}
