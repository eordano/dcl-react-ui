import NinePatch from "./NinePatch.jsx";
import { asset } from "../../asset.js";

// Nine-patch (9-slice): slices one tiny frame into a 3x3 grid — corners fixed, edges stretch one axis, center both — so it scales without distorting corners.
const FILL = asset("assets/progress-fill-9slice.png"); // 57x20 orange pill
const CONTAINER = asset("assets/progress-container-9slice.png"); // 57x20 frame
const LOADING = asset("assets/loading-bar-9slice.png"); // 411x60 bar

const caption = {
  fontSize: 13,
  lineHeight: 1.5,
  maxWidth: 560,
  margin: "0 0 18px",
  color: "#8b8b96",
};
const sizeLabel = {
  fontSize: 11,
  fontFamily: "monospace",
  color: "#8b8b96",
  marginTop: 6,
};

export default {
  title: "Explorer/Atoms/NinePatch",
  component: NinePatch,
  parameters: { layout: "padded" },
};

// Same 57x20 source at growing widths: corners pixel-identical, only the middle stretches.
export const WhatIsNinePatch = {
  name: "What nine-patch does",
  render: () => (
    <div>
      <p style={caption}>
        One small source image (<code>57x20px</code>), rendered at four different
        widths. The rounded corners stay <strong>exactly</strong> the same size
        in every box, while only the middle stretches. Sweep your eye down the
        left edge: every cap is identical.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {[80, 160, 280, 440].map((w) => (
          <div key={w}>
            <NinePatch
              src={FILL}
              slice={10}
              border={10}
              style={{ width: w, height: 28 }}
            />
            <div style={sizeLabel}>{w} x 28</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Nine-patch vs. a plain stretched <img>: the naive image smears its corners into ellipses.
export const VersusNaiveStretch = {
  name: "vs. naive image stretch",
  render: () => {
    const w = 440;
    const h = 120;
    return (
      <div>
        <p style={caption}>
          Both boxes are <code>{w}x{h}</code> from the same{" "}
          <code>57x20</code> source. Left: a normal <code>&lt;img&gt;</code>{" "}
          scaled to fit — the rounded corners blow up into ellipses and the
          whole frame distorts. Right: the nine-patch — corners untouched, only
          the fill stretches.
        </p>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <div>
            <img
              src={FILL}
              alt="stretched"
              style={{ width: w, height: h, display: "block" }}
            />
            <div style={sizeLabel}>plain &lt;img&gt; — distorted</div>
          </div>
          <div>
            <NinePatch
              src={FILL}
              slice={10}
              border={10}
              style={{ width: w, height: h }}
            />
            <div style={sizeLabel}>nine-patch — corners preserved</div>
          </div>
        </div>
      </div>
    );
  },
};

// Stretching is independent per axis: same frame as a wide bar, tall column, and large panel.
export const StretchesOnBothAxes = {
  name: "stretches on both axes",
  render: () => (
    <div>
      <p style={caption}>
        The four edges stretch along one axis and the center fills the rest, so
        the same frame works as a wide bar, a tall column, or a big panel —
        corners always fixed.
      </p>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div>
          <NinePatch
            src={CONTAINER}
            slice={16}
            border={16}
            style={{ width: 360, height: 36 }}
          />
          <div style={sizeLabel}>wide bar</div>
        </div>
        <div>
          <NinePatch
            src={CONTAINER}
            slice={16}
            border={16}
            style={{ width: 60, height: 200 }}
          />
          <div style={sizeLabel}>tall column</div>
        </div>
        <div>
          <NinePatch
            src={CONTAINER}
            slice={16}
            border={16}
            style={{ width: 240, height: 200 }}
          />
          <div style={sizeLabel}>large panel</div>
        </div>
      </div>
    </div>
  ),
};

// Real-world usage: a progress bar built from two nine-patches (track + fill).
export const RealWorldProgressBar = {
  name: "real-world: progress bar",
  render: () => (
    <div>
      <p style={caption}>
        How it is actually used: a track and a fill, each a tiny nine-patch
        source, composited and sized at runtime to any width.
      </p>
      {[0.25, 0.6, 1].map((pct) => (
        <div key={pct} style={{ position: "relative", marginBottom: 16 }}>
          <NinePatch
            src={CONTAINER}
            slice={16}
            border={16}
            style={{ width: 440, height: 28 }}
          />
          <NinePatch
            src={FILL}
            slice={10}
            border={10}
            style={{
              position: "absolute",
              inset: 0,
              width: 440 * pct,
              height: 28,
            }}
          />
          <div style={sizeLabel}>{Math.round(pct * 100)}%</div>
        </div>
      ))}
    </div>
  ),
};

// The component also supports `tint` (background bleed-through) and `as`.
export const Tinted = {
  args: {
    src: asset("assets/progress-fill-9slice.png"),
    slice: 10,
    border: 10,
    tint: "#ffb13d",
    style: { width: 320, height: 28 },
  },
};

export const LoadingBar = {
  args: {
    src: LOADING,
    slice: 12,
    border: 12,
    style: { width: 400, height: 24 },
  },
};
