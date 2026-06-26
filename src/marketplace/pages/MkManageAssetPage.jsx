import { useState } from "react";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkmanageassetpage.css";

const COPY = {
  open_in_builder: "Open in builder",
  transfer: "Transfer",
  details_title: "Item details",
  network: "Network",
  owner: "Owner",
  expires_at: "Expires at",
  rental_expiration: "Rental expiration",
  highlights_title: "Highlights",
  plaza: "Plaza",
  road: "Road",
  district: "District",
  sell: {
    sell_title: "Sell",
    selling_title: "Selling",
    list_for_sale: "List for sale",
    price: "Price",
    expiration_date: "Expiration date",
  },
  rent: {
    rent_title: "Rent",
    renting_title: "Renting",
    price: "Price",
    expiration_date: "Listing expiration date",
    rent_periods: "Rent periods",
    list_for_rent: "List for rent",
    list_for_rent_again: "List for rent again",
    view_listing: "View listing",
    start_date: "Rent start date",
    end_date: "Rent end date",
    rented_until: "Rented until {date} by",
    claim: "Claim Estate",
    unclaimed_message:
      "You have an active listing, but the Estate is still unclaimed. Claim it back to sell or transfer it.",
    day: "day",
  },
  estate_upgrade_owner:
    "This listing is no longer available. You need to recreate it.",
};

function Mana({ children, size = 16 }) {
  return (
    <span className="mma__mana" title="MANA">
      <span className="mma__manamark">
        <ManaMark size={size === 16 ? 14 : size} />
      </span>
      {children}
    </span>
  );
}

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const HighlightIcon = ({ type }) => {
  if (type === "plaza")
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M5 8l7-4 7 4M5 8v8l7 4 7-4V8" />
      </svg>
    );
  if (type === "road")
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22 9 2M18 22 15 2M12 5v3M12 12v3M12 19v1" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  );
};

function BackArrow() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4l-6 6 6 6" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

const DEFAULT_ASSET = {
  name: "Genesis Plaza Parcel",
  category: "parcel",
  coords: "12,-9",
  network: "Ethereum",
  owner: "0x9f3c…7a21",
  description:
    "A premium parcel bordering Genesis Plaza, steps from the central hub and a major road. Flat terrain, ready to build.",
  proximities: [
    { type: "plaza", text: "1 away" },
    { type: "road", text: "Adjacent" },
    { type: "district", text: "3 away" },
  ],
};

function SellCard({ asset, order, locked, onEdit, onList }) {
  return (
    <section className="mma__sellbox">
      <div className="mma__cardHeader">
        <h2 className="mma__cardTitle">
          {order ? COPY.sell.selling_title : COPY.sell.sell_title}
        </h2>
        <div>
          {order ? (
            <button
              type="button"
              className="mma__iconButton"
              aria-label="Edit listing"
              disabled={locked}
              onClick={onEdit}
            >
              <PencilIcon />
            </button>
          ) : (
            <button
              type="button"
              className="mma__roundedButton"
              disabled={locked}
              onClick={onList}
            >
              {COPY.sell.list_for_sale}
            </button>
          )}
        </div>
      </div>
      {order ? (
        <div className={"mma__cardContent" + (locked ? " mma__isLandLocked" : "")} style={{ flexDirection: "row" }}>
          <div className="mma__column">
            <div className="mma__columnHeader">{COPY.sell.price}</div>
            <div className="mma__columnContent">
              <Mana>{order.price}</Mana>
            </div>
          </div>
          <div className="mma__column">
            <div className="mma__columnHeader">{COPY.sell.expiration_date}</div>
            <div className="mma__columnContent">{order.expiresAt}</div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function RentCard({ asset, rental, onEdit, onCreate, onClaim }) {
  const status = rental ? rental.status : null;
  const titleText =
    rental && status !== "claimable"
      ? COPY.rent.renting_title
      : COPY.rent.rent_title;

  return (
    <section className="mma__rentbox">
      <div className="mma__cardHeader">
        <div className="mma__cardLeft">
          <h2 className="mma__cardTitle">{titleText}</h2>
          {status === "open" ? (
            <button type="button" className="mma__flatButton" onClick={() => {}}>
              {COPY.rent.view_listing}
            </button>
          ) : null}
        </div>
        <div>
          {!rental || status === "claimable" ? (
            <button type="button" className="mma__roundedButton" onClick={onCreate}>
              {COPY.rent.list_for_rent}
            </button>
          ) : status === "open" ? (
            <button
              type="button"
              className="mma__iconButton"
              aria-label="Edit rental"
              onClick={onEdit}
            >
              <PencilIcon />
            </button>
          ) : null}
        </div>
      </div>

      {rental ? (
        <div className="mma__cardContent">
          {status === "executed" ? (
            <div className="mma__activeRent">
              <div className="mma__rentMessage">
                {COPY.rent.rented_until.replace("{date}", rental.endDate)}
                <span className="mma__rentedBy">
                  <span className="u-avatar" style={{ "--sz": "20px", "--hue": 196 }} />
                  {rental.tenant}
                </span>
              </div>
            </div>
          ) : null}

          {status === "claimable" ? (
            <div className="mma__activeRent">
              <div className="mma__rentMessage">{COPY.rent.unclaimed_message}</div>
              <div className="mma__activeRentActions">
                <button type="button" className="mma__flatButton" onClick={onClaim}>
                  {COPY.rent.claim}
                </button>
                <button type="button" className="mma__flatButton" onClick={onCreate}>
                  {COPY.rent.list_for_rent_again}
                </button>
              </div>
            </div>
          ) : null}

          {status === "open" || status === "executed" ? (
            <div className="mma__summary">
              <div className="mma__column mma__notShrink">
                <div className="mma__columnHeader">{COPY.rent.price}</div>
                <div className="mma__columnContent">
                  <Mana>{rental.price}</Mana>
                  <span>/{COPY.rent.day}</span>
                </div>
              </div>

              {status === "open" ? (
                <>
                  <div className="mma__column mma__notShrink">
                    <div className="mma__columnHeader">{COPY.rent.expiration_date}</div>
                    <div className="mma__columnContent">{rental.expiration}</div>
                  </div>
                  <div className="mma__column">
                    <div className="mma__columnHeader">{COPY.rent.rent_periods}</div>
                    <div className="mma__columnContent">{rental.periods}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mma__column mma__shrinkAndExpand">
                    <div className="mma__columnHeader">{COPY.rent.start_date}</div>
                    <div className="mma__columnContent">{rental.startRel}</div>
                    <div className="mma__columnContent mma__date">({rental.startDate})</div>
                  </div>
                  <div className="mma__column mma__shrinkAndExpand">
                    <div className="mma__columnHeader">{COPY.rent.end_date}</div>
                    <div className="mma__columnContent">{rental.endRel}</div>
                    <div className="mma__columnContent mma__date">({rental.endDate})</div>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default function MkManageAssetPage({
  asset = DEFAULT_ASSET,
  order = { price: "1,800", expiresAt: "Jul 20, 2026" },
  rental = {
    status: "open",
    price: "25",
    expiration: "Jul 20, 2026",
    periods: "7 / 30 / 90",
  },
  showUpgradeWarning = false,
  locked = false,
}) {
  const [tab, setTab] = useState("my-assets");

  return (
    <MarketplaceChrome active={tab} onTab={setTab}>
      <div className="mma">
        <div className="mma__main">
          <button type="button" className="mma__back">
            <BackArrow />
            Back
          </button>

          <div className="mma__mainRow">
            <div className="mma__leftMenu">
              <div className="mma__map">
                {asset.image ? (
                  <img
                    src={asset.image}
                    alt={asset.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit", display: "block" }}
                  />
                ) : (
                  <>
                    <div className="mma__mapGrid" />
                    <span className="mma__mapBadge">{asset.coords}</span>
                    <div className="mma__mapPlot" />
                  </>
                )}
              </div>

              <Button variant="primary" className="mma__builderButton" disabled={locked}>
                {COPY.open_in_builder}
              </Button>

              {asset.proximities && asset.proximities.length ? (
                <div className="mma__box mma__highlights">
                  <div className="mma__boxHeader">{COPY.highlights_title}</div>
                  <div className="mma__boxChildren">
                    {asset.proximities.map((p) => (
                      <div key={p.type} className="mma__highlight">
                        <span className="mma__highlightIcon">
                          <HighlightIcon type={p.type} />
                        </span>
                        <span className="mma__highlightTitle">{COPY[p.type]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mma__box mma__details">
                <div className="mma__boxHeader">{COPY.details_title}</div>
                <div className="mma__boxChildren">
                  <div className="mma__detailsContent">
                    <div className="mma__info">
                      <span className="mma__infoTitle">Type</span>
                      <span className="mma__infoContent">{asset.category}</span>
                    </div>
                    <div className="mma__info">
                      <span className="mma__infoTitle">{COPY.network}</span>
                      <span className="mma__infoContent">{asset.network}</span>
                    </div>
                    <div className="mma__info">
                      <span className="mma__infoTitle">{COPY.owner}</span>
                      <span className="mma__infoLink">
                        <span className="u-avatar mma__infoAvatar" style={{ "--sz": "18px", "--hue": 268 }} />
                        {asset.owner}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mma__content">
              {showUpgradeWarning ? (
                <div className="mma__warning" role="alert">
                  <span className="mma__warningIcon">
                    <WarnIcon />
                  </span>
                  <span>{COPY.estate_upgrade_owner}</span>
                </div>
              ) : null}

              <section className="mma__assetDescription">
                <div className="mma__assetDescriptionHeader">
                  <h1 className="mma__assetDescriptionTitle">{asset.name}</h1>
                  <button type="button" className="mma__transfer" disabled={locked}>
                    {COPY.transfer}
                  </button>
                </div>
                <p className="mma__assetDescriptionContent">{asset.description}</p>
              </section>

              <SellCard
                asset={asset}
                order={order}
                locked={locked}
                onEdit={() => {}}
                onList={() => {}}
              />
              <RentCard
                asset={asset}
                rental={rental}
                onEdit={() => {}}
                onCreate={() => {}}
                onClaim={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </MarketplaceChrome>
  );
}
