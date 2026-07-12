import type { Meta, StoryObj } from "@storybook/react-vite";
import StWhatSOnAdminPendingEvents from "./StWhatSOnAdminPendingEvents";
import type { EventItem } from "./StWhatSOnAdminPendingEvents";

const PENDING: EventItem[] = [
  { id: "p1", name: "Synthwave Rooftop Sessions", creator: "soundscape.dcl", time: "21:00", dateLabel: "TODAY", hue: 264 },
  { id: "p2", name: "Vegas City High-Roller Night", creator: "VegasCityDAO", time: "20:30", dateLabel: "TOMORROW", hue: 268 },
  { id: "p3", name: "Builder Workshop: Smart Items 201", creator: "0x7c…a4e1", time: "14:00", dateLabel: "IN 3 DAYS", hue: 130 },
  { id: "p4", name: "Wearable Drop: Neon Foundry", creator: "neonfoundry.dcl", time: "19:00", dateLabel: "12 JUL", hue: 320 },
  { id: "p5", name: "Open Mic Trivia & Hangout", creator: "hangouts.dcl", time: "17:30", dateLabel: "14 JUL", hue: 96 },
];

const APPROVED: EventItem[] = [
  { id: "a1", name: "DAO Town Hall — Q3 Treasury", creator: "governance.dcl", time: "16:00", dateLabel: "TODAY", hue: 30 },
  { id: "a2", name: "Metaverse Art Gallery Opening", creator: "cryptoart.dcl", time: "19:00", dateLabel: "TOMORROW", hue: 210 },
  { id: "a3", name: "Dragon City Night Market", creator: "dragoncity.dcl", time: "18:00", dateLabel: "13 JUL", hue: 18 },
];

const meta = {
  title: "Web/Pages/What's On/Admin Pending Events",
  component: StWhatSOnAdminPendingEvents,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StWhatSOnAdminPendingEvents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { pending: PENDING, approved: APPROVED },
};

export const Empty: Story = {
  args: { pending: [], approved: [] },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Unauthorized: Story = {
  args: { allowed: false },
};
