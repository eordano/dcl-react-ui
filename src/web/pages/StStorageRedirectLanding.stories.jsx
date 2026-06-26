import StStorageRedirectLanding from "./StStorageRedirectLanding.jsx";

export default {
  title: "Web/Pages/Storage/Redirect Landing",
  component: StStorageRedirectLanding,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StStorageRedirectLanding />,
};

export const Loading = {
  render: () => <StStorageRedirectLanding isLoading />,
};

export const Empty = {
  render: () => <StStorageRedirectLanding worlds={[]} lands={[]} />,
};

export const Redirect = {
  render: () => <StStorageRedirectLanding mode="redirect" realm="myworld.dcl.eth" position="0,0" />,
};
