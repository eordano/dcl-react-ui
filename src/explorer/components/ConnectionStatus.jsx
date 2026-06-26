import "./connectionstatus.css";

const ROWS = [
  { title: "Scene", subtitle: "Scene running with or without errors", status: "ok", label: "Healthy" },
  { title: "Scene Room", subtitle: "Room connection to LiveKit", status: "info", label: "Connected" },
  { title: "Global Room", subtitle: "Global connection to LiveKit", status: "ok", label: "Connected" },
  { title: "Asset Bundle Scene Status", subtitle: "Asset Bundles Status", status: "ok", label: "Loading" },
];

export default function ConnectionStatus() {
  return (
    <div className="cs__stage">
      <div className="cs" role="dialog" aria-label="Connection status">
        <div className="cs__header">
          <span className="cs__title">CONNECTION STATUS</span>
          <button className="cs__close" aria-label="Close">×</button>
        </div>
        {ROWS.map((r, i) => (
          <div className="cs__row" key={i}>
            <div className="cs__info">
              <div className="cs__rowtitle">{r.title}</div>
              <div className="cs__subtitle">{r.subtitle}</div>
            </div>
            <span className={"cs__pill cs__pill--" + r.status}>
              <span className="cs__dot" /> {r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
