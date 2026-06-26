import FieldLabel from "./FieldLabel.jsx";

export default {
  title: "Atoms/FieldLabel",
  component: FieldLabel,
  parameters: { layout: "centered" },
};

const Col = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 320, color: "#fff" }}>
    {children}
  </div>
);

export const Default = { args: { children: "Title" } };

export const WithSublabel = () => (
  <Col>
    <FieldLabel htmlFor="t" sublabel="Give your proposal a clear, descriptive title.">
      Title
    </FieldLabel>
  </Col>
);

export const WithNotice = () => (
  <Col>
    <FieldLabel notice="?">Co-authors</FieldLabel>
  </Col>
);
