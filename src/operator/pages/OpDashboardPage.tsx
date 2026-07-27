import type { ComponentType, CSSProperties, ReactNode } from "react";

import SitesChrome from "../../web/frames/SitesChrome";
import "../../web/pages/stwhatsonadminusers.css";
import "./opdashboardpage.css";

export type OpRange = "1h" | "6h" | "24h";

export type OpLinkProps = {
  to: string;
  prefetch?: "intent" | "render" | "none" | "viewport";
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  "aria-label"?: string;
  children?: ReactNode;
};

export type OpLinkComponent = ComponentType<OpLinkProps>;

export type OpOperatorPlace = {
  id: string;
  title: string;
  base_position: string;
  user_count: number;
  visits_24h: number;
  favorites: number;
  like_rate: number | null;
  highlighted: boolean;
  disabled: boolean;
  world: boolean;
  world_name: string | null;
  banned_count: number;
  admin_count: number;
  headcount: number[];
};

export type OpOperatorDashboard = {
  owner: string;
  owner_name: string | null;
  places: OpOperatorPlace[];
};

export type OpDashboardTotals = {
  placeCount: number;
  totalLivePlayers: number;
  totalVisits24h: number;
  totalBanned: number;
  totalAdmins: number;
  disabledCount: number;
};

function totals(places: OpOperatorPlace[]): OpDashboardTotals {
  return places.reduce<OpDashboardTotals>(
    (acc, p) => ({
      placeCount: acc.placeCount + 1,
      totalLivePlayers: acc.totalLivePlayers + (p.user_count ?? 0),
      totalVisits24h: acc.totalVisits24h + (p.visits_24h ?? 0),
      totalBanned: acc.totalBanned + (p.banned_count ?? 0),
      totalAdmins: acc.totalAdmins + (p.admin_count ?? 0),
      disabledCount: acc.disabledCount + (p.disabled ? 1 : 0),
    }),
    {
      placeCount: 0,
      totalLivePlayers: 0,
      totalVisits24h: 0,
      totalBanned: 0,
      totalAdmins: 0,
      disabledCount: 0,
    },
  );
}

function byVisits(places: OpOperatorPlace[]): OpOperatorPlace[] {
  return [...places].sort((a, b) => (b.visits_24h ?? 0) - (a.visits_24h ?? 0));
}

function rangePoints(range: OpRange): number {
  switch (range) {
    case "1h":
      return 2;
    case "6h":
      return 12;
    case "24h":
      return 48;
  }
}

function windowOf(headcount: number[], range: OpRange): number[] {
  const n = rangePoints(range);
  return headcount.length > n ? headcount.slice(-n) : headcount;
}

function likePct(p: OpOperatorPlace): number | null {
  return p.like_rate == null ? null : Math.round(p.like_rate * 100);
}

type OpModerationTarget = "scene-bans" | "scene-admins";

function moderationLink(target: OpModerationTarget, placeId: string): string {
  const base =
    target === "scene-bans" ? "/operator/scene-bans" : "/operator/scene-admins";
  return `${base}?place=${encodeURIComponent(placeId)}`;
}

const W = 240;
const H = 36;

function paths(series: number[]): { line: string; area: string } | null {
  if (series.length < 2) return null;
  const max = Math.max(1, ...series);
  const stepX = W / (series.length - 1);
  const y = (v: number) => H - (v / max) * (H - 4) - 2;
  const pts = series.map((v, i) => `${(i * stepX).toFixed(2)},${y(v).toFixed(2)}`);
  const line = `M${pts.join(" L")}`;
  const area = `${line} L${W.toFixed(2)},${H} L0,${H} Z`;
  return { line, area };
}

function HeadcountTrend({ series, label }: { series: number[]; label?: string }) {
  const p = paths(series);
  if (!p) {
    return (
      <span className="spark__empty" aria-label={`No headcount history for ${label ?? "this place"}`}>
        no trend yet
      </span>
    );
  }
  const peak = Math.max(...series);
  return (
    <svg
      className="spark"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Headcount trend for ${label ?? "this place"}: peak ${peak}`}
    >
      <path className="spark__area" d={p.area} />
      <path className="spark__line" d={p.line} />
    </svg>
  );
}

type OperatorPlaceSummaryProps = {
  place: OpOperatorPlace;
  range: OpRange;
  onOpen: (placeId: string) => void;
  LinkComponent: OpLinkComponent;
};

function OperatorPlaceSummary({
  place,
  range,
  onOpen,
  LinkComponent,
}: OperatorPlaceSummaryProps) {
  const pct = likePct(place);
  const live = (place.user_count ?? 0) > 0;
  const series = windowOf(place.headcount, range);

  return (
    <LinkComponent
      to={`/places/${encodeURIComponent(place.id)}`}
      prefetch="intent"
      className={"opc" + (place.disabled ? " is-disabled" : "")}
      onClick={() => onOpen(place.id)}
      aria-label={`${place.title || place.id} — operator summary`}
    >
      <div className="opc__top">
        <span className="opc__title">{place.title || place.id}</span>
        <span className="opc__coords">
          {place.world && place.world_name ? place.world_name : place.base_position}
        </span>
      </div>

      <div className="opc__badges">
        {live && <span className="opc__badge opc__badge--live">{place.user_count} live</span>}
        {place.highlighted && (
          <span className="opc__badge opc__badge--featured">Featured</span>
        )}
        {place.disabled && (
          <span className="opc__badge opc__badge--disabled">Disabled</span>
        )}
      </div>

      <div className="opc__kpis">
        <div>
          <div className="opc__kpi-n">{place.user_count ?? 0}</div>
          <div className="opc__kpi-l">Live</div>
        </div>
        <div>
          <div className="opc__kpi-n">{(place.visits_24h ?? 0).toLocaleString()}</div>
          <div className="opc__kpi-l">24h visits</div>
        </div>
        <div>
          <div className="opc__kpi-n">{pct == null ? "—" : `${pct}%`}</div>
          <div className="opc__kpi-l">Like rate</div>
        </div>
        <div>
          <div className="opc__kpi-n">{place.banned_count ?? 0}</div>
          <div className="opc__kpi-l">Banned</div>
        </div>
        <div>
          <div className="opc__kpi-n">{place.admin_count ?? 0}</div>
          <div className="opc__kpi-l">Admins</div>
        </div>
        <div>
          <div className="opc__kpi-n">{(place.favorites ?? 0).toLocaleString()}</div>
          <div className="opc__kpi-l">Favorites</div>
        </div>
      </div>

      <HeadcountTrend series={series} label={place.title || place.id} />
    </LinkComponent>
  );
}

type PlaceVisitTableProps = {
  places: OpOperatorPlace[];
  range: OpRange;
  onOpen: (placeId: string) => void;
  LinkComponent: OpLinkComponent;
};

function PlaceVisitTable({ places, range, onOpen, LinkComponent }: PlaceVisitTableProps) {
  const ranked = byVisits(places);

  return (
    <div className="au__tablewrap">
      <table className="au__table">
        <thead>
          <tr>
            <th className="au-cell au-cell--center op__rank-num">#</th>
            <th className="au-cell">Place</th>
            <th className="au-cell op__num">24h visits</th>
            <th className="au-cell op__num">Live</th>
            <th className="au-cell op__num">Like rate</th>
            <th className="au-cell op__rank-spark">Trend</th>
          </tr>
        </thead>
        <tbody>
          {ranked.length === 0 ? (
            <tr>
              <td className="au-cell au-cell--empty" colSpan={6}>
                No operated places yet.
              </td>
            </tr>
          ) : (
            ranked.map((p, i) => {
              const pct = likePct(p);
              return (
                <tr className="au-row" key={p.id}>
                  <td className="au-cell au-cell--center">{i + 1}</td>
                  <td className="au-cell au-cell--user">
                    <LinkComponent
                      to={`/places/${encodeURIComponent(p.id)}`}
                      prefetch="intent"
                      onClick={() => onOpen(p.id)}
                      className="au-cell__name op__rank-name"
                    >
                      {p.title || p.id}
                    </LinkComponent>
                    <span className="au-cell__addr op__rank-coords">
                      {p.world && p.world_name ? p.world_name : p.base_position}
                    </span>
                    {p.disabled && (
                      <span className="opc__badge opc__badge--disabled op__rank-badge">
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="au-cell op__num">{(p.visits_24h ?? 0).toLocaleString()}</td>
                  <td className="au-cell op__num">{p.user_count ?? 0}</td>
                  <td className="au-cell op__num">{pct == null ? "—" : `${pct}%`}</td>
                  <td className="au-cell op__rank-spark">
                    <HeadcountTrend series={windowOf(p.headcount, range)} label={p.title || p.id} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

type ModerationLoadCardProps = {
  place: OpOperatorPlace;
  onModerationLink: (placeId: string, target: OpModerationTarget) => void;
  LinkComponent: OpLinkComponent;
};

function ModerationLoadCard({
  place,
  onModerationLink,
  LinkComponent,
}: ModerationLoadCardProps) {
  return (
    <div className="opm">
      <div className="opm__title">{place.title || place.id}</div>

      <div className="opm__counts">
        <div>
          <div className="opm__count-n">{place.banned_count ?? 0}</div>
          <div className="opm__count-l">Banned</div>
        </div>
        <div>
          <div className="opm__count-n">{place.admin_count ?? 0}</div>
          <div className="opm__count-l">Admins</div>
        </div>
      </div>

      <div className="opm__links">
        <LinkComponent
          to={moderationLink("scene-bans", place.id)}
          prefetch="intent"
          className="opm__link"
          onClick={() => onModerationLink(place.id, "scene-bans")}
        >
          Manage bans
        </LinkComponent>
        <LinkComponent
          to={moderationLink("scene-admins", place.id)}
          prefetch="intent"
          className="opm__link"
          onClick={() => onModerationLink(place.id, "scene-admins")}
        >
          Manage admins
        </LinkComponent>
      </div>
    </div>
  );
}

function Total({ n, label }: { n: number | string; label: string }) {
  return (
    <div className="op__total">
      <div className="op__total-n">{n}</div>
      <div className="op__total-l">{label}</div>
    </div>
  );
}

function RangeToggle({
  range,
  onSelect,
}: {
  range: OpRange;
  onSelect: (r: OpRange) => void;
}) {
  const opts: OpRange[] = ["1h", "6h", "24h"];
  return (
    <div className="op__range" role="tablist" aria-label="Headcount time range">
      {opts.map((r) => (
        <button
          key={r}
          type="button"
          role="tab"
          aria-selected={r === range}
          className={"op__range-btn" + (r === range ? " is-active" : "")}
          onClick={() => onSelect(r)}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export type OpDashboardPageProps = {
  range: OpRange;
  dashboard: OpOperatorDashboard;
  live: boolean;
  unavailable: boolean;
  LinkComponent: OpLinkComponent;
  onSelectRange: (next: OpRange) => void;
  onOpenPlace: (placeId: string) => void;
  onModerationLink: (placeId: string, target: OpModerationTarget) => void;
};

export default function OpDashboardPage({
  range,
  dashboard,
  live,
  unavailable,
  LinkComponent,
  onSelectRange,
  onOpenPlace,
  onModerationLink,
}: OpDashboardPageProps) {
  const t = totals(dashboard.places);

  const cards = dashboard.places;
  const ranked = byVisits(dashboard.places);
  const modPlaces = ranked.filter(
    (p) => (p.banned_count ?? 0) > 0 || (p.admin_count ?? 0) > 0 || p.disabled,
  );

  return (
    <SitesChrome active="create" signedIn>
      <div className="op">
        <div className="op__head">
          <div>
            <h1 className="op__title">Operator dashboard</h1>
            <p className="op__sub">
              Live visits, headcount trend, and moderation load across your
              operated places.{" "}
              {unavailable && (
                <span className="op__degraded">live data unavailable</span>
              )}
            </p>
            <p className="op__owner">
              {dashboard.owner_name ? `${dashboard.owner_name} · ` : ""}
              {dashboard.owner}
            </p>
          </div>
          <RangeToggle range={range} onSelect={onSelectRange} />
        </div>

        {unavailable ? (
          <p className="op__sub" role="alert">
            Couldn't load operated places from the live backend right now. No
            captured data is shown — please retry shortly.
          </p>
        ) : !live ? (
          <p className="op__sub">
            This wallet operates no places yet. Deploy a scene to see live
            visits, headcount, and moderation load here.
          </p>
        ) : (
          <>
            <div className="op__totals">
              <Total n={t.placeCount} label="Places" />
              <Total n={t.totalLivePlayers} label="Live players" />
              <Total n={t.totalVisits24h.toLocaleString()} label="24h visits" />
              <Total n={t.totalBanned} label="Banned (total)" />
              <Total n={t.totalAdmins} label="Admins (total)" />
              <Total n={t.disabledCount} label="Disabled" />
            </div>

            <h2 className="op__section">Per-place summary</h2>
            <div className="op__cards">
              {cards.map((p) => (
                <OperatorPlaceSummary
                  key={p.id}
                  place={p}
                  range={range}
                  onOpen={onOpenPlace}
                  LinkComponent={LinkComponent}
                />
              ))}
            </div>

            <h2 className="op__section">Operated places by 24h visits</h2>
            <PlaceVisitTable
              places={dashboard.places}
              range={range}
              onOpen={onOpenPlace}
              LinkComponent={LinkComponent}
            />

            <h2 className="op__section">Moderation load</h2>
            {modPlaces.length === 0 ? (
              <p className="op__sub">
                No active moderation load across your places.
              </p>
            ) : (
              <div className="op__mod">
                {modPlaces.map((p) => (
                  <ModerationLoadCard
                    key={p.id}
                    place={p}
                    onModerationLink={onModerationLink}
                    LinkComponent={LinkComponent}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </SitesChrome>
  );
}
