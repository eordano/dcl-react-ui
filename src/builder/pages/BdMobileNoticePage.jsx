import { useState } from "react";
import { asset } from "../../asset.js";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdmobilenoticepage.css";

const LIST_ITEMS = [
  {
    id: "dress",
    pre: "Create, preview and publish ",
    bold: "collections of Wearables and Emotes",
    post: ".",
  },
  {
    id: "tools",
    pre: "Build ",
    bold: "content for your LAND",
    post: ". You can use free 3D models or upload your own.",
  },
  {
    id: "landscape",
    pre: "Publish scenes, ",
    bold: "create estates and manage permissions",
    post: " of your LAND.",
  },
  {
    id: "cat",
    pre: "Claim your ",
    bold: "unique name",
    post: " and assign it to your avatar or parcels.",
  },
];

const THUMBS = ["thumb-1", "thumb-2", "thumb-3", "thumb-4"];

function ListIcon({ id }) {
  const common = {
    width: 26,
    height: 24,
    viewBox: "0 0 26 24",
    fill: "none",
    "aria-hidden": true,
    className: "bdmobilenoticepage__icon",
  };
  switch (id) {
    case "dress":
      return (
        <svg {...common}>
          <path
            d="M10 3l3 2 3-2 1 4-2 2 2 11H9l2-11-2-2 1-4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "tools":
      return (
        <svg {...common}>
          <path
            d="M6 18l7-7M16 5l3 1 1 3-3 3-3-1M9 13l-3 3a2 2 0 102.8 2.8l3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "landscape":
      return (
        <svg {...common}>
          <path
            d="M3 19h20M6 19l5-8 3 4 2-3 4 7M9 7a1.5 1.5 0 110-.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "cat":
    default:
      return (
        <svg {...common}>
          <path
            d="M7 4l2 4h6l2-4 1 6v6a4 4 0 01-4 4h-4a4 4 0 01-4-4V10l1-6zM11 12h.01M15 12h.01M12 15c.6.5 1.4.5 2 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
  }
}

function ToolsCircle() {
  return (
    <svg
      className="bdmobilenoticepage__slot-image"
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <rect width="95.9998" height="95.9998" rx="47.9999" fill="#37333D" />
      <path
        d="M55.0998 45.0917C57.7528 45.0917 60.2464 46.1228 62.1213 47.9977L63.94 49.8162C65.4211 49.1694 66.8273 48.2695 68.046 47.0509C71.5239 43.5731 72.7051 38.6798 71.5989 34.2365C71.3927 33.3928 70.3334 33.1022 69.7146 33.7209L62.74 40.6952L56.3748 39.636L55.3154 33.271L62.2901 26.2966C62.9088 25.678 62.6088 24.6187 61.7557 24.4031C57.3122 23.3063 52.4187 24.4874 48.9502 27.9559C46.2784 30.6275 45.0223 34.1521 45.0879 37.6674L52.7843 45.3635C53.5437 45.1854 54.3311 45.0917 55.0998 45.0917ZM45.3597 52.7784L40.0444 47.4633L25.7577 61.7588C23.4141 64.1023 23.4141 67.8988 25.7577 70.2424C28.1013 72.5859 31.898 72.5859 34.2416 70.2424L45.8285 58.656C45.116 56.7905 44.9004 54.7564 45.3597 52.7784ZM30.0044 68.2457C28.7669 68.2457 27.7545 67.2333 27.7545 65.9959C27.7545 64.7491 28.7575 63.7461 30.0044 63.7461C31.2512 63.7461 32.2542 64.7491 32.2542 65.9959C32.2542 67.2333 31.2512 68.2457 30.0044 68.2457Z"
        fill="white"
        fillOpacity="0.4"
      />
      <path
        d="M60.0027 50.1162L70.9802 61.0933C72.3395 62.4525 72.3395 64.6648 70.9802 66.0334L66.0399 70.9735C64.6806 72.3422 62.4682 72.3422 61.0995 70.9735L50.122 59.9965C47.9565 57.8311 47.544 54.597 48.8189 51.991L38.8258 41.9982H33.0042L24.0047 29.9994L30.0044 24L42.0037 32.9991V38.8204L51.9969 48.8132C54.603 47.529 57.8372 47.9508 60.0027 50.1162Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export default function BdMobileNoticePage({ subscribed = false } = {}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(subscribed);

  return (
    <BuilderChrome active="" account="">
      <div className="bdmobilenoticepage">
        <div className="bdmobilenoticepage__container">
          <ToolsCircle />

          <h2 className="bdmobilenoticepage__title">
            Builder Tools are only available on desktop
          </h2>

          <span className="bdmobilenoticepage__list-title">
            From your computer, you can:
          </span>

          <ul className="bdmobilenoticepage__list">
            {LIST_ITEMS.map((item) => (
              <li key={item.id} className="bdmobilenoticepage__item">
                <ListIcon id={item.id} />
                <div className="bdmobilenoticepage__content">
                  {item.pre}
                  <b>{item.bold}</b>
                  {item.post}
                </div>
              </li>
            ))}
          </ul>

          <a
            className="bdmobilenoticepage__button"
            href="https://docs.decentraland.org/creator"
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn More
          </a>
        </div>

        <section className="bdmobilenoticepage__hero">
          <div className="bdmobilenoticepage__hero-bg" aria-hidden="true" />
          <div className="bdmobilenoticepage__hero-inner">
            <h3 className="bdmobilenoticepage__hero-title">
              Want to build something when you get to your computer?
            </h3>

            {sent ? (
              <div className="bdmobilenoticepage__success">
                Thanks, we will keep you posted!
              </div>
            ) : (
              <form
                className="bdmobilenoticepage__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSent(true);
                }}
              >
                <p className="bdmobilenoticepage__message">
                  The Builder is only available on desktop right now. Sign up to
                  receive updates and check it out on your computer.
                </p>
                <div className="bdmobilenoticepage__form-container">
                  <div className="bdmobilenoticepage__field">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="bdmobilenoticepage__send">
                    Send yourself a reminder
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section className="bdmobilenoticepage__gallery">
          <h3 className="bdmobilenoticepage__gallery-header">
            Check out work from Builder users!
          </h3>
          <div className="bdmobilenoticepage__thumbnail-column">
            {THUMBS.map((t) => (
              <div
                key={t}
                className="bdmobilenoticepage__thumbnail"
                style={{ backgroundImage: `url(${asset(`assets/${t}.jpg`)})` }}
              />
            ))}
          </div>
        </section>
      </div>
    </BuilderChrome>
  );
}
