import StSocialCommunityDetail from "./StSocialCommunityDetail.jsx";

export default {
  title: "Web/Pages/Social/Community Detail",
  component: StSocialCommunityDetail,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StSocialCommunityDetail />,
};

export const SignedInMember = {
  render: () => <StSocialCommunityDetail isLoggedIn isMember />,
};

export const PrivateGated = {
  render: () => (
    <StSocialCommunityDetail
      community={{
        id: "bafkreiprivate",
        name: "Founders Lounge",
        description: "An invite-only space for early Decentraland builders.",
        ownerAddress: "0x1111222233334444555566667777888899990000",
        ownerName: "GenesisDAO",
        ownerProfilePicture: "",
        privacy: "private",
        membersCount: 312,
        thumbnail: "",
      }}
      isLoggedIn
    />
  ),
};

export const Empty = {
  render: () => <StSocialCommunityDetail members={[]} events={[]} />,
};

export const MobileTabbed = {
  render: () => <StSocialCommunityDetail mobile />,
};

export const Loading = {
  render: () => <StSocialCommunityDetail state="loading" />,
};

export const NotFound = {
  render: () => <StSocialCommunityDetail state="notFound" />,
};
