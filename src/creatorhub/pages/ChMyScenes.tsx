import { type JSX } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome";
import "./chmyscenes.css";

export type MySceneVM = {
  entityId: string;
  kind: "land" | "world";
  title: string;
  baseParcel: string;
  pointers: string[];
  worldName: string | null;
  thumbnailUrl: string | null;
  editable: boolean;
  deployedAt: number | null;
  openHref: string;
  syncState?: "synced" | "editing" | "pending" | "syncing" | "offline" | "conflict" | "error";
};

type SyncState = NonNullable<MySceneVM["syncState"]>;

const SYNC_META: Record<SyncState, { label: string; tone: string; live?: boolean }> = {
  synced: { label: "Synced", tone: "good" },
  editing: { label: "Editing", tone: "brand" },
  pending: { label: "Pending", tone: "muted" },
  syncing: { label: "Syncing", tone: "info", live: true },
  offline: { label: "Offline", tone: "muted" },
  conflict: { label: "Out of sync", tone: "warn" },
  error: { label: "Error", tone: "bad" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function normalizeTs(ts: number): number {
  return ts < 1e12 ? ts * 1000 : ts;
}

function relativeDeployed(ts: number | null): string | null {
  if (!ts) return null;
  const then = normalizeTs(ts);
  if (!Number.isFinite(then)) return null;
  const now = Date.now();
  const diff = now - then;
  const min = 60_000;
  const hour = 60 * min;
  const day = 24 * hour;
  if (diff < 0) {
    const d = new Date(then);
    return `Deployed ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  if (diff < hour) {
    const m = Math.max(1, Math.round(diff / min));
    return `Deployed ${m} min${m === 1 ? "" : "s"} ago`;
  }
  if (diff < day) {
    const h = Math.round(diff / hour);
    return `Deployed ${h} hour${h === 1 ? "" : "s"} ago`;
  }
  if (diff < 30 * day) {
    const d = Math.round(diff / day);
    return `Deployed ${d} day${d === 1 ? "" : "s"} ago`;
  }
  const d = new Date(then);
  return `Deployed ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function hueFrom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (Math.imul(h, 31) + seed.charCodeAt(i)) >>> 0;
  return h % 360;
}

function shortAddress(addr: string): string {
  return addr && addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

const LandGlyph = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
    <rect x="3" y="3" width="14" height="14" rx="1.3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7.7 3v14M12.3 3v14M3 7.7h14M3 12.3h14" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);

const GlobeGlyph = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
    <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M2.8 10h14.4M10 2.8c2 2 3 4.6 3 7.2s-1 5.2-3 7.2c-2-2-3-4.6-3-7.2s1-5.2 3-7.2Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);

const OpenGlyph = () => (
  <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
    <path d="M4 13.5 13.5 4M8 4h5.5V9.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5 11.5V15a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5h3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WalletGlyph = () => (
  <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
    <rect x="6" y="11" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.2" fill="none" />
    <path d="M6 17h32" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="31" cy="26" r="2.4" fill="currentColor" />
  </svg>
);

const RadarGlyph = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <circle cx="24" cy="24" r="6.5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.9" />
    <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.45" />
    <circle cx="24" cy="24" r="19.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.22" />
    <path d="M24 24 40 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="2.4" fill="currentColor" />
  </svg>
);

function StatusBadge({ state }: { state: SyncState }): JSX.Element {
  const meta = SYNC_META[state];
  return (
    <span
      className={`chms__badge chms__badge--${meta.tone}`}
      role="status"
      aria-label={`Status: ${meta.label}`}
    >
      <span className={"chms__dot" + (meta.live ? " chms__dot--live" : "")} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

function PlaceholderTile({ scene }: { scene: MySceneVM }): JSX.Element {
  const seed = scene.kind === "world" ? scene.worldName ?? scene.entityId : scene.baseParcel || scene.entityId;
  const hue = hueFrom(seed);
  const label = scene.kind === "world" ? scene.worldName ?? "World" : scene.baseParcel || "—";
  const style = {
    background: `radial-gradient(120% 120% at 22% 12%, hsl(${hue} 58% 34%), hsl(${(hue + 40) % 360} 46% 15%) 62%, #0b0a0e)`,
  } as const;
  return (
    <div className="chms__tile" style={style} aria-hidden="true">
      <span className="chms__tilekind">{scene.kind === "world" ? "WORLD" : "LAND"}</span>
      <span className="chms__tilecoord">{label}</span>
    </div>
  );
}

function SceneCard({ scene, index, onOpen }: { scene: MySceneVM; index: number; onOpen: (s: MySceneVM) => void }): JSX.Element {
  const state = scene.syncState ?? "synced";
  const when = relativeDeployed(scene.deployedAt);
  const parcelCount = scene.kind === "land" ? scene.pointers.length : 0;
  const chipText =
    scene.kind === "world"
      ? `World: ${scene.worldName ?? "unnamed"}`
      : `LAND ${scene.baseParcel || "—"}${parcelCount > 1 ? ` · ${parcelCount} parcels` : ""}`;
  return (
    <article className="chms__card" style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}>
      <div className="chms__media">
        {scene.thumbnailUrl ? (
          <img className="chms__thumb" src={scene.thumbnailUrl} alt={`Preview of ${scene.title}`} loading="lazy" />
        ) : (
          <PlaceholderTile scene={scene} />
        )}
        <StatusBadge state={state} />
      </div>
      <div className="chms__body">
        <h3 className="chms__cardtitle u-truncate" title={scene.title}>
          {scene.title}
        </h3>
        <div className="chms__meta">
          <span className={"chms__chip chms__chip--" + scene.kind}>
            <i className="chms__chipicon">{scene.kind === "world" ? <GlobeGlyph /> : <LandGlyph />}</i>
            <span className="u-truncate">{chipText}</span>
          </span>
        </div>
        {when ? <p className="chms__when">{when}</p> : <p className="chms__when chms__when--empty" />}
        <div className="chms__actions">
          {scene.editable ? (
            <button
              type="button"
              className="chms__btn chms__btn--primary"
              onClick={() => onOpen(scene)}
              aria-label={`Open ${scene.title} in the editor`}
            >
              <OpenGlyph />
              Open in editor
            </button>
          ) : (
            <div className="chms__viewonly">
              <button
                type="button"
                className="chms__btn chms__btn--ghost"
                disabled
                aria-disabled="true"
                aria-label={`${scene.title} is a code scene and cannot be opened in the visual editor`}
              >
                <OpenGlyph />
                Open in editor
              </button>
              <span className="chms__note">Code scene · view only</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function SkeletonCard({ index }: { index: number }): JSX.Element {
  return (
    <div className="chms__card chms__card--skel" style={{ animationDelay: `${index * 70}ms` }} aria-hidden="true">
      <div className="chms__media chms__media--skel">
        <span className="chms__shimmer" />
      </div>
      <div className="chms__body">
        <span className="chms__skelline chms__skelline--title" />
        <span className="chms__skelline chms__skelline--chip" />
        <span className="chms__skelline chms__skelline--btn" />
      </div>
    </div>
  );
}

export default function ChMyScenes(props: {
  signedIn: boolean;
  account: string;
  name?: string;
  loading: boolean;
  scenes: MySceneVM[];
  onSignIn: () => void;
  onOpen: (s: MySceneVM) => void;
  onStartFromTemplate: () => void;
}): JSX.Element {
  const { signedIn, account, name, loading, scenes, onSignIn, onOpen, onStartFromTemplate } = props;

  let body: JSX.Element;

  if (!signedIn) {
    body = (
      <div className="chms__hero" role="region" aria-label="Sign in to see your scenes">
        <span className="chms__heroicon chms__heroicon--wallet" aria-hidden="true">
          <WalletGlyph />
        </span>
        <h1 className="chms__herotitle">Sign in to see your scenes</h1>
        <p className="chms__herolead">
          Your scenes will appear here once your wallet is connected.
        </p>
        <button type="button" className="chms__btn chms__btn--primary chms__btn--lg" onClick={onSignIn}>
          Sign in
        </button>
        <p className="chms__reassure">We only read your published scenes. Nothing is changed.</p>
      </div>
    );
  } else if (loading) {
    body = (
      <section className="chms__stage" aria-busy="true">
        <header className="chms__scanhead" role="status" aria-live="polite">
          <span className="chms__heroicon chms__heroicon--scan" aria-hidden="true">
            <RadarGlyph />
          </span>
          <div className="chms__scantext">
            <h1 className="chms__title">Finding scenes you&apos;ve deployed…</h1>
            <p className="chms__subtitle">
              Reading from Decentraland&apos;s live content
              {account ? <> for <span className="chms__addr">{shortAddress(account)}</span></> : null}. Nothing is changed.
            </p>
          </div>
        </header>
        <div className="chms__grid" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      </section>
    );
  } else if (scenes.length === 0) {
    body = (
      <div className="chms__hero" role="region" aria-label="No scenes found">
        <span className="chms__heroicon chms__heroicon--empty" aria-hidden="true">
          <RadarGlyph />
        </span>
        <h1 className="chms__herotitle">No published scenes found for this wallet yet</h1>
        <p className="chms__herolead">
          When you publish a scene to your LAND or a World, it&apos;ll show up here automatically — ready
          to reopen and keep building. Start something new to get going.
        </p>
        <button type="button" className="chms__btn chms__btn--primary chms__btn--lg" onClick={onStartFromTemplate}>
          Start from a template
        </button>
      </div>
    );
  } else {
    const count = scenes.length;
    body = (
      <section className="chms__stage">
        <header className="chms__head">
          <div className="chms__headmain">
            <h1 className="chms__title">Your scenes</h1>
            <p className="chms__subtitle">
              {count} published scene{count === 1 ? "" : "s"} found
              {name ? <> for <span className="chms__addr">{name}</span></> : account ? <> for <span className="chms__addr">{shortAddress(account)}</span></> : null}
              . Pick one up right where you left off.
            </p>
          </div>
          <button type="button" className="chms__btn chms__btn--ghost" onClick={onStartFromTemplate}>
            Start from a template
          </button>
        </header>
        <div className="chms__grid">
          {scenes.map((scene, i) => (
            <SceneCard key={scene.entityId} scene={scene} index={i} onOpen={onOpen} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <CreatorHubChrome active="scenes" signedIn={signedIn} account={account} name={name} onSignIn={onSignIn}>
      <div className="chms">{body}</div>
    </CreatorHubChrome>
  );
}
