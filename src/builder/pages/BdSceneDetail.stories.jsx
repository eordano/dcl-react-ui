import BdSceneDetail, {
  PROJECT,
  SCENE,
  DEPLOYMENTS,
  WORLD_DEPLOYMENTS,
} from "./BdSceneDetail.jsx";

export default {
  title: "Builder/Pages/Scene Detail",
  component: BdSceneDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const PublishedToWorld = {
  args: { deployments: WORLD_DEPLOYMENTS },
};

export const Sdk6 = {
  args: { scene: { sdk6: true } },
};

export const Unsynced = {
  args: {
    project: { ...PROJECT, status: "unsynced" },
    deployments: [{ ...DEPLOYMENTS[0], status: "unsynced" }],
  },
};

export const Empty = {
  args: {
    project: { ...PROJECT, description: "" },
    deployments: [],
  },
};

export const Loading = {
  args: { loading: true },
};

export const NotFound = {
  args: { notFound: true },
};
