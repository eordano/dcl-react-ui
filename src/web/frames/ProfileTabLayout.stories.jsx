import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import ProfileTabLayout from "./ProfileTabLayout.jsx";
import NftCard from "../../marketplace/components/NftCard.jsx";
import CardGrid from "../../components/CardGrid.jsx";
import { MEMBER_PROFILE_TABS as MEMBER_TABS, OWN_PROFILE_TABS as OWN_TABS } from "../../data/profileTabs.js";

const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";

export default {
  title: "Web/Frames/ProfileTabLayout",
  component: ProfileTabLayout,
  parameters: { layout: "fullscreen" },
};

const PROFILE = {
  address: "0x2fa1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  name: "PixelNomad",
  nameColor: "#FF8362",
  hasClaimedName: true,
};

const btn = {
  height: 40,
  padding: "0 24px",
  borderRadius: 10,
  border: "none",
  background: "#ff2d55",
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
  textTransform: "uppercase",
  cursor: "pointer",
};
const icoBtn = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};

const OWNED_ASSETS = [
  { id: "a1", name: "Cyber Halo", collection: "Neon Dreams", price: "350", rarity: "epic", network: "polygon" },
  { id: "a2", name: "Aurora Jacket", collection: "Polar Series", price: "1,200", rarity: "legendary", network: "polygon" },
  { id: "a3", name: "Glitch Sneakers", collection: "Static Lab", price: "85", rarity: "rare", network: "polygon" },
  { id: "a4", name: "Founders Crown", collection: "DCL Originals", rarity: "mythic", network: "ethereum" },
];

const MemberActions = () => (
  <>
    <button style={btn}>Add friend</button>
    <button style={icoBtn} aria-label="More actions">⋯</button>
  </>
);

const Panel = ({ children }) => (
  <section
    style={{
      background: "rgba(0,0,0,.2)",
      borderRadius: 16,
      padding: "30px 40px",
      color: "#fcfcfc",
    }}
  >
    {children}
  </section>
);

export const OverviewSplit = {
  render: () => (
    <ProfileTabLayout
      profile={PROFILE}
      tabs={MEMBER_TABS}
      activeTab="overview"
      actions={<MemberActions />}
      aside={
        <div style={{ width: "100%", height: 480 }}>
          <WearablePreview profile={SHOWCASE_ADDRESS} emote="wave" />
        </div>
      }
    >
      <Panel>
        <h2 style={{ margin: 0, textTransform: "uppercase", fontSize: 16 }}>About</h2>
        <p>Builder, collector and occasional DJ. Hanging out in Decentraland since the beginning.</p>
      </Panel>
      <Panel>
        <h2 style={{ margin: 0, textTransform: "uppercase", fontSize: 16 }}>Equipped items</h2>
      </Panel>
    </ProfileTabLayout>
  ),
};

export const FullWidth = {
  render: () => (
    <ProfileTabLayout
      profile={PROFILE}
      tabs={OWN_TABS}
      activeTab="assets"
      actions={<button style={btn}>Manage World</button>}
      bodyPadded
    >
      <p style={{ marginTop: 0, color: "#fcfcfc" }}>{OWNED_ASSETS.length} assets</p>
      <CardGrid min={220}>
        {OWNED_ASSETS.map((a) => (
          <NftCard
            key={a.id}
            name={a.name}
            collection={a.collection}
            price={a.price}
            rarity={a.rarity}
            network={a.network}
          />
        ))}
      </CardGrid>
    </ProfileTabLayout>
  ),
};

export const Unclaimed = {
  render: () => (
    <ProfileTabLayout
      profile={{ ...PROFILE, name: "guest-7e8f9a0", nameColor: "#73d3d3", hasClaimedName: false }}
      tabs={MEMBER_TABS}
      activeTab="creations"
      actions={<MemberActions />}
      bodyPadded
    >
      <div style={{ color: "rgba(255,255,255,.45)", fontStyle: "italic" }}>
        This account has not created anything yet.
      </div>
    </ProfileTabLayout>
  ),
};

export const AssetsHeader = {
  render: () => (
    <ProfileTabLayout
      profile={PROFILE}
      tabs={OWN_TABS}
      activeTab="assets"
      showWalletIcon={false}
      showCopy={false}
      bodyPadded
    >
      <p style={{ marginTop: 0, color: "#fcfcfc" }}>8 assets</p>
    </ProfileTabLayout>
  ),
};

export const NoNameColor = {
  render: () => (
    <ProfileTabLayout
      profile={{ address: "0x742d35cc6634c0532925a3b844bc454e4438f44e", name: "metaverse.dcl.eth", hasClaimedName: true }}
      tabs={MEMBER_TABS}
      activeTab="photos"
      actions={<button style={btn}>Add friend</button>}
      bodyPadded
    >
      <p style={{ marginTop: 0, color: "#fcfcfc" }}>12 photos</p>
    </ProfileTabLayout>
  ),
};

export const ReferralRewards = {
  render: () => (
    <ProfileTabLayout
      profile={PROFILE}
      tabs={OWN_TABS}
      activeTab="referral-rewards"
      actions={
        <>
          <button style={btn}>Edit profile</button>
          <button style={icoBtn} aria-label="More actions">⋯</button>
        </>
      }
      bodyPadded
    >
      <div style={{ color: "#fcfcfc", textAlign: "center" }}>
        <h1 style={{ fontSize: 36 }}>Decentraland is Better With Friends</h1>
        <p>Invite yours and get rewards!</p>
      </div>
    </ProfileTabLayout>
  ),
};
