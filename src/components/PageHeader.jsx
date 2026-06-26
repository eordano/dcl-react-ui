import "./pageheader.css";

export default function PageHeader({
  title,
  subtitle,
  actions,
  leading,
  size = "default",
  as,
  className = "",
}) {
  const Title = as || (size === "section" ? "h2" : "h1");
  return (
    <div className={"pageheader pageheader--" + size + (className ? " " + className : "")}>
      <div className="pageheader__main">
        {leading ? <div className="pageheader__leading">{leading}</div> : null}
        <div className="pageheader__titles">
          <Title className="pageheader__title">{title}</Title>
          {subtitle ? <p className="pageheader__subtitle">{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className="pageheader__actions">{actions}</div> : null}
    </div>
  );
}
