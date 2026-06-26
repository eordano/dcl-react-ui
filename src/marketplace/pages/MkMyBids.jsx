import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkmybids.css";

const RAIL = [
  {
    head: "ASSETS",
    items: [
      { id: "wearables", label: "Wearables" },
      { id: "emotes", label: "Emotes" },
      { id: "names", label: "Names" },
      { id: "land", label: "Land" },
      { id: "collections", label: "Collections" },
    ],
  },
  {
    head: "STORE",
    items: [
      { id: "on_sale", label: "On Sale" },
      { id: "on_rent", label: "On Rent" },
      { id: "sales", label: "Sales" },
      { id: "bids", label: "Bids" },
      { id: "store_settings", label: "Settings" },
    ],
  },
];

const SELLER_BIDS = [
  {
    id: "s1",
    name: "Cyber Ronin Jacket",
    bidder: "NeonNomad",
    hue: 268,
    tile: "var(--rar-legendary)",
    created: "2 days ago",
    price: "1,250",
    timeLeft: "6 days",
  },
  {
    id: "s2",
    name: "Aurora Wings",
    bidder: "0x9f3c…7a21",
    hue: 200,
    tile: "var(--rar-mythic)",
    created: "5 hours ago",
    price: "980",
    timeLeft: "2 days",
  },
];

const ARCHIVED_BIDS = [
  {
    id: "a1",
    name: "Pixel Shades",
    bidder: "RetroByte",
    hue: 120,
    tile: "var(--rar-rare)",
    created: "3 weeks ago",
    price: "120",
    timeLeft: "expired",
  },
];

const BIDDER_BIDS = [
  {
    id: "b1",
    name: "Golden Crown",
    bidder: "You",
    hue: 40,
    tile: "var(--rar-unique)",
    created: "1 day ago",
    price: "3,400",
    timeLeft: "12 days",
    warning: null,
  },
  {
    id: "b2",
    name: "Plasma Boots",
    bidder: "You",
    hue: 290,
    tile: "var(--rar-epic)",
    created: "4 days ago",
    price: "640",
    timeLeft: "3 days",
    warning: "You don't have enough MANA to pay for this bid",
  },
];

function Stat({ label, children }) {
  return (
    <div className="mkmybids__stat">
      <span className="mkmybids__statlabel">{label}</span>
      <div className="mkmybids__statvalue">{children}</div>
    </div>
  );
}

function BidRow({ bid, role, archived }) {
  return (
    <div className="mkmybids__bid">
      <div className="mkmybids__bidrow">
        <div className="mkmybids__image">
          <span
            className="mkmybids__thumb"
            style={{ "--tile": bid.tile }}
            role="img"
            aria-label={bid.name}
          />
        </div>
        <div className="mkmybids__wrapper">
          <Stat label="From">
            <span className="mkmybids__profile">
              <span
                className="u-avatar"
                style={{ "--sz": "26px", "--hue": bid.hue }}
              />
              <span className="name">{bid.bidder}</span>
            </span>
          </Stat>
          <Stat label="Created">{bid.created}</Stat>
          <Stat label="Price">
            <span className="mkmybids__mana">
              <span className="mkmybids__manamark">
                <ManaMark size={13} />
              </span>
              {bid.price}
            </span>
          </Stat>
          <Stat label="Time Left">{bid.timeLeft}</Stat>

          <div className="mkmybids__actions">
            {role === "bidder" ? (
              <>
                <button type="button" className="mkmybids__btn mkmybids__btn--primary">
                  Update
                </button>
                <button type="button" className="mkmybids__btn">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button type="button" className="mkmybids__btn mkmybids__btn--primary">
                  Accept
                </button>
                <button type="button" className="mkmybids__btn">
                  {archived ? "Unarchive" : "Archive"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {bid.warning ? <div className="mkmybids__warning">{bid.warning}</div> : null}
    </div>
  );
}

function BidsList({ bids, role, archived, isLoading, emptyText }) {
  return (
    <div className="mkmybids__list">
      {bids.length === 0 && isLoading ? (
        <div className="mkmybids__center">
          <Spinner />
        </div>
      ) : null}
      {bids.length === 0 && !isLoading ? (
        <div className="mkmybids__center">
          <div className="mkmybids__empty">{emptyText}</div>
        </div>
      ) : null}
      {bids.map((bid) => (
        <BidRow key={bid.id} bid={bid} role={role} archived={archived} />
      ))}
    </div>
  );
}

export default function MkMyBids({
  isConnecting = false,
  isLoading = false,
  sellerBids = SELLER_BIDS,
  archivedBids = ARCHIVED_BIDS,
  bidderBids = BIDDER_BIDS,
}) {
  const [tab, setTab] = useState("my-assets");
  const [showArchived, setShowArchived] = useState(false);

  const receivedList = showArchived ? archivedBids : sellerBids;
  const toggleAmount = showArchived ? sellerBids.length : archivedBids.length;
  const showToggle = showArchived || archivedBids.length > 0;

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mkmybids">
        {isConnecting ? (
          <div className="mkmybids__loaderfull">
            <Spinner size={64} />
          </div>
        ) : (
          <>
            <aside className="mkmybids__rail" aria-label="Account sections">
              {RAIL.map((group) => (
                <ul className="mkmybids__menu" key={group.head}>
                  <li className="mkmybids__menuhead">{group.head}</li>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={
                          "mkmybids__item" + (item.id === "bids" ? " is-active" : "")
                        }
                        aria-current={item.id === "bids" ? "page" : undefined}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ))}
            </aside>

            <main className="mkmybids__main">
              <div className="mkmybids__headermenu">
                <h3 className="mkmybids__subheader">
                  {showArchived ? "Bids archived" : "Bids received"}
                </h3>
                {showToggle ? (
                  <button
                    type="button"
                    className="mkmybids__basicbtn"
                    onClick={() => setShowArchived((v) => !v)}
                  >
                    {showArchived
                      ? `Show Received (${toggleAmount})`
                      : `Show Archived (${toggleAmount})`}
                  </button>
                ) : null}
              </div>
              <BidsList
                bids={receivedList}
                role="seller"
                archived={showArchived}
                isLoading={isLoading}
                emptyText={
                  showArchived
                    ? "You don't have any archived bids..."
                    : "You haven't received any bids yet..."
                }
              />

              <div className="mkmybids__headermenu">
                <h3 className="mkmybids__subheader">Bids placed</h3>
              </div>
              <BidsList
                bids={bidderBids}
                role="bidder"
                isLoading={isLoading}
                emptyText="You haven't placed any bids yet..."
              />
            </main>
          </>
        )}
      </div>
    </MarketplaceChrome>
  );
}
