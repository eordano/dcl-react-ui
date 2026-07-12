import type { Meta, StoryObj } from "@storybook/react-vite";
import StStorageEnvironment from "./StStorageEnvironment";
import type { EnvKey, Scope } from "./StStorageEnvironment";

const ENV_KEYS: EnvKey[] = [
  { key: "API_BASE_URL" },
  { key: "OPENAI_API_KEY" },
  { key: "ANALYTICS_WRITE_KEY" },
  { key: "FEATURE_FLAGS" },
  { key: "WEBHOOK_SECRET" },
];

const SCOPE: Scope = { realm: "vitsky.dcl.eth", position: "0,0" };

const meta = {
  title: "Web/Pages/Storage/Environment",
  component: StStorageEnvironment,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StStorageEnvironment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StStorageEnvironment envKeys={ENV_KEYS} scope={SCOPE} />,
};

export const Empty: Story = {
  render: () => <StStorageEnvironment envKeys={[]} scope={SCOPE} />,
};

export const Loading: Story = {
  render: () => <StStorageEnvironment isLoading scope={SCOPE} />,
};

export const RealmOnly: Story = {
  render: () => (
    <StStorageEnvironment envKeys={ENV_KEYS} scope={{ realm: "buenosaires.dcl.eth", position: null }} />
  ),
};
