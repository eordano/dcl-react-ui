import "./assetpreviewtile.css";

const AssetGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 3l3 2 3-2 4 3-2 3-2-1v11H9V8L7 9 5 6z" />
  </svg>
);

export default function AssetPreviewTile({
  rarity = "rare",
  label,
  chipPosition = "top",
  figure = "glyph",
  size = 240,
  radius = 16,
  image,
  alt = "",
  children,
  className = "",
  style,
  ...rest
}) {
  const chipText = label === undefined ? rarity : label;
  const hasChip = chipText !== null && chipText !== false && chipText !== "";

  let figureNode = children;
  if (figureNode === undefined) {
    if (figure === "glyph") {
      figureNode = (
        <div className="assetpreviewtile__fig">
          <AssetGlyph />
        </div>
      );
    } else if (figure === "plate") {
      figureNode = <div className="assetpreviewtile__plate" aria-hidden="true" />;
    } else if (figure === "inset") {
      figureNode = <span className="assetpreviewtile__inset" aria-hidden="true" />;
    }
  } else {
    figureNode = <div className="assetpreviewtile__fig">{figureNode}</div>;
  }

  const sizeVars = {};
  if (size !== 240) sizeVars["--apt-size"] = size + "px";
  if (radius !== 16) sizeVars["--apt-radius"] = radius + "px";

  return (
    <div
      className={"assetpreviewtile" + (className ? " " + className : "")}
      style={{
        "--rb": `var(--rar-bg-${rarity})`,
        "--chip": `var(--rar-${rarity})`,
        ...sizeVars,
        ...style,
      }}
      {...rest}
    >
      <div className="assetpreviewtile__wash u-rar-bg" />
      {image ? (
        <img className="assetpreviewtile__img" src={image} alt={alt} />
      ) : (
        figureNode
      )}
      {hasChip ? (
        <span className={"assetpreviewtile__rarity assetpreviewtile__rarity--" + chipPosition}>
          {chipText}
        </span>
      ) : null}
    </div>
  );
}
