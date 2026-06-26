import "./teleportprompt.css";

export default function TeleportPrompt() {
  return (
    <div className="tp" role="dialog" aria-modal="true">
      <div className="tp__image" aria-hidden="true" />

      <div className="tp__body">
        <h2 className="tp__name">Place's name</h2>
        <p className="tp__creator">created by <span>creator</span></p>

        <div className="tp__actions">
          <button className="tp__cancel">CANCEL</button>
          <button className="tp__jump" data-sb-linkto="Explorer/Workflows/SceneLoading">JUMP IN</button>
        </div>
      </div>
    </div>
  );
}
