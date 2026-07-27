import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import NewShopHeroBanner from "./NewShopHeroBanner";

const meta = {
  title: "Marketplace/NewShop/HeroBanner",
  component: NewShopHeroBanner,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mk" style={{ maxWidth: 560, background: "var(--lm-bg)", padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    eyebrow: "Trending now",
    title: "Best Rated Emotes",
    subtitle: "The community's top-voted moves this week.",
    cta: "Shop emotes",
    tone: "purple",
    onCta: fn(),
  },
} satisfies Meta<typeof NewShopHeroBanner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Purple: Story = {};
export const Magenta: Story = { args: { title: "Week Selected Outfits", tone: "magenta" } };
export const Neon: Story = { args: { title: "MANA Live", subtitle: "Grab wearables from the concert drop.", tone: "neon" } };
export const NoArtNoCta: Story = { args: { cta: undefined, subtitle: undefined } };
