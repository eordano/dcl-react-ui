import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import EmptyState from "./EmptyState";
import EmptyStateCard from "./EmptyStateCard";

const meta = {
  tags: ["autodocs"],
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchGlyph = (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
const HouseGlyph = (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const CubeGlyph = (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7l9-4 9 4-9 4-9-4Z" />
    <path d="M3 7v10l9 4 9-4V7" />
    <path d="M12 11v10" />
  </svg>
);
const Watermelon = (
  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" aria-hidden="true">
    <path d="M6 12a18 18 0 0 0 36 0Z" fill="#44b600" />
    <path d="M9 13a15 15 0 0 0 30 0Z" fill="#fff" opacity=".55" />
    <path d="M11 13.5a13 13 0 0 0 26 0Z" fill="#ff5f87" />
    <circle cx="19" cy="22" r="1.3" fill="#16141a" />
    <circle cx="24" cy="25" r="1.3" fill="#16141a" />
    <circle cx="29" cy="22" r="1.3" fill="#16141a" />
  </svg>
);
const WarningGlyph = (
  <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8v5M12 16.5v.01" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);
const NoCameraGlyph = (
  <svg viewBox="0 0 120 120" width="120" height="120" fill="none" aria-hidden="true">
    <rect x="20" y="38" width="80" height="52" rx="8" stroke="#fff" strokeWidth="4" />
    <circle cx="60" cy="64" r="16" stroke="#fff" strokeWidth="4" />
    <path d="M42 38l6-10h24l6 10" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
    <path d="M14 14l92 92" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const screenStyle: CSSProperties & { "--es-screen-bg": string; "--es-screen-h": string } = {
  "--es-screen-bg": "#242129",
  "--es-screen-h": "420px",
};

export const NoResults: Story = {
  render: () => (
    <EmptyState
      icon={SearchGlyph}
      iconWash
      title="No collectibles found"
      subtitle="Try adjusting your filters or search terms."
    />
  ),
};

export const NoAssets: Story = {
  render: () => (
    <EmptyState icon={CubeGlyph} title="No assets yet" subtitle="Items you own will show up here." />
  ),
};

export const WithResetCta: Story = {
  render: () => (
    <EmptyState
      icon={HouseGlyph}
      title="No results found for these filters."
      subtitle="Try clearing the filters to see all available LAND."
      actions={[{ label: "Reset filters", variant: "outline" }]}
    />
  ),
};

export const WithSolidCta: Story = {
  render: () => (
    <EmptyState
      icon={CubeGlyph}
      title="You don't have any lists yet"
      subtitle="Create a list to start saving your favourite wearables and emotes."
      actions={[{ label: "Create list", variant: "solid" }]}
    />
  ),
};

export const TitleAndSubOnly: Story = {
  render: () => (
    <EmptyState title="Nothing to show" subtitle={'No results found for "neon jacket"'} />
  ),
};

export const RichSubtitleAndCustomAction: Story = {
  render: () => (
    <EmptyState
      title="Create your first scene"
      subtitle={
        <>
          Unleash your creativity. Start building scenes for your LANDs and Worlds and share with the
          community.{" "}
          <a
            href="https://docs.decentraland.org/creator/scenes-sdk7/getting-started/sdk-101"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about creating Scenes.
          </a>
        </>
      }
      actions={
        <button type="button" className="es__cta">+ New scene</button>
      }
    />
  ),
};

export const InlineTextOnly: Story = {
  render: () => <EmptyState variant="inline" title="No friends" />,
};

export const ErrorTone: Story = {
  render: () => (
    <EmptyState
      tone="error"
      icon={WarningGlyph}
      title="Oops! Lists couldn't load."
      subtitle="Please try again."
      actions={[{ label: "Try again", variant: "solid" }]}
    />
  ),
};

export const ScreenCover: Story = {
  render: () => (
    <EmptyState
      variant="screen"
      style={screenStyle}
      icon={NoCameraGlyph}
      title="Photo not found"
      subtitle="Whoops! The photo you are trying to access does not exist or is no longer available."
    />
  ),
  parameters: { layout: "fullscreen" },
};

export const Card: Story = {
  render: () => (
    <EmptyStateCard
      icon={Watermelon}
      title="Looks like there are no Projects following these criteria to be displayed"
      actions={[{ label: "View all Projects", variant: "solid" }]}
    />
  ),
};
