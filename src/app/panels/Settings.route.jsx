// Settings panel — route id "settings" (nav SETTINGS [P]).
//
// Reuses the ui3 explorer Settings page. Settings are client-side (graphics,
// audio, controls, privacy toggles) with no backend, so this panel is fully
// functional as-is — it was just never given a route (the SETTINGS tab was dead,
// navigating to an empty HUD). The page embeds its own ExploreChrome, which the
// SPA's nested-chrome context renders children-only (no double nav).
import Settings from "../../explorer/pages/Settings.jsx";

export default function SettingsPanel() {
  return <Settings />;
}
