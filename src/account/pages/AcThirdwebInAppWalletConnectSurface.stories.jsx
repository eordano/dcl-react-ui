import { useEffect } from "react";
import AcThirdwebInAppWalletConnectSurface from "./AcThirdwebInAppWalletConnectSurface.jsx";

export default {
  title: "Account/Pages/Thirdweb in-app wallet connect",
  component: AcThirdwebInAppWalletConnectSurface,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { state: "connected" },
};

export const Loading = {
  args: { state: "loading" },
};

export const Disconnected = {
  args: { state: "disconnected" },
};

export const DetailsModalOpen = {
  args: { state: "connected" },
  render: (args) => {
    useEffect(() => {
      const btn = document.querySelector(".tw-details");
      if (btn) btn.click();
    }, []);
    return <AcThirdwebInAppWalletConnectSurface {...args} />;
  },
};
