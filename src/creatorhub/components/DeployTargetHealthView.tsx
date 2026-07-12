import "./deploytargethealthview.css";

type SnapshotView = {
  hash: string;
  shortHash: string;
  numberOfEntities: number;
  rangeLabel: string;
};

type DeployTargetHealthViewProps = {
  snapshots?: SnapshotView[];
  error?: boolean;
};

export default function DeployTargetHealthView({
  snapshots = [],
  error = false,
}: DeployTargetHealthViewProps) {
  const online = !error && snapshots.length > 0;
  return (
    <aside className="deploy-target-health" aria-label="Content network status">
      <header className="deploy-target-health__head">
        <strong className="deploy-target-health__title">Content network</strong>
        <span
          className={
            "deploy-target-health__status" +
            (error
              ? " deploy-target-health__status--down"
              : online
                ? " deploy-target-health__status--ok"
                : "")
          }
        >
          {error ? "Unavailable" : online ? "Online" : "Status unknown"}
        </span>
      </header>

      {error ? (
        <p role="alert" className="deploy-target-health__body">
          We couldn&rsquo;t reach the network that hosts published scenes. You can
          still try to publish, but it may fail &mdash; try again in a few minutes.
        </p>
      ) : online ? (
        <p className="deploy-target-health__body">
          The network that hosts published scenes is up and ready to receive your
          World.
        </p>
      ) : (
        <p className="deploy-target-health__body">
          We couldn&rsquo;t confirm the network status. You can still publish your
          World as usual.
        </p>
      )}
    </aside>
  );
}
