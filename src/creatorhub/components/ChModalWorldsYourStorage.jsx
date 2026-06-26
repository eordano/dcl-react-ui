import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chmodalworldsyourstorage.css";

const COPY = {
  yourStorage: "Your Storage",
  totalAvailableStorage: "TOTAL AVAILABLE STORAGE",
  mana: "MANA",
  manaEarnStorage:
    "Earn 100 Mb of storage per 2,000 tokens (Polygon or Ethereum).",
  manaHoldings: (mbs, owned) =>
    `You have ${mbs} Mb thanks to holding ${owned} MANA tokens.`,
  manaBuy: "BUY MANA",
  lands: "LANDs",
  landsEarnStorage: "Earn 100 Mb of storage per LAND.",
  landsHoldings: (mbs, owned) =>
    `You have ${mbs} Mb thanks to holding ${owned} LANDs.`,
  landsBuy: "BUY LAND",
  names: "NAMEs",
  namesEarnStorage: "Earn 100 Mb of storage per NAME.",
  namesHoldings: (mbs, owned) =>
    `You have ${mbs} Mb thanks to holding ${owned} Decentraland NAMEs.`,
  namesBuy: "BUY NAME",
  proposal:
    "These storage rules were voted on and passed in a governance DAO proposal.",
  learnMore: "LEARN MORE",
};

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

function formatSize(size) {
  if (size < KB) return `${size.toFixed(2)} B`;
  if (size < MB) return `${(size / KB).toFixed(2)} KB`;
  if (size < GB) return `${(size / MB).toFixed(2)} MB`;
  return `${(size / GB).toFixed(2)} GB`;
}

function getMbsFromAccountHoldings(h) {
  return {
    manaMbs: Math.trunc(h.ownedMana / 2000) * 100,
    landMbs: h.ownedLands * 100,
    nameMbs: h.ownedNames * 100,
  };
}

const SAMPLE_STATS = {
  usedSpace: String(Math.round(47.52 * MB)),
  maxAllowedSpace: String(300 * MB),
};

const SAMPLE_HOLDINGS = {
  ownedLands: 1,
  ownedNames: 1,
  ownedMana: 4321,
  ownedLandMbs: 0,
};

function OpenInNewIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7ZM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7Z"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="chmodalworldsyourstorage__check-icon"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="chmodalworldsyourstorage__info-icon"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
      />
    </svg>
  );
}

function LinkButton({ label, onClick }) {
  return (
    <button
      type="button"
      className="chmodalworldsyourstorage__btn"
      onClick={onClick}
    >
      {label}
      <OpenInNewIcon />
    </button>
  );
}

function AssetRow({ name, subtitle, holdingsLine, buyLabel, onBuy }) {
  return (
    <div className="chmodalworldsyourstorage__asset">
      <div className="chmodalworldsyourstorage__texts">
        <span className="chmodalworldsyourstorage__name">{name}</span>
        <span className="chmodalworldsyourstorage__subtitle">{subtitle}</span>
        {holdingsLine ? (
          <span className="chmodalworldsyourstorage__amount">
            <CheckCircleIcon />
            {holdingsLine}
          </span>
        ) : null}
      </div>
      <LinkButton label={buyLabel} onClick={onBuy} />
    </div>
  );
}

export default function ChModalWorldsYourStorage({
  open = true,
  stats = SAMPLE_STATS,
  accountHoldings = SAMPLE_HOLDINGS,
  onClose = () => {},
  onBuyMana = () => {},
  onBuyLand = () => {},
  onBuyName = () => {},
  onLearnMore = () => {},
}) {
  if (!open) {
    return <CreatorHubChrome active="manage" />;
  }

  const totalAvailable = formatSize(
    Number(stats.maxAllowedSpace) - Number(stats.usedSpace),
  );
  const mbs = accountHoldings ? getMbsFromAccountHoldings(accountHoldings) : null;

  return (
    <CreatorHubChrome active="manage">
      <div className="chmodalworldsyourstorage__backdrop" onClick={onClose}>
        <div
          className="chmodalworldsyourstorage__paper"
          role="dialog"
          aria-modal="true"
          aria-label={COPY.yourStorage}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="chmodalworldsyourstorage__titlebox">
            <h5 className="chmodalworldsyourstorage__title">
              {COPY.yourStorage}
            </h5>
            <button
              type="button"
              className="chmodalworldsyourstorage__close"
              aria-label="close"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59Z"
                />
              </svg>
            </button>
          </div>

          <div className="chmodalworldsyourstorage__content">
            <div className="chmodalworldsyourstorage__total-storage">
              <span>{COPY.totalAvailableStorage}</span>
              <span className="chmodalworldsyourstorage__mbs">
                {totalAvailable}
              </span>
            </div>

            <AssetRow
              name={COPY.mana}
              subtitle={COPY.manaEarnStorage}
              holdingsLine={
                accountHoldings && mbs && mbs.manaMbs > 0
                  ? COPY.manaHoldings(
                      mbs.manaMbs,
                      Math.trunc(accountHoldings.ownedMana),
                    )
                  : null
              }
              buyLabel={COPY.manaBuy}
              onBuy={onBuyMana}
            />
            <hr className="chmodalworldsyourstorage__separator" />
            <AssetRow
              name={COPY.lands}
              subtitle={COPY.landsEarnStorage}
              holdingsLine={
                accountHoldings && mbs && mbs.landMbs > 0
                  ? COPY.landsHoldings(mbs.landMbs, accountHoldings.ownedLands)
                  : null
              }
              buyLabel={COPY.landsBuy}
              onBuy={onBuyLand}
            />
            <hr className="chmodalworldsyourstorage__separator" />
            <AssetRow
              name={COPY.names}
              subtitle={COPY.namesEarnStorage}
              holdingsLine={
                accountHoldings && mbs && mbs.nameMbs > 0
                  ? COPY.namesHoldings(mbs.nameMbs, accountHoldings.ownedNames)
                  : null
              }
              buyLabel={COPY.namesBuy}
              onBuy={onBuyName}
            />

            <p className="chmodalworldsyourstorage__proposal">
              <InfoIcon />
              <span>{COPY.proposal}</span>{" "}
              <button
                type="button"
                className="chmodalworldsyourstorage__learn-more"
                onClick={onLearnMore}
              >
                {COPY.learnMore}
              </button>
            </p>
          </div>
        </div>
      </div>
    </CreatorHubChrome>
  );
}
