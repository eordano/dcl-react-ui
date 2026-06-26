import { useState } from "react";
import { asset } from "../../asset.js";
import { ChevronDownAlt, Close } from "../../atoms/icons.jsx";
import "./chmodalworldsettings.css";

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
    multi_scene_title: "Multi-Scene World",
    multi_scene_description:
      "Allow your world to contain more than 1 scene.\nTotal world size will depend on your published world layout.",
    empty_title: "No scene published in this world.",
    empty_description: "You can add any scene by publishing it within this domain.",
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
  "🎨 Art", "🕹️ Game", "🃏 Casino", "👥 Social", "🎶 Music", "👠 Fashion",
  "🪙 Crypto", "📚 Education", "🛍️ Shop", "🏢 Business", "🏅 Sports",
];

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
  categories: ["🎨 Art", "👥 Social"],
  spawn: { x: 0, y: 0 },
  skyboxAuto: true,
  singlePlayer: false,
  showInPlaces: true,
};
const SCENES = [
  { entityId: "s1", title: "Main Plaza", parcels: 4, baseParcel: "0, 0", grad: "linear-gradient(135deg, #ff2d55 0%, #350447 100%)" },
  { entityId: "s2", title: "Wearable Gallery", parcels: 2, baseParcel: "2, 0", grad: "linear-gradient(135deg, #438fff 0%, #2f004d 100%)" },
  { entityId: "s3", title: "Rooftop Stage", parcels: 6, baseParcel: "0, 2", grad: "linear-gradient(135deg, #34ce76 0%, #0e3b2b 100%)" },
];

function DetailsTab() {
  return (
    <div className="chmws__details">
      <label className="chmws__inputlabel chmws__colbig">
        <span className="chmws__labeltext">{COPY.details.world_title}</span>
        <span className="chmws__textfield">
          <input className="chmws__input" type="text" defaultValue={WORLD.title} />
        </span>
      </label>

      <label className="chmws__inputlabel chmws__colbig">
        <span className="chmws__labeltext">{COPY.details.description}</span>
        <span className="chmws__textfield">
          <textarea className="chmws__textarea" rows={4} defaultValue={WORLD.description} />
        </span>
      </label>

      <div className="chmws__thumbcontainer">
        <span className="chmws__labeltext">{COPY.details.thumbnail}</span>
        <div className="chmws__thumbbg">
          {WORLD.thumbnail ? (
            <img className="chmws__thumbimg" src={WORLD.thumbnail} alt={COPY.details.thumbnail} />
          ) : (
            <span className="chmws__noimage">{COPY.details.no_image}</span>
          )}
        </div>
        <button type="button" className="chmws__btn chmws__btn--secondary chmws__thumbbtn">
          <FolderIcon />
          {WORLD.thumbnail ? COPY.details.replace_image : COPY.details.set_image}
        </button>
      </div>

      <label className="chmws__inputlabel chmws__colhalf">
        <span className="chmws__labeltext">{COPY.details.categories}</span>
        <button type="button" className="chmws__select">
          <span className="chmws__selectval">{WORLD.categories.join(", ")}</span>
          <ChevronDownAlt size={20} />
        </button>
      </label>
    </div>
  );
}

function TitleDivider({ title }) {
  return (
    <p className="chmws__titledivider">
      <span>{title}</span>
      <hr />
    </p>
  );
}

function GeneralTab() {
  const [auto, setAuto] = useState(WORLD.skyboxAuto);
  const [single, setSingle] = useState(WORLD.singlePlayer);
  const [places, setPlaces] = useState(WORLD.showInPlaces);

  return (
    <div className="chmws__general">
      <div className="chmws__formgroup">
        <TitleDivider title={COPY.general.world_spawn_coordinate} />
        <div className="chmws__inputcontainer">
          <span className="chmws__body2">{COPY.general.position}</span>
          <div className="chmws__row">
            <span className="chmws__coordfield">
              <span className="chmws__coordlabel">X</span>
              <input className="chmws__coordinput" defaultValue={WORLD.spawn.x} />
            </span>
            <span className="chmws__coordfield">
              <span className="chmws__coordlabel">Y</span>
              <input className="chmws__coordinput" defaultValue={WORLD.spawn.y} />
            </span>
          </div>
        </div>
      </div>

      <div className="chmws__formgroup">
        <TitleDivider title={COPY.general.world_skybox} />
        <label className="chmws__checkrow">
          <span
            role="checkbox"
            aria-checked={auto}
            tabIndex={0}
            className={"chmws__checkbox" + (auto ? " is-checked" : "")}
            onClick={() => setAuto(!auto)}
          />
          <span>{COPY.general.auto_skybox}</span>
        </label>
        <span className="chmws__body2">{COPY.general.max_offset}</span>
        <div className={"chmws__range" + (auto ? " is-disabled" : "")}>
          <input type="range" min={0} max={86400} defaultValue={43200} disabled={auto} />
          <span className="chmws__rangeval">12:00</span>
        </div>
      </div>

      <div className="chmws__formgroup">
        <TitleDivider title={COPY.general.general} />
        <div className="chmws__column">
          <label className="chmws__checkrow">
            <span
              role="checkbox"
              aria-checked={single}
              tabIndex={0}
              className={"chmws__checkbox" + (single ? " is-checked" : "")}
              onClick={() => setSingle(!single)}
            />
            <span>{COPY.general.single_player}</span>
          </label>
          {single && (
            <p className="chmws__playernote">
              <InfoIcon size={16} />
              <span>{COPY.general.single_player_streaming_note}</span>
            </p>
          )}
        </div>
        <label className="chmws__checkrow chmws__showinplaces">
          <span
            role="checkbox"
            aria-checked={places}
            tabIndex={0}
            className={"chmws__checkbox" + (places ? " is-checked" : "")}
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
    <span className="chmws__infoitem">
      {icon}
      <span className="chmws__body2">{label}</span>
    </span>
  );
}

function LayoutScenesView({ empty }) {
  const worldSize = "6x6";
  return (
    <>
      <div className="chmws__multiscene">
        <LayersIcon />
        <div className="chmws__togglecontent">
          <span className="chmws__togglehead">{COPY.layout.multi_scene_title}</span>
          <span className="chmws__toggledesc">{COPY.layout.multi_scene_description}</span>
        </div>
      </div>

      {empty ? (
        <div className="chmws__emptyworld">
          <h6 className="chmws__h6">{COPY.layout.empty_title}</h6>
          <span className="chmws__emptydesc">{COPY.layout.empty_description}</span>
        </div>
      ) : (
        <>
          <div className="chmws__worldinfo">
            <div className="chmws__worldthumb" style={{ background: SCENES[0].grad }} />
            <div className="chmws__worldinfocontent">
              <span className="chmws__currentlabel">{COPY.layout.current_world}</span>
              <h6 className="chmws__worldtitle">{WORLD.title}</h6>
              <div className="chmws__worldmeta">
                <InfoItem icon={<LayersIcon size={16} />} label={`${SCENES.length} scenes`} />
                <InfoItem icon={<ParcelsIcon size={16} />} label={worldSize} />
              </div>
            </div>
            <button type="button" className="chmws__btn chmws__btn--secondary chmws__worldmapbtn">
              <MapIcon />
              {COPY.layout.world_map}
            </button>
          </div>

          <div className="chmws__scenessection">
            <h6 className="chmws__h6">{COPY.layout.scenes_title}</h6>
            {SCENES.map((scene) => (
              <div className="chmws__sceneitem" key={scene.entityId}>
                <div className="chmws__scenethumb" style={{ background: scene.grad }} />
                <div className="chmws__sceneinfo">
                  <span className="chmws__scenetitle">{scene.title}</span>
                  <div className="chmws__scenemeta">
                    <InfoItem
                      icon={<ParcelsIcon size={14} />}
                      label={`${scene.parcels} ${scene.parcels === 1 ? "parcel" : "parcels"}`}
                    />
                    <InfoItem icon={<LocationIcon size={14} />} label={scene.baseParcel} />
                  </div>
                </div>
                <button type="button" className="chmws__menubtn" aria-label="scene actions">
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

function LayoutUnpublishView() {
  return (
    <div className="chmws__unpublish">
      <h5 className="chmws__h5">
        Remove <b>{SCENES[0].title}</b> from this world?
      </h5>
      <div className="chmws__warningbox">
        <WarningIcon />
        <span className="chmws__body2">{COPY.layout.unpublish_warning}</span>
      </div>
      <div className="chmws__unpublishactions">
        <button type="button" className="chmws__btn chmws__btn--secondary chmws__btn--full">
          {COPY.layout.cancel}
        </button>
        <button type="button" className="chmws__btn chmws__btn--primary chmws__btn--full">
          {COPY.layout.confirm}
        </button>
      </div>
    </div>
  );
}

function LayoutTab({ view = "scenes" }) {
  return (
    <div className="chmws__layout">
      {view === "unpublish" ? (
        <LayoutUnpublishView />
      ) : (
        <LayoutScenesView empty={view === "empty"} />
      )}
    </div>
  );
}

const TABS = [
  { id: "details", label: COPY.tabs.details },
  { id: "layout", label: COPY.tabs.layout },
  { id: "general", label: COPY.tabs.general },
];

export default function ChModalWorldSettings({
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
    <div className="chmws" role="presentation">
      <div
        className={"chmws__paper" + (isOwner ? "" : " chmws__paper--collab")}
        role="dialog"
        aria-modal="true"
        aria-label={COPY.title + " - " + WORLD.name}
      >
        <header className="chmws__header">
          <div className="chmws__headtitle">
            <DashboardIcon />
            <h6 className="chmws__titletext">{COPY.title} - {WORLD.name}</h6>
          </div>
          <button type="button" className="chmws__close" aria-label="close">
            <Close size={22} />
          </button>
        </header>

        <div className="chmws__layoutrow">
          {isOwner && (
            <nav className="chmws__tabs" role="tablist" aria-orientation="vertical">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={t.id === activeTab}
                  className={"chmws__tab" + (t.id === activeTab ? " is-selected" : "")}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          )}

          <div className="chmws__content">
            {isLoading && !hasChanges ? (
              <div className="chmws__loaderwrap">
                <span className="chmws__loader" aria-label="loading" />
              </div>
            ) : (
              <>
                {activeTab === "details" && <DetailsTab />}
                {activeTab === "general" && <GeneralTab />}
                {activeTab === "layout" && <LayoutTab view={layoutView} />}

                {showActions && (
                  <div className="chmws__actionscontainer">
                    <span className="chmws__unsavedtext">{COPY.discard_confirmation}</span>
                    <button type="button" className="chmws__btn chmws__btn--text">
                      {COPY.actions.discard}
                    </button>
                    <button type="button" className="chmws__btn chmws__btn--primary">
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
