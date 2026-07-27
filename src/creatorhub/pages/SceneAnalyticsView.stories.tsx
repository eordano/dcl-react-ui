import type { Meta, StoryObj } from "@storybook/react-vite";
import SceneAnalyticsView from "./SceneAnalyticsView";
import {
  creatorScenesStatsFixture,
  FIXTURE_AS_OF,
  honestEmptyScene,
} from "../lib/scene-analytics.fixtures";

const meta = {
  title: "CreatorHub/Pages/SceneAnalyticsView",
  component: SceneAnalyticsView,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SceneAnalyticsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Portfolio: Story = {
  args: {
    phase: "ready",
    scenes: creatorScenesStatsFixture.scenes,
    asOf: FIXTURE_AS_OF,
  },
};

export const DrilldownGenesis: Story = {
  args: {
    phase: "ready",
    scenes: creatorScenesStatsFixture.scenes,
    asOf: FIXTURE_AS_OF,
    selected: { sceneType: "genesis", sceneId: "-3|-2" },
  },
};

export const DrilldownWorld: Story = {
  args: {
    phase: "ready",
    scenes: creatorScenesStatsFixture.scenes,
    asOf: FIXTURE_AS_OF,
    selected: { sceneType: "world", sceneId: "kickoff.dcl.eth" },
    worldAccess: { "kickoff.dcl.eth": "public" },
  },
};

export const DrilldownHonestEmpty: Story = {
  args: {
    phase: "ready",
    scenes: [honestEmptyScene],
    asOf: FIXTURE_AS_OF,
    selected: { sceneType: "world", sceneId: "sparse.dcl.eth" },
  },
};

export const NoSceneData: Story = {
  args: {
    phase: "ready",
    scenes: creatorScenesStatsFixture.scenes,
    asOf: FIXTURE_AS_OF,
    selected: { sceneType: "world", sceneId: "missing.dcl.eth" },
  },
};

export const Empty: Story = {
  args: {
    phase: "ready",
    scenes: [],
    asOf: null,
  },
};

export const SignedOut: Story = {
  args: {
    phase: "signed-out",
  },
};

export const Loading: Story = {
  args: {
    phase: "loading",
  },
};

export const LoadError: Story = {
  args: {
    phase: "error",
    error: "Failed to fetch scene metrics (status 502)",
  },
};
