import AuthLayout from "../frames/AuthLayout.jsx";
import "./verify.css";

export default function Verify({ number = "123456", expiry = "05:00", onBack, onExit }) {
  const back = (
    <button className="verify__back" type="button" onClick={onBack}>
      <span className="verify__back-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
          <path
            d="M10 6 5 11l5 5M5 11h11a3 3 0 0 1 3 3v2"
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
      <span className="verify__chrome-row">
      <button className="verify__exit" type="button" onClick={onExit}>
        <span aria-hidden="true">&#x2192;]</span> EXIT
      </button>
      <button className="verify__iconbtn" type="button" aria-label="Settings">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button className="verify__iconbtn" type="button" aria-label="Help">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .8-1 1.7M12 17h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      </span>
      <span className="verify__version">editor version - Editor</span>
    </>
  );

  const hero = (
    <div className="verify__hero" aria-hidden="true">
      <div className="verify__lock">
        <span className="verify__shackle" />
        <span className="verify__body">
          <svg className="verify__print" viewBox="0 0 24 24" width="86" height="86" fill="none">
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
      <div className="verify">
        <span className="verify__badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6z" />
          </svg>
        </span>

        <h1 className="verify__title">Secure Sign-in</h1>

        <p className="verify__instr">
          A browser window should open for you to sign into Decentraland. Check this
          number when prompted.
        </p>

        <div className="verify__number">{number}</div>

        <div className="verify__expire">
          Verification number will expire in {expiry}
          <span className="verify__info" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 11v5M12 8h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
