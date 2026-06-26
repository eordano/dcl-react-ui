import { useState } from "react";
import { asset } from "../../asset.js";
import AuthLayout from "../../web/frames/AuthLayout.jsx";
import Checkbox from "../../atoms/Checkbox.jsx";
import "./lobbynew.css";

export default function LobbyNew({ onJumpIn } = {}) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("A");
  const [btOpen, setBtOpen] = useState(false);

  const personIcon = (
    <svg
      className="lobbynew__person"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <circle cx="12" cy="6.5" r="3.2" fill="currentColor" />
      <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" fill="currentColor" />
    </svg>
  );

  const avatar = (
    <>
      <div
        className="lobbynew__avatar"
        style={{ backgroundImage: `url(${asset("assets/lobby-src.png")})` }}
      />
      <div className="lobbynew__avatarbar">
        {btOpen && (
        <div
          className="lobbynew__bodytype"
          role="radiogroup"
          aria-label="Body type"
        >
          <button
            type="button"
            role="radio"
            aria-checked={body === "A"}
            className={"lobbynew__bt" + (body === "A" ? " is-active" : "")}
            onClick={() => setBody("A")}
          >
            {personIcon}
            <span className="lobbynew__bt-label">BODY TYPE A</span>
            {body === "A" && (
              <span className="lobbynew__bt-check" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={body === "B"}
            className={"lobbynew__bt" + (body === "B" ? " is-active" : "")}
            onClick={() => setBody("B")}
          >
            {personIcon}
            <span className="lobbynew__bt-label">BODY TYPE B</span>
            {body === "B" && (
              <span className="lobbynew__bt-check" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        </div>
        )}

        <div className="lobbynew__actions">
          <button
            type="button"
            className="lobbynew__dropdown"
            aria-expanded={btOpen}
            onClick={() => setBtOpen((o) => !o)}
          >
            {personIcon}
            <span className="lobbynew__dropdown-label">BODY TYPE {body}</span>
            <span className="lobbynew__dropdown-caret" aria-hidden="true">
              ⌄
            </span>
          </button>
          <button type="button" className="lobbynew__randomize">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="9.5" r="1.1" fill="currentColor" />
              <circle cx="15" cy="9.5" r="1.1" fill="currentColor" />
              <circle cx="12" cy="14.5" r="1.1" fill="currentColor" />
            </svg>
            RANDOMIZE
          </button>
        </div>

        <div className="lobbynew__caption">
          You can customize your avatar later.
        </div>
      </div>
    </>
  );

  const back = (
    <div className="lobbynew__backrow">
      <button className="lobbynew__back" aria-label="Back">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span className="lobbynew__backlabel">BACK</span>
    </div>
  );

  const chrome = (
    <>
      <div className="lobbynew__chromerow">
        <button className="lobbynew__exit">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 12H9m0 0 3-3m-3 3 3 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>EXIT</span>
        </button>
        <button className="lobbynew__iconbtn" aria-label="Mute">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M4 9v6h4l5 4V5L8 9H4z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M16 9.5a3.5 3.5 0 0 1 0 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="lobbynew__iconbtn" aria-label="Help">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M9.6 9.2a2.4 2.4 0 1 1 3.2 2.3c-.8.4-1.3.9-1.3 1.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="11.5" cy="16.4" r="1.05" fill="currentColor" />
          </svg>
        </button>
      </div>
      <span className="lobbynew__editorver">editor-version - Editor</span>
    </>
  );

  return (
    <AuthLayout
      avatar={avatar}
      hideBrand
      hideFooter
      topLeft={back}
      bottomLeft={chrome}
    >
      <div className="lobbynew__head">
        <span className="lobbynew__logo" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <defs>
              <linearGradient
                id="lobbynew-logo-g"
                x1="6"
                y1="6"
                x2="34"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#ff7d68" />
                <stop offset="1" stopColor="#e91e9e" />
              </linearGradient>
              <clipPath id="lobbynew-logo-c">
                <circle cx="20" cy="20" r="20" />
              </clipPath>
            </defs>
            <circle cx="20" cy="20" r="20" fill="url(#lobbynew-logo-g)" />
            <g clipPath="url(#lobbynew-logo-c)">
              <circle cx="14.5" cy="11" r="2.4" fill="#ff9d7a" />
              <circle cx="25" cy="14.5" r="4.6" fill="#ff9d7a" />
              <path d="M3 30 15 14l11 16z" fill="#f3eefb" />
              <path d="M18 30 26.5 19 36 30z" fill="#f3eefb" />
              <rect x="0" y="29" width="40" height="11" fill="#ff8d6e" />
            </g>
          </svg>
        </span>
        <h1 className="lobbynew__title">Welcome to Decentraland!</h1>
      </div>

      <div className="lobbynew__group">
        <label className="lobbynew__label" htmlFor="lobbynew-name">
          Username
        </label>
        <input
          id="lobbynew-name"
          className="lobbynew__field"
          aria-label="Username"
          placeholder="Name"
          maxLength={15}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="lobbynew__count">{name.length}/15</div>
      </div>

      <div className="lobbynew__checks">
        <Checkbox>
          Subscribe to newsletter for updates on features, events, contests, and
          more
        </Checkbox>
        <Checkbox>
          I agree with Decentraland’s <b>Terms of Use</b> and{" "}
          <b>Privacy Policy</b> *
        </Checkbox>
      </div>

      <button
        className="lobbynew__jump"
        data-sb-linkto="Explorer/Workflows/Loading"
        onClick={onJumpIn}
      >
        <span className="lobbynew__jump-label">JUMP IN</span>
        <span className="lobbynew__jump-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              d="M5 12h12m0 0-4-4m4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </AuthLayout>
  );
}
