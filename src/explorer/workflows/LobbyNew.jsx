import { useState } from "react";
import AuthLayout from "../../web/frames/AuthLayout.jsx";
import Checkbox from "../../atoms/Checkbox.jsx";
import {
  randomName,
  randomAvatarBase,
  BODY_SHAPE_URNS,
  DEFAULT_WEARABLES,
} from "../../data/randomIdentity.js";
import { sendBridge } from "../../overlay/bridge.js";
import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import "./lobbynew.css";

export default function LobbyNew({ onJumpIn } = {}) {
  const [name, setName] = useState(randomName);
  const [body, setBody] = useState("A");
  const [btOpen, setBtOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [base, setBase] = useState(() => randomAvatarBase("", "A"));

  function applyAvatar(next) {
    setBase(next);
    sendBridge("SetAvatar", { base: next });
    sendBridge("RequestAvatarPreview", {});
  }
  function randomizeAvatar() {
    applyAvatar(randomAvatarBase(name, body));
  }
  function chooseBody(x) {
    setBody(x);
    applyAvatar({ ...base, bodyShapeUrn: BODY_SHAPE_URNS[x], name });
  }

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
      <div className="lobbynew__avatar">
        <WearablePreview
          outfit={{
            bodyShape: BODY_SHAPE_URNS[body],
            wearables: DEFAULT_WEARABLES[body],
            skin: { color: base.skinColor },
            hair: { color: base.hairColor },
            eyes: { color: base.eyesColor },
          }}
          emote="idle"
          spin
          controls={false}
          zoom={1.05}
        />
      </div>
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
            onClick={() => chooseBody("A")}
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
            onClick={() => chooseBody("B")}
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
          <button
            type="button"
            className="lobbynew__randomize"
            onClick={randomizeAvatar}
            title="Randomize avatar"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" /><circle cx="16" cy="8" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="8" cy="16" r="1.5" fill="currentColor" /><circle cx="16" cy="16" r="1.5" fill="currentColor" />
            </svg>
            <span>Random</span>
          </button>
        </div>

        <div className="lobbynew__caption">
          You can customize your avatar later.
        </div>
      </div>
    </>
  );

  return (
    <AuthLayout
      avatar={avatar}
      hideBrand
      hideFooter
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
        <div className="lobbynew__namerow">
          <input
            id="lobbynew-name"
            className="lobbynew__field"
            aria-label="Username"
            placeholder="Name"
            maxLength={15}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            className="lobbynew__namernd"
            onClick={() => setName(randomName())}
            title="Random name"
            aria-label="Random name"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" /><circle cx="16" cy="8" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="8" cy="16" r="1.5" fill="currentColor" /><circle cx="16" cy="16" r="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div className="lobbynew__count">{name.length}/15</div>
      </div>

      <div className="lobbynew__checks">
        <Checkbox>
          Subscribe to newsletter for updates on features, events, contests, and
          more
        </Checkbox>
        <Checkbox checked={agreed} onChange={setAgreed}>
          I agree with Decentraland’s <b>Terms of Use</b> and{" "}
          <b>Privacy Policy</b> *
        </Checkbox>
      </div>

      <button
        className="lobbynew__jump"
        data-sb-linkto="Explorer/Workflows/Loading"
        disabled={!agreed}
        onClick={() => onJumpIn?.({ name: name.trim(), body })}
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
