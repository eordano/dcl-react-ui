import { useRef, useState } from "react";
import AuthLayout from "../frames/AuthLayout.jsx";
import "./otp.css";

const LEN = 6;

export default function Otp({ email = "your@email.com", onBack, onExit }) {
  const [digits, setDigits] = useState(Array(LEN).fill(""));
  const refs = useRef([]);

  function setAt(i, v) {
    v = v.replace(/\D/g, "").slice(-1);
    const next = digits.slice();
    next[i] = v;
    setDigits(next);
    if (v && i < LEN - 1) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i, e) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const next = digits.slice();
      next[i - 1] = "";
      setDigits(next);
      refs.current[i - 1]?.focus();
    }
  }

  const back = (
    <button className="otp__back" type="button" onClick={onBack}>
      <span className="otp__back-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
          <path
            d="M9 6 4 11l5 5M4 11h12a4 4 0 0 1 4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      BACK
    </button>
  );

  const chrome = (
    <>
      <button className="otp__exit" type="button" onClick={onExit}>
        <span aria-hidden="true">&#x2192;]</span> EXIT
      </button>
      <button className="otp__iconbtn" type="button" aria-label="Audio settings">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
          <path
            d="M4 9v6h4l5 4V5L8 9H4z"
            fill="currentColor"
          />
          <path
            d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
      <button className="otp__iconbtn" type="button" aria-label="Settings">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span className="otp__version">editor version - Editor</span>
    </>
  );

  const hero = (
    <div className="otp__hero" aria-hidden="true">
      <div className="otp__lock">
        <span className="otp__shackle" />
        <span className="otp__lockbody">
          <svg className="otp__print" viewBox="0 0 24 24" width="86" height="86" fill="none">
            <path
              d="M12 4a7 7 0 0 0-7 7v3M12 4a7 7 0 0 1 7 7v5M8.5 11a3.5 3.5 0 0 1 7 0v5M11 11.5a1.5 1.5 0 0 1 3 0V17M9 14v3.5M16 18v1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );

  return (
    <AuthLayout hideBrand hideFooter topLeft={back} bottomLeft={chrome} avatar={hero}>
      <div className="otp">
        <span className="otp__badge" aria-hidden="true">h</span>

        <h1 className="otp__title">Enter verification code</h1>
        <p className="otp__sub">
          One time password sent to <span className="otp__email">{email}</span>
          <br />
          Please enter the code below to complete verification.
        </p>

        <div className="otp__boxes">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              className="otp__box"
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1} of ${LEN}`}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
            />
          ))}
        </div>

        <button className="otp__resend" type="button">Resend Code</button>
      </div>
    </AuthLayout>
  );
}
