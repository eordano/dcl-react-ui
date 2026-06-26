import AccountChrome from "../frames/AccountChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import { Close } from "../../atoms/icons.jsx";
import "./acloginmodal.css";

const I18N = {
  title: "Sign In",
  subtitle: "Choose how you want to connect to Ethereum.",
  error: "Could not connect to wallet.",
};

const OPT = {
  browser_extension: "Using a browser extension",
  email: "Using your email",
  mobile: "Using a mobile wallet",
  mobile_and_browser: "Using your mobile or browser extension",
};

const PROVIDERS = [
  { type: "metamask", title: "MetaMask", subtitle: OPT.browser_extension },
  { type: "dapper", title: "Dapper", subtitle: OPT.browser_extension },
  { type: "coinbase", title: "Coinbase", subtitle: OPT.browser_extension },
  {
    type: "samsung-blockchain-wallet",
    title: "Samsung Blockchain Wallet",
    subtitle: OPT.mobile,
  },
  { type: "fortmatic", title: "Fortmatic", subtitle: OPT.email },
  { type: "wallet-connect", title: "WalletConnect", subtitle: OPT.mobile },
  { type: "wallet-link", title: "Coinbase Wallet", subtitle: OPT.mobile_and_browser },
];

function WalletGlyph({ type }) {
  switch (type) {
    case "metamask":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <path d="M34 6 22.5 14.4l2.1-5 9.4-3.4Z" fill="#e2761b" />
          <path d="M6 6l11.4 8.5-2-5.1L6 6Zm24.7 19.8-3.1 4.7 6.6 1.8 1.9-6.4-5.4-.1Zm-25.8.1L6.7 32.3l6.6-1.8-3-4.7-5.4.1Z" fill="#e4761b" />
          <path d="M13 17.6l-1.8 2.8 6.5.3-.2-7-4.5 3.9Zm14 0-4.6-4-.1 7.1 6.5-.3-1.8-2.8ZM13.3 30.5l3.9-1.9-3.4-2.6-.5 4.5Zm9.5-1.9 4 1.9-.6-4.5-3.4 2.6Z" fill="#e4761b" />
          <path d="M26.8 30.5l-4-1.9.3 2.6v1.2l3.7-1.9Zm-13.5 0 3.8 1.9v-1.2l.3-2.6-4.1 1.9Z" fill="#d7c1b3" />
          <path d="M17.2 24.9l-3.2-1 2.3-1 .9 2Zm5.6 0 .9-2 2.3 1-3.2 1Z" fill="#233447" />
          <path d="M13.3 30.5l.6-4.7-3.6.1 3 4.6Zm12.8-4.7.6 4.7 3-4.6-3.6-.1Zm2.7-6.2-6.5.3.6 3.4.9-2 2.3 1 2.7-2.7Zm-14.5 2.7 2.3-1 .9 2 .6-3.4-6.5-.3 2.7 2.7Z" fill="#cd6116" />
          <path d="M11.2 20.4l2.7 5.3-.1-2.6-2.6-2.7Zm14.6 2.7-.1 2.6 2.7-5.3-2.6 2.7Zm-8.1-2.4-.6 3.4.8 4 .2-5.3-.4-2.1Zm5 0-.3 2 .1 5.4.8-4-.6-3.4Z" fill="#e4751f" />
          <path d="M22.8 24.9l-.8 4 .6.4 3.4-2.6.1-2.6-3.3.8Zm-8.8-.8.1 2.6 3.4 2.6.6-.4-.8-4-3.3-.8Z" fill="#f6851b" />
          <path d="M22.9 32.4v-1.2l-.3-.3h-5.2l-.3.3v1.2l-3.8-1.8 1.3 1.1 2.7 1.9h5.3l2.7-1.9 1.3-1.1-3.7 1.8Z" fill="#c0ad9e" />
          <path d="M22.8 28.6l-.6-.4h-4.4l-.6.4-.3 2.6.3-.3h5.2l.3.3-.2-2.6Z" fill="#161616" />
          <path d="M34.5 14.9 35.5 10l-1.5-4.4-11.2 8.3 4.3 3.6 6.1 1.8 1.3-1.6-.6-.4 1-.9-.7-.5 1-.7-.7-.6Zm-29.5-4.9 1 4.9-.6.4 1 .7-.7.5 1 .9-.6.4 1.3 1.6 6.1-1.8 4.3-3.6L6.6 5.6 5 10Z" fill="#763d16" />
          <path d="M33.6 19.6 27.5 17.8l1.8 2.8-2.7 5.3 3.6-.1h5.4l-2-6.2Zm-21.4-1.8L6 19.6l-1.9 6.2h5.3l3.6.1-2.7-5.3 1.9-2.8Zm10.6 4 .4-6.7 1.8-4.7H15l1.7 4.7.4 6.7.2 2.1v5.3h4.4v-5.3l.1-2.1Z" fill="#f6851b" />
        </svg>
      );
    case "dapper":
      return <WalletInitial label="D" bg="#7048e8" />;
    case "coinbase":
    case "wallet-link":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <rect width="40" height="40" rx="9" fill="#0052ff" />
          <circle cx="20" cy="20" r="11" fill="#fff" />
          <rect x="15.5" y="15.5" width="9" height="9" rx="2" fill="#0052ff" />
        </svg>
      );
    case "fortmatic":
      return <WalletInitial label="F" bg="#6851ff" />;
    case "wallet-connect":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <rect width="40" height="40" rx="9" fill="#3b99fc" />
          <path
            d="M13 17.5c3.9-3.8 10.1-3.8 14 0l.5.5-1.6 1.6-.6-.6c-2.7-2.6-7-2.6-9.6 0l-.7.7-1.6-1.6.6-.6Zm17.3 3.2 1.4 1.4-6.5 6.4-3.3-3.2-3.3 3.2-6.5-6.4 1.4-1.4 5.1 5 3.3-3.2 3.3 3.2 5.1-5Z"
            fill="#fff"
          />
        </svg>
      );
    case "samsung-blockchain-wallet":
      return <WalletInitial label="S" bg="#1428a0" />;
    default:
      return <WalletInitial label="?" bg="#444" />;
  }
}

function WalletInitial({ label, bg }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill={bg} />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontFamily="inherit"
        fontWeight="700"
        fontSize="20"
        fill="#fff"
      >
        {label}
      </text>
    </svg>
  );
}

function Option({ provider, onClick }) {
  return (
    <button
      type="button"
      className={"acloginmodal__option acloginmodal__option--" + provider.type}
      onClick={onClick}
    >
      <span className="acloginmodal__optimage">
        <WalletGlyph type={provider.type} />
      </span>
      <span className="acloginmodal__optinfo">
        <span className="acloginmodal__opttitle">{provider.title}</span>
        <span className="acloginmodal__optsubtitle">{provider.subtitle}</span>
      </span>
    </button>
  );
}

export default function AcLoginModal({ state = "default" }) {
  const hasError = state === "error";
  const loading = state === "loading";

  return (
    <div className="acloginmodal">
      <AccountChrome mana="2,480.55" account="0x9f3c…7a21">
        <div className="acloginmodal__shellfill">
          <p className="acloginmodal__shellhint">
            Login modal — shown when an action requires sign-in.
          </p>
        </div>
      </AccountChrome>

      <div className="acloginmodal__scrim">
        <div
          className="acloginmodal__card"
          role="dialog"
          aria-modal="true"
          aria-label={I18N.title}
        >
          <div className="acloginmodal__nav">
            <div className="acloginmodal__navtitle">{I18N.title}</div>
            <div className="acloginmodal__navsubtitle">{I18N.subtitle}</div>
            <button
              type="button"
              className="acloginmodal__close"
              aria-label="Close"
            >
              <Close size={14} strokeWidth={2.2} />
            </button>
          </div>

          <div className="acloginmodal__content">
            {PROVIDERS.map((p) => (
              <Option key={p.type} provider={p} />
            ))}

            <small className="acloginmodal__message">
              Trezor and smart contract wallets like Dapper, Argent or Gnosis
              safe, do not work with Polygon. Read more about the Trezor support
              status{" "}
              <a
                href="https://github.com/trezor/trezor-firmware/pull/1568"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </small>
          </div>

          {hasError ? (
            <p className="acloginmodal__error acloginmodal__error--visible">
              {I18N.error}
            </p>
          ) : null}

          {loading ? (
            <>
              <div className="acloginmodal__loader">
                <Spinner size={56} />
              </div>
              <div className="acloginmodal__loaderbg" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
