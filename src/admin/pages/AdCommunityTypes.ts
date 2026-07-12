export const COMMUNITY_STATUSES = ["all", "active", "suspended", "inactive"] as const;
export type CommunityStatus = (typeof COMMUNITY_STATUSES)[number];

export type CommunityDecision = "suspend" | "unsuspend";

export type CommunityModerationCard = {
  id: string;
  name: string;
  owner: string;
  ownerName: string | null;
  privacy: "public" | "private";
  active: boolean;
  suspended: boolean;
  membersCount: number;
  thumbnail: string;
  flaggedReason: string;
  status: "Active" | "Suspended" | "Inactive";
  hue: number;
};

export type ModerateCommunitiesStateValue =
  | "authGate"
  | "list"
  | "reviewCommunity"
  | "decision"
  | "submitting"
  | "moderated";

export function truncateAddress(value: string): string {
  return value.length > 12 ? `${value.slice(0, 6)}…${value.slice(-4)}` : value;
}
