import ChModalWorldPermissions from "./ChModalWorldPermissions.jsx";

export default {
  title: "CreatorHub/Components/World Permissions",
  component: ChModalWorldPermissions,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: { tab: "access", view: "default", accessType: "allowList" },
};

export const AccessPublic = {
  args: { tab: "access", view: "default", accessType: "unrestricted" },
};

export const AccessPasswordProtected = {
  args: { tab: "access", view: "default", accessType: "sharedSecret" },
};

export const NewInviteWallet = {
  args: { tab: "access", view: "invite_form", inviteTab: "wallet" },
};

export const NewInviteCommunity = {
  args: { tab: "access", view: "invite_form", inviteTab: "community" },
};

export const NewInviteCsv = {
  args: { tab: "access", view: "invite_form", inviteTab: "csv" },
};

export const PasswordDialog = {
  args: { tab: "access", view: "password_form", accessType: "sharedSecret" },
};

export const ChangeAccessTypeConfirm = {
  args: { tab: "access", view: "change_access_type_confirm" },
};

export const Collaborators = {
  args: { tab: "collaborators", view: "default" },
};

export const CollaboratorsEmpty = {
  args: { tab: "collaborators", view: "empty" },
};

export const AddCollaborator = {
  args: { tab: "collaborators", view: "add" },
};

export const Parcels = {
  args: { tab: "collaborators", view: "parcels" },
};

export const Loading = {
  args: { tab: "access", loading: true },
};
