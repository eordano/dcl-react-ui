import "./ninepatch.css";

export default function NinePatch({
  src,
  slice,
  border,
  as: Tag = "div",
  tint,
  className = "",
  style,
  children,
  ...rest
}) {
  const sliceStr = typeof slice === "number" ? String(slice) : slice;
  const borderVal = border ?? slice;
  const borderStr = typeof borderVal === "number" ? `${borderVal}px` : borderVal;

  const css = {
    "--np-src": `url(${src})`,
    "--np-slice": sliceStr,
    "--np-border": borderStr,
    ...(tint ? { background: tint } : null),
    ...style,
  };

  return (
    <Tag className={`ninepatch ${className}`.trim()} style={css} {...rest}>
      {children}
    </Tag>
  );
}
