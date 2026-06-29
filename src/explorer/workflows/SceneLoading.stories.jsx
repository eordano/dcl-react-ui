import SceneLoading from "./SceneLoading.jsx";
import { SCENE_TIPS } from "./sceneTips.js";

export default {
  title: "Explorer/Workflows/SceneLoading",
  component: SceneLoading,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <SceneLoading />,
};

export const JustStarted = {
  render: () => <SceneLoading progress={4} tip={3} />,
};

export const AlmostDone = {
  render: () => <SceneLoading progress={92} tip={9} />,
};

export const AllTips = {
  name: "All Tips (upstream)",
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 60%, #bf28e0 0%, #ab1fd2 70%, #9d1bc6 100%)",
        padding: "40px clamp(24px, 5vw, 80px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "28px 32px",
        color: "#fff",
      }}
    >
      {SCENE_TIPS.map((t, i) => (
        <div key={i}>
          <div style={{ fontSize: 12, opacity: 0.6, fontWeight: 700 }}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <div style={{ fontWeight: 900, fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>
            {t.title.replace(/<\/?size[^>]*>/g, "")}
          </div>
          <p style={{ marginTop: 10, lineHeight: 1.5, opacity: 0.92 }}>
            {t.body.replace(/<\/?b>/g, "")}
          </p>
        </div>
      ))}
    </div>
  ),
};
