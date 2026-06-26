import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import StarWalletIcon from "../../atoms/StarWalletIcon.jsx";
import "./mksigninpage.css";

function SignIn({ status = "connect", onConnect }) {
  const isConnecting = status === "connecting";
  const isConnected = status === "connected";
  const hasError = status === "error";

  const label = isConnecting
    ? "Connecting..."
    : isConnected
      ? "Connected"
      : "Connect";

  return (
    <div className="mksigninpage__signin">
      <h1 className="mksigninpage__header">Get Started</h1>

      <div className="mksigninpage__walleticon">
        <StarWalletIcon className="mksigninpage__staricon" />
      </div>

      <p className="mksigninpage__message">
        You can use the{" "}
        <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">
          MetaMask
        </a>{" "}
        extension or your email account
      </p>

      <Button
        variant="primary"
        size="lg"
        className="mksigninpage__cta"
        disabled={isConnecting || isConnected}
        onClick={onConnect}
      >
        {label}
      </Button>

      <p
        className={
          "mksigninpage__error" +
          (hasError && !isConnecting && !isConnected ? " is-visible" : "")
        }
      >
        Could not connect to wallet.
      </p>
    </div>
  );
}

const PROVIDERS = [
  { id: "metamask", title: "MetaMask", subtitle: "Using a browser extension", hue: 28 },
  { id: "wallet-connect", title: "WalletConnect", subtitle: "Using your mobile wallet", hue: 210 },
  { id: "fortmatic", title: "Fortmatic", subtitle: "Using your email", hue: 270 },
  { id: "coinbase", title: "Coinbase Wallet", subtitle: "Using your mobile or browser extension", hue: 222 },
];

function LoginModal({ hasError = false, loading = false, onClose, onPick }) {
  return (
    <div className="mksigninpage__scrim" role="dialog" aria-modal="true" aria-label="Sign In">
      <div className="mksigninpage__modal">
        <div className="mksigninpage__modalnav">
          <div className="mksigninpage__modaltitles">
            <div className="mksigninpage__modaltitle">Sign In</div>
            <div className="mksigninpage__modalsubtitle">Choose a method to connect</div>
          </div>
          <button
            type="button"
            className="mksigninpage__close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mksigninpage__modalcontent">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              className="mksigninpage__option"
              onClick={() => onPick?.(p.id)}
            >
              <span
                className="mksigninpage__optionimage"
                style={{ "--hue": p.hue }}
              />
              <span className="mksigninpage__optioninfo">
                <span className="mksigninpage__optiontitle">{p.title}</span>
                <span className="mksigninpage__optionsubtitle">{p.subtitle}</span>
              </span>
            </button>
          ))}

          {hasError ? (
            <p className="mksigninpage__modalerror is-visible">Could not connect wallet</p>
          ) : null}
        </div>

        {loading ? (
          <>
            <div className="mksigninpage__loader" aria-hidden="true" />
            <div className="mksigninpage__loaderbg" />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default function MkSignInPage({
  status = "connect",
  showModal = false,
  modalError = false,
  modalLoading = false,
}) {
  const [open, setOpen] = useState(showModal);

  return (
    <MarketplaceChrome active={null}>
      <div className="mksigninpage">
        <SignIn status={status} onConnect={() => setOpen(true)} />
      </div>

      {open ? (
        <LoginModal
          hasError={modalError}
          loading={modalLoading}
          onClose={() => setOpen(false)}
          onPick={() => setOpen(false)}
        />
      ) : null}
    </MarketplaceChrome>
  );
}
