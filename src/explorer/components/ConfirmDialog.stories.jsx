import ConfirmDialog from "./ConfirmDialog.jsx";

export default {
  title: "Explorer/Components/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    title: "Are you sure?",
    body: "This action will remove the item from your backpack.",
    confirmLabel: "Yes",
    cancelLabel: "No",
  },
};

export const Danger = {
  args: {
    title: "Delete forever?",
    body: "This cannot be undone.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    danger: true,
  },
};

export const GradientPrimary = {
  args: {
    title: "Equip wearable?",
    body: "This will replace your current outfit slot.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "gradient",
    gradient: "purple",
    confirmTone: "primary",
  },
};
