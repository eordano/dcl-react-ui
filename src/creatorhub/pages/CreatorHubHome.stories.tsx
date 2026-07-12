import type { Meta, StoryObj } from "@storybook/react-vite";
import CreatorHubHome from "./CreatorHubHome";

const meta = {
  title: "CreatorHub/Pages/Home",
  component: CreatorHubHome,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CreatorHubHome>;

export default meta;
type Story = StoryObj<typeof meta>;

const SCENES = [
  { id: "s1", title: "Genesis Plaza Remix", href: "/creator-hub/scene-editor?pointer=0%2C0" },
  { id: "s2", title: "My Gallery", href: "/creator-hub/scene-editor?pointer=12%2C-4" },
  { id: "s3", title: "Parkour Park", href: "/creator-hub/scene-editor?pointer=-30%2C55" },
];

export const Default: Story = {
  render: () => <CreatorHubHome />,
};

export const Empty: Story = {
  render: () => <CreatorHubHome scenes={[]} />,
};

export const Unauthenticated: Story = {
  render: () => <CreatorHubHome signedIn={false} />,
};

export const WithScenes: Story = {
  render: () => <CreatorHubHome signedIn account="0x1234567890abcdef1234567890abcdef12345678" name="Creator" scenes={SCENES} />,
};

export const CommitteeWithScenes: Story = {
  render: () => <CreatorHubHome signedIn committee scenes={SCENES} />,
};
