// DOM-level harness for the discrete shortcut layer: mounts the REAL
// DeWorkspace in live mode against a same-origin fake viewport iframe and a
// FAKE SCENE that answers the editor bus (scene-ready, selection pushes with
// component values, tool echoes, rpc replies). Lets a browser driver prove
// Q/W/E/R (aria-pressed + set-tool on the bus), Esc clear, the ? overlay,
// Delete → entity-deleted, F5 → play, and the ⌘Z/⌘⇧Z history roundtrip over
// real bus writes — no engine build needed. Serve with:
//   npx vite --config vite.harness.config.js
// then open /shortcuts.html. Assertions read window.__sceneWrites.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DeWorkspace from "../src/editor/pages/DeWorkspace.jsx";
import { EDITOR_BUS_CHANNEL } from "../src/editor/editor-bus.js";

const ENTITY = "512";
const COMPONENTS = {
  [ENTITY]: {
    Transform: {
      position: { x: 8, y: 1, z: 8 },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      scale: { x: 1, y: 1, z: 1 },
      parent: 0,
    },
    "core-schema::Name": { value: "Display Cube" },
    GltfContainer: { src: "cube.glb" },
  },
};

window.__sceneWrites = [];

const scene = new BroadcastChannel(EDITOR_BUS_CHANNEL);
const send = (msg) => scene.postMessage({ to: "page", msg });

scene.onmessage = (ev) => {
  const env = ev && ev.data;
  if (!env || env.to !== "scene" || !env.msg) return;
  const msg = env.msg;
  window.__sceneWrites.push(msg);
  switch (msg.type) {
    case "init":
      send({
        type: "scene-ready",
        bridge: 8,
        scene: null,
        frozen: true,
        tool: "translate",
        orientGlobal: false,
        pivotEach: false,
        selected: [],
        active: null,
      });
      send({ type: "entities", entities: [{ id: ENTITY, name: "Display Cube", parent: "0" }] });
      break;
    case "set-selection":
      send({
        type: "selection",
        selected: msg.selected,
        active: msg.active,
        components: msg.active ? COMPONENTS : {},
      });
      break;
    case "set-tool":
      send({ type: "tool", tool: msg.tool });
      break;
    case "rpc":
      send({ type: "rpc-reply", id: msg.id, ok: true, result: "" });
      break;
    default:
      break;
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DeWorkspace title="Shortcut Harness" tree={[]} inspector={{}} viewportSrc="/viewport.html" />
  </StrictMode>,
);
