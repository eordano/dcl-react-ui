import DclEditorChrome from "../frames/DclEditorChrome.jsx";

export default function DeBootWaiting({ phase = "engine" }) {
  return (
    <DclEditorChrome>
      <div className="eui-boot">
        {phase === "engine" ? "Editor — waiting for engine…" : "Editor — waiting for scene…"}
      </div>
    </DclEditorChrome>
  );
}
