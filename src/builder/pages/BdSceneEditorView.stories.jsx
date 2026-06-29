import BdSceneEditorView from "./BdSceneEditorView.jsx";

const ASSET_PACKS = [
  { id: "ap-nature", title: "Nature" },
  { id: "ap-city", title: "City" },
];

const DRAWER = [
  { id: "a1", name: "Oak Tree", hue: 120, script: false },
  { id: "a2", name: "Door", hue: 30, script: true },
  { id: "a3", name: "Rock", hue: 210, script: false },
];

const METRIC_KEYS = [
  "triangles",
  "materials",
  "meshes",
  "bodies",
  "entities",
  "textures",
];

const VERDICT = {
  metrics: { triangles: 1200, materials: 4, meshes: 6, bodies: 6, entities: 7, textures: 3 },
  limits: { triangles: 10000, materials: 25, meshes: 200, bodies: 300, entities: 200, textures: 10 },
  exceeded: [],
  withinLimit: true,
};

const base = {
  sceneTitle: "My First Scene",
  layoutRows: 2,
  layoutCols: 2,
  parcels: 4,
  items: [{ id: "a1" }],
  assetPacks: ASSET_PACKS,
  openPackId: "ap-nature",
  drawerAssets: DRAWER,
  metricKeys: METRIC_KEYS,
  verdict: VERDICT,
};

export default {
  title: "Builder/Pages/Scene Editor Wizard",
  component: BdSceneEditorView,
  parameters: { layout: "fullscreen" },
};

export const Open = { args: { ...base, value: "open", step: "open", items: [] } };
export const Assets = { args: { ...base, value: "assets", step: "assets" } };
export const Transform = { args: { ...base, value: "transform", step: "transform", transformed: true } };
export const Metrics = { args: { ...base, value: "metrics", step: "metrics" } };
export const Review = { args: { ...base, value: "review", step: "review" } };
export const Saving = { args: { ...base, value: "saving", step: "saving" } };
export const Saved = { args: { ...base, value: "saved", step: "saved", result: { manifestId: "mf-123" } } };
export const ErrorState = { args: { ...base, value: "error", step: "error", error: "Network timeout." } };
