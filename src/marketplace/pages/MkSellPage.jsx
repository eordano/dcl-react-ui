import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import Modal from "../../components/Modal.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import AssetPreviewTile from "../components/AssetPreviewTile.jsx";
import "./mksellpage.css";

const COPY = {
  title: "List for sale",
  update_title: "Update your listing",
  subtitle: "Set a price and expiration date for",
  update_subtitle: "Set a new price and expiration date for",
  price: "Price",
  expiration_date: "Expiration date",
  invalid_date: "This date has already passed",
  submit: "List for sale",
  update_submit: "Update",
  cancel: "Cancel",
  proceed: "Proceed",
  cancel_order_warning:
    "ACTION REQUIRED: In order to update the new price, you have to remove the previous listing first.",
  cancel_order: "CANCEL ORDER",
  confirm_title: "Please confirm",
  confirm_line_two: "Please re-enter the price to confirm:",
  confirm_warning: "Warning: this price is way below market value",
};

const DEFAULT_NFT = {
  name: "Cyber Ronin Jacket",
  category: "wearable",
  rarity: "legendary",
  network: "ethereum",
};

function fmtMana(n) {
  const v = parseFloat(String(n).replace(/,/g, ""));
  return Number.isFinite(v) ? v.toLocaleString() : "0";
}

function ConfirmModal({ nft, price, error, onCancel, onConfirm }) {
  const [confirmed, setConfirmed] = useState("");
  const target = parseFloat(String(price).replace(/,/g, "") || "0").toString();
  const isDisabled = target !== confirmed;
  return (
    <Modal width={460} onClose={onCancel} className="mksellpage__modalcard">
      <div className="mksellpage__confirm">
        <div className="mksellpage__confirmhead">
          <h3 className="mksellpage__confirmtitle">{COPY.confirm_title}</h3>
          <button type="button" className="mksellpage__close" aria-label="Close" onClick={onCancel}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <div className="mksellpage__confirmbody">
          You are about to list <b>{nft.name}</b> on sale for{" "}
          <span className="mksellpage__amount">
            <ManaMark size={14} />
            {fmtMana(price)}
          </span>
          .
          <p className="mksellpage__warn">{COPY.confirm_warning}</p>
          {COPY.confirm_line_two}
        </div>

        <label className="mksellpage__confirmlabel" htmlFor="mksell-confirm">
          {COPY.price}
        </label>
        <div className="mksellpage__inputbox">
          <span className="mksellpage__mana"><ManaMark /></span>
          <input
            id="mksell-confirm"
            className="mksellpage__input"
            type="text"
            inputMode="decimal"
            placeholder={target}
            value={confirmed}
            onChange={(e) => setConfirmed(e.target.value)}
          />
        </div>

        {error ? (
          <p className="mksellpage__errmsg">
            <strong>Error</strong>
            {error}
          </p>
        ) : null}

        <div className="mksellpage__confirmactions">
          <Button variant="secondary" className="mksellpage__cancel" onClick={onCancel}>
            {COPY.cancel}
          </Button>
          <Button variant="primary" disabled={isDisabled} onClick={onConfirm}>
            {COPY.proceed}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function MkSellPage({
  nft = DEFAULT_NFT,
  isUpdate = false,
  shouldRemoveListing = false,
  initialPrice = "",
  initialExpiration = "2026-07-20",
  confirmError = "",
}) {
  const [tab, setTab] = useState("my-assets");
  const [price, setPrice] = useState(initialPrice);
  const [expiration, setExpiration] = useState(initialExpiration);
  const [showConfirm, setShowConfirm] = useState(false);

  const priceNum = parseFloat(String(price).replace(/,/g, ""));
  const isInvalidPrice = price !== "" && (!(priceNum > 0));
  const isInvalidDate = !!expiration && new Date(`${expiration} 00:00:00`).getTime() < Date.now();
  const isDisabled = !(priceNum > 0) || isInvalidDate;

  const titleText = isUpdate ? COPY.update_title : COPY.title;
  const subtitleLead = isUpdate ? COPY.update_subtitle : COPY.subtitle;
  const submitText = isUpdate ? COPY.update_submit : COPY.submit;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mksellpage">
        <div className="mksellpage__page">
          <button type="button" className="mksellpage__back">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            Back
          </button>

          <div className="mksellpage__row">
            <div className="mksellpage__left">
              <AssetPreviewTile rarity={nft.rarity} />
            </div>

            <div className="mksellpage__right">
              <h1 className="mksellpage__title">{titleText}</h1>

              {shouldRemoveListing ? (
                <div className="mksellpage__cancelorder">
                  <div className="mksellpage__banner" role="alert">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 9v4M12 17h.01" />
                      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    </svg>
                    <span>{COPY.cancel_order_warning}</span>
                  </div>
                  <Button variant="primary">{COPY.cancel_order}</Button>
                </div>
              ) : (
                <>
                  <p className="mksellpage__subtitle">
                    {subtitleLead} <b>{nft.name}</b>.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowConfirm(true);
                    }}
                  >
                    <div className="mksellpage__fields">
                      <div className="mksellpage__field">
                        <label className="mksellpage__label" htmlFor="mksell-price">
                          {COPY.price}
                        </label>
                        <div className={"mksellpage__inputbox" + (isInvalidPrice ? " is-error" : "")}>
                          <span className="mksellpage__mana"><ManaMark /></span>
                          <input
                            id="mksell-price"
                            className="mksellpage__input"
                            type="text"
                            inputMode="decimal"
                            placeholder="1000"
                            autoFocus
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mksellpage__field">
                        <label className="mksellpage__label" htmlFor="mksell-exp">
                          {COPY.expiration_date}
                        </label>
                        <div className={"mksellpage__inputbox" + (isInvalidDate ? " is-error" : "")}>
                          <input
                            id="mksell-exp"
                            className="mksellpage__input"
                            type="date"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                          />
                        </div>
                        {isInvalidDate ? (
                          <p className="mksellpage__msg">{COPY.invalid_date}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mksellpage__buttons">
                      <Button type="button" variant="secondary" className="mksellpage__cancel">
                        {COPY.cancel}
                      </Button>
                      <Button type="submit" variant="primary" disabled={isDisabled}>
                        {submitText}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {showConfirm ? (
          <ConfirmModal
            nft={nft}
            price={price}
            error={confirmError}
            onCancel={() => setShowConfirm(false)}
            onConfirm={() => setShowConfirm(false)}
          />
        ) : null}
      </div>
    </MarketplaceChrome>
  );
}
