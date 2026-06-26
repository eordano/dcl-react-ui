import BdTemplateDetail, { TEMPLATE } from "./BdTemplateDetail.jsx";

export default {
  title: "Builder/Pages/Template Detail",
  component: BdTemplateDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const SDK6 = {
  args: { sdk6: true },
};

export const CloneModal = {
  args: { cloneOpen: true },
};

export const CloneModalSubmitting = {
  args: { cloneOpen: true, cloneLoading: true },
};

export const Loading = {
  args: { loading: true },
};

export const LongTitle = {
  args: {
    template: {
      ...TEMPLATE,
      title: "Genesis Plaza — Community Social Hub Starter",
      layout: { rows: 4, cols: 4 },
    },
  },
};
