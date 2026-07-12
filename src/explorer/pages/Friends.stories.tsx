import type { Meta, StoryObj } from "@storybook/react-vite";
import Friends from "./Friends";

const FRIENDS = [
  { name: "Nyx", tag: "#a91f", online: true, where: "Genesis Plaza", hue: 280 },
  { name: "pixelwitch", tag: "#0c2d", online: true, where: "Soul Magic", hue: 320 },
  { name: "vortex.eth", tag: "#7e10", online: true, where: "Vegas City", hue: 200 },
  { name: "Maple", tag: "#33ab", online: false, where: "Offline", hue: 95 },
  { name: "korbin", tag: "#5d41", online: false, where: "Offline", hue: 30 },
  { name: "Lulu", tag: "#b2e9", online: false, where: "Offline", hue: 340 },
];

const RECEIVED = [
  { name: "ghostrunner", tag: "#4f21", date: "JUN 24", hue: 150 },
  { name: "Astra", tag: "#9c70", date: "JUN 22", hue: 260 },
];
const SENT = [{ name: "deckard", tag: "#1188", date: "JUN 20", hue: 210 }];
const BLOCKED = [{ name: "spambot42", tag: "#0000", date: "JAN 12", hue: 0 }];

const meta = {
  title: "Explorer/Pages/Friends",
  component: Friends,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Friends>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Friends friends={FRIENDS} received={RECEIVED} sent={SENT} blocked={BLOCKED} />
  ),
};
