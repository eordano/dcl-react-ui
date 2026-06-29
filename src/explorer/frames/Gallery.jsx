import "./gallery.css";

const PHOTO = {
  date: "July 27th 2023",
  author: "Mojito",
  place: { name: "Genesis Plaza", coords: "0,12" },
};

const SHOTS = [0, 1, 2, 3, 4, 5];

const PEOPLE = [
  { name: "Mojito", tag: "#a91f" },
  { name: "Pixel Pete", tag: "#7c30" },
  { name: "Aria", tag: "#0c4d" },
];

function ToolbarIcon({ label, children }) {
  return (
    <button type="button" className="gv__tool" aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
        fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}

export default function Gallery() {
  return (
    <div className="gv" role="dialog" aria-label="Photo gallery">
      <div className="gv__stage">
        <div className="gv__frame">
          <div className="gv__toolbar">
            <ToolbarIcon label="Fullscreen">
              <path d="M8 4H4v4M16 4h4v4M16 20h4v-4M8 20H4v-4" />
            </ToolbarIcon>
            <button type="button" className="gv__tool" aria-label="Share to X" title="Share to X">
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.683l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
              </svg>
            </button>
            <ToolbarIcon label="Copy link">
              <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
              <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
            </ToolbarIcon>
            <ToolbarIcon label="Download">
              <path d="M12 3v11m0 0l-4-4m4 4l4-4M5 20h14" />
            </ToolbarIcon>
            <span className="gv__divider" />
            <button type="button" className="gv__tool gv__close" aria-label="Close" data-sb-linkto="Explorer/Pages/Reel">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="gv__photoart" role="img" aria-label="Captured photo at Genesis Plaza" />
        </div>

        <div className="gv__strip" role="listbox" aria-label="Photos in this album">
          {SHOTS.map((i) => (
            <button
              key={i}
              type="button"
              className={`gv__thumb${i === 0 ? " gv__thumb--active" : ""}`}
              aria-label={`Photo ${i + 1}`}
              aria-selected={i === 0}
            />
          ))}
        </div>
      </div>

      <aside className="gv__rail" aria-label="Photo details">
        <header className="gv__meta">
          <span className="gv__avatar" aria-hidden="true" />
          <div className="gv__metatext">
            <div className="gv__author">{PHOTO.author}</div>
            <div className="gv__date">{PHOTO.date}</div>
          </div>
        </header>

        <section className="gv__sec">
          <h3 className="gv__label">Place</h3>
          <div className="gv__place">
            <span className="gv__pin">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
            </span>
            <span className="gv__placename">
              {PHOTO.place.name}, {PHOTO.place.coords}
            </span>
            <button type="button" className="gv__jump" aria-label="Jump in" title="Jump in">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
                fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </section>

        <section className="gv__sec">
          <h3 className="gv__label">People</h3>
          <ul className="gv__people">
            {PEOPLE.map((p) => (
              <li key={p.name} className="gv__person">
                <span className="gv__pavatar" aria-hidden="true" />
                <span className="gv__pname">{p.name}</span>
                <span className="gv__ptag">{p.tag}</span>
                <button type="button" className="gv__pview" data-sb-linkto="Explorer/Pages/Passport">View</button>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
