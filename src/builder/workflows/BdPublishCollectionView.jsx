import BdCollectionDetail from "../pages/BdCollectionDetail.jsx";
import "./bdpublishcollectionview.css";

export default function BdPublishCollectionView({
  step = "summary",
  view = "summary",
  collectionName = "",
  summary =(null),
  fee =({ lines: [], itemCount: 0, manaPerItem: 0, totalMana: 0 }),
  txHash = "",
  error = "",
  accepted = false,
  onAcceptedChange =(undefined),
  onNext =(undefined),
  onBack =(undefined),
  onAccept =(undefined),
  onRetry =(undefined),
}) {
  return (
    <div className="cwpc" data-step={step}>
      {view === "summary" && summary && (
        <>
          <BdCollectionDetail
            collection={summary.collection}
            wearables={summary.wearables}
            emotes={summary.emotes}
          />
          <div className="cwpc__controls" role="group" aria-label="Review collection">
            <button
              type="button"
              className="cwpc__btn cwpc__btn--primary"
              onClick={() => onNext?.()}
            >
              Continue to publish fee
            </button>
          </div>
        </>
      )}

      {view === "cost" && (
        <>
          <section className="cwpc__panel" aria-labelledby="cwpc-cost-title">
            <p className="cwpc__eyebrow">Step 2 of 4 · Publish fee</p>
            <h1 id="cwpc-cost-title" className="cwpc__title">
              Publish-fee breakdown
            </h1>
            <p className="cwpc__lead">
              Publishing charges a one-time MANA fee per item ({fee.manaPerItem} MANA
              each). The fee is the same for every rarity tier and is rolled up
              below.
            </p>
            <FeeTable fee={fee} />
          </section>
          <div className="cwpc__controls" role="group" aria-label="Publish fee">
            <button type="button" className="cwpc__btn" onClick={() => onBack?.()}>
              Back
            </button>
            <button
              type="button"
              className="cwpc__btn cwpc__btn--primary"
              onClick={() => onNext?.()}
            >
              Continue to terms
            </button>
          </div>
        </>
      )}

      {view === "terms" && (
        <>
          <section className="cwpc__panel" aria-labelledby="cwpc-terms-title">
            <p className="cwpc__eyebrow">Step 3 of 4 · Terms</p>
            <h1 id="cwpc-terms-title" className="cwpc__title">
              Content &amp; curation terms
            </h1>
            <p className="cwpc__lead">
              Once submitted, the collection is reviewed by the Decentraland
              curation committee and its items are locked.
            </p>
            <div className="cwpc__terms" tabIndex={0}>
              <h4>By publishing this collection you confirm that:</h4>
              <ul>
                <li>You own or have the rights to all content in the collection.</li>
                <li>
                  The items comply with the Decentraland Content Policy and Code of
                  Ethics.
                </li>
                <li>
                  Items cannot be added or removed after publishing, and the
                  collection is locked pending curation review.
                </li>
                <li>
                  The MANA publish fee is non-refundable once the payment is
                  signed.
                </li>
              </ul>
            </div>
            <label className="cwpc__check">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => onAcceptedChange?.(e.target.checked)}
              />
              <span>
                I have read and accept the content policy and curation terms above.
              </span>
            </label>
          </section>
          <div className="cwpc__controls" role="group" aria-label="Accept terms">
            <button type="button" className="cwpc__btn" onClick={() => onBack?.()}>
              Back
            </button>
            <button
              type="button"
              className="cwpc__btn cwpc__btn--primary"
              disabled={!accepted}
              onClick={() => onAccept?.()}
            >
              Accept &amp; continue
            </button>
          </div>
        </>
      )}

      {view === "pay" && (
        <section className="cwpc__status" aria-labelledby="cwpc-pay-title" aria-live="polite">
          <div className="cwpc__spinner" aria-hidden="true" />
          <h1 id="cwpc-pay-title" className="cwpc__title">
            Approve MANA &amp; sign publish
          </h1>
          <p className="cwpc__lead">
            Confirm the {fee.totalMana} MANA publish fee in your wallet. The on-chain
            payment is <strong>simulated</strong> on this realm.
          </p>
        </section>
      )}

      {view === "submitted" && (
        <section className="cwpc__status" aria-labelledby="cwpc-done-title">
          <svg className="cwpc__bigcheck" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
            <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M20 33l8 8 16-18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 id="cwpc-done-title" className="cwpc__title">
            Submitted for curation review
          </h1>
          <p className="cwpc__lead">
            “{collectionName}” ({fee.itemCount} item{fee.itemCount === 1 ? "" : "s"},
            {" "}
            {fee.totalMana} MANA) is now in the curation queue. The committee
            review is a <strong>stub</strong> on this realm.
          </p>
          {txHash ? (
            <p className="cwpc__tx">tx: {txHash} (simulated)</p>
          ) : null}
        </section>
      )}

      {view === "error" && (
        <>
          <section className="cwpc__status" aria-labelledby="cwpc-err-title">
            <h1 id="cwpc-err-title" className="cwpc__title">
              Publish payment failed
            </h1>
            <p className="cwpc__lead">
              {error || "The publish payment could not be completed."}{" "}
              You can try the (simulated) payment again or go back to the terms.
            </p>
          </section>
          <div className="cwpc__controls">
            <button type="button" className="cwpc__btn" onClick={() => onBack?.()}>
              Back to terms
            </button>
            <button
              type="button"
              className="cwpc__btn cwpc__btn--primary"
              onClick={() => onRetry?.()}
            >
              Try again
            </button>
          </div>
        </>
      )}

      {view === "blocked" && (
        <section className="cwpc__blocked" aria-labelledby="cwpc-blocked-title">
          <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
            <path d="M32 6l28 50H4L32 6z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M32 24v14M32 46v.05" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
          <h1 id="cwpc-blocked-title" className="cwpc__title">
            Nothing to publish yet
          </h1>
          <p className="cwpc__lead">
            “{collectionName}” has no items. Add at least one wearable or emote to
            the collection before publishing.
          </p>
        </section>
      )}
    </div>
  );
}

const RARITY_COLOR = {
  unique: "#FFB626",
  mythic: "#FF63E1",
  exotic: "#CAFF73",
  legendary: "#842DDA",
  epic: "#3D85E6",
  rare: "#36CF75",
  uncommon: "#ED6D4F",
  common: "#ABC1C1",
};

function ManaGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path d="M8 1.6L13 8 8 14.4 3 8 8 1.6z M8 4.4L5 8l3 3.6L11 8 8 4.4z" fill="currentColor" />
    </svg>
  );
}

function FeeTable({ fee }) {
  return (
    <table className="cwpc__fee">
      <thead>
        <tr>
          <th>Rarity</th>
          <th className="cwpc__num">Items</th>
          <th className="cwpc__num">Fee / item</th>
          <th className="cwpc__num">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {fee.lines.map((line) => (
          <tr key={line.rarity}>
            <td>
              <span
                className="cwpc__rarity"
                style={{ background: RARITY_COLOR[line.rarity] }}
              >
                {line.rarity}
              </span>
            </td>
            <td className="cwpc__num">{line.count}</td>
            <td className="cwpc__num">
              <span className="cwpc__mana">
                <ManaGlyph />
                {line.manaPerItem}
              </span>
            </td>
            <td className="cwpc__num">
              <span className="cwpc__mana">
                <ManaGlyph />
                {line.mana}
              </span>
            </td>
          </tr>
        ))}
        <tr className="cwpc__feetotal">
          <td>Total</td>
          <td className="cwpc__num">{fee.itemCount}</td>
          <td className="cwpc__num" />
          <td className="cwpc__num">
            <span className="cwpc__mana">
              <ManaGlyph />
              {fee.totalMana}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
