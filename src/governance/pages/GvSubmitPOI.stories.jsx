import GvSubmitPOI from "./GvSubmitPOI.jsx";

export default {
  title: "Governance/Pages/Submit POI",
  component: GvSubmitPOI,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { request: "add", authState: "ready", account: "0x9f3c…7a21", votingPower: 12480 },
};

export const RemovePOI = {
  args: { request: "remove", authState: "ready", account: "0x9f3c…7a21", votingPower: 12480 },
};

export const LoggedOut = {
  args: { request: "add", authState: "guest" },
};

export const Loading = {
  args: { request: "add", authState: "loading" },
};

export const NotFound = {
  args: { request: "invalid", authState: "ready" },
};
