import BdSceneEditor from "./BdSceneEditor.jsx";
import "./bdsceneeditorview.css";

export default function BdSceneEditorView({
  value,
  step,
  sceneTitle,
  layoutRows,
  layoutCols,
  parcels,
  items =([]),
  assetPacks =([]),
  openPackId =(null),
  drawerAssets =([]),
  metricKeys =([]),
  verdict =({ metrics: {}, limits: {}, withinLimit: true, exceeded: [] }),
  transformed = false,
  result =(null),
  error =(null),
  onSelectPack =(() => {}),
  onOpenEditor = () => {},
  onAddItem =(() => {}),
  onTransform = () => {},
  onBack = () => {},
  onCheckMetrics = () => {},
  onSave = () => {},
  onRetry = () => {},
}) {
  return (
    <main className="scene-editor-route">
      <p className="scene-editor-route__sim" role="note">
        Asset packs + parcel limits are from the captured builder fixture (derived
        from decentraland/builder-server AssetPack/Asset/Metrics schemas). Item
        placement and the scene save are <strong>simulated</strong> (the SDK6
        drag-and-drop placement and the manifest persist are client-only / the
        builder-server persist endpoint is auth-gated). Parcel-metrics math is real.
      </p>

      <div className="sew" data-step={step}>
        {(value === "open" || value === "assets" || value === "transform") && (
          <div className="sew__editor">
            <BdSceneEditor
              projectTitle={sceneTitle}
              selectedPack={value === "open" ? null : openPackId}
              isSidebarOpen={value !== "open"}
            />

            <div className="sew__overlay" data-step={step}>
              {value === "open" && (
                <div className="sew__card" role="group" aria-label="Open scene editor">
                  <p className="sew__eyebrow">Step 1 of 5 · Scene editor</p>
                  <h2 className="sew__title">Open “{sceneTitle}”</h2>
                  <p className="sew__lead">
                    This is the SDK6 scene editor for a{" "}
                    {layoutRows}×{layoutCols} LAND scene
                    ({parcels} parcel{parcels === 1 ? "" : "s"}).
                    Drag-and-drop placement is <strong>simulated</strong> here.
                  </p>
                  <button
                    type="button"
                    className="sew__btn sew__btn--primary"
                    onClick={() => onOpenEditor()}
                  >
                    Start placing items
                  </button>
                </div>
              )}

              {value === "assets" && (
                <div className="sew__card" role="group" aria-label="Add items from an asset pack">
                  <p className="sew__eyebrow">Step 2 of 5 · Asset packs</p>
                  <h2 className="sew__title">Pick a pack &amp; add items</h2>
                  <p className="sew__lead">
                    {items.length === 0
                      ? "The canvas is empty. Pick an asset pack and drop an item onto the scene."
                      : `${items.length} item${items.length === 1 ? "" : "s"} placed.`}
                  </p>
                  <div className="sew__packs" role="tablist" aria-label="Asset packs">
                    {assetPacks.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        role="tab"
                        aria-selected={p.id === openPackId}
                        className={
                          "sew__pack" + (p.id === openPackId ? " is-active" : "")
                        }
                        onClick={() => onSelectPack(p.id)}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                  <div className="sew__assets">
                    {drawerAssets.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        className={"sew__asset" + (a.script ? " is-smart" : "")}
                        title={`Add ${a.name}`}
                        onClick={() => onAddItem(a)}
                      >
                        <span
                          className="sew__assetThumb u-avatar"
                          style={{ "--hue": String(a.hue) }}
                        />
                        <span className="sew__assetName">{a.name}</span>
                        {a.script ? <span className="sew__smartTag">smart</span> : null}
                      </button>
                    ))}
                  </div>
                  <div className="sew__controls">
                    <button
                      type="button"
                      className="sew__btn sew__btn--primary"
                      disabled={items.length === 0}
                      onClick={() => onTransform()}
                    >
                      {items.length === 0 ? "Add an item to continue" : "Transform placed item"}
                    </button>
                  </div>
                </div>
              )}

              {value === "transform" && (
                <div className="sew__card" role="group" aria-label="Transform the placed item">
                  <p className="sew__eyebrow">Step 3 of 5 · Transform</p>
                  <h2 className="sew__title">Position, rotate &amp; scale</h2>
                  <p className="sew__lead">
                    Adjust the last placed item with the move / rotate / scale gizmos.
                    {transformed ? " Transform applied." : ""}
                  </p>
                  <div className="sew__gizmos" role="group" aria-label="Transform gizmos">
                    <button
                      type="button"
                      className="sew__btn"
                      onClick={() => onTransform()}
                    >
                      Move
                    </button>
                    <button
                      type="button"
                      className="sew__btn"
                      onClick={() => onTransform()}
                    >
                      Rotate
                    </button>
                    <button
                      type="button"
                      className="sew__btn"
                      onClick={() => onTransform()}
                    >
                      Scale
                    </button>
                  </div>
                  <div className="sew__controls">
                    <button type="button" className="sew__btn" onClick={() => onBack()}>
                      Back to assets
                    </button>
                    <button
                      type="button"
                      className="sew__btn sew__btn--primary"
                      onClick={() => onCheckMetrics()}
                    >
                      Review parcel metrics
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(value === "metrics" || value === "review") && (
          <section className="sew__panel" aria-labelledby="sew-metrics-title">
            <p className="sew__eyebrow">Step 4 of 5 · Parcel metrics</p>
            <h2 id="sew-metrics-title" className="sew__title">
              Review parcel metrics
            </h2>
            <p className="sew__lead">
              {parcels} parcel{parcels === 1 ? "" : "s"} ·{" "}
              {items.length} placed item{items.length === 1 ? "" : "s"}. Each metric
              must stay within the per-parcel limit (scaled by parcel count).
            </p>

            <table className="sew__metrics">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th className="sew__num">Used</th>
                  <th className="sew__num">Limit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {metricKeys.map((k) => {
                  const over = verdict.metrics[k] > verdict.limits[k];
                  return (
                    <tr key={k} className={over ? "is-over" : ""}>
                      <td>{k}</td>
                      <td className="sew__num">{verdict.metrics[k].toLocaleString()}</td>
                      <td className="sew__num">{verdict.limits[k].toLocaleString()}</td>
                      <td>{over ? "over limit" : "ok"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {value === "review" ? (
              <p
                className={
                  "sew__verdict" + (verdict.withinLimit ? " is-ok" : " is-over")
                }
                role="status"
              >
                {verdict.withinLimit
                  ? "Within budget — ready to save."
                  : `Over the limit: ${verdict.exceeded.join(", ")}. You can still save, but the scene may not deploy.`}
              </p>
            ) : null}

            <div className="sew__controls">
              <button
                type="button"
                className="sew__btn"
                onClick={() => onBack()}
              >
                Back
              </button>
              {value === "metrics" ? (
                <button
                  type="button"
                  className="sew__btn sew__btn--primary"
                  onClick={() => onCheckMetrics()}
                >
                  Confirm metrics
                </button>
              ) : (
                <button
                  type="button"
                  className="sew__btn sew__btn--primary"
                  onClick={() => onSave()}
                >
                  Save scene layout
                </button>
              )}
            </div>
          </section>
        )}

        {value === "saving" && (
          <section className="sew__status" aria-labelledby="sew-saving-title" aria-live="polite">
            <div className="sew__spinner" aria-hidden="true" />
            <h2 id="sew-saving-title" className="sew__title">
              Saving scene layout…
            </h2>
            <p className="sew__lead">
              Persisting the {items.length}-item layout for “{sceneTitle}”.
              The builder-server manifest persist is <strong>simulated</strong> on
              this realm.
            </p>
          </section>
        )}

        {value === "saved" && (
          <section className="sew__status" aria-labelledby="sew-saved-title">
            <svg className="sew__check" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
              <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M20 33l8 8 16-18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 id="sew-saved-title" className="sew__title">
              Scene layout saved
            </h2>
            <p className="sew__lead">
              “{sceneTitle}” saved with {items.length} item
              {items.length === 1 ? "" : "s"}. The persist is a <strong>stub</strong>
              {result?.manifestId
                ? ` (manifest ${result.manifestId}, simulated).`
                : "."}
            </p>
          </section>
        )}

        {value === "error" && (
          <section className="sew__status" aria-labelledby="sew-err-title">
            <h2 id="sew-err-title" className="sew__title">
              Save failed
            </h2>
            <p className="sew__lead">
              {error ?? "The scene layout could not be saved."} You can
              retry the (simulated) save or go back to the metrics review.
            </p>
            <div className="sew__controls">
              <button type="button" className="sew__btn" onClick={() => onBack()}>
                Back to review
              </button>
              <button
                type="button"
                className="sew__btn sew__btn--primary"
                onClick={() => onRetry()}
              >
                Try again
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
