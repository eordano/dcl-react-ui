import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import DclEditorChrome from "../src/editor/frames/DclEditorChrome.jsx";
import DeInteractionsPanel from "../src/editor/components/DeInteractionsPanel.jsx";
import { createEditorBus, EDITOR_BUS_CHANNEL } from "../src/editor/editor-bus.js";

const bus = createEditorBus();

window.__busWrites = [];
const sniff = new BroadcastChannel(EDITOR_BUS_CHANNEL);
sniff.onmessage = (ev) => {
  const env = ev && ev.data;
  if (!env || env.to !== "scene" || !env.msg) return;
  window.__busWrites.push(env.msg);
};

function Harness() {
  const [writes, setWrites] = useState([]);
  useEffect(() => {
    const t = setInterval(() => setWrites([...window.__busWrites]), 200);
    return () => clearInterval(t);
  }, []);
  return (
    <DclEditorChrome>
      <div className="eui-panel eui-right">
        <div className="eui-panel-head">
          <div className="eui-head-text">
            <span className="eui-overline">Inspector</span>
            <span className="eui-title">Display Cube</span>
          </div>
          <span className="eui-id-badge">#520</span>
        </div>
        <div className="eui-panel-body">
          <DeInteractionsPanel
            entityId="520"
            entityName="Display Cube"
            onWrite={(cname, json) => bus.setComponent("520", cname, json)}
          />
        </div>
      </div>
      <div
        id="bus-log"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: 120,
          overflow: "auto",
          background: "#000a",
          color: "#7CFC9B",
          font: "10px monospace",
          padding: 6,
          zIndex: 9999,
        }}
      >
        bus writes captured: {writes.length}
        {writes.map((w, i) => (
          <div key={i}>
            {w.type} · {w.name} · {String(w.json).slice(0, 120)}
          </div>
        ))}
      </div>
    </DclEditorChrome>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Harness />
  </StrictMode>
);
