import { DePlayWorkspace } from "../pages/DePlayMode.jsx";

export default function DePlayEditWarning() {
  return (
    <DePlayWorkspace>
      <div className="eui-modal-backdrop">
        <div className="eui-modal">
          <div className="eui-modal-head">Editing while playing</div>
          <div className="eui-modal-body">
            <p style={{ margin: 0 }}>
              The scene is <strong>playing</strong>. Changes you make now are runtime only —
              they&rsquo;re live in the scene but <strong>won&rsquo;t be saved</strong>, and revert when you
              press <strong>Stop</strong>.
            </p>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Stop the scene to make changes that persist to the project.
            </p>
            <label className="eui-check">
              <input type="checkbox" /> Don&rsquo;t show this again
            </label>
          </div>
          <div className="eui-modal-foot">
            <button className="eui-btn primary">Got it</button>
          </div>
        </div>
      </div>
    </DePlayWorkspace>
  );
}
