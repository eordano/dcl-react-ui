import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import AssetPreviewTile from "../components/AssetPreviewTile.jsx";
import "./mkbidpage2.css";

const ITEM = {
  name: "Pioneer Jacket",
  collection: "Decentraland Wearables",
  rarity: "legendary",
  network: "MATIC",
};

function ConfirmModal({ item, price, onCancel, loading }) {
  return (
    <div className="mkbidpage2__scrim" role="dialog" aria-modal="true">
      <div className="mkbidpage2__dialog">
        <h3 className="mkbidpage2__dialogtitle">Please confirm</h3>
        <p className="mkbidpage2__dialogtext">
          You are about to bid on <b>{item.name}</b> for{" "}
          <span className="mkbidpage2__manainline">
            <ManaMark size={13} /> {Number(price || 0).toLocaleString()}
          </span>
          .
          <br />
          Please re-enter the price to confirm:
        </p>
        <div className="mkbidpage2__field">
          <div className="mkbidpage2__manawrap">
            <span className="mkbidpage2__manaicon">
              <ManaMark size={15} />
            </span>
            <input
              className="mkbidpage2__input"
              inputMode="decimal"
              placeholder={price}
              aria-label="Confirm price"
            />
          </div>
        </div>
        <div className="mkbidpage2__dialogbtns">
          <button type="button" className="mkbidpage2__btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={
              "mkbidpage2__btn mkbidpage2__btn--primary" +
              (loading ? " is-loading" : "")
            }
          >
            {loading ? <span className="mkbidpage2__spin" /> : "Bid"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MkBidPage2({
  item = ITEM,
  manaBalance = "2,480.55",
  submitting = false,
  insufficientMana = false,
  confirming = false,
  lowPriceWarn = false,
}) {
  const [tab, setTab] = useState("collectibles");
  const [price, setPrice] = useState(insufficientMana ? "9,999" : "1,000");
  const [expiresAt, setExpiresAt] = useState("2026-07-20");

  return (
    <MarketplaceChrome active={tab} onTab={setTab} mana={manaBalance}>
      <div className="mkbidpage2">
        <div className="mkbidpage2__page">
          <button type="button" className="mkbidpage2__back">
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path
                d="M10 3 5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span>Back</span>
          </button>

          <div className="mkbidpage2__row">
            <div className="mkbidpage2__left">
              <AssetPreviewTile
                rarity={item.rarity}
                image={item.image}
                figure={item.image ? "none" : "plate"}
                chipPosition="bottom"
              />
            </div>

            <div className="mkbidpage2__right">
              <div className="mkbidpage2__action">
                <h1 className="mkbidpage2__title">Place a bid</h1>
                <p className="mkbidpage2__subtitle">
                  Set a price and expiration date for your bid on{" "}
                  <b className="mkbidpage2__primary">{item.name}</b>.
                </p>

                <form
                  className="mkbidpage2__form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mkbidpage2__fields">
                    <label className="mkbidpage2__field">
                      <span className="mkbidpage2__label">Price</span>
                      <div
                        className={
                          "mkbidpage2__manawrap" +
                          (insufficientMana ? " is-error" : "")
                        }
                      >
                        <span className="mkbidpage2__manaicon">
                          <ManaMark size={16} />
                        </span>
                        <input
                          className="mkbidpage2__input"
                          inputMode="decimal"
                          value={price}
                          placeholder="1000"
                          onChange={(e) => setPrice(e.target.value)}
                          aria-label="Price"
                        />
                      </div>
                      {insufficientMana && (
                        <span className="mkbidpage2__msg is-error">
                          You don&apos;t have enough MANA
                        </span>
                      )}
                    </label>

                    <label className="mkbidpage2__field">
                      <span className="mkbidpage2__label">Expiration date</span>
                      <input
                        type="date"
                        className="mkbidpage2__input mkbidpage2__input--date"
                        value={expiresAt}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        aria-label="Expiration date"
                      />
                    </label>
                  </div>

                  {lowPriceWarn ? (
                    <span className="mkbidpage2__warning">
                      MANA transactions are only gas fee free if the item is at
                      least 1 MANA. To get this item, switch your network to
                      Polygon to pay for the gas fee with MATIC.{" "}
                      <a
                        href="https://docs.decentraland.org/blockchain-integration/transactions-in-polygon"
                        className="mkbidpage2__learn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <u>Learn More</u>
                      </a>
                    </span>
                  ) : (
                    <span className="mkbidpage2__freetx">
                      Pay with Polygon MANA to have gas fees{" "}
                      <span className="mkbidpage2__freecovered">
                        covered for you by the DAO
                      </span>{" "}
                      (item must be at least 1 MANA).
                    </span>
                  )}

                  <div className="mkbidpage2__buttons">
                    <button type="button" className="mkbidpage2__btn">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={
                        "mkbidpage2__btn mkbidpage2__btn--primary" +
                        (submitting || insufficientMana ? " is-disabled" : "") +
                        (submitting ? " is-loading" : "")
                      }
                      disabled={submitting || insufficientMana}
                    >
                      {submitting ? (
                        <span className="mkbidpage2__spin" />
                      ) : (
                        "Bid"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {confirming && (
          <ConfirmModal item={item} price={price} loading={false} />
        )}
      </div>
    </MarketplaceChrome>
  );
}
