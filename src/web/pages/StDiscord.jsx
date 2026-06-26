import { useCallback, useRef, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./stdiscord.css";

const HCAPTCHA_SITEKEY = "00c95ced-f512-4498-a5f2-7e0b0950d456";

const COPY = {
  title: "Decentraland Discord",
  description:
    "Join the Decentraland community on Discord to connect with other players, creators, and contributors.",
  cta: "Join Discord",
  error: "Something went wrong. Please try again.",
};

function HCaptchaWidget({ sitekey, onVerify }) {
  return (
    <div className="stdiscord__captcha" data-sitekey={sitekey}>
      <button
        type="button"
        className="stdiscord__captchabox"
        onClick={() => onVerify("fake-hcaptcha-token")}
        aria-label="I am human"
      >
        <span className="stdiscord__captchacheck" aria-hidden="true" />
        <span className="stdiscord__captchalabel">I am human</span>
        <span className="stdiscord__captchabrand" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"
              fill="#0074bf"
            />
            <path
              d="M9 12.5l2 2 4-4.5"
              fill="none"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="stdiscord__captchabrandname">hCaptcha</span>
        </span>
      </button>
      <div className="stdiscord__captchafoot">
        <a href="https://www.hcaptcha.com/privacy" className="stdiscord__captchafootlink">
          Privacy
        </a>
        <span aria-hidden="true"> - </span>
        <a href="https://www.hcaptcha.com/terms" className="stdiscord__captchafootlink">
          Terms
        </a>
      </div>
    </div>
  );
}

function DiscordPage({
  initialState = "captcha",
  inviteCode = "9fLddTpe2x",
}) {
  const [invitation, setInvitation] = useState(
    initialState === "invitation" ? `https://discord.com/invite/${inviteCode}` : null
  );
  const [loading, setLoading] = useState(initialState === "loading");
  const [error, setError] = useState(initialState === "error");
  const tokenRef = useRef(null);

  const handleVerify = useCallback(
    (token) => {
      tokenRef.current = token;
      setLoading(true);
      setError(false);
      setLoading(false);
      setInvitation(`https://discord.com/invite/${inviteCode}`);
    },
    [inviteCode]
  );

  const showCaptcha = !invitation && !loading;

  return (
    <div className="stdiscord">
      <h1 className="stdiscord__title">{COPY.title}</h1>
      <p className="stdiscord__description">{COPY.description}</p>

      {showCaptcha && (
        <HCaptchaWidget sitekey={HCAPTCHA_SITEKEY} onVerify={handleVerify} />
      )}

      {error && <p className="stdiscord__error">{COPY.error}</p>}

      {invitation && (
        <a
          className="stdiscord__button"
          href={invitation}
          target="_blank"
          rel="noopener noreferrer"
        >
          {COPY.cta}
        </a>
      )}

      {loading && (
        <span className="stdiscord__button" data-loading="true">
          {COPY.cta}
        </span>
      )}
    </div>
  );
}

export default function StDiscord(props) {
  return (
    <SitesChrome active="legal" overlayNav>
      <DiscordPage {...props} />
    </SitesChrome>
  );
}

export { DiscordPage };
