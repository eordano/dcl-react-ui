import AuthFooterChrome from "./AuthFooterChrome.jsx";

export default {
  title: "Explorer/Frames/AuthFooterChrome",
  component: AuthFooterChrome,
  parameters: {
    layout: "padded",
    backgrounds: { default: "purple", values: [{ name: "purple", value: "#380a5c" }] },
  },
};

export const Default = () => <AuthFooterChrome />;

export const Muted = () => <AuthFooterChrome muted />;

export const CustomVersion = () => <AuthFooterChrome version="v1.0.0 - Release" />;
