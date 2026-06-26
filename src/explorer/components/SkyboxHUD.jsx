import { useState } from "react";
import Toggle from "../../atoms/Toggle.jsx";
import "./skybox.css";

const fmt = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export default function SkyboxHUD() {
  const [minutes, setMinutes] = useState(990);
  const [auto, setAuto] = useState(true);

  return (
    <div className="sky__backdrop">
      <div className="sky">
        <div className="sky__head">
          <span className="sky__title">NIGHT/DAY</span>
        </div>

        <div className="sky__row sky__row--auto">
          <span className="sky__label">Auto</span>
          <Toggle checked={auto} onChange={setAuto} />
        </div>

        <div className={"sky__group" + (auto ? " is-dim" : "")}>
          <div className="sky__row">
            <span className="sky__label sky__label--muted">Custom</span>
            <span className="sky__time">{fmt(minutes)}</span>
          </div>

          <div className="sky__slider">
            <div className="sky__track">
              <input
                type="range" className="sky__range"
                min="0" max="1439" step="1" value={minutes}
                disabled={auto}
                onChange={(e) => setMinutes(Number(e.target.value))}
                style={{ "--pct": (minutes / 1439) * 100 + "%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
