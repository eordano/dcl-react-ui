import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import Button from "../../atoms/Button.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import "./wearableshomeview.css";

const CREATE_HREF = "/create/wearables/collections/new";

const STATUS_DOT = {
  synced: "var(--cwh-status-synced)",
  under_review: "var(--cwh-status-review)",
  loading: "var(--cwh-status-loading)",
  unsynced: "var(--cwh-status-unsynced)",
};

const headActionsStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
};

const rowBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  width: "100%",
  padding: 0,
  border: "none",
  background: "none",
  color: "inherit",
  font: "inherit",
  textAlign: "left",
  cursor: "pointer",
};

const errorBannerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
};
const errorRetryStyle = {
  flex: "0 0 auto",
  border: "1px solid color-mix(in srgb, var(--error) 45%, transparent)",
  background: "color-mix(in srgb, var(--error) 16%, transparent)",
  color: "inherit",
  borderRadius: "var(--r-control)",
  padding: "6px 14px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const CollectionGlyph = (
  <svg
    viewBox="0 0 24 24"
    width="34"
    height="34"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 21 8l-9 5-9-5 9-5Z" />
    <path d="M3 12l9 5 9-5M3 16l9 5 9-5" />
  </svg>
);

export default function WearablesHomeView({
  signedIn = false,
  account = "",
  name = "",
  error = false,
  retrying = false,
  rescoping = false,
  collections =([]),
  view = "grid",
  onSignIn =(undefined),
  onSelectView =(undefined),
  onOpen =(undefined),
  onRetry =(undefined),
}) {
  return (
    <CreatorHubChrome
      active="collections"
      signedIn={signedIn}
      account={account}
      name={name}
      onSignIn={onSignIn}
    >
      <div className="cwh">
        <header className="cwh__head">
          <div>
            <h1 className="cwh__title">Collections</h1>
            <p className="cwh__sub">
              Create and manage your Decentraland wearable &amp; emote collections.
            </p>
          </div>
          <div style={headActionsStyle}>
            {!signedIn && (
              <Button variant="secondary" onClick={onSignIn}>
                Connect wallet
              </Button>
            )}
            {signedIn && (
              <a href={CREATE_HREF} className="cwh__cta">
                <span aria-hidden="true">＋</span> Create Collection
              </a>
            )}
          </div>
        </header>

        {error && (
          <div role="alert" className="cwh__error" style={errorBannerStyle}>
            <span>
              Couldn’t reach the Builder data layer just now — showing an empty
              list.
            </span>
            <button
              type="button"
              onClick={onRetry}
              disabled={retrying}
              style={errorRetryStyle}
            >
              {retrying ? "Retrying…" : "Try again"}
            </button>
          </div>
        )}

        <div id="cwh-panel">
          {rescoping ? (
            <div className="cwh__empty" role="status" aria-live="polite">
              <span className="u-spinner" aria-hidden="true" />
              <p className="cwh__emptydesc" style={{ margin: 0 }}>
                Loading your collections…
              </p>
            </div>
          ) : collections.length === 0 ? (
            <EmptyCollections connected={signedIn} onConnect={onSignIn} />
          ) : (
            <>
              <div className="cwh__results">
                <span className="cwh__count">
                  {collections.length}{" "}
                  {collections.length === 1 ? "collection" : "collections"}
                </span>
                <div className="cwh__chips">
                  <ViewChip
                    label="Grid view"
                    active={view === "grid"}
                    onClick={() => onSelectView && onSelectView("grid")}
                    glyph="grid"
                  />
                  <ViewChip
                    label="List view"
                    active={view === "list"}
                    onClick={() => onSelectView && onSelectView("list")}
                    glyph="list"
                  />
                </div>
              </div>

              {view === "list" ? (
                <CollectionList cards={collections} onOpen={onOpen} />
              ) : (
                <CollectionGrid cards={collections} onOpen={onOpen} />
              )}
            </>
          )}
        </div>

        <p className="cwh__note">
          Your collections, read live from Decentraland. Thumbnails load from the
          catalog. Browse-only — nothing is signed here.
        </p>
      </div>
    </CreatorHubChrome>
  );
}

function CollectionGrid({ cards, onOpen }) {
  return (
    <div className="cwh__grid">
      {cards.map((c, i) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onOpen && onOpen(c.id, "collection")}
          aria-label={c.name}
          className="cwh__card"
        >
          <span
            className="cwh__thumb"
            style={{ background: thumbFor(c, i) }}
            aria-hidden="true"
          />
          <span className="cwh__cardbody">
            <span className="cwh__cardname" title={c.name}>
              {c.name}
            </span>
            <span className="cwh__cardmeta">
              <StatusDot status={c.status} />
              <span>
                {c.count} {c.count === 1 ? "item" : "items"}
                {c.type === "third_party" ? " · Linked" : ""}
              </span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function CollectionList({ cards, onOpen }) {
  return (
    <div className="cwh__listwrap">
      <table className="cwh__table">
        <thead>
          <tr>
            <th className="cwh__th">Collection</th>
            <th className="cwh__th">Type</th>
            <th className="cwh__th">Items</th>
            <th className="cwh__th">Status</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((c, i) => (
            <tr key={c.id} className="cwh__tr">
              <td className="cwh__td">
                <button
                  type="button"
                  onClick={() => onOpen && onOpen(c.id, "collection")}
                  className="cwh__rowbtn"
                  style={rowBtnStyle}
                >
                  <span
                    className="cwh__rowthumb"
                    style={{ background: thumbFor(c, i) }}
                    aria-hidden="true"
                  />
                  <span className="u-truncate" title={c.name}>
                    {c.name}
                  </span>
                </button>
              </td>
              <td className="cwh__td">
                {c.type === "third_party" ? "Linked Wearables" : "Standard"}
              </td>
              <td className="cwh__td">{c.count}</td>
              <td className="cwh__td">
                <span className="cwh__rowname">
                  <StatusDot status={c.status} />
                  <span>{statusLabel(c.status)}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyCollections({ connected, onConnect }) {
  if (!connected) {
    return (
      <EmptyState
        className="es--card"
        icon={CollectionGlyph}
        iconWash
        title="Create wearable collections"
        subtitle="Connect your wallet to create and manage your Decentraland wearable & emote collections."
        actions={
          <Button variant="secondary" onClick={onConnect}>
            Connect wallet
          </Button>
        }
        variant={undefined}
        tone={undefined}
        actionsGap={undefined}
        style={undefined}
      />
    );
  }
  return (
    <EmptyState
      className="es--card"
      icon={CollectionGlyph}
      iconWash
      title="No collections yet"
      subtitle="Create your first collection, and dress the metaverse in style!"
      actions={
        <a href={CREATE_HREF} className="cwh__cta">
          <span aria-hidden="true">＋</span> Create Collection
        </a>
      }
      variant={undefined}
      tone={undefined}
      actionsGap={undefined}
      style={undefined}
    />
  );
}

function StatusDot({ status }) {
  if (!status) return null;
  return (
    <span
      className="cwh__dot"
      style={{ background: STATUS_DOT[status] ?? "var(--cwh-status-default)" }}
      title={statusLabel(status)}
      aria-hidden="true"
    />
  );
}

function statusLabel(status) {
  switch (status) {
    case "synced":
      return "Synced";
    case "under_review":
      return "Under Review";
    case "loading":
      return "Loading…";
    case "unsynced":
      return "Unsynced";
    default:
      return "Unpublished";
  }
}

function thumbFor(c, i) {
  return (
    c.thumbs[0] ??
    `linear-gradient(135deg, hsl(${(i * 47) % 360} 70% 55%), var(--panel))`
  );
}

function ViewChip({ label, active, onClick, glyph }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className="cwh__chip"
    >
      {glyph === "grid" ? (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <rect x="2" y="3" width="12" height="2" rx="1" fill="currentColor" />
          <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
          <rect x="2" y="11" width="12" height="2" rx="1" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
