import { useState } from "react";

import BdItemEditor from "../../builder/pages/BdItemEditor.jsx";
import "./createcollectionview.css";

const STEP_SLUGS = ["name", "type", "items", "review", "submit", "done"];

export default function CreateCollectionView({
  view = "naming",
  step = "name",
  name = "",
  type = "standard",
  items =([]),
  rarities =([]),
  collectionTypes =([]),
  starterItems =([]),
  nameSuggestions =([]),
  feePerItem = 100,
  nameMax = 32,
  cost = 0,
  error =(undefined),
  collectionHref = "#",
  onSubmitName =(undefined),
  onSelectType =(undefined),
  onAddItems =(undefined),
  onSubmit =(undefined),
  onBack =(undefined),
  onRetry =(undefined),
}) {
  const [nameDraft, setNameDraft] = useState(name || "");
  const [nameTouched, setNameTouched] = useState(false);

  const isValidName = (n) => {
    const t = n.trim();
    return t.length >= 1 && t.length <= nameMax;
  };

  return (
    <div className="cwc-create-collection" data-step={step}>
        <header className="cwc-create-collection__head">
          <h1 className="cwc-create-collection__title">Create a Wearables Collection</h1>
          <ol className="cwc-create-collection__steps" aria-label="Wizard steps">
            {STEP_SLUGS.map((s, i) => (
              <li
                key={s}
                className={
                  "cwc-create-collection__stepdot" +
                  (s === step ? " is-active" : "")
                }
                aria-current={s === step ? "step" : undefined}
              >
                <span className="cwc-create-collection__stepnum">{i + 1}</span>
                <span className="cwc-create-collection__steplabel">{s}</span>
              </li>
            ))}
          </ol>
        </header>

        {view === "naming" && (
          <section className="cwc-create-collection__panel" aria-label="Name your collection">
            <label className="cwc-create-collection__label" htmlFor="cc-name">
              Collection name
            </label>
            <input
              id="cc-name"
              className="cwc-create-collection__input"
              type="text"
              maxLength={nameMax}
              placeholder={nameSuggestions[0] ?? "My Collection"}
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onBlur={() => setNameTouched(true)}
              aria-invalid={nameTouched && !isValidName(nameDraft)}
            />
            {nameTouched && !isValidName(nameDraft) && (
              <p className="cwc-create-collection__error" role="alert">
                Enter a name between 1 and {nameMax} characters.
              </p>
            )}
            <div className="cwc-create-collection__controls">
              <button
                type="button"
                className="cwc-create-collection__btn cwc-create-collection__btn--primary"
                disabled={!isValidName(nameDraft)}
                onClick={() => onSubmitName?.(nameDraft)}
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {view === "choosingType" && (
          <section className="cwc-create-collection__panel" aria-label="Choose collection type">
            <div className="cwc-create-collection__types" role="group">
              {collectionTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="cwc-create-collection__typecard"
                  onClick={() => onSelectType?.(t.id)}
                >
                  <span className="cwc-create-collection__typename">{t.label}</span>
                  <span className="cwc-create-collection__typedesc">{t.description}</span>
                </button>
              ))}
            </div>
            <div className="cwc-create-collection__controls">
              <button
                type="button"
                className="cwc-create-collection__btn"
                onClick={() => onBack?.()}
              >
                Back
              </button>
            </div>
          </section>
        )}

        {view === "editingItems" && (
          <section className="cwc-create-collection__panel cwc-create-collection__panel--editor" aria-label="Add items">
            <div className="cwc-create-collection__editorframe">
              <BdItemEditor mode="editing" />
            </div>
            <p className="cwc-create-collection__hint">
              Define each item's rarity and category in the editor above. The
              sample set ({starterItems.length} items) is pre-filled.
            </p>
            <div className="cwc-create-collection__controls">
              <button
                type="button"
                className="cwc-create-collection__btn"
                onClick={() => onBack?.()}
              >
                Back
              </button>
              <button
                type="button"
                className="cwc-create-collection__btn cwc-create-collection__btn--primary"
                onClick={() => onAddItems?.()}
              >
                Add {starterItems.length} items & review
              </button>
            </div>
          </section>
        )}

        {view === "reviewing" && (
          <section className="cwc-create-collection__panel" aria-label="Review">
            <h2 className="cwc-create-collection__subtitle">{name}</h2>
            <p className="cwc-create-collection__typebadge">
              {type === "linked" ? "Linked Wearables" : "Standard Collection"}
            </p>
            <ul className="cwc-create-collection__itemlist">
              {items.map((it) => {
                const r = rarities.find((x) => x.id === it.rarity);
                return (
                  <li key={it.id} className="cwc-create-collection__item">
                    <span className="cwc-create-collection__itemname">{it.name}</span>
                    <span className="cwc-create-collection__itemcat">{it.category}</span>
                    <span
                      className="cwc-create-collection__itemrar"
                      style={{ color: r?.color }}
                    >
                      {it.rarity}
                      {r ? ` · max ${r.maxSupply.toLocaleString()}` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="cwc-create-collection__cost">
              <span>Estimated publish cost</span>
              <strong>
                {cost.toLocaleString()} MANA
                {type === "linked" && " (no per-item fee)"}
              </strong>
              <small>
                {items.length} item(s) × {feePerItem} MANA / item — quote
                is simulated (read on-chain at publish time).
              </small>
            </div>
            <div className="cwc-create-collection__controls">
              <button
                type="button"
                className="cwc-create-collection__btn"
                onClick={() => onBack?.()}
              >
                Back
              </button>
              <button
                type="button"
                className="cwc-create-collection__btn cwc-create-collection__btn--primary"
                onClick={() => onSubmit?.()}
              >
                Sign & submit
              </button>
            </div>
          </section>
        )}

        {view === "submitting" && (
          <section className="cwc-create-collection__panel cwc-create-collection__panel--progress" aria-label="Submitting">
            <div className="cwc-create-collection__spinner" aria-hidden="true" />
            <p className="cwc-create-collection__progress">
              Signing & submitting the collection contract…
            </p>
            <small className="cwc-create-collection__note">
              On-chain mint is SIMULATED — no wallet/signer is invoked.
            </small>
          </section>
        )}

        {view === "done" && (
          <section className="cwc-create-collection__panel cwc-create-collection__panel--done" aria-label="Created">
            <h2 className="cwc-create-collection__subtitle">Collection created (stub)</h2>
            <p className="cwc-create-collection__done">
              "{name}" was submitted. The on-chain mint is simulated.
            </p>
            <a
              className="cwc-create-collection__btn cwc-create-collection__btn--primary"
              href={collectionHref}
            >
              Open collection
            </a>
          </section>
        )}

        {view === "error" && (
          <section className="cwc-create-collection__panel" aria-label="Error">
            <p className="cwc-create-collection__error" role="alert">
              Could not submit the collection: {error}
            </p>
            <div className="cwc-create-collection__controls">
              <button
                type="button"
                className="cwc-create-collection__btn cwc-create-collection__btn--primary"
                onClick={() => onRetry?.()}
              >
                Retry
              </button>
            </div>
          </section>
        )}
    </div>
  );
}
