import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import Checkbox from "../../atoms/Checkbox.jsx";
import Modal from "../../components/Modal.jsx";
import "./mklistspage.css";
import { Caret } from "../../atoms/icons.jsx";

const LISTS = [
  {
    id: "default",
    name: "Saved",
    description: "Your default favourites list.",
    itemsCount: 9,
    isPrivate: false,
    isDefault: true,
    previews: ["legendary"],
  },
  {
    id: "l2",
    name: "Cyberpunk Fits",
    description: "Neon jackets and chrome boots.",
    itemsCount: 12,
    isPrivate: true,
    previews: ["legendary", "epic", "mythic", "rare"],
  },
  {
    id: "l3",
    name: "Land Wishlist",
    description: "Plots I'm watching near Genesis Plaza.",
    itemsCount: 4,
    isPrivate: false,
    previews: ["unique", "exotic", "rare"],
  },
  {
    id: "l4",
    name: "Dance Emotes",
    description: "",
    itemsCount: 7,
    isPrivate: false,
    previews: ["epic", "rare"],
  },
  {
    id: "l5",
    name: "Rare Hats",
    description: "Headwear under 200 MANA.",
    itemsCount: 1,
    isPrivate: true,
    previews: ["uncommon"],
  },
  {
    id: "l6",
    name: "To Sell Later",
    description: "",
    itemsCount: 0,
    isPrivate: false,
    previews: [],
  },
];

const SORTS = [
  { id: "recently_updated", label: "Recently updated" },
  { id: "name_asc", label: "Name ⬆" },
  { id: "name_desc", label: "Name ⬇" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const EllipsisV = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="3" r="1.6" />
    <circle cx="8" cy="8" r="1.6" />
    <circle cx="8" cy="13" r="1.6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
    <rect x="3.5" y="7" width="9" height="6.5" rx="1.4" fill="currentColor" />
    <path d="M5.2 7V5.2a2.8 2.8 0 0 1 5.6 0V7" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2.5 2.5h5l6 6-5 5-6-6v-5Z" strokeLinejoin="round" />
    <circle cx="5.2" cy="5.2" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2.5 4h11M6 4V2.6h4V4M4 4l.7 9.4h6.6L12 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

function ListCard({ list, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const previews = list.previews || [];
  const n = Math.min(previews.length, 4);

  return (
    <div className={"mklistspage__card" + (list.isDefault ? " is-viewonly" : "")}>
      <div className="mklistspage__cardImage">
        {list.isPrivate ? (
          <span className="mklistspage__private">
            <LockIcon />
            Private
          </span>
        ) : null}

        {n > 0 ? (
          <div className={"mklistspage__grid mklistspage__grid--" + n}>
            {previews.slice(0, 4).map((rarity, i) => (
              <span
                key={i}
                className="mklistspage__tile u-rar-bg"
                style={{ "--rb": `var(--rar-bg-${rarity})` }}
              />
            ))}
          </div>
        ) : (
          <div className="mklistspage__empty">
            <span className="mklistspage__emptyIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16v12H4zM4 7l2-3h12l2 3M9 11h6" />
              </svg>
            </span>
            <span>No items</span>
          </div>
        )}
      </div>

      <div className="mklistspage__cardContent">
        <div className="mklistspage__cardName u-truncate">{list.name}</div>
        <div className="mklistspage__meta">
          <span className="mklistspage__count">
            <span className="mklistspage__countIcon" aria-hidden="true">
              <TagIcon />
            </span>
            {list.itemsCount} {list.itemsCount === 1 ? "item" : "items"}
          </span>

          {!list.isDefault ? (
            <span className="mklistspage__actionsWrap">
              <button
                type="button"
                className="mklistspage__actionsBtn"
                aria-label="List actions"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <EllipsisV />
              </button>
              {menuOpen ? (
                <div className="mklistspage__menu" role="menu">
                  <button
                    type="button"
                    role="menuitem"
                    className="mklistspage__menuItem"
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit?.(list);
                    }}
                  >
                    Edit List
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="mklistspage__menuItem"
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete?.(list);
                    }}
                  >
                    Delete List
                  </button>
                </div>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const MAX_NAME = 32;
const MAX_DESC = 100;
function CreateOrEditListModal({ list, onClose }) {
  const isEdit = Boolean(list);
  const [name, setName] = useState(list?.name ?? "");
  const [description, setDescription] = useState(list?.description ?? "");
  const [isPrivate, setIsPrivate] = useState(list?.isPrivate ?? false);

  return (
    <Modal onClose={onClose} width={440} className="mklistspage__modal">
      <div className="mklistspage__modalNav">
        <h2 className="mklistspage__modalTitle">{isEdit ? "Edit List" : "Create List"}</h2>
        <button type="button" className="mklistspage__modalClose" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="mklistspage__modalContent">
        <label className="mklistspage__field">
          <span className="mklistspage__fieldLabel">List name</span>
          <input
            className="mklistspage__input"
            value={name}
            maxLength={MAX_NAME}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <span className="mklistspage__fieldInfo">List names can contain up to {MAX_NAME} characters.</span>
        </label>

        <label className="mklistspage__field">
          <span className="mklistspage__fieldLabel">List description</span>
          <textarea
            className="mklistspage__textarea"
            value={description}
            maxLength={MAX_DESC}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="mklistspage__checkboxRow">
          <Checkbox checked={isPrivate} onChange={setIsPrivate}>
            {isEdit ? "Set list as private" : "Create as private list"}
          </Checkbox>
          <span className="mklistspage__infoMark" title="When you create or set a list as private, it will be visible only to you.">i</span>
        </div>
      </div>

      <div className="mklistspage__modalActions mklistspage__modalActions--stack">
        <Button variant="primary" className="mklistspage__btnFluid" disabled={name.length === 0} onClick={onClose}>
          {isEdit ? "Save" : "Create"}
        </Button>
        <Button variant="secondary" className="mklistspage__btnFluid" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

function ConfirmDeleteListModal({ list, onClose }) {
  return (
    <Modal onClose={onClose} width={440} className="mklistspage__modal">
      <div className="mklistspage__modalNav">
        <h2 className="mklistspage__modalTitle">
          Delete <b>{list.name}</b> list
        </h2>
        <button type="button" className="mklistspage__modalClose" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="mklistspage__modalContent mklistspage__modalContent--text">
        Are you sure you want to delete this list? All the items inside will be permanently removed and cannot be undone.
      </div>

      <div className="mklistspage__modalActions">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" className="mklistspage__btnIcon" onClick={onClose}>
          <TrashIcon />
          Delete permanently
        </Button>
      </div>
    </Modal>
  );
}

function ListsLaunchModal({ onClose }) {
  return (
    <Modal onClose={onClose} width={500} className="mklistspage__modal mklistspage__launch">
      <div className="mklistspage__modalNav">
        <h2 className="mklistspage__modalTitle">Introducing Marketplace Lists</h2>
        <button type="button" className="mklistspage__modalClose" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="mklistspage__launchContent">
        <span className="mklistspage__launchLogo" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16v12H4zM4 7l2-3h12l2 3M9 11h6" />
          </svg>
        </span>
        <p className="mklistspage__launchText">
          Now you can save wearables and emotes to your <b>Personalized Lists.</b>
          <br />
          You will find them in <b>My Lists</b> section.
        </p>
      </div>

      <div className="mklistspage__modalActions mklistspage__modalActions--stack mklistspage__launchActions">
        <Button variant="primary" className="mklistspage__btnFluid" onClick={onClose}>
          Explore collectibles
        </Button>
        <Button variant="ghost" className="mklistspage__btnFluid mklistspage__btnInverted" onClick={onClose}>
          View My Lists
        </Button>
      </div>
    </Modal>
  );
}

export default function MkListsPage({ lists = LISTS, error = false }) {
  const [tab, setTab] = useState("my-assets");
  const [sort, setSort] = useState("recently_updated");
  const [sortOpen, setSortOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const count = lists.length;
  const sortLabel = SORTS.find((s) => s.id === sort)?.label ?? SORTS[0].label;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mklistspage">
        <div className="mklistspage__content">
          <h1 className="mklistspage__header">My Lists</h1>

          {!error ? (
            <>
              <div className="mklistspage__subHeader">
                <div className="mklistspage__left">
                  {count ? `${count} ${count === 1 ? "List" : "Lists"}` : null}
                </div>
                <div className="mklistspage__right">
                  <span className="mklistspage__sortBy">Sort by</span>
                  <div className="mklistspage__dropdown">
                    <button
                      type="button"
                      className="mklistspage__dropdownBtn"
                      aria-haspopup="listbox"
                      aria-expanded={sortOpen}
                      onClick={() => setSortOpen((v) => !v)}
                    >
                      {sortLabel}
                      <Caret size={11} />
                    </button>
                    {sortOpen ? (
                      <ul className="mklistspage__dropdownMenu" role="listbox">
                        {SORTS.map((s) => (
                          <li key={s.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={s.id === sort}
                              className={"mklistspage__dropdownItem" + (s.id === sort ? " is-active" : "")}
                              onClick={() => {
                                setSort(s.id);
                                setSortOpen(false);
                              }}
                            >
                              {s.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mklistspage__createList"
                    onClick={() => setModal({ kind: "create" })}
                  >
                    <span className="mklistspage__createIcon">
                      <PlusIcon />
                    </span>
                    Create list
                  </Button>
                </div>
              </div>

              {count ? (
                <div className="mklistspage__cardsGroup">
                  {lists.map((list, index) => (
                    <ListCard
                      key={`${list.id}-${index}`}
                      list={list}
                      onEdit={(l) => setModal({ kind: "edit", list: l })}
                      onDelete={(l) => setModal({ kind: "delete", list: l })}
                    />
                  ))}
                </div>
              ) : (
                <div className="mklistspage__emptyState">
                  <span className="mklistspage__emptyStateIcon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7h16v12H4zM4 7l2-3h12l2 3M9 11h6" />
                    </svg>
                  </span>
                  <p className="mklistspage__emptyStateTitle">You don't have any lists yet</p>
                  <p className="mklistspage__emptyStateSub">Create a list to start saving your favourite wearables and emotes.</p>
                  <Button variant="primary" onClick={() => setModal({ kind: "create" })}>
                    <span className="mklistspage__createIcon">
                      <PlusIcon />
                    </span>
                    Create list
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="mklistspage__errorContainer">
              <div className="mklistspage__errorImage" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v5M12 16.5v.01" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h1 className="mklistspage__errorTitle">Oops! Lists couldn't load.</h1>
              <p className="mklistspage__errorSub">Please try again.</p>
              <div className="mklistspage__errorActions">
                <Button variant="primary">Try again</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {modal?.kind === "create" ? <CreateOrEditListModal onClose={() => setModal(null)} /> : null}
      {modal?.kind === "edit" ? <CreateOrEditListModal list={modal.list} onClose={() => setModal(null)} /> : null}
      {modal?.kind === "delete" ? <ConfirmDeleteListModal list={modal.list} onClose={() => setModal(null)} /> : null}
      {modal?.kind === "launch" ? <ListsLaunchModal onClose={() => setModal(null)} /> : null}
    </MarketplaceChrome>
  );
}
