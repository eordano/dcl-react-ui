import ModalActions from "./ModalActions.jsx";
import Button from "../atoms/Button.jsx";

export default {
  title: "Components/ModalActions",
  component: ModalActions,
};

const Frame = ({ children }) => (
  <div
    style={{
      background: "var(--panel)",
      color: "var(--text)",
      border: "1px solid var(--line)",
      borderRadius: "var(--r-panel)",
      padding: 28,
      width: 460,
    }}
  >
    {children}
  </div>
);

export const TwoUpEqual = {
  render: () => (
    <Frame>
      <ModalActions equal>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </ModalActions>
    </Frame>
  ),
};

export const DangerConfirm = {
  render: () => (
    <Frame>
      <ModalActions equal>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" className="dlg-actions__btn--danger">Delete</Button>
      </ModalActions>
    </Frame>
  ),
};

export const LeadNote = {
  render: () => (
    <Frame>
      <ModalActions lead="You have unsaved changes. Save before leaving?">
        <Button variant="ghost">Discard</Button>
        <Button variant="primary">Save changes</Button>
      </ModalActions>
    </Frame>
  ),
};

export const RightAligned = {
  render: () => (
    <Frame>
      <ModalActions align="end">
        <Button variant="primary">Got it</Button>
      </ModalActions>
    </Frame>
  ),
};

export const StackedColumn = {
  render: () => (
    <Frame>
      <ModalActions direction="column" equal>
        <Button variant="primary">DOWNLOAD FOR WINDOWS</Button>
        <Button variant="secondary">NOT NOW</Button>
      </ModalActions>
    </Frame>
  ),
};
