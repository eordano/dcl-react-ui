import { Avatar } from "../../atoms/primitives.jsx";
import "./inputsuggestions.css";

const PROFILES = [
  { name: "Guybrush", tag: "#t67q", hue: 280 },
  { name: "pixelwitch", tag: "#0c2d", hue: 320 },
  { name: "vortex.eth", tag: "#7e10", hue: 200 },
  { name: "Mojito", tag: "#a91f", hue: 95 },
];

export default function InputSuggestions() {
  return (
    <div className="isg__stage">
      <div className="isg">
        <p className="isg__hint">Mention a player</p>

        <div className="isg__box" role="listbox" aria-label="Mention suggestions">
          {PROFILES.map((p, i) => (
            <button
              className={"isg__row" + (i === 0 ? " is-active" : "")}
              role="option"
              aria-selected={i === 0}
              key={p.name}
            >
              <Avatar hue={p.hue} size={30} />
              <span className="isg__name">{p.name}</span>
              <span className="isg__tag">{p.tag}</span>
            </button>
          ))}
        </div>

        <div className="isg__input">
          <button className="isg__react" aria-label="Add reaction">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 20.3l-1.45-1.32C5.4 14.24 2 11.16 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.66-3.4 6.74-8.55 11.49L12 20.3z"
                fill="currentColor"
              />
            </svg>
          </button>
          <span className="isg__typed">
            @feel<span className="isg__caret" />
          </span>
          <button className="isg__send" aria-label="Send message">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3 10.2l12 1.8-12 1.8z" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
