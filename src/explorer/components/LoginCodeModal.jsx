import { useEffect, useState } from "react";
import { useBridgeState } from "../../overlay/bridge.js";
import "./logincode.css";

function openExternal(url) {
  if (url && typeof window !== "undefined")
    window.open(url, "_blank", "noopener,noreferrer");
}

export default function LoginCodeModal() {
  const { loginCode, identity } = useBridgeState();
  const [dismissed, setDismissed] = useState(false);

  const key = loginCode ? `${loginCode.code ?? ""}|${loginCode.error ?? ""}` : "";
  useEffect(() => {
    if (loginCode) setDismissed(false);
  }, [key]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setDismissed(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!loginCode || dismissed) return null;
  if (identity && identity.isGuest === false) return null;

  const { code, url, error } = loginCode;

  return (
    <div className="lcm__scrim" onClick={() => setDismissed(true)}>
      <div
        className="lcm"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="lcm__title">Connect your wallet</h2>

        {error ? (
          <>
            <p className="lcm__body">Could not start the login: {error}</p>
            <div className="lcm__actions">
              <button className="lcm__close" onClick={() => setDismissed(true)}>
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="lcm__body">
              Open the authorization page in your browser, confirm the code below
              matches, then sign with your wallet.
            </p>

            {code != null && (
              <>
                <div className="lcm__codelabel">VERIFICATION CODE</div>
                <div className="lcm__code">{code}</div>
              </>
            )}

            <div className="lcm__actions">
              <button
                className="lcm__open"
                disabled={!url}
                onClick={() => openExternal(url)}
              >
                Open authorization page
              </button>
            </div>

            {url && (
              <button
                type="button"
                className="lcm__link"
                onClick={() => openExternal(url)}
              >
                {url}
              </button>
            )}

            <div className="lcm__status" aria-live="polite">
              <span className="lcm__spinner" aria-hidden="true" />
              Waiting for authorization…
            </div>

            <button
              type="button"
              className="lcm__cancel"
              onClick={() => setDismissed(true)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
