import { Avatar } from "../../atoms/primitives.jsx";
import { sendBridge } from "../../overlay/bridge.js";
import "./profilewidget.css";

function openExternal(url) {
  if (typeof window !== "undefined")
    window.open(url, "_blank", "noopener,noreferrer");
}

function exitToLobby() {
  if (typeof window !== "undefined") window.location.reload();
}

export default function ProfileWidget({
  open = false,
  name = "Guest",
  tag = "",
  wallet = "",
  address,
  avatarSrc = null,
  isGuest = false,
}) {
  function copyAddress() {
    const value = address || wallet;
    if (!value) return;
    try {
      navigator.clipboard?.writeText(value);
    } catch {
    }
  }
  if (!open) return null;
  return (
    <div className="pw__stage">
      <div className="pw">
        <div className="pw__menu">
          <div className="pw__menuhead">
            <Avatar
              size={72}
              src={avatarSrc || undefined}
              name={name}
              seed={address || name}
              alt={name || "avatar"}
              className="pw__avatar"
            />
            <div className="pw__name">
              <span className="pw__namemain">{name || "Guest"}</span>
              {tag ? <span className="pw__tag">({tag})</span> : null}
            </div>
            {wallet ? (
              <>
                <div className="pw__walletlabel">WALLET ADDRESS</div>
                <button type="button" className="u-wallet" title="Copy address" onClick={copyAddress}>
                  {wallet}
                  <span className="pw__copy" aria-hidden="true">⎘</span>
                </button>
              </>
            ) : null}
          </div>

          <button className="pw__profile" data-sb-linkto="Explorer/Pages/Passport">VIEW PROFILE</button>

          {isGuest && (
            <button
              type="button"
              className="pw__item pw__item--connect"
              onClick={() => sendBridge("LoginNew", {})}
            >
              <span className="pw__icon" aria-hidden="true">⛓</span>
              CONNECT WALLET
            </button>
          )}

          <button type="button" className="pw__item pw__item--exit" onClick={exitToLobby}>
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
            <button
              className="pw__legal"
              type="button"
              onClick={() => openExternal("https://decentraland.org/terms")}
            >
              Terms of Service
            </button>
            <button
              className="pw__legal"
              type="button"
              onClick={() => openExternal("https://decentraland.org/privacy")}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
