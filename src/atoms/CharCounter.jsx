import "./charcounter.css";

export default function CharCounter({
  current = 0,
  max,
  format = "slash",
  over = true,
  className = "",
  ...rest
}) {
  let text;
  if (format === "spaced") text = `${current} / ${max}`;
  else if (format === "words") text = `(${current} out of ${max} characters)`;
  else text = `${current}/${max}`;

  const isOver = over && max != null && current > max;
  return (
    <div
      className={"charcounter" + (isOver ? " is-over" : "") + (className ? " " + className : "")}
      {...rest}
    >
      {text}
    </div>
  );
}
