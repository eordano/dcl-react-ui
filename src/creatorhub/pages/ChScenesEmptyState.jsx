import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chscenesemptystate.css";

const ImportIcon = () => (
  <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
    <path d="M10 1v9M6.5 7l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12.5v1.2A1.3 1.3 0 0 0 4.3 15h11.4a1.3 1.3 0 0 0 1.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);
const TemplateIcon = () => (
  <svg viewBox="0 0 20 16" width="20" height="16" aria-hidden="true">
    <rect x="2.5" y="2" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="11.5" y="2" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="2.5" y="9" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="11.5" y="9" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

function EmptyStateButton() {
  return (
    <div
      className="chscenesemptystate__nobutton"
      role="button"
      tabIndex={0}
      aria-label="Create your first scene"
    >
      <svg
        className="chscenesemptystate__nobtnsvg"
        width="256"
        height="234"
        viewBox="0 0 256 234"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="chesGrad" x1="128" y1="0" x2="128" y2="234" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF2D55" />
            <stop offset="1" stopColor="#C640CD" />
          </linearGradient>
          <linearGradient id="chesFill" x1="128" y1="0" x2="128" y2="234" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C640CD" />
            <stop offset="1" stopColor="#691FA9" />
          </linearGradient>
        </defs>
        <rect
          className="chscenesemptystate__nobtnfill"
          x="1.5"
          y="1.5"
          width="253"
          height="231"
          rx="8.5"
          fill="url(#chesFill)"
          fillOpacity="0.25"
        />
        <rect
          x="1.5"
          y="1.5"
          width="253"
          height="231"
          rx="8.5"
          stroke="url(#chesGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="16 16"
        />
        <path
          d="M168 79.7143H133.714V114H122.286V79.7143H88V68.2857H122.286V34H133.714V68.2857H168V79.7143Z"
          fill="url(#chesGrad)"
        />
        <text className="chscenesemptystate__nobtnlabel" x="128" y="166" textAnchor="middle" fill="url(#chesGrad)">
          START
        </text>
        <text className="chscenesemptystate__nobtnlabel" x="128" y="198" textAnchor="middle" fill="url(#chesGrad)">
          BUILDING
        </text>
      </svg>
    </div>
  );
}

export default function ChScenesEmptyState() {
  return (
    <CreatorHubChrome active="scenes">
      <main className="chscenesemptystate">
        <div className="chscenesemptystate__container">
          <div className="chscenesemptystate__list-wrap">
            <div className="chscenesemptystate__menu">
              <div className="chscenesemptystate__header">
                <h3 className="chscenesemptystate__heading">My Scenes</h3>
                <div className="chscenesemptystate__actions">
                  <button type="button" className="chscenesemptystate__actionbtn chscenesemptystate__actionbtn--secondary">
                    <ImportIcon />
                    Import Scene
                  </button>
                  <button type="button" className="chscenesemptystate__actionbtn chscenesemptystate__actionbtn--primary">
                    <TemplateIcon />
                    Templates
                  </button>
                </div>
              </div>
            </div>

            <div className="chscenesemptystate__nocontainer">
              <div className="chscenesemptystate__nocard">
                <div className="chscenesemptystate__notext">
                  <h3 className="chscenesemptystate__notitle">Create your first scene</h3>
                  <span className="chscenesemptystate__nodesc">
                    Unleash your creativity. Start building scenes for your LANDs and
                    Worlds and share with the community.{" "}
                    <a
                      href="https://docs.decentraland.org/creator/scenes-sdk7/getting-started/sdk-101"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn more about creating Scenes.
                    </a>
                  </span>
                </div>
                <EmptyStateButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    </CreatorHubChrome>
  );
}
