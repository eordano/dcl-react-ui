import { Avatar, StatusDot, Badge, Pill, WalletChip, ProgressBar, Skeleton, Tooltip } from "./primitives.jsx";

export default {
  title: "Atoms/Primitives",
  parameters: { layout: "centered" },
};

const Row = ({ children }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);

export const Avatars = () => (
  <Row>
    <Avatar hue={280} size={48} />
    <Avatar hue={20} size={48} status="online" />
    <Avatar hue={200} size={48} status="away" />
    <Avatar hue={320} size={64} status="offline" />
  </Row>
);

export const StatusDots = () => (
  <Row>
    <StatusDot status="online" /><StatusDot status="away" /><StatusDot status="offline" />
  </Row>
);

export const Badges = () => (
  <Row><Badge>1</Badge><Badge>9</Badge><Badge>99+</Badge></Row>
);

export const Pills = () => (
  <Row>
    <Pill variant="default">DEFAULT</Pill>
    <Pill variant="accent">ACCENT</Pill>
    <Pill variant="live">LIVE</Pill>
    <Pill variant="online">ONLINE</Pill>
  </Row>
);

export const Wallet = () => <WalletChip address="0x10e…a7a92" />;

export const Progress = () => (
  <div style={{ width: 260, display: "flex", flexDirection: "column", gap: 12 }}>
    <ProgressBar value={35} />
    <ProgressBar value={80} />
    <ProgressBar value={95} danger />
  </div>
);

export const Loading = () => <Skeleton lines={3} width={240} />;

export const TooltipDemo = () => <Tooltip label="Hello from the design system"><Pill variant="accent">hover me</Pill></Tooltip>;
