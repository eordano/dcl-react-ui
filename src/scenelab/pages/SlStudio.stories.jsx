import SlStudio, { SlPromptPanel, SlEditorPanel, SAMPLE_CONVO } from "./SlStudio.jsx";
import SceneLabChrome from "../frames/SceneLabChrome.jsx";

export default {
  title: "SceneLab/Pages/Studio",
  component: SlStudio,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <SlStudio /> };

export const Processing = {
  render: () => (
    <SceneLabChrome
      left={<SlPromptPanel messages={SAMPLE_CONVO.slice(0, 3)} processing draft="Make it slowly rotate and add a point light above it" />}
      right={<SlEditorPanel mode="code" />}
    />
  ),
};
