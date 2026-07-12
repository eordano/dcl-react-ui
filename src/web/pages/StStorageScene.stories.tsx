import type { Meta, StoryObj } from "@storybook/react-vite";
import StStorageScene from "./StStorageScene";
import type { SceneKey } from "./StStorageScene";

const SCENE_KEYS: SceneKey[] = [
  { key: "highScore" },
  { key: "puzzle.state" },
  { key: "doorUnlocked" },
  { key: "npc.dialogueProgress" },
  { key: "lastVisited" },
  { key: "collectedItems" },
  { key: "settings.musicVolume" },
];

const meta = {
  title: "Web/Pages/Storage/Scene",
  component: StStorageScene,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StStorageScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { sceneKeys: SCENE_KEYS, realm: "main", position: "-9,-9" },
};

export const Empty: Story = {
  args: { sceneKeys: [], realm: "main", position: "-9,-9" },
};

export const Loading: Story = {
  args: { loading: true, realm: "main", position: "-9,-9" },
};

export const AddDialog: Story = {
  args: { sceneKeys: SCENE_KEYS, realm: "main", position: "-9,-9", initialDialog: "add" },
};

export const EditDialog: Story = {
  args: { sceneKeys: SCENE_KEYS, realm: "main", position: "-9,-9", initialDialog: "edit" },
};
