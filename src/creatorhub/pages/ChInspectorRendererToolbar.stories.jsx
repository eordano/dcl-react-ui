import ChInspectorRendererToolbar from "./ChInspectorRendererToolbar.jsx";

export default {
  title: "CreatorHub/Pages/Inspector: Renderer + Toolbar",
  component: ChInspectorRendererToolbar,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    activeGizmo: "position",
    autosaveEnabled: false,
    showWarning: true,
    showCameraSpeed: false,
    metricsOpen: false,
  },
};

export const FreeGizmoAutosave = {
  args: {
    activeGizmo: "free",
    autosaveEnabled: true,
    showWarning: false,
  },
};

export const MetricsOpen = {
  args: {
    activeGizmo: "scale",
    autosaveEnabled: true,
    showWarning: false,
    metricsOpen: true,
  },
};

export const CameraSpeed = {
  args: {
    activeGizmo: "rotation",
    autosaveEnabled: false,
    showWarning: true,
    showCameraSpeed: true,
  },
};
