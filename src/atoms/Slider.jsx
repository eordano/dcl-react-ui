import { useState } from "react";
import "./slider.css";

export default function Slider({
  value, defaultValue = 50, min = 0, max = 100, step = 1,
  onChange, format = (v) => Math.round(v), label, ariaLabel,
}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const v = isControlled ? value : internal;
  const pct = ((v - min) / (max - min)) * 100;

  function set(e) {
    const n = Number(e.target.value);
    if (!isControlled) setInternal(n);
    onChange && onChange(n);
  }

  return (
    <div className="slider">
      <input
        type="range" className="slider__input"
        aria-label={ariaLabel ?? label}
        min={min} max={max} step={step} value={v} onChange={set}
        style={{ "--pct": pct + "%" }}
      />
      <span className="slider__value">{format(v)}</span>
    </div>
  );
}
