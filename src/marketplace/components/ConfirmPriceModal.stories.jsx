import ConfirmPriceModal, { ManaMark } from "./ConfirmPriceModal.jsx";

export default {
  title: "Marketplace/Components/ConfirmPriceModal",
  component: ConfirmPriceModal,
  parameters: { layout: "fullscreen" },
  globals: { backgrounds: { value: "light" } },
};

const amount = (n) => (
  <span className="cpm__amount"><ManaMark size={14} />{n}</span>
);

export const Sell = {
  args: {
    price: "1,250",
    warning: "Warning: this price is way below market value",
    children: (
      <>You are about to list <b>Cyber Ronin Jacket</b> on sale for {amount("1,250")}.</>
    ),
  },
};

export const Bid = {
  args: {
    price: "980",
    children: (
      <>You are about to bid on <b>Aurora Wings</b> for {amount("980")}.</>
    ),
  },
};

export const Loading = {
  args: {
    price: "1,250",
    loading: true,
    children: (
      <>You are about to list <b>Cyber Ronin Jacket</b> on sale for {amount("1,250")}.</>
    ),
  },
};

export const WithError = {
  args: {
    price: "1,250",
    error: "Transaction was rejected.",
    children: (
      <>You are about to list <b>Cyber Ronin Jacket</b> on sale for {amount("1,250")}.</>
    ),
  },
};
