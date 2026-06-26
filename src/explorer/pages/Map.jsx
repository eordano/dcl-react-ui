import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { CATEGORIES } from "../../atoms/mapCategories.js";
import "./map.css";

const PINS = [
  { id: "gp", x: 50, y: 48, kind: "poi", name: "Genesis Plaza", coords: "0,0", users: 312, rating: 98, live: false, creator: "Decentraland" },
  { id: "sm", x: 31, y: 33, kind: "live", name: "Soul Magic", coords: "-45,72", users: 124, rating: 91, live: true, creator: "MetadyneLabs" },
  { id: "mi", x: 70, y: 62, kind: "place", name: "Monkey Island", coords: "-99,99", users: 41, rating: 87, live: false, creator: "bitfiend" },
  { id: "fw", x: 62, y: 28, kind: "fav", name: "Fashion Week HQ", coords: "20,18", users: 203, rating: 95, live: true, creator: "mvfw.eth" },
  { id: "fr", x: 40, y: 67, kind: "friend", name: "Skate Park", coords: "-12,-30", users: 53, rating: 82, live: false, creator: "skate.eth" },
];

function PinIcon({ kind }) {
  if (kind === "friend") return <span className="map__pinfriend" />;
  return (
    <svg viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20 12 32 12 32s12-12 12-20.3C24 5.2 18.6 0 12 0z"
        className="map__pindrop" />
      <circle cx="12" cy="11.5" r="4.6" fill="#fff" />
    </svg>
  );
}

export default function Map() {
  const [tab, setTab] = useState("map");
  const [selected, setSelected] = useState(null);
  const [cat, setCat] = useState("ALL");
  const sel = PINS.find((p) => p.id === selected);

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="map__shell">
        <div className="map__tiles" onClick={() => setSelected(null)}>
          <div className="map__grid" />
          <div className="map__roads" />
          <div className="map__district map__district--plaza" style={{ left: "46%", top: "44%", width: "8%", height: "9%" }} />
          <div className="map__district map__district--purple" style={{ left: "26%", top: "28%", width: "10%", height: "12%" }} />
          <div className="map__district map__district--blue" style={{ left: "60%", top: "56%", width: "13%", height: "11%" }} />
          <div className="map__district map__district--pink" style={{ left: "58%", top: "23%", width: "9%", height: "8%" }} />

          <div className="map__player" style={{ left: "70%", top: "30%" }} aria-label="Your location">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M12 3 20 21l-8-5-8 5 8-18z" fill="#fff" />
            </svg>
          </div>

          {PINS.map((p) => (
            <button
              key={p.id}
              className={"map__pin map__pin--" + p.kind + (p.id === selected ? " is-selected" : "")}
              style={{ left: p.x + "%", top: p.y + "%" }}
              onClick={(e) => { e.stopPropagation(); setSelected(p.id); }}
              aria-label={p.name}
            >
              <PinIcon kind={p.kind} />
            </button>
          ))}
        </div>

        <div className="map__catbar">
          <div className="map__cats" role="tablist" aria-label="Place categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={c.key === cat}
                className={"map__catpill" + (c.key === cat ? " is-on" : "")}
                onClick={() => setCat(c.key)}
              >
                {c.key === "ALL" ? (
                  <span className="map__catglyph map__catglyph--all" aria-hidden="true">▦</span>
                ) : c.key === "FAVORITES" ? (
                  <span className="map__catglyph map__catglyph--heart" aria-hidden="true" style={{ color: c.color }}>♥</span>
                ) : (
                  <span className="map__catdot" aria-hidden="true" style={{ background: c.color }} />
                )}
                {c.key}
              </button>
            ))}
          </div>
          <div className="map__search">
            <SearchField placeholder="Search" />
          </div>
        </div>

        <div className="map__zoom">
          <div className="map__zgroup">
            <button className="map__zbtn" aria-label="Zoom in">+</button>
            <button className="map__zbtn" aria-label="Zoom out">−</button>
          </div>
          <button className="map__zbtn map__locate" aria-label="Recenter">⊕</button>
          <button className="map__zbtn map__layers" aria-label="Map layers" data-sb-linkto="Explorer/Pages/MapFilters">⧉</button>
        </div>

        <div className="map__minimap" aria-hidden="true">
          <div className="map__minigrid" />
          <div className="map__minidot map__minidot--a" />
          <div className="map__minidot map__minidot--b" />
          <div className="map__minidot map__minidot--c" />
          <div className="map__minihere" />
        </div>

        <div className="map__credit">Powered by the Decentraland Foundation</div>

        {sel && (
          <div className="map__info">
            <div className="map__infothumb" style={{ "--hue": (sel.x * 5) % 360 }}>
              {sel.live && <span className="map__infolive">● LIVE</span>}
              <button className="map__infoclose" onClick={() => setSelected(null)} aria-label="Close">×</button>
            </div>
            <div className="map__infobody">
              <div className="map__infoname">{sel.name}</div>
              <div className="map__infocreator">created by <b>{sel.creator}</b></div>
              <div className="map__inforow">
                <span className="map__infostat"><b>{sel.coords}</b><span>LOCATION</span></span>
                <span className="map__infostat"><b>{sel.rating}%</b><span>RATING</span></span>
                <span className="map__infostat"><b>{sel.users}</b><span>VISITORS</span></span>
              </div>
              <div className="map__infoactions">
                <button className="map__jump">jump in</button>
                <button className="map__nav">start navigation</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ExploreChrome>
  );
}
