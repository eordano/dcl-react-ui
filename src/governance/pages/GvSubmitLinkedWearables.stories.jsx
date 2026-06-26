import GvSubmitLinkedWearables from "./GvSubmitLinkedWearables.jsx";

export default {
  title: "Governance/Pages/Submit Linked Wearables",
  component: GvSubmitLinkedWearables,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <GvSubmitLinkedWearables />,
};

export const Programmatic = {
  render: () => <GvSubmitLinkedWearables />,
  play: async ({ canvasElement }) => {
    const yes = canvasElement.querySelector('input[name="gvlw-programmatic"]');
    if (yes) yes.click();
  },
};

export const SignedOut = {
  render: () => <GvSubmitLinkedWearables signedIn={false} />,
};
