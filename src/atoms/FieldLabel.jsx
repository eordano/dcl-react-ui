import "./fieldlabel.css";

export default function FieldLabel({
  children,
  htmlFor,
  sublabel,
  notice,
  className = "",
  ...rest
}) {
  const label = (
    <label
      htmlFor={htmlFor}
      className={"fieldlabel" + (className ? " " + className : "")}
      {...rest}
    >
      {children}
      {notice != null && <sup className="fieldlabel__notice">{notice}</sup>}
    </label>
  );

  if (sublabel == null) return label;
  return (
    <span className="fieldlabel__group">
      {label}
      <span className="fieldlabel__sub">{sublabel}</span>
    </span>
  );
}
