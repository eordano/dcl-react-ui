import BdItemEditor from "@ui/builder/pages/BdItemEditor.jsx";
import { AvatarStage } from "@ui/explorer/components/AvatarPreview.jsx";
import "@ui/builder/pages/bditemeditor.css";
import "./wearableitemeditorview.css";

const STEP_ORDER = ["model", "category", "rarity", "price"];

export default function WearableItemEditorView({
  value = "selecting",
  step = "select",
  draft =({}),
  collectionName = "Collection",
  itemCount = 0,
  items =([]),
  categories =([]),
  rarities =([]),
  category = "",
  rarity = "",
  price = "",
  free = false,
  maxSupply = 0,
  error = "",
  onSelectNew =(undefined),
  onSelectItem =(undefined),
  onBack =(undefined),
  onSetModel =(undefined),
  onCategoryChange =(undefined),
  onContinueCategory =(undefined),
  onRarityChange =(undefined),
  onContinueRarity =(undefined),
  onPriceChange =(undefined),
  onFreeChange =(undefined),
  onSave =(undefined),
  onRetry =(undefined),
  onRevert =(undefined),
}) {
  const activeIdx = STEP_ORDER.indexOf(step);
  const canRevert = value !== "selecting" && value !== "saving";

  return (
    <div className="cwie-wizard" data-step={step}>
      <BdItemEditor />

      <div className="cwie-wizard__overlay" role="group" aria-label="Wearable item editor step">
        <div className="cwie-wizard__preview" aria-label="Live avatar preview">
          <AvatarStage className="cwie-wizard__avatar" />
        </div>

        <div className="cwie-wizard__panel">
          {activeIdx >= 0 && (
            <ol className="cwie-wizard__steps" aria-label="Wizard progress">
              {STEP_ORDER.map((s, i) => (
                <li
                  key={s}
                  className={
                    "cwie-wizard__step" +
                    (i === activeIdx ? " cwie-wizard__step--active" : "") +
                    (i < activeIdx ? " cwie-wizard__step--done" : "")
                  }
                >
                  {s}
                </li>
              ))}
            </ol>
          )}

          {value === "selecting" && (
            <>
              <h2 className="cwie-wizard__title">Add or edit a wearable</h2>
              <p className="cwie-wizard__hint">
                {collectionName ?? "Collection"} · {itemCount} items
              </p>
              <div className="cwie-wizard__items">
                <button
                  type="button"
                  className="cwie-wizard__chip cwie-wizard__chip--new"
                  onClick={onSelectNew}
                >
                  + Add a new wearable
                </button>
                {items.map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    className="cwie-wizard__chip"
                    onClick={() => onSelectItem(it)}
                  >
                    {it.name} ({it.type})
                  </button>
                ))}
              </div>
            </>
          )}

          {value === "model" && (
            <>
              <h2 className="cwie-wizard__title">Model</h2>
              <p className="cwie-wizard__hint">
                {draft.name} — upload or replace the .glb representation (upload
                simulated).
              </p>
              <div className="cwie-wizard__controls">
                <button
                  type="button"
                  className="cwie-wizard__btn"
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="cwie-wizard__btn cwie-wizard__btn--primary"
                  onClick={onSetModel}
                >
                  Set model
                </button>
              </div>
            </>
          )}

          {value === "category" && (
            <>
              <h2 className="cwie-wizard__title">Category</h2>
              <p className="cwie-wizard__hint">
                Which avatar slot does {draft.name} occupy?
              </p>
              <div className="cwie-wizard__options" role="radiogroup" aria-label="Category">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={category === c}
                    className={
                      "cwie-wizard__chip" +
                      (category === c ? " cwie-wizard__chip--selected" : "")
                    }
                    onClick={() => onCategoryChange(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="cwie-wizard__controls">
                <button
                  type="button"
                  className="cwie-wizard__btn"
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="cwie-wizard__btn cwie-wizard__btn--primary"
                  onClick={onContinueCategory}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {value === "rarity" && (
            <>
              <h2 className="cwie-wizard__title">Rarity</h2>
              <p className="cwie-wizard__hint">
                Rarity caps how many can ever be minted.
              </p>
              <div className="cwie-wizard__options" role="radiogroup" aria-label="Rarity">
                {rarities.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={rarity === r}
                    className={
                      "cwie-wizard__chip" +
                      (rarity === r ? " cwie-wizard__chip--selected" : "")
                    }
                    onClick={() => onRarityChange(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <span className="cwie-wizard__supply">
                Max supply: {maxSupply.toLocaleString()} mints
              </span>
              <div className="cwie-wizard__controls">
                <button
                  type="button"
                  className="cwie-wizard__btn"
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="cwie-wizard__btn cwie-wizard__btn--primary"
                  onClick={onContinueRarity}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {value === "price" && (
            <>
              <h2 className="cwie-wizard__title">Price</h2>
              <p className="cwie-wizard__hint">
                Primary-sale price ({rarity} · {maxSupply.toLocaleString()}{" "}
                supply). Listing is simulated.
              </p>
              <div className="cwie-wizard__price">
                <input
                  className="cwie-wizard__price-input"
                  type="number"
                  min="0"
                  inputMode="decimal"
                  aria-label="MANA price"
                  value={price}
                  disabled={free}
                  onChange={(e) => onPriceChange(e.target.value)}
                />
                <span className="cwie-wizard__price-unit">MANA</span>
              </div>
              <label className="cwie-wizard__free">
                <input
                  type="checkbox"
                  checked={free}
                  onChange={(e) => onFreeChange(e.target.checked)}
                />
                Give away for free
              </label>
              <div className="cwie-wizard__controls">
                <button
                  type="button"
                  className="cwie-wizard__btn"
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="cwie-wizard__btn cwie-wizard__btn--primary"
                  onClick={onSave}
                >
                  Save wearable
                </button>
              </div>
            </>
          )}

          {value === "saving" && (
            <>
              <h2 className="cwie-wizard__title">Saving…</h2>
              <p className="cwie-wizard__hint">
                Uploading model, writing item + listing price (simulated).
              </p>
            </>
          )}

          {value === "saved" && (
            <>
              <h2 className="cwie-wizard__title">Saved</h2>
              <p className="cwie-wizard__hint">
                {draft.name} · {draft.rarity} ·{" "}
                {draft.free ? "free" : `${draft.price || "0"} MANA`} (simulated persist).
              </p>
            </>
          )}

          {value === "error" && (
            <>
              <h2 className="cwie-wizard__title">Save failed</h2>
              <p className="cwie-wizard__hint">{error}</p>
              <div className="cwie-wizard__controls">
                <button
                  type="button"
                  className="cwie-wizard__btn cwie-wizard__btn--primary"
                  onClick={onRetry}
                >
                  Retry
                </button>
              </div>
            </>
          )}

          {canRevert && (
            <button
              type="button"
              className="cwie-wizard__btn cwie-wizard__btn--ghost cwie-wizard__revert"
              onClick={onRevert}
            >
              Revert
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
