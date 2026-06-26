import { useState } from "react";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkbuyflow.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const TokenIcon = ({ size = 24, hue = 254, mana = false }) =>
  mana ? (
    <span className="mkbuyflow__tokenicon mkbuyflow__tokenicon--mana" style={{ width: size, height: size }}>
      <ManaMark size={Math.round(size * 0.62)} />
    </span>
  ) : (
    <span
      className="mkbuyflow__tokenicon"
      style={{ width: size, height: size, "--hue": hue }}
      aria-hidden="true"
    />
  );

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" className="mkbuyflow__chev">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const InfoMark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="4.6" r="0.95" fill="currentColor" />
    <path d="M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ClockMark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ASSET = {
  name: "Cyber Ronin Jacket",
  rarity: "legendary",
  network: "MATIC",
  kind: "wearable",
  priceMana: "1,250",
  priceUsd: "387.5000",
};

const ASSET_DESCRIPTION = {
  ens: "Decentraland NAMEs",
  emote: "Decentraland Emotes",
  wearable: "Decentraland Wearables",
  land: "Decentraland Lands",
  other: "Decentraland Collectibles",
};

const Spinner = () => <span className="mkbuyflow__spinner" aria-hidden="true" />;

export default function MkBuyFlow({
  asset = ASSET,
  chainName = "Polygon",
  chainHue = 268,
  tokenSymbol = "MANA",
  tokenBalance = "2,480.55",
  itemCostToken = "1,250",
  itemCostUsd = "387.5000",
  feeCostToken = "0.0241",
  feeCostUsd = "0.0182",
  totalToken = "1,250",
  totalUsd = "387.5182",
  crossChain = false,
  exchangeRate = "0.3100",
  duration = "Normal ≈ 20s",
  showFeeCovered = true,
  state = "default",
  onPrimary,
  onBack,
  onClose,
}) {
  const [showCard, setShowCard] = useState(state === "card");

  const isBuying = state === "buying";
  const isLoadingRoute = state === "loadingRoute";
  const isMana = tokenSymbol === "MANA";

  const description = ASSET_DESCRIPTION[asset.kind] || ASSET_DESCRIPTION.other;
  const isEns = asset.kind === "ens";

  if (showCard) {
    return (
      <div className="mkbuyflow__scrim">
        <div className="mkbuyflow__modal mkbuyflow__modal--card" role="dialog" aria-modal="true">
          <nav className="mkbuyflow__nav">
            <span className="mkbuyflow__navtitle">Buy with card</span>
            <button type="button" className="mkbuyflow__close" aria-label="Close" onClick={() => setShowCard(false)}>
              ✕
            </button>
          </nav>
          <div className="mkbuyflow__cardbody">
            <p>
              Card payments are processed by{" "}
              <a href="https://transak.com/" target="_blank" rel="noopener noreferrer">
                Transak
              </a>
              .{"\n"}Transak charges a fee for its service. You will see the final price before confirming the purchase.
            </p>
            <p className="mkbuyflow__learnmore">
              <a href="https://transak.com/nft-checkout" target="_blank" rel="noopener noreferrer">
                Learn more about card payments
              </a>
            </p>
          </div>
          <div className="mkbuyflow__actions mkbuyflow__actions--stack">
            <button type="button" className="mkbuyflow__btn mkbuyflow__btn--primary">
              Continue
            </button>
            <button type="button" className="mkbuyflow__btn mkbuyflow__btn--secondary" onClick={() => setShowCard(false)}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mkbuyflow__scrim">
      <div className="mkbuyflow__modal" role="dialog" aria-modal="true">
        <nav className="mkbuyflow__nav">
          {!isBuying ? (
            <button type="button" className="mkbuyflow__back" aria-label="Back" onClick={onBack}>
              <ChevronLeft size={16} />
            </button>
          ) : null}
          <span className="mkbuyflow__navtitle">Confirm Your Purchase</span>
          {!isBuying ? (
            <button type="button" className="mkbuyflow__close" aria-label="Close" onClick={onClose}>
              ✕
            </button>
          ) : null}
        </nav>

        <div className="mkbuyflow__content">
          <div className="mkbuyflow__assetrow">
            <div
              className="mkbuyflow__assetimg u-rar-bg"
              style={{ "--rb": `var(--rar-bg-${asset.rarity})` }}
              aria-hidden="true"
            >
              {asset.image ? (
                <img
                  src={asset.image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", borderRadius: "inherit", position: "relative", zIndex: 1 }}
                />
              ) : (
                <ManaMark size={22} />
              )}
            </div>
            <div className="mkbuyflow__assetdetails">
              <span className="mkbuyflow__assetname">
                {isEns ? (
                  <>
                    <strong>{asset.name}</strong>.dcl.eth
                  </>
                ) : (
                  asset.name
                )}
              </span>
              <span className="mkbuyflow__assetdesc">{description}</span>
            </div>
            <div className="mkbuyflow__price">
              <span className="mkbuyflow__pricemana">
                <ManaMark size={18} />
                {asset.priceMana}
              </span>
              {asset.priceUsd ? (
                <span className="mkbuyflow__priceusd">${asset.priceUsd} USD</span>
              ) : null}
            </div>
          </div>

          <div className="mkbuyflow__paywith">
            <div className="mkbuyflow__selectors">
              <div className="mkbuyflow__selectorcol">
                <span className="mkbuyflow__paylabel">Pay with</span>
                <button type="button" className="mkbuyflow__selector" disabled={isBuying}>
                  <TokenIcon size={25} hue={chainHue} />
                  <span className="mkbuyflow__selname">{chainName}</span>
                  <ChevronDown />
                </button>
              </div>
              <div className="mkbuyflow__selectorcol mkbuyflow__selectorcol--token">
                <button type="button" className="mkbuyflow__selector mkbuyflow__selector--token" disabled={isBuying}>
                  <TokenIcon size={25} mana={isMana} hue={chainHue} />
                  <span className="mkbuyflow__selname">{tokenSymbol}</span>
                  <span className="mkbuyflow__balance">
                    Balance: <span className="mkbuyflow__balanceval">{tokenBalance}</span>
                  </span>
                  {!isBuying ? <ChevronDown /> : null}
                </button>
              </div>
            </div>

            <div className="mkbuyflow__costs">
              <div className="mkbuyflow__costrow">
                <div className="mkbuyflow__costlabel">Item Cost</div>
                <div className="mkbuyflow__costamount">
                  <span className="mkbuyflow__costtoken">
                    <TokenIcon size={24} mana={isMana} hue={chainHue} />
                    {itemCostToken}
                  </span>
                  <span className="mkbuyflow__costusd">≈ ${itemCostUsd}</span>
                </div>
              </div>
              <div className="mkbuyflow__costrow">
                <div className="mkbuyflow__costlabel mkbuyflow__costlabel--fee">
                  Estimated Fee
                  <span className="mkbuyflow__info u-tip">
                    <InfoMark />
                    <span className="u-tip__bubble">
                      Estimated fee includes the network cost that you have to pay directly with your wallet.
                    </span>
                  </span>
                </div>
                <div className="mkbuyflow__costamount">
                  <span className="mkbuyflow__costtoken">
                    <TokenIcon size={24} mana={isMana} hue={chainHue} />
                    {feeCostToken}
                  </span>
                  <span className="mkbuyflow__costusd">≈ ${feeCostUsd}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mkbuyflow__total">
            <div className="mkbuyflow__totalleft">
              <span className="mkbuyflow__totallabel">Total</span>
              {showFeeCovered ? (
                <span className="mkbuyflow__feecovered">
                  Gas fees are <span className="mkbuyflow__feefree">covered by the DAO</span> when paying with MANA.
                </span>
              ) : null}
            </div>
            <div className="mkbuyflow__totalright">
              {isLoadingRoute ? (
                <span className="mkbuyflow__skel mkbuyflow__skel--total" />
              ) : (
                <span className="mkbuyflow__totaltoken">
                  <TokenIcon size={24} mana={isMana} hue={chainHue} />
                  {totalToken}
                </span>
              )}
              <span className="mkbuyflow__totalusd">${totalUsd} USD</span>
            </div>
          </div>

          {crossChain ? (
            <div className="mkbuyflow__duration">
              <div className="mkbuyflow__durrow">
                <span className="mkbuyflow__durlabel">
                  <ClockMark /> Transaction Duration
                </span>
                <span>{duration}</span>
              </div>
              <div className="mkbuyflow__durrow mkbuyflow__exchangerow">
                <span className="mkbuyflow__durlabel">
                  <span className="mkbuyflow__exchangeicon" aria-hidden="true" /> Exchange Rate
                </span>
                <span>
                  1 {tokenSymbol} = {exchangeRate} MANA
                </span>
              </div>
            </div>
          ) : null}

          {showFeeCovered && asset.network === "MATIC" && !crossChain ? (
            <span className="mkbuyflow__remember">
              Pay with Polygon MANA to have gas fees{" "}
              <span className="mkbuyflow__feefree">covered for you by the DAO</span> (item must be at least 1 MANA).
            </span>
          ) : null}

          {state === "priceTooLow" ? (
            <span className="mkbuyflow__warning">
              MANA transactions are only gas fee free if the item is at least 1 MANA. To get this item, switch your
              network to Polygon to pay for the gas fee with MATIC.{" "}
              <a href="https://docs.decentraland.org" target="_blank" rel="noreferrer">
                <u>Learn More</u>
              </a>
            </span>
          ) : null}

          {state === "insufficient" ? (
            <span className="mkbuyflow__warning">
              You don’t have enough funds in {tokenSymbol} to pay for this item. Get MANA, or pay with a different token,
              or pay by card.
            </span>
          ) : null}

          {state === "routeUnavailable" ? (
            <span className="mkbuyflow__warning">
              Buying with {tokenSymbol} is not available at the moment. Get MANA, pay with a different token, or pay by
              card.
            </span>
          ) : null}
        </div>

        <div className="mkbuyflow__actions">
          {state === "insufficient" || state === "routeUnavailable" ? (
            <>
              <button type="button" className="mkbuyflow__btn mkbuyflow__btn--primary">
                Get MANA
              </button>
              <button
                type="button"
                className="mkbuyflow__btn mkbuyflow__btn--secondary"
                onClick={() => setShowCard(true)}
              >
                <span className="mkbuyflow__cardicon" aria-hidden="true" />
                Buy with card
              </button>
            </>
          ) : (
            <button
              type="button"
              className={"mkbuyflow__btn mkbuyflow__btn--primary" + (isBuying || isLoadingRoute ? " is-loading" : "")}
              disabled={isBuying || isLoadingRoute}
              onClick={onPrimary}
            >
              {isBuying ? (
                <>
                  <Spinner /> Confirm Transaction in Your Wallet
                </>
              ) : isLoadingRoute ? (
                <Spinner />
              ) : (
                "Buy now"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
