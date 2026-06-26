import { useState } from "react";
import "./emotewheel.css";

const EMOTES = [
  "Wave", "Clap", "Dance", "Kiss", "Headexplode",
  "Robot", "Hammer", "Tik", "Snowfall", "Disco",
];
const N = EMOTES.length;

const CX = 200;
const CY = 200;
const R_OUT = 196;
const R_IN = 108;
const R_MID = (R_OUT + R_IN) / 2;
const STEP = 360 / N;
const START = -90 - STEP / 2;
const GAP_DEG = 1.4;
const PAD_R = 3;

const rad = (deg) => (deg * Math.PI) / 180;
const pt = (r, deg) => [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))];

function wedgePath(a0, a1) {
  const g = GAP_DEG / 2;
  const ai = a0 + g;
  const aj = a1 - g;
  const rO = R_OUT - PAD_R;
  const rI = R_IN + PAD_R;
  const [ox0, oy0] = pt(rO, ai);
  const [ox1, oy1] = pt(rO, aj);
  const [ix1, iy1] = pt(rI, aj);
  const [ix0, iy0] = pt(rI, ai);
  return [
    `M ${ox0} ${oy0}`,
    `A ${rO} ${rO} 0 0 1 ${ox1} ${oy1}`,
    `L ${ix1} ${iy1}`,
    `A ${rI} ${rI} 0 0 0 ${ix0} ${iy0}`,
    "Z",
  ].join(" ");
}

const POSES = [
  "M0 -6 C -2 -6 -2.8 -4.6 -2.8 -3 L -2.8 -1 L -5 -7 L -6.6 -6.2 L -3.8 1 "
    + "L -3.8 4 L -5 11 L -3.2 11.5 L -1.6 4.6 L 1.6 4.6 L 3.2 11.5 L 5 11 "
    + "L 3.8 4 L 3.8 -3 C 3.8 -4.8 2 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.6 L -5.2 -1.2 L -4.6 0.4 L -2.6 -0.4 "
    + "L -2.6 4 L -4 11 L -2.2 11.5 L -0.4 4.6 L 0.4 4.6 L 2.2 11.5 L 4 11 "
    + "L 2.6 4 L 2.6 -0.4 L 4.6 0.4 L 5.2 -1.2 L 3 -2.6 C 3 -4.4 2.2 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.6 L -6.4 -1.6 L -6.8 0 L -3 0.4 L -3 4 "
    + "L -5.8 10.6 L -4 11.4 L -1.4 5 L 2.4 5 L 4.6 11.4 L 6.2 10.4 L 3 4.4 "
    + "L 3 0.4 L 6.8 -0.6 L 6.4 -2.2 L 3 -2.6 C 3 -4.4 2.2 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.5 L -4.8 2.2 L -3.4 3 L -2.2 -0.2 "
    + "L -2.2 4 L -3.6 11 L -1.8 11.5 L 0 5 L 1.8 11.5 L 3.6 11 L 2.2 4 "
    + "L 2.2 -1 L 3.6 -6 L 5 -8 L 3.4 -8.8 L 2 -5.8 C 1.4 -5.6 0.8 -6 0 -6 Z",
  "M0 -6 C -2 -6 -2.8 -4.6 -2.8 -3 L -5 -8.6 L -6.6 -7.8 L -3.8 -1 "
    + "L -3.8 4 L -5 11 L -3.2 11.5 L -1.6 4.6 L 1.6 4.6 L 3.2 11.5 L 5 11 "
    + "L 3.8 4 L 3.8 -1 L 6.6 -7.8 L 5 -8.6 L 2.8 -3 C 2.8 -4.6 2 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.6 L -6 -2.6 L -6 -5.6 L -7.6 -5.6 "
    + "L -7.6 -1 L -3 -1 L -3 4 L -4.4 11 L -2.6 11.5 L -0.8 4.6 L 0.8 4.6 "
    + "L 2.6 11.5 L 4.4 11 L 3 4 L 3 -1 L 7.6 -1 L 7.6 -5.6 L 6 -5.6 L 6 -2.6 "
    + "L 3 -2.6 C 3 -4.4 2.2 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.5 L -2.2 -0.3 L -2.2 4 L -3.6 11 "
    + "L -1.8 11.5 L 0 5 L 1.8 11.5 L 3.6 11 L 2.2 4 L 2.2 -2 L 6 -7 "
    + "L 4.6 -8.2 L 1.8 -4 C 1.2 -5.4 0.8 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.5 L -4.6 2.2 L -3.2 3 L -2.2 0 L -2.2 3.4 "
    + "L -5.4 10.8 L -3.8 11.6 L -1 4.4 L 1 4.4 L 4 11.4 L 5.6 10.6 L 2.2 3.4 "
    + "L 2.2 0 L 3.2 3 L 4.6 2.2 L 3 -2.5 C 3 -4.4 2.2 -6 0 -6 Z",
  "M0 -6 C -2.2 -6 -3 -4.4 -3 -2.6 L -6 1.4 L -4.8 2.6 L -2.6 0 L -2.6 4 "
    + "L -4 11 L -2.2 11.5 L 0 5 L 2.2 11.5 L 4 11 L 2.6 4 L 2.6 0 L 4.8 2.6 "
    + "L 6 1.4 L 3 -2.6 C 3 -4.4 2.2 -6 0 -6 Z",
  "M0 -6 C -2 -6 -2.8 -4.6 -2.8 -3 L -5.2 -8 L -6.8 -7.2 L -3.8 -1 "
    + "L -3.8 4 L -5 11 L -3.2 11.5 L -1.6 4.6 L 1.6 4.6 L 3.2 11.5 L 5 11 "
    + "L 3.8 4 L 3.8 0 L 6.4 4 L 7.8 3 L 4 -2 L 2.8 -3 C 2.8 -4.6 2 -6 0 -6 Z",
];

function EmoteIcon({ pose }) {
  return (
    <g className="ew__fig">
      <circle cx="0" cy="-10" r="3.2" />
      <path d={POSES[pose % POSES.length]} />
    </g>
  );
}

export default function EmoteWheel() {
  const [sel, setSel] = useState(0);

  return (
    <div className="ew">
      <div className="ew__wheel">
        <svg className="ew__ring" viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <radialGradient id="ewSlice" gradientUnits="userSpaceOnUse"
              cx="200" cy="200" r="196">
              <stop offset="50%" stopColor="#ebeaee" />
              <stop offset="85%" stopColor="#f4f3f6" />
              <stop offset="100%" stopColor="#fbfbfc" />
            </radialGradient>
          </defs>

          {EMOTES.map((name, i) => {
            const a0 = START + i * STEP;
            const a1 = a0 + STEP;
            const active = i === sel;
            const [mx, my] = pt(R_MID, a0 + STEP / 2);
            return (
              <g
                key={i}
                className={"ew__slot" + (active ? " is-active" : "")}
                onMouseEnter={() => setSel(i)}
                onClick={() => setSel(i)}
                role="button"
                aria-label={name}
              >
                <path className="ew__wedge" d={wedgePath(a0, a1)} />
                <g transform={`translate(${mx} ${my})`}>
                  <EmoteIcon pose={i} />
                </g>
              </g>
            );
          })}

          {EMOTES.map((name, i) => {
            const a = START + i * STEP + STEP / 2;
            const [nx, ny] = pt(R_OUT - 18, a);
            return (
              <text
                key={i}
                className={"ew__num" + (i === sel ? " is-active" : "")}
                x={nx}
                y={ny}
              >
                {i + 1}
              </text>
            );
          })}
        </svg>

        <div className="ew__hub">
          <div className="ew__emotelabel">Emotes</div>
          <div className="ew__emotename">{EMOTES[sel]}</div>
          <button className="ew__customise" data-sb-linkto="Explorer/Pages/BackpackEmotes">
            Customise <kbd>E</kbd>
          </button>
          <div className="ew__hubhint">
            Hold <kbd>b+num</kbd> to run an emote while the wheel is closed
          </div>
        </div>
      </div>
    </div>
  );
}
