import "./button.css";

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={
        "btn btn--" + variant + " btn--" + size + (className ? " " + className : "")
      }
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
