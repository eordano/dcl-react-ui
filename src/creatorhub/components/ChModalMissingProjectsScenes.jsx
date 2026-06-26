import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chmodalmissingprojectsscenes.css";

const COPY = {
  title: "Scenes missing reference files",
  find: "Find",
  discard: "Delete",
  discardAll: "Delete all",
};

function ellipsisAtMiddle(value, maxLen) {
  if (value.length <= maxLen + 3) return value;
  const half = Math.floor(maxLen / 2);
  const start = value.slice(0, Math.max(0, half - 3)).trim();
  const end = value.slice(-half).trim();
  return `${start}...${end}`;
}

const SAMPLE_MISSING = [
  "/Users/me/Documents/decentraland/projects/winter-festival-2024/scene",
  "/home/creator/dcl/my-genesis-plaza-experience/build",
  "/Users/me/Documents/dcl-scenes/neon-plaza",
];

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.59 13.59a1 1 0 0 1-1.41 1.41L12 14.83l-2.17 2.17a1 1 0 0 1-1.42-1.41L10.59 12 8.41 9.83A1 1 0 0 1 9.83 8.41L12 10.59l2.17-2.18a1 1 0 0 1 1.42 1.42L13.41 12l2.18 2.17Z"
      />
    </svg>
  );
}

export default function ChModalMissingProjectsScenes({
  open = true,
  missing = SAMPLE_MISSING,
  onClose = () => {},
  onFind = () => {},
  onDiscard = () => {},
}) {
  const [items, setItems] = useState(missing);

  if (!open) {
    return <CreatorHubChrome active="scenes" />;
  }

  const handleFind = (path) => () => onFind(path);
  const handleDiscard = (path) => () => {
    onDiscard([path]);
    setItems((prev) => prev.filter((p) => p !== path));
  };
  const handleDiscardAll = () => {
    onDiscard(items);
    setItems([]);
    onClose();
  };

  return (
    <CreatorHubChrome active="scenes">
      <div className="chmodalmissingprojectsscenes__backdrop" onClick={onClose}>
        <div
          className="chmodalmissingprojectsscenes__paper"
          role="dialog"
          aria-modal="true"
          aria-label={`${COPY.title} (${items.length})`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="chmodalmissingprojectsscenes__titlebox">
            <h5 className="chmodalmissingprojectsscenes__title">
              {`${COPY.title} (${items.length})`}
            </h5>
            <button
              type="button"
              className="chmodalmissingprojectsscenes__close"
              aria-label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="chmodalmissingprojectsscenes__content">
            {items.map((path) => (
              <div
                key={path}
                className="chmodalmissingprojectsscenes__row"
                title={path}
              >
                <span className="chmodalmissingprojectsscenes__path">
                  {ellipsisAtMiddle(path, 40)}
                </span>
                <div className="chmodalmissingprojectsscenes__actions">
                  <button
                    type="button"
                    className="chmodalmissingprojectsscenes__btn chmodalmissingprojectsscenes__btn--primary"
                    onClick={handleFind(path)}
                  >
                    {COPY.find}
                  </button>
                  <button
                    type="button"
                    className="chmodalmissingprojectsscenes__btn chmodalmissingprojectsscenes__btn--info"
                    onClick={handleDiscard(path)}
                  >
                    {COPY.discard}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="chmodalmissingprojectsscenes__btn chmodalmissingprojectsscenes__btn--info chmodalmissingprojectsscenes__discard-all"
              onClick={handleDiscardAll}
              disabled={items.length === 0}
            >
              {COPY.discardAll}
            </button>
          </div>
        </div>
      </div>
    </CreatorHubChrome>
  );
}
