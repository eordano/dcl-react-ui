import "./eventdetail.css";

const EVENT = {
  title: "PRIDE EDITION: Watch scary movies with Cult Horror Club",
  when: "FRI, JUN 19 @ 10:00PM",
  host: "Decentraland Foundation",
  description:
    "Watch classic cult horror movies together in Decentraland Theatre, from " +
    "haunted houses, zombies and vampires to strange old-school sci-fi and " +
    "psychological horror. Perfect for hanging out, reacting in chat, " +
    "discovering weird cinema, and sharing OG scares from the history of horror.\n\n" +
    "Three screenings every Friday — at 5am UTC, 2pm UTC & 8pm UTC.\n\n" +
    "What to see this season:\n\n" +
    "**June 19 - Night Tide, 1961** PRIDE SCREENING\n\n" +
    "A young sailor falls for Mora, a mysterious woman who performs as a mermaid " +
    "and may believe she is dangerous. This is our Pride screening because it " +
    "was written and directed by Curtis Harrington, a gay filmmaker recognised " +
    "as an important early figure in queer cinema.\n\n" +
    "**June 26 - The Brain That Wouldn't Die, 1962**",
  schedule: "Saturday, Jun 20 from 12:00am to 02:30am (UTC+3)",
  location: "(0,0)",
};

export default function EventDetail({ event, jumpHref, onJumpIn, onClose } = {}) {
  const e = event || EVENT;
  return (
    <div className="ep__backdrop evd__backdrop">
      <div className="evd">
        <div
          className="evd__hero"
          style={e.image ? { "--thumb-img": `url("${e.image}")` } : undefined}
          aria-hidden="true"
        >
          <div className="evd__heroscrim" />
          <button className="ep__close evd__close" aria-label="Close" onClick={onClose} data-sb-linkto="Explorer/Pages/Events">
            ×
          </button>
          <div className="evd__meta">
            <div className="evd__when">{e.when}</div>
            <h2 className="evd__title">{e.title}</h2>
            <p className="evd__host">
              Hosted by <b>{e.host}</b>
            </p>
          </div>
        </div>

        <div className="evd__body">
          <div className="evd__actions">
            <button className="evd__remind">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path
                  d="M8 2a3.4 3.4 0 00-3.4 3.4c0 3.2-1.1 4.3-1.1 4.3h9c0 0-1.1-1.1-1.1-4.3A3.4 3.4 0 008 2zM6.6 11.7a1.4 1.4 0 002.8 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              REMIND ME
            </button>
            <button className="evd__iconbtn" aria-label="Add to calendar">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path
                  d="M3 4h10v9H3zM3 6.5h10M6 2.5v2M10 2.5v2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="evd__iconbtn" aria-label="Share">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="3.5" r="1.7" />
                  <circle cx="4" cy="8" r="1.7" />
                  <circle cx="12" cy="12.5" r="1.7" />
                  <path d="M10.5 4.4 5.5 7.1M5.5 8.9l5 2.7" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div className="evd__descblock">
          <h3 className="evd__sectitle">DESCRIPTION</h3>
          <p className="evd__desc">{e.description}</p>
        </div>

        <div className="evd__footer">
            <div className="evd__metarow">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path
                  d="M3 4h10v9H3zM3 6.5h10M6 2.5v2M10 2.5v2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{e.schedule}</span>
            </div>
            <div className="evd__metarow evd__metarow--cta">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path
                  d="M8 1.5c2.5 0 4.5 2 4.5 4.5 0 3.2-4.5 8.5-4.5 8.5S3.5 9.2 3.5 6A4.5 4.5 0 018 1.5zM8 4.4a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{e.location}</span>
              {jumpHref ? (
                <a
                  className="evd__jumpin"
                  href={jumpHref}
                  onClick={onJumpIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-sb-linkto="Explorer/Workflows/SceneLoading"
                >
                  JUMP IN
                  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                    <path
                      d="M3 8h9M8.5 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <button className="evd__jumpin" onClick={onJumpIn} data-sb-linkto="Explorer/Workflows/SceneLoading">
                  JUMP IN
                  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                    <path
                      d="M3 8h9M8.5 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
