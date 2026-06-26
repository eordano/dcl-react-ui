import "./pricefield.css";

export function ManaMark({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M12 2 3 12l9 10 9-10L12 2Z" fill="currentColor" />
    </svg>
  );
}

export default function PriceField({
  value,
  onChange,
  placeholder = "1000",
  error = false,
  trailing,
  manaSize = 16,
  id,
  autoFocus = false,
  disabled = false,
  inputMode = "decimal",
  className = "",
  ...rest
}) {
  return (
    <div className={"pricefield" + (error ? " is-error" : "") + (className ? " " + className : "")}>
      <span className="pricefield__mana"><ManaMark size={manaSize} /></span>
      <input
        id={id}
        className="pricefield__input"
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {trailing != null ? <span className="pricefield__trailing">{trailing}</span> : null}
    </div>
  );
}
