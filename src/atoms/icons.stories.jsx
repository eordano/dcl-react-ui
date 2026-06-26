import {
  Coin,
  PersonIcon,
  ManaIcon,
  Mute,
  Check,
  Bag,
  Pin,
  CameraIcon,
  People,
  Help,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDownAlt,
  Heart,
  Close,
  Caret,
  Section,
  Search,
  Plus,
  Trash,
  Pencil,
  Gear,
  Copy,
  Info,
  CheckFill,
  CheckBold,
  TriangleDown,
  Kebab,
  GridView,
  ListView,
} from "./icons.jsx";

export default {
  title: "Atoms/icons",
  component: Coin,
  parameters: { layout: "centered" },
};

const Row = ({ children }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", color: "#fff" }}>
    {children}
  </div>
);

export const Default = {
  args: { size: 48, ring: true },
};

export const CoinVariants = () => (
  <Row>
    <Coin size={48} ring />
    <Coin size={48} ring={false} />
  </Row>
);

export const CoinSizes = () => (
  <Row>
    <Coin size={18} />
    <Coin size={32} />
    <Coin size={48} />
    <Coin size={72} />
  </Row>
);

export const AllIcons = () => (
  <Row>
    <Coin size={28} />
    <ManaIcon size={28} />
    <PersonIcon size={28} />
    <Mute size={28} />
    <Check size={28} stroke="#fff" />
    <Bag size={28} />
    <Pin size={28} />
    <CameraIcon size={28} />
    <People size={28} />
    <Help size={28} />
  </Row>
);

export const Chevrons = () => (
  <Row>
    <ChevronDown size={28} />
    <ChevronUp size={28} />
    <ChevronLeft size={28} />
    <ChevronRight size={28} />
  </Row>
);

export const Glyphs = () => (
  <Row>
    <ChevronDownAlt size={28} />
    <Heart size={28} />
    <Close size={28} />
    <Caret size={28} />
    <Section size={28} open />
    <Section size={28} />
  </Row>
);

export const ActionGlyphs = () => (
  <Row>
    <Search size={28} />
    <Plus size={28} />
    <Trash size={28} />
    <Pencil size={28} />
    <Gear size={28} />
    <Copy size={28} />
    <Info size={28} />
  </Row>
);

export const Checks = () => (
  <Row>
    <Check size={28} stroke="#fff" />
    <CheckBold size={28} />
    <CheckBold size={28} compact />
    <CheckFill size={28} />
  </Row>
);

export const ToggleGlyphs = () => (
  <Row>
    <TriangleDown size={28} />
    <Kebab size={28} />
    <GridView size={28} />
    <ListView size={28} />
  </Row>
);
