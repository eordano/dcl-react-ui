import { useState } from "react";
import MarkdownEditor from "./MarkdownEditor.jsx";

export default {
  title: "Components/MarkdownEditor",
  component: MarkdownEditor,
  parameters: {
    layout: "padded",
    backgrounds: { default: "light", values: [{ name: "light", value: "#f3f2f5" }] },
  },
};

const Frame = (story) => (
  <div style={{ background: "#fff", padding: 24, maxWidth: 720, borderRadius: 12 }}>
    {story}
  </div>
);

const RICH_COMMANDS = [
  { k: "bold", label: "Bold", glyph: <b>B</b> },
  { k: "italic", label: "Italic", glyph: <i>I</i> },
  { k: "strike", label: "Strikethrough", glyph: <s>S</s> },
  { k: "link", label: "Link", glyph: "↗" },
  { k: "quote", label: "Quote", glyph: "“" },
  { k: "list", label: "List", glyph: "•" },
];

function Controlled(props) {
  const [value, setValue] = useState(props.value || "");
  return <MarkdownEditor {...props} value={value} onChange={setValue} />;
}

export const TextToggle = {
  render: () => <Controlled placeholder="Start typing..." />,
  decorators: [(Story) => Frame(<Story />)],
};

export const SwitchToggle = {
  render: () => <Controlled toggle="switch" placeholder="Describe the point of interest" />,
  decorators: [(Story) => Frame(<Story />)],
};

export const WithCounter = {
  render: () => (
    <Controlled
      commands={RICH_COMMANDS}
      counter={{ current: 42, limit: 3500 }}
      value="A short progress update on the project so far…"
    />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const WithFullscreen = {
  render: () => (
    <Controlled commands={RICH_COMMANDS} counter="(0 out of 3500 characters)" fullscreen />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const Tall = {
  render: () => <Controlled toggle="switch" tall placeholder="Start typing..." />,
  decorators: [(Story) => Frame(<Story />)],
};

export const Error = {
  render: () => (
    <Controlled
      error
      counter={{ current: 3600, limit: 3500 }}
      value={"This body exceeds the allowed length. ".repeat(6)}
    />
  ),
  decorators: [(Story) => Frame(<Story />)],
};

export const Disabled = {
  render: () => <MarkdownEditor disabled value="" onChange={() => {}} placeholder="Start typing..." />,
  decorators: [(Story) => Frame(<Story />)],
};
