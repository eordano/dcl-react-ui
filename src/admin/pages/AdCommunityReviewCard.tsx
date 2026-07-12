import { Avatar } from "../../atoms/primitives";
import { truncateAddress, type CommunityModerationCard } from "./AdCommunityTypes";

export type CommunityReviewCardProps = {
  card: CommunityModerationCard;
};

export default function AdCommunityReviewCard({ card }: CommunityReviewCardProps) {
  return (
    <div className="crc" role="region" aria-label={`Review ${card.name}`}>
      <div className="crc__head">
        <Avatar hue={card.hue} size={56} className="crc__avatar" />
        <div className="crc__headtext">
          <h2 className="crc__name">{card.name}</h2>
          <span className="crc__owner">
            owned by <code>{truncateAddress(card.owner)}</code>
            {card.ownerName ? ` (${card.ownerName})` : ""}
          </span>
        </div>
        <span
          className={
            "cml-status " +
            (card.status === "Suspended"
              ? "cml-status--suspended"
              : card.status === "Inactive"
                ? "cml-status--inactive"
                : "cml-status--active")
          }
        >
          {card.status}
        </span>
      </div>

      <dl className="crc__stats">
        <div className="crc__stat">
          <dt>Privacy</dt>
          <dd>{card.privacy}</dd>
        </div>
        <div className="crc__stat">
          <dt>Members</dt>
          <dd>{card.membersCount.toLocaleString()}</dd>
        </div>
        <div className="crc__stat">
          <dt>Active</dt>
          <dd>{card.active ? "yes" : "no"}</dd>
        </div>
      </dl>

      {card.flaggedReason ? (
        <div className="crc__flag" role="note">
          <span className="crc__flagicon" aria-hidden="true">
            ⚑
          </span>
          <span>
            <strong>Flagged: </strong>
            {card.flaggedReason}
          </span>
        </div>
      ) : (
        <p className="crc__noflag">No active flags on this community.</p>
      )}
    </div>
  );
}
