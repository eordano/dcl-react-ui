import ManaMark from "../../atoms/ManaMark.jsx";
import "./nftcard.css";

const RARITY_LABELS = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
  mythic: "Mythic",
  unique: "Unique",
  exotic: "Exotic",
};

export default function NftCard({
  name = "Untitled",
  collection,
  price,
  rarity = "common",
  network = "polygon",
  image,
  figure,
  tag,
  metaRight,
  onClick,
}) {
  const net = network === "ethereum" ? "ethereum" : "polygon";
  return (
    <button
      type="button"
      className="nc"
      onClick={onClick}
      style={{ "--rar": `var(--rar-${rarity})` }}
    >
      <span className="nc__art nc__art--solid">
        {figure ? (
          figure
        ) : image ? (
          <img className="nc__img" src={image} alt="" />
        ) : (
          <span className="nc__placeholder" aria-hidden="true" />
        )}
        {tag ? <span className="nc__tag">{tag}</span> : null}
      </span>

      <span className="nc__body">
        <span className="nc__row">
          <span className="nc__name u-truncate">{name}</span>
          {price != null ? (
            <span className="nc__price">
              <ManaMark size={13} className={"nc__manamark nc__manamark--" + net} network={net} />
              {price}
            </span>
          ) : (
            <span className="nc__notforsale">Not for sale</span>
          )}
        </span>
        <span className="nc__meta">
          {collection ? (
            <span className="nc__collection u-truncate">{collection}</span>
          ) : (
            <span className="nc__network">
              {net === "ethereum" ? "Ethereum" : "Polygon"}
            </span>
          )}
          {metaRight != null ? (
            <span className="nc__count">{metaRight}</span>
          ) : (
            <span className="nc__rarity">{RARITY_LABELS[rarity] || "Common"}</span>
          )}
        </span>
      </span>
    </button>
  );
}
