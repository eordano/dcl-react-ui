import ModalShell from "./ModalShell.jsx";
import ModalTitle from "./ModalTitle.jsx";
import ModalActions from "./ModalActions.jsx";
import Button from "../atoms/Button.jsx";

export default {
  title: "Components/ModalShell",
  component: ModalShell,
  parameters: { layout: "fullscreen" },
};

const Stage = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "#0c0b0e" }}>{children}</div>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="currentColor" d="M13 3v6h8V3h-8ZM3 13v8h8v-8H3ZM3 3v8h8V3H3Zm10 10v8h8v-8h-8Z" />
  </svg>
);

export const Default = {
  render: (args) => (
    <Stage>
      <ModalShell
        {...args}
        ariaLabel="Confirm action"
        title="Modal title"
        onClose={() => {}}
        actions={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </>
        }
        actionsEqual
      >
        <p style={{ color: "var(--ink-6)" }}>
          Body content goes here. The scrim + centered card is the shared shell;
          the title (ModalTitle) and footer (ModalActions) are auto-rendered from
          the title / actions props.
        </p>
      </ModalShell>
    </Stage>
  ),
  args: { size: "sm", onClose: () => {} },
};

export const WithSubtitle = {
  ...Default,
  render: (args) => (
    <Stage>
      <ModalShell
        {...args}
        ariaLabel="Send Tokens"
        title="Send Tokens"
        subtitle="Send Tokens to the desired Wallet"
        onClose={() => {}}
        actions={<Button variant="primary" style={{ width: "100%" }}>Send</Button>}
      >
        <p style={{ color: "var(--ink-6)" }}>Amount + wallet fields would render here.</p>
      </ModalShell>
    </Stage>
  ),
  args: { width: 480, onClose: () => {} },
};

export const WithIconTitle = {
  ...Default,
  render: (args) => (
    <Stage>
      <ModalShell
        {...args}
        ariaLabel="World Settings"
        title="World Settings - mystore.dcl.eth"
        icon={<DashboardIcon />}
        titleAs="h6"
        onClose={() => {}}
        actionsLead="You have unsaved changes. Save before leaving?"
        actions={
          <>
            <Button variant="ghost">Discard</Button>
            <Button variant="primary">Save changes</Button>
          </>
        }
      >
        <p style={{ color: "var(--ink-6)" }}>Tab body renders here.</p>
      </ModalShell>
    </Stage>
  ),
  args: { size: "xl", onClose: () => {} },
};

export const CenteredConfirm = {
  ...Default,
  render: (args) => (
    <Stage>
      <ModalShell
        {...args}
        ariaLabel="Delete project"
        title="Are you sure you want to delete Neon Plaza from 'My Scenes'?"
        titleAs="h5"
        centeredTitle
        onClose={() => {}}
        actionsEqual
        actions={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" className="dlg-actions__btn--danger">Confirm</Button>
          </>
        }
      >
        <p style={{ color: "var(--ink-6)", textAlign: "center" }}>
          Optional checkbox / warning copy here.
        </p>
      </ModalShell>
    </Stage>
  ),
  args: { size: "md", onClose: () => {} },
};

export const StackedActions = {
  ...Default,
  render: (args) => (
    <Stage>
      <ModalShell {...args} ariaLabel="Install Decentraland" onClose={() => {}}
        actionsDirection="column"
        actionsEqual
        actions={
          <>
            <Button variant="primary">DOWNLOAD FOR WINDOWS</Button>
            <Button variant="secondary">NOT NOW</Button>
          </>
        }
      >
        <p style={{ color: "var(--ink-6)", textAlign: "center" }}>
          To jump in, you'll need to install Decentraland first.
        </p>
      </ModalShell>
    </Stage>
  ),
  args: { size: "sm", onClose: () => {} },
};

export const WithBack = {
  ...Default,
  render: (args) => (
    <Stage>
      <ModalShell
        {...args}
        ariaLabel="Publish project"
        title="Publish to Worlds"
        onBack={() => {}}
        onClose={() => {}}
        actions={<Button variant="primary" style={{ width: "100%" }}>Publish</Button>}
      >
        <p style={{ color: "var(--ink-6)" }}>Wizard step body.</p>
      </ModalShell>
    </Stage>
  ),
  args: { size: "lg", onClose: () => {} },
};

export const NonDismissable = {
  ...Default,
  render: (args) => (
    <Stage>
      <ModalShell
        {...args}
        dismissOnScrim={false}
        ariaLabel="Warning"
        title="Heads up"
        titleAs="h5"
        centeredTitle
        actionsEqual
        actions={
          <>
            <Button variant="ghost">Back</Button>
            <Button variant="primary">Continue</Button>
          </>
        }
      >
        <p style={{ color: "var(--ink-6)", textAlign: "center" }}>
          The backdrop does not close this dialog (matches WarningModal).
        </p>
      </ModalShell>
    </Stage>
  ),
  args: { size: "md", onClose: () => {} },
};

export const Scrimless = {
  render: (args) => (
    <Stage>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,.4)",
        }}
      >
        <ModalShell
          {...args}
          scrim={false}
          ariaLabel="Embedded dialog"
          title="Embedded in a Chrome host"
          onClose={() => {}}
        >
          <p style={{ color: "var(--ink-6)" }}>
            Rendered as just the card (no fixed overlay) so the surrounding app
            Chrome supplies the backdrop.
          </p>
        </ModalShell>
      </div>
    </Stage>
  ),
  args: { size: "lg", onClose: () => {} },
};

export const ManualComposition = {
  render: (args) => (
    <Stage>
      <ModalShell {...args} ariaLabel="Manual" onClose={() => {}} bodyless>
        <ModalTitle title="Manual header" onClose={() => {}} />
        <p style={{ color: "var(--ink-6)" }}>Children supply their own header/footer.</p>
        <ModalActions equal>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </ModalActions>
      </ModalShell>
    </Stage>
  ),
  args: { size: "sm", onClose: () => {} },
};
