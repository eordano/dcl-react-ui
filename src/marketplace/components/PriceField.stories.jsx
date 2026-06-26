import { useState } from "react";
import PriceField from "./PriceField.jsx";

export default {
  title: "Marketplace/Components/PriceField",
  component: PriceField,
  parameters: { layout: "centered" },
};

// .mk scopes the marketplace --lm-* tokens so the field follows the Theme toolbar (dark<->light); --lm-bg gives it a page surface.
const Frame = ({ children }) => (
  <div
    className="mk"
    style={{ width: 380, padding: 24, borderRadius: 14, background: "var(--lm-bg)", boxSizing: "border-box" }}
  >
    {children}
  </div>
);

function Controlled({ initial = "", ...props }) {
  const [v, setV] = useState(initial);
  return (
    <Frame>
      <PriceField value={v} onChange={(e) => setV(e.target.value)} {...props} />
    </Frame>
  );
}

export const Empty = () => <Controlled placeholder="1000" />;

export const Filled = () => <Controlled initial="1,250" />;

export const WithFiat = () => <Controlled initial="1000" trailing="≈ $310.00 USD" />;

export const Error = () => <Controlled initial="0" error />;

export const Disabled = () => <Controlled initial="500" disabled />;
