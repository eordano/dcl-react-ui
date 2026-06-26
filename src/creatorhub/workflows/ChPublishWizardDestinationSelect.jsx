import { ChevronLeft, Close } from "../../atoms/icons.jsx";
import "./chpublishwizarddestinationselect.css";

const WorldsThumb = () => (
  <svg className="cpwds__thumbimg" viewBox="0 0 160 90" width="160" height="90" aria-hidden="true">
    <defs>
      <linearGradient id="cpwds-w-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8e7bff" />
        <stop offset="1" stopColor="#6b54e8" />
      </linearGradient>
      <linearGradient id="cpwds-w-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6a52d6" />
        <stop offset="1" stopColor="#4f3bb0" />
      </linearGradient>
      <linearGradient id="cpwds-w-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5b46c2" />
        <stop offset="1" stopColor="#42329c" />
      </linearGradient>
    </defs>
    <polygon points="80,16 142,48 80,80 18,48" fill="url(#cpwds-w-top)" />
    <polygon points="18,48 80,80 80,90 18,58" fill="url(#cpwds-w-left)" />
    <polygon points="142,48 80,80 80,90 142,58" fill="url(#cpwds-w-right)" />
    <polygon points="76,22 88,29 88,43 76,50 64,43 64,29" fill="#bfe9ff" opacity="0.9" />
    <circle cx="98" cy="40" r="6" fill="#46d3ff" />
    <circle cx="104" cy="28" r="7" fill="#3f7bff" />
    <circle cx="110" cy="29" r="2" fill="#ff4d6d" />
    <circle cx="62" cy="52" r="5" fill="#e79bff" />
    <rect x="86" y="44" width="9" height="13" rx="2" fill="#2f8de8" />
    <circle cx="90" cy="42" r="3.4" fill="#62c7ff" />
  </svg>
);
const LandThumb = () => (
  <svg className="cpwds__thumbimg" viewBox="0 0 160 90" width="160" height="90" aria-hidden="true">
    <defs>
      <linearGradient id="cpwds-l-pin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffb13d" />
        <stop offset="0.5" stopColor="#ff2d7e" />
        <stop offset="1" stopColor="#7a1fd0" />
      </linearGradient>
      <linearGradient id="cpwds-l-hi" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ff7ad1" />
        <stop offset="1" stopColor="#ff2d7e" />
      </linearGradient>
    </defs>
    <g>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const cx = 36 + c * 24;
          const cy = 50 + r * 11 - c * 0;
          const x = cx + (r - 1) * 12;
          const y = cy + (c - 1.5) * 3 + r * 2;
          const hot = r === 2 && c === 1;
          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width="20"
              height="14"
              rx="3"
              fill={hot ? "url(#cpwds-l-hi)" : "#1b2a63"}
              transform={`skewX(-22) translate(${y * 0.55} 0)`}
            />
          );
        })
      )}
    </g>
    <path d="M80 6c-9 0-16 7-16 16 0 11 16 26 16 26s16-15 16-26c0-9-7-16-16-16Z" fill="url(#cpwds-l-pin)" />
    <circle cx="80" cy="22" r="8.5" fill="#ffd23d" />
    <circle cx="80" cy="22" r="5" fill="#ff2d7e" />
  </svg>
);

function OptionBox({ thumbnail, title, description, buttonText, onClickPublish }) {
  return (
    <div className="cpwds__optionbox">
      <div className="cpwds__thumb">{thumbnail}</div>
      <h3 className="cpwds__optitle">{title}</h3>
      <span className="cpwds__opdesc">{description}</span>
      <button type="button" className="cpwds__btn cpwds__btn--primary" onClick={onClickPublish}>
        {buttonText}
      </button>
      <span className="cpwds__learnmore">Learn more</span>
    </div>
  );
}

const PROJECT = { title: "Neon Night Market" };

export default function ChPublishWizardDestinationSelect({ state = "select" }) {
  const isSignIn = state === "signin";

  return (
    <div className="cpwds__backdrop">
      <div
        className={"cpwds__modal" + (isSignIn ? " cpwds__modal--tiny" : "")}
        role="dialog"
        aria-modal="true"
        aria-label={isSignIn ? "Sign In" : `Publish "${PROJECT.title}"`}
      >
        <header className="cpwds__header">
          <button type="button" className="cpwds__iconbtn cpwds__back" aria-label="back">
            <ChevronLeft size={22} />
          </button>
          <h2 className="cpwds__title">{isSignIn ? "Sign In" : `Publish "${PROJECT.title}"`}</h2>
          <button type="button" className="cpwds__iconbtn cpwds__close" aria-label="close">
            <Close size={20} />
          </button>
        </header>

        <p className="cpwds__subtitle">
          {isSignIn ? "Sign In to publish your scenes" : "Where would you like to deploy your scene to?"}
        </p>

        <div className="cpwds__content">
          {isSignIn ? (
            <div className="cpwds__initial">
              <button type="button" className="cpwds__btn cpwds__btn--primary cpwds__signinbtn">
                Sign In
              </button>
            </div>
          ) : (
            <div className="cpwds__initial">
              <div className="cpwds__options">
                <OptionBox
                  thumbnail={<WorldsThumb />}
                  title="Worlds"
                  description="Your own virtual space, separate from Genesis City. Claim yours when you get a NAME."
                  buttonText="Publish to a World"
                />
                <OptionBox
                  thumbnail={<LandThumb />}
                  title="My Land"
                  description="The parcels that make up Decentraland's Genesis City map. Buy or rent your own in the Marketplace."
                  buttonText="Publish to Land"
                />
              </div>
              <span className="cpwds__altservers">Publish to a different server</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
