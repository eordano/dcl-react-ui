import StPlay from "./StPlay.jsx";

export default {
  title: "Web/Pages/Play",
  component: StPlay,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StPlay />,
};

export const Mobile = {
  render: () => <StPlay mobile />,
};
