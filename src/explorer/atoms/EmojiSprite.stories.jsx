import EmojiSprite from "./EmojiSprite.jsx";

export default {
  title: "Explorer/Atoms/EmojiSprite",
  component: EmojiSprite,
  parameters: { layout: "centered" },
};

export const Default = {
  args: { ch: "\u{1F600}", size: 24 },
};

export const Large = {
  args: { ch: "\u{1F389}", size: 64 },
};

export const Flag = {
  args: { ch: "\u{1F1FA}\u{1F1F8}", size: 48 },
};

export const TextFallback = {
  args: { ch: "\u{2728}", size: 32 },
};
