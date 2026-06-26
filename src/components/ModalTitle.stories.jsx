import ModalTitle from "./ModalTitle.jsx";

export default {
  title: "Components/ModalTitle",
  component: ModalTitle,
};

const Frame = ({ children }) => (
  <div
    style={{
      background: "var(--panel)",
      color: "var(--text)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-panel)",
      padding: 28,
      width: 420,
    }}
  >
    {children}
  </div>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="currentColor" d="M13 3v6h8V3h-8ZM3 13v8h8v-8H3ZM3 3v8h8V3H3Zm10 10v8h8v-8h-8Z" />
  </svg>
);

export const TitleOnly = {
  render: (args) => (
    <Frame>
      <ModalTitle {...args} />
    </Frame>
  ),
  args: { title: "Receive Tokens" },
};

export const WithClose = {
  ...TitleOnly,
  args: { title: "Delete Project", onClose: () => {} },
};

export const WithSubtitle = {
  ...TitleOnly,
  args: {
    title: "Convert to Polygon MANA",
    subtitle: "Deposit MANA from Ethereum into Polygon",
    onClose: () => {},
  },
};

export const WithIcon = {
  ...TitleOnly,
  args: {
    title: "World Settings",
    icon: <DashboardIcon />,
    titleAs: "h6",
    onClose: () => {},
  },
};

export const Centered = {
  ...TitleOnly,
  args: {
    title: "Are you sure you want to delete Neon Plaza from 'My Scenes'?",
    titleAs: "h5",
    centered: true,
    onClose: () => {},
  },
};

export const WithBack = {
  ...TitleOnly,
  args: {
    title: "Publish to Worlds",
    onBack: () => {},
    onClose: () => {},
  },
};
