import { useMemo, useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import { Close } from "../../atoms/icons.jsx";
import "./mkstoresettingseditor.css";

const PREFIX = {
  website: "https://",
  facebook: "https://www.facebook.com/",
  twitter: "https://www.twitter.com/",
  discord: "https://discord.gg/",
};

const SIDEBAR = [
  {
    header: "ASSETS",
    items: [
      { id: "wearables", label: "Wearables" },
      { id: "emotes", label: "Emotes" },
      { id: "ens", label: "Names" },
      { id: "land", label: "Land" },
      { id: "collections", label: "Collections" },
    ],
  },
  {
    header: "STORE",
    items: [
      { id: "on_sale", label: "On Sale" },
      { id: "on_rent", label: "On Rent" },
      { id: "sales", label: "Sales" },
      { id: "bids", label: "Bids" },
      { id: "store_settings", label: "Settings" },
    ],
  },
];

const MAX_FILE_SIZE = 1000000;

const Watermelon = () => (
  <svg className="mkss__melon" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
    <path
      d="M52 8C40 -4 14 2 6 22 -2 42 14 60 36 58 50 56.7 60 46 62 32c.6-4-.4-8-2-11l-2 2c-7 7-18 9-27 5-2-1-1-4 1-4 8 3 17 1 23-5l1-1c-1-2-3-4-5-5Z"
      fill="var(--rar-uncommon)"
      opacity="0.9"
    />
    <circle cx="26" cy="40" r="2" fill="#1c1b1f" />
    <circle cx="34" cy="34" r="2" fill="#1c1b1f" />
    <circle cx="22" cy="32" r="2" fill="#1c1b1f" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M9 4l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4H9Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="13" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

function CoverPicker({ src, onPick, onClear }) {
  return (
    <div className="mkss__cover">
      <div className="mkss__coverimg">
        {src ? (
          <>
            <img src={src} alt="cover" />
            <div className="mkss__coverbtns">
              <button type="button" className="mkss__circle" aria-label="Change cover" onClick={onPick}>
                <CameraIcon />
              </button>
              <button type="button" className="mkss__circle" aria-label="Remove cover" onClick={onClear}>
                <Close size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="mkss__empty">
            <Watermelon />
            <button type="button" className="mkss__addcover" onClick={onPick}>
              Click here to add a cover picture
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ title, children }) {
  return (
    <div className="mkss__field">
      <div className="mkss__ftitle">{title}</div>
      {children}
    </div>
  );
}

const DEFAULT_STORE = {
  owner: "0x9f3c…7a21",
  cover: "",
  coverName: "",
  description: "Welcome to my store! I craft limited-run cyberpunk wearables and signature dance emotes for Decentraland. New drops every month.",
  website: "https://neonforge.studio",
  facebook: "https://www.facebook.com/neonforge",
  twitter: "https://www.twitter.com/neonforge",
  discord: "https://discord.gg/neonforge",
};

export default function MkStoreSettingsEditor({
  store: storeProp,
  isLoading = false,
  isSaving = false,
  error = null,
  coverSize,
}) {
  const [tab, setTab] = useState("my-assets");
  const [store, setStore] = useState(storeProp ?? DEFAULT_STORE);
  const [dirty, setDirty] = useState(false);

  const set = (patch) => {
    setStore((s) => ({ ...s, ...patch }));
    setDirty(true);
  };

  const handle = (type) => store[type].replace(PREFIX[type], "");
  const onHandle = (type, value) =>
    set({ [type]: (!value ? "" : PREFIX[type] + value).replaceAll(" ", "") });

  const errors = useMemo(() => {
    const e = {};
    if (store.website && !store.website.startsWith(PREFIX.website)) {
      e.website = `Link should start with ${PREFIX.website}`;
    }
    if (coverSize !== undefined && coverSize > MAX_FILE_SIZE) {
      const mb = (n) => (n / 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 }) + "MB";
      e.size = `Maximum file size allowed is of ${mb(MAX_FILE_SIZE)}, the file you selected has ${mb(coverSize)}`;
    }
    return e;
  }, [store.website, coverSize]);

  const hasErrors = Object.values(errors).some(Boolean);
  const canSubmit = dirty;

  const revert = () => {
    setStore(storeProp ?? DEFAULT_STORE);
    setDirty(false);
  };

  return (
    <MarketplaceChrome active={tab} onTab={setTab} account={store.owner}>
      <div className="mkss">
        <aside className="mkss__sidebar" aria-label="Account sections">
          {SIDEBAR.map((group) => (
            <nav key={group.header} className="mkss__menu">
              <div className="mkss__menuhead">{group.header}</div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={"mkss__menuitem" + (item.id === "store_settings" ? " is-active" : "")}
                  aria-current={item.id === "store_settings" ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ))}
        </aside>

        <main className="mkss__main">
          <div className="mkss__header">
            <h1 className="mkss__title">Settings</h1>
            <a className="mkss__guestlink" href="#guest">
              See store as guest
            </a>
          </div>

          {isLoading ? (
            <div className="mkss__loader" role="status" aria-label="Loading">
              <span className="mkss__spinner" />
            </div>
          ) : (
            <>
              <div className="mkss__elements">
                <Field title="Store cover">
                  <CoverPicker
                    src={store.cover}
                    onPick={() => set({ cover: store.cover || PLACEHOLDER_COVER })}
                    onClear={() => set({ cover: "", coverName: "" })}
                  />
                  {errors.size && <div className="mkss__error">{errors.size}</div>}
                </Field>

                <Field title="Description">
                  <textarea
                    className="mkss__input mkss__textarea"
                    value={store.description}
                    onChange={(e) => set({ description: e.target.value })}
                  />
                </Field>

                <Field title="Website">
                  <input
                    className="mkss__input"
                    type="text"
                    value={store.website}
                    onChange={(e) => set({ website: e.target.value })}
                  />
                  {errors.website && <div className="mkss__error">{errors.website}</div>}
                </Field>

                <Field title="Facebook Handle">
                  <input
                    className="mkss__input"
                    type="text"
                    value={handle("facebook")}
                    onChange={(e) => onHandle("facebook", e.target.value)}
                  />
                  <div className="mkss__info">{store.facebook}</div>
                </Field>

                <Field title="Twitter Handle">
                  <input
                    className="mkss__input"
                    type="text"
                    value={handle("twitter")}
                    onChange={(e) => onHandle("twitter", e.target.value)}
                  />
                  <div className="mkss__info">{store.twitter}</div>
                </Field>

                <Field title="Discord Invite ID">
                  <input
                    className="mkss__input"
                    type="text"
                    value={handle("discord")}
                    onChange={(e) => onHandle("discord", e.target.value)}
                  />
                  <div className="mkss__info">{store.discord}</div>
                </Field>
              </div>

              <div className="mkss__bottom">
                <button
                  type="button"
                  className="mkss__btn mkss__btn--primary"
                  disabled={!canSubmit || hasErrors || isSaving}
                >
                  {isSaving ? <span className="mkss__btnspin" /> : "Save"}
                </button>
                <button
                  type="button"
                  className="mkss__btn"
                  disabled={isSaving || !canSubmit}
                  onClick={revert}
                >
                  Revert
                </button>
              </div>

              {error && <div className="mkss__reqerror">{error}</div>}
            </>
          )}
        </main>
      </div>
    </MarketplaceChrome>
  );
}

const PLACEHOLDER_COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="240">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#982de2"/><stop offset="1" stop-color="#ff2d55"/>' +
      "</linearGradient></defs>" +
      '<rect width="960" height="240" fill="url(#g)"/></svg>'
  );
