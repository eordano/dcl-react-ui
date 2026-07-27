import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MkManageAssetPage from "./MkManageAssetPage";

type Props = ComponentProps<typeof MkManageAssetPage>;

const SAMPLE_ASSET: NonNullable<Props["asset"]> = {
  name: "Genesis Plaza Parcel",
  category: "parcel",
  coords: "12,-9",
  network: "Ethereum",
  owner: "0x9f3c…7a21",
  description:
    "A premium parcel bordering Genesis Plaza, steps from the central hub and a major road. Flat terrain, ready to build.",
  proximities: [
    { type: "plaza", text: "1 away" },
    { type: "road", text: "Adjacent" },
    { type: "district", text: "3 away" },
  ],
};

const SAMPLE_ORDER: NonNullable<Props["order"]> = { price: "1,800", expiresAt: "Jul 20, 2026" };

const SAMPLE_RENTAL: NonNullable<Props["rental"]> = {
  status: "open",
  price: "25",
  expiration: "Jul 20, 2026",
  periods: "7 / 30 / 90",
};

const meta = {
  title: "Marketplace/Pages/Manage asset",
  component: MkManageAssetPage,
  parameters: { layout: "fullscreen" },
  args: {
    asset: SAMPLE_ASSET,
    order: SAMPLE_ORDER,
    rental: SAMPLE_RENTAL,
  },
} satisfies Meta<typeof MkManageAssetPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoListings: Story = {
  args: { order: null, rental: null },
};

export const Selling: Story = {
  args: { rental: null },
};

export const ActiveRental: Story = {
  args: {
    order: null,
    rental: {
      status: "executed",
      price: "25",
      tenant: "0x4b2a…d091",
      startRel: "2 months ago",
      startDate: "Apr 18, 2026",
      endRel: "in about 1 month",
      endDate: "Jul 18, 2026",
      endDateLong: "Saturday, July 18, 2026",
    },
  },
};

export const ClaimBack: Story = {
  args: {
    asset: {
      name: "Skyline Estate",
      category: "estate",
      coords: "Estate #842",
      network: "Ethereum",
      owner: "0x9f3c…7a21",
      description:
        "A 9-parcel estate near the fashion district. Currently unclaimed after a finished rental.",
      proximities: [{ type: "district", text: "Adjacent" }],
    },
    order: null,
    rental: { status: "claimable" },
  },
};

export const UpgradeWarning: Story = {
  args: { showUpgradeWarning: true },
};

export const LandLocked: Story = {
  args: {
    locked: true,
    order: null,
    rental: {
      status: "executed",
      price: "40",
      tenant: "0x4b2a…d091",
      startRel: "1 month ago",
      startDate: "May 18, 2026",
      endRel: "in 5 months",
      endDate: "Nov 18, 2026",
    },
  },
};
