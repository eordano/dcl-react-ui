import "./upcomingeventcard.css";

export default function UpcomingEventCard({ event }) {
  const { title, when, hue = 280, glyph, started, badge, live, image } = event;
  const label = badge ?? (typeof live === "string" ? live : live ? "LIVE" : null);
  return (
    <article className="uec" style={{ "--hue": hue }}>
      <div
        className="uec__thumb"
        style={image ? { "--thumb-img": `url("${image}")` } : undefined}
      >
        {glyph ? <span className="uec__glyph" aria-hidden="true">{glyph}</span> : null}
        {label ? <span className="uec__live">{label}</span> : null}
        {started ? <span className="uec__started u-truncate">{started}</span> : null}
      </div>
      <div className="uec__body">
        {when ? <div className="uec__when">{when}</div> : null}
        <div className="uec__title">{title}</div>
      </div>
    </article>
  );
}
