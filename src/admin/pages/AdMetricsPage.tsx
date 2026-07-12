import type { ComponentType } from "react";

import AdMetricsDashboard from "./AdMetricsDashboard";
import AdModerationFunnel from "./AdModerationFunnel";
import AdQueueDepthTrend from "./AdQueueDepthTrend";
import type {
  FunnelRow,
  MetricsLinkProps,
  Range,
  SurfaceKey,
  SurfaceKpi,
  TrendSeries,
} from "./AdMetricsTypes";
import "./adminmetrics.css";

export type AdMetricsPageProps = {
  range: Range;
  kpis: SurfaceKpi[];
  trendLabels: string[];
  trendSeries: TrendSeries[];
  funnelRows: FunnelRow[];
  eventsLiveError: boolean;
  generatedAt: string;
  onRangeChange: (range: Range) => void;
  onSurfaceClick: (surface: SurfaceKey) => void;
  LinkComponent?: ComponentType<MetricsLinkProps>;
};

export default function AdMetricsPage({
  range,
  kpis,
  trendLabels,
  trendSeries,
  funnelRows,
  eventsLiveError,
  generatedAt,
  onRangeChange,
  onSurfaceClick,
  LinkComponent = undefined,
}: AdMetricsPageProps) {
  return (
    <div className="am">
      <div className="am__head">
        <div>
          <h1 className="am__title">Moderation metrics</h1>
          <p className="am__sub">
            Queue depth, decisions, approval split and time-to-decision across
            places reports, communities and What&apos;s On events. Cards
            deep-link into each moderation queue.
          </p>
        </div>

        <div
          className="am__range"
          role="group"
          aria-label="Decision window"
        >
          <button
            type="button"
            className={range === "7d" ? "is-active" : ""}
            aria-pressed={range === "7d"}
            onClick={() => onRangeChange("7d")}
          >
            Last 7d
          </button>
          <button
            type="button"
            className={range === "30d" ? "is-active" : ""}
            aria-pressed={range === "30d"}
            onClick={() => onRangeChange("30d")}
          >
            Last 30d
          </button>
        </div>
      </div>

      <AdMetricsDashboard
        kpis={kpis}
        range={range}
        onSurfaceClick={onSurfaceClick}
        LinkComponent={LinkComponent}
      />

      <div className="am__panels">
        <AdQueueDepthTrend labels={trendLabels} series={trendSeries} />
        <AdModerationFunnel rows={funnelRows} />
      </div>

      <p className="am__footnote">
        {eventsLiveError
          ? "Live events read failed — the events queue is shown empty (no fixture fallback). "
          : "Events approved/featured counts are read live (and fully paginated) from the public events list. "}
        The events pending/rejected buckets are admin-bearer gated (no
        anonymous source), so they are shown empty rather than from the
        snapshot. Places + communities reads are admin-bearer gated, so those
        counts (and all decision-rate / SLA figures) come from the bundled
        snapshot. Generated {new Date(generatedAt).toUTCString()}.
      </p>
    </div>
  );
}
