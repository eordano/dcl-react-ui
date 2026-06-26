import StWhatSOn from "./StWhatSOn.jsx";

export default {
  title: "Web/Pages/What's On/Discovery",
  component: StWhatSOn,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Loading = {
  args: { loading: true },
};

export const NoLiveNow = {
  args: { liveNow: [] },
};

export const EmptyCalendar = {
  args: {
    liveNow: [],
    upcoming: [],
    allDays: [[], [], [], [], []],
  },
};
