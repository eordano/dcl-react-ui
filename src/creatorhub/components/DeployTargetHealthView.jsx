import "./deploytargethealthview.css";

export default function DeployTargetHealthView({
  snapshots =([]),
  error = false,
}) {
  return (
    <aside className="deploy-target-health" aria-label="Deployment target">
      <header className="deploy-target-health__head">
        <strong className="deploy-target-health__title">Deployment target</strong>
        <span className="deploy-target-health__meta">content network</span>
      </header>

      {error ? (
        <p role="alert" className="deploy-target-health__error">
          Could not reach the content network. Snapshot health is unavailable right now.
        </p>
      ) : snapshots.length === 0 ? (
        <p className="deploy-target-health__empty">
          No content snapshots available right now.
        </p>
      ) : (
        <ul className="deploy-target-health__list">
          {snapshots.map((s) => (
            <li key={s.hash} className="deploy-target-health__item">
              <code title={s.hash} className="deploy-target-health__hash">
                {s.shortHash}
              </code>
              <span className="deploy-target-health__detail">
                {s.numberOfEntities.toLocaleString()} entities · {s.rangeLabel}
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
