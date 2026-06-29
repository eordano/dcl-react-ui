import { useState } from "react";
import "./acbuymanawithfiatmodal.css";

const NETWORKS = {
  matic: {
    type: "matic",
    cta: "Polygon MANA",
    ctaSubtitle: "Use it to buy most wearables and emotes in Polygon.",
    title: "Buy Polygon MANA",
    name: "Polygon",
    gateways: [
      { type: "moonPay", disabled: true },
      { type: "transak", disabled: false },
    ],
  },
  ethereum: {
    type: "ethereum",
    cta: "Ethereum MANA",
    ctaSubtitle: "Use it to buy LAND, names and specific wearables in Ethereum.",
    title: "Buy Ethereum MANA",
    name: "Ethereum",
    gateways: [
      { type: "moonPay", disabled: false },
      { type: "transak", disabled: false },
    ],
  },
};

const GATEWAY_NAMES = { moonPay: "MoonPay", transak: "Transak" };
const LEARN_MORE_LINK = {
  moonPay: "https://www.moonpay.com/",
  transak: "https://transak.com/",
};

function MoonPayLogo() {
  return (
    <svg
      className="acbf__logo"
      viewBox="0 0 200 40"
      role="img"
      aria-label="MoonPay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="13" fill="#7d00ff" />
      <circle cx="27.5" cy="13.5" r="4.5" fill="#fff" />
      <text
        x="44"
        y="27"
        fontFamily="inherit"
        fontWeight="700"
        fontSize="22"
        fill="#1a1f36"
      >
        moonpay
      </text>
    </svg>
  );
}

function TransakLogo() {
  return (
    <svg
      className="acbf__logo"
      viewBox="0 0 200 40"
      role="img"
      aria-label="Transak"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 8 h26 v6 h-10 v18 h-6 V14 H10 z" fill="#1461db" />
      <text
        x="44"
        y="27"
        fontFamily="inherit"
        fontWeight="700"
        fontSize="22"
        fill="#1461db"
      >
        transak
      </text>
    </svg>
  );
}

function NetworkGlyph({ type }) {
  if (type === "matic") {
    return (
      <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
        <path
          d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
          fill="#242129"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 14L34 24L24 34L14 24L24 14ZM24 16.8L31.2 24L24 31.2L16.8 24L24 16.8ZM24 27.6C25.9885 27.6 27.6 25.9885 27.6 24C27.6 22.0115 25.9885 20.4 24 20.4C22.0115 20.4 20.4 22.0115 20.4 24C20.4 25.9885 22.0115 27.6 24 27.6Z"
          fill="#fff"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      <path
        d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
        fill="#242129"
      />
      <path
        d="M29.4 23.95c0-2.89-2.41-5.29-5.4-5.29-2.99 0-5.4 2.4-5.4 5.29 0 2.87 2.41 5.2 5.4 5.2 2.99 0 5.4-2.33 5.4-5.2zM33 29.01V18.99L24 14l-9 4.99v10.02L24 34l9-4.99z"
        fill="#FF2D55"
      />
    </svg>
  );
}

function ModalNav({ title, subtitle, onBack, onInfo, onClose, headerClass }) {
  return (
    <div className={"acbf__nav" + (headerClass ? " " + headerClass : "")}>
      {onBack ? (
        <button
          type="button"
          className="acbf__nav-btn acbf__nav-back"
          aria-label="Back"
          onClick={onBack}
        >
          <svg viewBox="0 0 8 14" width="8" height="14" aria-hidden="true">
            <path
              d="M0 7l6.379 6.228a.966.966 0 0 0 1.343 0 .912.912 0 0 0 0-1.31L2.686 7l5.036-4.917a.912.912 0 0 0 0-1.311.966.966 0 0 0-1.343 0L0 7z"
              fill="currentColor"
            />
          </svg>
        </button>
      ) : null}
      <div className="acbf__nav-text">
        <div className="acbf__nav-title">{title}</div>
        {subtitle ? <div className="acbf__nav-subtitle">{subtitle}</div> : null}
      </div>
      {onInfo ? (
        <button
          type="button"
          className="acbf__nav-btn acbf__nav-info"
          aria-label="More info"
          onClick={onInfo}
        >
          <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9zm1.8 0a7.2 7.2 0 1 0 14.4 0A7.2 7.2 0 0 0 1.8 9zM6.88 4.96A2.86 2.86 0 0 1 9 4a2.87 2.87 0 0 1 3 3.28c0 1.33-.9 2.12-1.49 2.65-.14.12-.27.24-.38.36-.31.34-.34.65-.34.66V11.5H8.24v-.56c0-.1.02-.98.78-1.81.17-.18.34-.34.53-.5.56-.5.93-.86.93-1.35 0-.89-.66-1.61-1.48-1.61-.81 0-1.47.72-1.47 1.61H6a3.3 3.3 0 0 1 .88-2.32zM9.76 14v-1.67H8.24V14h1.52z"
              fill="currentColor"
            />
          </svg>
        </button>
      ) : null}
      <button
        type="button"
        className="acbf__nav-btn acbf__nav-close"
        aria-label="Close"
        onClick={onClose}
      >
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
          <path
            d="M13.706.363l-.069-.069a1 1 0 0 0-1.414 0L7 5.517 1.777.294a1 1 0 0 0-1.414 0L.294.363a1 1 0 0 0 0 1.414L5.517 7 .294 12.223a1 1 0 0 0 0 1.414l.069.069a1 1 0 0 0 1.414 0L7 8.483l5.223 5.223a1 1 0 0 0 1.414 0l.069-.069a1 1 0 0 0 0-1.414L8.483 7l5.223-5.223a1 1 0 0 0 0-1.414z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

function GatewayCard({ gateway, networkName, onContinue }) {
  const gwName = GATEWAY_NAMES[gateway.type];
  return (
    <div
      className={
        "acbf__gateway acbf__gateway--" +
        gateway.type +
        (gateway.disabled ? " acbf__gateway--disabled" : "")
      }
    >
      <div className="acbf__gateway-image">
        {gateway.type === "moonPay" ? <MoonPayLogo /> : <TransakLogo />}
      </div>
      <div className="acbf__gateway-info">
        <div className="acbf__gateway-able">
          <div className="acbf__gateway-title">
            Buy {networkName} MANA with {gwName}
          </div>
          <div className="acbf__gateway-subtitle">
            You can buy with debit and credit cards, Apple Pay, Google Pay, or
            via bank transfer.
          </div>
          <button
            type="button"
            className="acbf__continue"
            disabled={gateway.disabled}
            onClick={onContinue}
          >
            Continue with {gwName}
          </button>
        </div>
        <a
          className="acbf__learn-more"
          href={LEARN_MORE_LINK[gateway.type]}
          target="_blank"
          rel="external noreferrer"
        >
          Learn More about {gwName}
        </a>
      </div>
    </div>
  );
}

const DEFAULT_NETWORK_MESSAGE =
  "If this is the first time you use any of these providers you will first need to create an account on their platform. If you have already have an account, you will just need to login.";

const FEEDBACK = {
  pending: (n, g) => ({
    title: `Buy ${n} MANA`,
    statusTitle: "The transaction is processing",
    description: "Wait a few minutes while the transaction is being processed",
    goToText: `Go to ${g} tab`,
  }),
  success: (n) => ({
    title: `${n} MANA purchase completed!`,
    description: `The ${n} MANA has been added to your account. If you still don't see it in your balance, refresh this page.`,
    cta: "Done",
    viewTransaction: "View Transaction in Exporer",
  }),
  failure: (n, g) => ({
    title: `Buy ${n} MANA`,
    statusTitle: "The transaction failed",
    description: `You can try again with ${g} or select other provider`,
    cta: "Try again",
    secondaryCta: "Select other provider",
  }),
};

export default function AcBuyMANAWithFiatModal({
  view = "select",
  network = "ethereum",
  gateway = "moonPay",
  selectedNetwork = null,
  hasError = false,
  loading = false,
  onClose = () => {},
}) {
  const [step, setStep] = useState(
    view.startsWith("feedback") ? null : view === "gateway" ? "gateway" : "select",
  );
  const [activeNetwork, setActiveNetwork] = useState(network);

  const isFeedback = view.startsWith("feedback");
  const feedbackStatus = view.replace("feedback-", "");

  const networkList = selectedNetwork
    ? [NETWORKS[selectedNetwork]]
    : [NETWORKS.matic, NETWORKS.ethereum];

  if (isFeedback) {
    const net = NETWORKS[network];
    const gwName = GATEWAY_NAMES[gateway];
    const i18n = FEEDBACK[feedbackStatus](net.name, gwName);
    const showInfo = false;
    return (
      <div className="u-modal-overlay acbf" onClick={onClose}>
        <div
          className={"acbf__card acbf__card--feedback acbf--" + feedbackStatus}
          role="dialog"
          aria-modal="true"
          aria-label={i18n.title}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalNav
            title={i18n.title}
            onInfo={showInfo ? () => {} : undefined}
            onClose={onClose}
            headerClass="acbf__nav--feedback"
          />
          <div className="acbf__content acbf__content--feedback">
            <div
              className={
                "acbf__feedback-image " +
                (feedbackStatus === "success"
                  ? "acbf__feedback-image--stars"
                  : "acbf__feedback-image--" + gateway)
              }
            >
              {feedbackStatus === "success" ? (
                <span className="acbf__stars" aria-hidden="true">
                  ✦
                </span>
              ) : gateway === "moonPay" ? (
                <MoonPayLogo />
              ) : (
                <TransakLogo />
              )}
            </div>
            <div className="acbf__text-content">
              {feedbackStatus !== "success" && i18n.statusTitle ? (
                <p className="acbf__status-description">
                  <span
                    className={
                      "acbf__status-icon acbf__status-icon--" + feedbackStatus
                    }
                    aria-hidden="true"
                  >
                    {feedbackStatus === "pending" ? "🕑" : "⚠"}
                  </span>
                  {i18n.statusTitle}
                </p>
              ) : null}
              <p className="acbf__description">{i18n.description}</p>
            </div>
          </div>
          <div className="acbf__actions">
            {feedbackStatus === "success" ? (
              <>
                <button type="button" className="acbf__btn" onClick={onClose}>
                  {i18n.cta}
                </button>
                <span
                  className="acbf__view-transaction"
                  role="button"
                  tabIndex={0}
                >
                  {i18n.viewTransaction}
                  <span className="acbf__external" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </>
            ) : null}
            {feedbackStatus === "pending" ? (
              <div className="acbf__pending-loader">
                <span className="acbf__spinner" aria-hidden="true" />
                <span className="acbf__go-to" role="button" tabIndex={0}>
                  {i18n.goToText}
                </span>
              </div>
            ) : null}
            {feedbackStatus === "failure" ? (
              <>
                <button type="button" className="acbf__btn" onClick={onClose}>
                  {i18n.cta}
                </button>
                <button
                  type="button"
                  className="acbf__btn acbf__btn--secondary"
                  onClick={onClose}
                >
                  {i18n.secondaryCta}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  const onGateway = step === "gateway";
  const net = NETWORKS[activeNetwork];
  const title = onGateway ? `Buy ${net.name} MANA` : "Buy MANA";
  const canGoBack = onGateway && networkList.length > 1;

  return (
    <div className="u-modal-overlay acbf" onClick={onClose}>
      <div
        className={
          "acbf__card " +
          (onGateway
            ? "acbf__card--network acbf__card--" + activeNetwork
            : "acbf__card--select")
        }
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalNav
          title={title}
          subtitle={onGateway ? "" : "Select what MANA you want to buy:"}
          onBack={canGoBack ? () => setStep("select") : undefined}
          onInfo={() => {}}
          onClose={onClose}
        />

        <div
          className={
            "acbf__content " +
            (onGateway ? "acbf__content--network" : "acbf__content--select")
          }
        >
          {onGateway ? (
            <div className="acbf__gateways">
              {[...net.gateways]
                .sort((a, b) => Number(a.disabled) - Number(b.disabled))
                .map((gw) => (
                  <GatewayCard
                    key={gw.type}
                    gateway={gw}
                    networkName={net.name}
                    onContinue={onClose}
                  />
                ))}
            </div>
          ) : (
            networkList.map((nw) => (
              <div
                key={nw.type}
                className={"acbf__option acbf__option--" + nw.type}
                onClick={() => {
                  setActiveNetwork(nw.type);
                  setStep("gateway");
                }}
              >
                <div className="acbf__option-image">
                  <NetworkGlyph type={nw.type} />
                </div>
                <div className="acbf__option-info">
                  <div className="acbf__option-cta">{nw.cta}</div>
                  <div className="acbf__option-subtitle">{nw.ctaSubtitle}</div>
                </div>
              </div>
            ))
          )}

          {onGateway ? (
            <small className="acbf__message">{DEFAULT_NETWORK_MESSAGE}</small>
          ) : null}
        </div>

        {hasError ? (
          <p className="acbf__error acbf__error--visible">Could not buy MANA.</p>
        ) : null}

        {loading ? (
          <>
            <div className="acbf__loader" aria-hidden="true">
              <span className="acbf__spinner acbf__spinner--big" />
            </div>
            <div className="acbf__loader-background" />
          </>
        ) : null}
      </div>
    </div>
  );
}
