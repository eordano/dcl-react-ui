import type { Meta, StoryObj } from "@storybook/react-vite";
import GvBidVotingFlow, { type GvBid } from "./GvBidVotingFlow";

const BIDS: GvBid[] = [
  {
    id: "b1",
    title: "Bid #1 — Decentraland Foundation District Revamp",
    budget: 120000,
    power: 2840219,
    choice: "Yes",
    current: false,
  },
  {
    id: "b2",
    title: "Bid #2 — Genesis Plaza Live Events Infrastructure",
    budget: 95000,
    power: 4120880,
    choice: "Yes",
    current: true,
  },
  {
    id: "b3",
    title: "Bid #3 — Community-Run Plaza Maintenance & Tooling",
    budget: 84500,
    power: 1903447,
    choice: "Yes",
    current: false,
  },
];

const meta = {
  title: "Governance/Workflows/Bid voting",
  component: GvBidVotingFlow,
  parameters: { layout: "fullscreen" },
  args: { bids: BIDS, vote: "Yes" },
} satisfies Meta<typeof GvBidVotingFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Casting: Story = { args: { state: "casting" } };

export const Error: Story = { args: { state: "error", retryTimer: "30s" } };

export const SnapshotRedirect: Story = { args: { state: "redirect" } };
