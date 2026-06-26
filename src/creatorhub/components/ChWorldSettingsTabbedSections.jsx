import { useMemo, useState } from "react";
import { Close, ChevronDownAlt } from "../../atoms/icons.jsx";
import "./chworldsettingstabbedsections.css";

const COPY = {
  title: "World Settings",
  tabs: { details: "Details", layout: "Layout", general: "Misc." },
  discard_confirmation: "You have unsaved changes. Save before leaving?",
  actions: { save: "Save changes", discard: "Discard" },
  details: {
    world_title: "World Title",
    description: "Description",
    categories: "Categories",
    thumbnail: "Thumbnail",
    replace_image: "Replace Image",
    set_image: "Choose image",
    no_image: "No image set",
  },
  general: {
    world_spawn_coordinate: "World Spawn Coordinate",
    position: "Position",
    world_skybox: "World Skybox",
    auto_skybox: "Auto (decentraland time)",
    max_offset: "Max Offset",
    general: "General",
    single_player: "Single Player",
    show_in_places: "Show in Places",
    single_player_streaming_note:
      "Live streaming is not supported in single player mode.",
  },
  layout: {
    world_layout_title: "World Layout",
    multi_scene_title: "Multi-Scene World",
    multi_scene_description:
      "Allow your world to contain more than 1 scene.\nTotal world size will depend on your published world layout.",
    empty_title: "No scene published in this world.",
    empty_description:
      "You can add any scene by publishing it within this domain.",
    current_world: "Current World",
    world_map: "World Map",
    scenes_title: "Scenes",
    unpublish: "Remove from World",
    unpublish_warning:
      "Your world will be automatically re-published to apply these changes.",
    cancel: "Cancel",
    confirm: "Confirm",
  },
};

const CATEGORY_OPTIONS = [
  { value: "art", label: "🎨 Art" },
  { value: "game", label: "🕹️ Game" },
  { value: "casino", label: "🃏 Casino" },
  { value: "social", label: "👥 Social" },
  { value: "music", label: "🎶 Music" },
  { value: "fashion", label: "👠 Fashion" },
  { value: "crypto", label: "🪙 Crypto" },
  { value: "education", label: "📚 Education" },
  { value: "shop", label: "🛍️ Shop" },
  { value: "business", label: "🏢 Business" },
  { value: "sports", label: "🏅 Sports" },
];
const MAX_CATEGORIES = 3;

const MIN_SECONDS = 0;
const MAX_SECONDS = 86340;
const MIDDAY_SECONDS = 43200;
function formatHour(value) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="currentColor" d="M13 3v6h8V3h-8ZM3 13v8h8v-8H3ZM3 3v8h8V3H3Zm10 10v8h8v-8h-8Z" />
  </svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);
const CheckMark = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const InfoIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M12 11v5M12 7.6v.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const LayersIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const ParcelsIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const LocationIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const ArrowBack = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M12 3 2 20h20L12 3Z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />
    <path d="M12 10v4M12 16.6v.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="5" cy="12" r="1.8" fill="currentColor" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <circle cx="19" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

const WORLD = {
  name: "mystore.dcl.eth",
  title: "Neon Night Market",
  description:
    "A 24/7 cyberpunk bazaar built on the edge of the metaverse — wearable drops, live DJ sets, and a maze of neon-lit stalls.",
  thumbnail: null,
  categories: ["art", "social"],
  spawnCoordinates: "0,0",
  skyboxTime: null,
  singlePlayer: false,
  showInPlaces: true,
};
const SCENES = [
  { entityId: "s1", title: "Main Plaza", parcels: 4, baseParcel: "0, 0", grad: "linear-gradient(135deg, #ff2d55 0%, #350447 100%)" },
  { entityId: "s2", title: "Wearable Gallery", parcels: 2, baseParcel: "2, 0", grad: "linear-gradient(135deg, #438fff 0%, #2f004d 100%)" },
  { entityId: "s3", title: "Rooftop Stage", parcels: 6, baseParcel: "0, 2", grad: "linear-gradient(135deg, #34ce76 0%, #0e3b2b 100%)" },
];
const ATLAS = [
  [0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 2, 2, 0, 0],
  [0, 0, 2, 2, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
const ATLAS_FILL = { 1: "#ff2d55", 2: "#438fff" };

function DetailsTab() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(WORLD.categories);
  const labelFor = (v) =>
    CATEGORY_OPTIONS.find((o) => o.value === v)?.label || v;
  const toggle = (v) => {
    setSelected((prev) =>
      prev.includes(v)
        ? prev.filter((x) => x !== v)
        : prev.length < MAX_CATEGORIES
          ? [...prev, v]
          : prev,
    );
  };

  return (
    <div className="chwsts__details">
      <label className="chwsts__inputlabel chwsts__colbig">
        <span className="chwsts__labeltext">{COPY.details.world_title}</span>
        <span className="chwsts__textfield">
          <input className="chwsts__input" type="text" defaultValue={WORLD.title} />
        </span>
      </label>

      <label className="chwsts__inputlabel chwsts__colbig">
        <span className="chwsts__labeltext">{COPY.details.description}</span>
        <span className="chwsts__textfield">
          <textarea className="chwsts__textarea" rows={4} defaultValue={WORLD.description} />
        </span>
      </label>

      <div className="chwsts__thumbcontainer">
        <span className="chwsts__labeltext">{COPY.details.thumbnail}</span>
        <div className="chwsts__thumbbg">
          {WORLD.thumbnail ? (
            <img className="chwsts__thumbimg" src={WORLD.thumbnail} alt={COPY.details.thumbnail} />
          ) : (
            <span className="chwsts__noimage">{COPY.details.no_image}</span>
          )}
        </div>
        <button type="button" className="chwsts__btn chwsts__btn--secondary chwsts__thumbbtn">
          <FolderIcon />
          {WORLD.thumbnail ? COPY.details.replace_image : COPY.details.set_image}
        </button>
      </div>

      <label className="chwsts__inputlabel chwsts__colhalf">
        <span className="chwsts__labeltext">{COPY.details.categories}</span>
        <div className="chwsts__selectwrap">
          <button
            type="button"
            className={"chwsts__select" + (open ? " is-open" : "")}
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="chwsts__chips">
              {selected.length ? (
                selected.map((v) => (
                  <span className="chwsts__chip" key={v}>
                    {labelFor(v)}
                  </span>
                ))
              ) : (
                <span className="chwsts__selectplaceholder">Select up to 3</span>
              )}
            </span>
            <ChevronDownAlt size={20} />
          </button>
          {open && (
            <ul className="chwsts__menu" role="listbox" aria-multiselectable="true">
              {CATEGORY_OPTIONS.map((o) => {
                const isSel = selected.includes(o.value);
                const capped = !isSel && selected.length >= MAX_CATEGORIES;
                return (
                  <li
                    key={o.value}
                    role="option"
                    aria-selected={isSel}
                    className={
                      "chwsts__menuitem" +
                      (isSel ? " is-selected" : "") +
                      (capped ? " is-disabled" : "")
                    }
                    onClick={() => !capped && toggle(o.value)}
                  >
                    <span className="chwsts__menucheck">{isSel && <CheckMark />}</span>
                    <span>{o.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </label>
    </div>
  );
}

function TitleDivider({ title }) {
  return (
    <p className="chwsts__titledivider">
      <span>{title}</span>
      <hr />
    </p>
  );
}

function RangeHourField({ value, disabled }) {
  const [seconds, setSeconds] = useState(value);
  const completion = useMemo(() => {
    const norm = Math.min(Math.max(seconds, MIN_SECONDS), MAX_SECONDS);
    return ((norm - MIN_SECONDS) / (MAX_SECONDS - MIN_SECONDS)) * 100 || 0;
  }, [seconds]);
  return (
    <div className="chwsts__range">
      <div className={"chwsts__rangecontainer" + (disabled ? " is-disabled" : "")}>
        <div className="chwsts__rangeinputwrap">
          <input
            type="range"
            className="chwsts__rangeinput"
            min={MIN_SECONDS}
            max={MAX_SECONDS}
            step={60}
            value={seconds}
            disabled={disabled}
            style={{ "--completion": `${completion}%` }}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>
        <input
          type="time"
          className="chwsts__rangetime"
          value={formatHour(seconds)}
          disabled={disabled}
          onChange={(e) => {
            const [h = "0", m = "0"] = e.target.value.split(":");
            setSeconds(parseInt(h) * 3600 + parseInt(m) * 60);
          }}
        />
      </div>
    </div>
  );
}

function GeneralTab() {
  const [auto, setAuto] = useState(WORLD.skyboxTime === null);
  const [single, setSingle] = useState(WORLD.singlePlayer);
  const [places, setPlaces] = useState(WORLD.showInPlaces);
  const [x, y] = WORLD.spawnCoordinates.split(",");

  return (
    <div className="chwsts__general">
      <div className="chwsts__formgroup">
        <TitleDivider title={COPY.general.world_spawn_coordinate} />
        <div className="chwsts__inputcontainer">
          <span className="chwsts__body2">{COPY.general.position}</span>
          <div className="chwsts__row">
            <span className="chwsts__coordfield">
              <span className="chwsts__coordlabel">X</span>
              <input className="chwsts__coordinput" defaultValue={x} />
            </span>
            <span className="chwsts__coordfield">
              <span className="chwsts__coordlabel">Y</span>
              <input className="chwsts__coordinput" defaultValue={y} />
            </span>
          </div>
        </div>
      </div>

      <div className="chwsts__formgroup">
        <TitleDivider title={COPY.general.world_skybox} />
        <label className="chwsts__checkrow">
          <span
            role="checkbox"
            aria-checked={auto}
            tabIndex={0}
            className={"chwsts__checkbox" + (auto ? " is-checked" : "")}
            onClick={() => setAuto(!auto)}
          />
          <span>{COPY.general.auto_skybox}</span>
        </label>
        <span className="chwsts__body2">{COPY.general.max_offset}</span>
        <RangeHourField value={MIDDAY_SECONDS} disabled={auto} />
      </div>

      <div className="chwsts__formgroup">
        <TitleDivider title={COPY.general.general} />
        <div className="chwsts__column">
          <label className="chwsts__checkrow">
            <span
              role="checkbox"
              aria-checked={single}
              tabIndex={0}
              className={"chwsts__checkbox" + (single ? " is-checked" : "")}
              onClick={() => setSingle(!single)}
            />
            <span>{COPY.general.single_player}</span>
          </label>
          {single && (
            <p className="chwsts__playernote">
              <InfoIcon size={16} />
              <span>{COPY.general.single_player_streaming_note}</span>
            </p>
          )}
        </div>
        <label className="chwsts__checkrow chwsts__showinplaces">
          <span
            role="checkbox"
            aria-checked={places}
            tabIndex={0}
            className={"chwsts__checkbox" + (places ? " is-checked" : "")}
            onClick={() => setPlaces(!places)}
          />
          <span>{COPY.general.show_in_places}</span>
        </label>
      </div>
    </div>
  );
}

function InfoItem({ icon, label }) {
  if (!label) return null;
  return (
    <span className="chwsts__infoitem">
      {icon}
      <span className="chwsts__body2">{label}</span>
    </span>
  );
}

function LayoutScenesView({ empty, onViewMap }) {
  const worldSize = "6x6";
  return (
    <>
      <div className="chwsts__multiscene">
        <LayersIcon />
        <div className="chwsts__togglecontent">
          <span className="chwsts__togglehead">{COPY.layout.multi_scene_title}</span>
          <span className="chwsts__toggledesc">{COPY.layout.multi_scene_description}</span>
        </div>
      </div>

      {empty ? (
        <div className="chwsts__emptyworld">
          <h6 className="chwsts__h6">{COPY.layout.empty_title}</h6>
          <span className="chwsts__emptydesc">{COPY.layout.empty_description}</span>
        </div>
      ) : (
        <>
          <div className="chwsts__worldinfo">
            <div className="chwsts__worldthumb" style={{ background: SCENES[0].grad }} />
            <div className="chwsts__worldinfocontent">
              <span className="chwsts__currentlabel">{COPY.layout.current_world}</span>
              <h6 className="chwsts__worldtitle">{WORLD.title}</h6>
              <div className="chwsts__worldmeta">
                <InfoItem icon={<LayersIcon size={16} />} label={`${SCENES.length} scenes`} />
                <InfoItem icon={<ParcelsIcon size={16} />} label={worldSize} />
              </div>
            </div>
            <button
              type="button"
              className="chwsts__btn chwsts__btn--secondary chwsts__worldmapbtn"
              onClick={onViewMap}
            >
              <MapIcon />
              {COPY.layout.world_map}
            </button>
          </div>

          <div className="chwsts__scenessection">
            <h6 className="chwsts__h6">{COPY.layout.scenes_title}</h6>
            {SCENES.map((scene) => (
              <div className="chwsts__sceneitem" key={scene.entityId}>
                <div className="chwsts__scenethumb" style={{ background: scene.grad }} />
                <div className="chwsts__sceneinfo">
                  <span className="chwsts__scenetitle">{scene.title}</span>
                  <div className="chwsts__scenemeta">
                    <InfoItem
                      icon={<ParcelsIcon size={14} />}
                      label={`${scene.parcels} ${scene.parcels === 1 ? "parcel" : "parcels"}`}
                    />
                    <InfoItem icon={<LocationIcon size={14} />} label={scene.baseParcel} />
                  </div>
                </div>
                <button type="button" className="chwsts__menubtn" aria-label="scene actions">
                  <MoreIcon />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function LayoutMapView({ onBack }) {
  return (
    <>
      <div className="chwsts__layouttitle">
        <button type="button" className="chwsts__backbtn" aria-label="back" onClick={onBack}>
          <ArrowBack />
        </button>
        <h6 className="chwsts__h6">{COPY.layout.world_layout_title}</h6>
      </div>
      <div className="chwsts__atlas">
        {ATLAS.map((rowArr, r) => (
          <div className="chwsts__atlasrow" key={r}>
            {rowArr.map((cell, c) => (
              <div
                key={c}
                className={"chwsts__atlascell" + (cell ? " is-filled" : "")}
                style={cell ? { background: ATLAS_FILL[cell] } : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function LayoutUnpublishView() {
  return (
    <div className="chwsts__unpublish">
      <h5 className="chwsts__h5">
        Remove <b>{SCENES[0].title}</b> from this world?
      </h5>
      <div className="chwsts__warningbox">
        <WarningIcon />
        <span className="chwsts__body2">{COPY.layout.unpublish_warning}</span>
      </div>
      <div className="chwsts__unpublishactions">
        <button type="button" className="chwsts__btn chwsts__btn--secondary chwsts__btn--full">
          {COPY.layout.cancel}
        </button>
        <button type="button" className="chwsts__btn chwsts__btn--primary chwsts__btn--full">
          {COPY.layout.confirm}
        </button>
      </div>
    </div>
  );
}

function LayoutTab({ view = "scenes" }) {
  const [sub, setSub] = useState(view);
  return (
    <div className="chwsts__layout">
      {sub === "unpublish" ? (
        <LayoutUnpublishView />
      ) : sub === "map" ? (
        <LayoutMapView onBack={() => setSub("scenes")} />
      ) : (
        <LayoutScenesView empty={sub === "empty"} onViewMap={() => setSub("map")} />
      )}
    </div>
  );
}

const TABS = [
  { id: "details", label: COPY.tabs.details },
  { id: "layout", label: COPY.tabs.layout },
  { id: "general", label: COPY.tabs.general },
];

export default function ChWorldSettingsTabbedSections({
  tab = "details",
  isOwner = true,
  isLoading = false,
  hasChanges = false,
  layoutView = "scenes",
}) {
  const [active, setActive] = useState(tab);
  const activeTab = isOwner ? active : "layout";
  const showActions = hasChanges && activeTab !== "layout";

  return (
    <div className="chwsts" role="presentation">
      <div
        className={"chwsts__paper" + (isOwner ? "" : " chwsts__paper--collab")}
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title + " - " + WORLD.name}
      >
        <header className="chwsts__header">
          <div className="chwsts__headtitle">
            <DashboardIcon />
            <h6 className="chwsts__titletext">
              {COPY.title} - {WORLD.name}
            </h6>
          </div>
          <button type="button" className="chwsts__close" aria-label="close">
            <Close size={22} />
          </button>
        </header>

        <div className="chwsts__layoutrow">
          {isOwner && (
            <nav className="chwsts__tabs" role="tablist" aria-orientation="vertical">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={t.id === activeTab}
                  className={"chwsts__tab" + (t.id === activeTab ? " is-selected" : "")}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          )}

          <div className="chwsts__content">
            {isLoading && !hasChanges ? (
              <div className="chwsts__loaderwrap">
                <span className="chwsts__loader" aria-label="loading" />
              </div>
            ) : (
              <>
                {activeTab === "details" && <DetailsTab />}
                {activeTab === "general" && <GeneralTab />}
                {activeTab === "layout" && (
                  <LayoutTab key={layoutView} view={layoutView} />
                )}

                {showActions && (
                  <div className="chwsts__actionscontainer">
                    <span className="chwsts__unsavedtext">{COPY.discard_confirmation}</span>
                    <button type="button" className="chwsts__btn chwsts__btn--text">
                      {COPY.actions.discard}
                    </button>
                    <button type="button" className="chwsts__btn chwsts__btn--primary">
                      {COPY.actions.save}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
