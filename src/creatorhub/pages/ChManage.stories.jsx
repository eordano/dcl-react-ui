import ChManage from "./ChManage.jsx";

export default {
  title: "CreatorHub/Pages/Manage (Worlds & Lands)",
  component: ChManage,
  parameters: { layout: "fullscreen" },
};

export const Default = { args: { state: "default" } };

export const Empty = { args: { state: "empty" } };

export const Loading = { args: { state: "loading" } };

export const SignedOut = { args: { state: "signedout" } };
