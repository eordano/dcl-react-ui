import { useEffect, useState } from "react";
import { asset } from "../../asset.js";
import "./chsignin.css";

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const InfoOutlined = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <circle cx="12" cy="7.6" r="1.15" fill="currentColor" />
    <path d="M12 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

function formatCountdown(totalSeconds) {
  const clamped = Math.max(0, totalSeconds);
  const minutes = Math.floor(clamped / 60).toString();
  const seconds = Math.floor(clamped % 60)
    .toString()
    .padStart(2, "0");
  return { minutes, seconds };
}

export default function ChSignIn({
  verificationCode = "4921",
  expiresInSeconds = 281,
  onBack,
}) {
  const [remaining, setRemaining] = useState(expiresInSeconds);

  useEffect(() => {
    setRemaining(expiresInSeconds);
    const id = setInterval(() => {
      setRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [expiresInSeconds]);

  const { minutes, seconds } = formatCountdown(remaining);

  return (
    <div className="chsignin">
      <div
        className="chsignin__background"
        style={{ "--bg": `url(${asset("assets/lobby-src.png")})` }}
      />

      <div className="chsignin__content">
        <button type="button" className="chsignin__back" onClick={onBack}>
          <ChevronLeft />
          <span>Back</span>
        </button>

        <h1 className="chsignin__title">Secure sign-in step</h1>

        <p className="chsignin__body">
          Remember the verification number below.
          <br />
          You'll be prompted to confirm it in your web browser to securely link
          your sign in.
        </p>

        <div className="chsignin__code">
          <span className="chsignin__verificationcode">{verificationCode}</span>
          <span className="chsignin__tooltip u-tip" tabIndex={0}>
            <InfoOutlined />
            <span className="u-tip__bubble chsignin__tipbubble">
              Keep this number private. It ensures that your sign-in is secure
              and unique to you.
            </span>
          </span>
        </div>

        <p className="chsignin__expiration">
          Verification number will expire in {minutes}:{seconds} minutes
        </p>
      </div>
    </div>
  );
}
