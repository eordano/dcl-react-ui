export const MEMBER_PROFILE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "creations", label: "Creations" },
  { id: "communities", label: "Communities" },
  { id: "places", label: "Places" },
  { id: "photos", label: "Photos" },
];

export const OWN_PROFILE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "assets", label: "My Assets" },
  { id: "communities", label: "My Communities" },
  { id: "places", label: "My Places" },
  { id: "photos", label: "My Photos" },
  { id: "referral-rewards", label: "Referral Rewards" },
];

export function getProfileTabs(isOwnProfile) {
  return isOwnProfile ? OWN_PROFILE_TABS : MEMBER_PROFILE_TABS;
}
