import { Avatar } from "../../atoms/primitives.jsx";
import "./profilewidget.css";

export default function ProfileWidget({ name = "Evaristo", tag = "#d5f0", wallet = "0x23b...7d5f0" }) {
  return (
    <div className="pw__stage">
      <div className="pw">
        <div className="pw__menu">
          <div className="pw__menuhead">
            <Avatar hue={320} size={72} className="pw__avatar" />
            <div className="pw__name">
              <span className="pw__namemain">{name}</span>
              <span className="pw__tag">({tag})</span>
            </div>
            <div className="pw__walletlabel">WALLET ADDRESS</div>
            <button type="button" className="u-wallet">
              {wallet}
              <span className="pw__copy" aria-hidden="true">⎘</span>
            </button>
          </div>

          <button className="pw__profile" data-sb-linkto="Explorer/Pages/Passport">VIEW PROFILE</button>

          <button className="pw__item">
            <span className="pw__icon" aria-hidden="true">⏻</span>
            SIGN OUT
          </button>

          <button className="pw__item pw__item--exit">
            <span className="pw__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
                   stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            EXIT
          </button>

          <div className="pw__footer">
            <button className="pw__legal">Terms of Service</button>
            <button className="pw__legal">Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
