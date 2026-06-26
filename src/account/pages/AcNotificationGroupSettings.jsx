import { useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import AccountSettingsRail from "../components/AccountSettingsRail.jsx";
import "./acnotificationgroupsettings.css";

const ExpandMoreIcon = () => (
  <svg className="acng__chevron" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
);

const GROUPS = [
  {
    key: "marketplace",
    label: "Marketplace",
    description: "Get notifications about your bids, sales, royalties, and rentals.",
    types: [
      ["item_sold", "Item Sold"],
      ["bid_accepted", "Bid Accepted"],
      ["bid_received", "Bid Received"],
      ["royalties_earned", "Royalties Earned"],
      ["rental_ended", "LAND Rental Period Ended"],
      ["rental_started", "LAND Rented"],
    ],
  },
  {
    key: "credits",
    label: "Marketplace Credits",
    description: "Get notifications about Credit expiration, unclaimed Credits, and incomplete goals.",
    types: [
      ["credits_reminder_complete_goals", "Goals Incomplete"],
      ["credits_reminder_claim_credits", "Unclaimed Credits"],
      ["credits_reminder_usage", "Credits About to Expire"],
      ["credits_reminder_do_not_miss_out", "Goals Not Started"],
    ],
  },
  {
    key: "events",
    label: "Events",
    description: "Get notifications about events you've RSVP'd to.",
    types: [
      ["events_started", "Event Started"],
      ["events_starts_soon", "Event Starts Soon"],
    ],
  },
  {
    key: "rewards",
    label: "Giveaways & Rewards",
    description: "Get notifications about free items you receive and your giveaway campaigns.",
    types: [
      ["reward_assignment", "Free Item Received"],
      ["reward_campaign_out_of_funds", "Giveaway Campaign Out of Funds"],
      ["reward_campaign_out_of_stock", "Giveaway Campaign Out of Stock"],
    ],
  },
  {
    key: "dao",
    label: "DAO",
    description: "Get notifications about DAO motions you've voted on, your proposal process, and more.",
    types: [
      ["governance_announcement", "New DAO Announcement"],
      ["governance_authored_proposal_finished", "Voting Ended on Your Proposal"],
      ["governance_coauthor_requested", "Request to Co-Author a Proposal Received"],
      ["governance_new_comment_on_project_update", "New Comment on Your Project Update"],
      ["governance_new_comment_on_proposal", "New Comment on Your Proposal"],
      ["governance_proposal_enacted", "Proposal Enacted"],
      ["governance_voting_ended_voter", "Voting Ended on a Proposal You Voted On"],
    ],
  },
  {
    key: "worlds",
    label: "Worlds",
    description: "Get notified if your World has insufficient storage or if you're invited to visit/collaborate on a World.",
    types: [
      ["worlds_access_restored", "World Access Restored"],
      ["worlds_access_restricted", "World Access Restricted Due to Insufficient Storage"],
      ["worlds_missing_resources", "Insufficient World Storage Warning"],
      ["worlds_permission_granted", "World Permissions to Visit/Deploy/Stream Granted"],
      ["worlds_permission_revoked", "World Permissions to Visit/Deploy/Stream Revoked"],
    ],
  },
  {
    key: "streaming",
    label: "In-World Streaming",
    description: "Get notifications about the status of your scene stream keys and streams.",
    flag: "streaming",
    types: [
      ["streaming_key_expired", "Stream Key Expired"],
      ["streaming_key_reset", "Stream Key Reset"],
      ["streaming_key_revoke", "Stream Key Deactivated"],
      ["streaming_place_updated", "Stream Scene Altered"],
      ["streaming_time_exceeded", "Stream Timed Out"],
    ],
  },
  {
    key: "tips",
    label: "Tips",
    description: "Receive notifications when someone tips your scenes.",
    types: [["tip_received", "Tip Received"]],
  },
  {
    key: "referral",
    label: "Referrals",
    description: "Get notifications about your successfully completed referrals and rewards unlocked.",
    flag: "referral",
    types: [
      ["referral_invited_users_accepted", "Referral Completed"],
      ["referral_new_tier_reached", "Referral Reward Unlocked"],
    ],
  },
];

const DEFAULT_SETTINGS = {
  item_sold: true,
  bid_accepted: true,
  bid_received: false,
  royalties_earned: true,
  rental_ended: false,
  rental_started: false,
  credits_reminder_complete_goals: true,
  credits_reminder_claim_credits: true,
  credits_reminder_usage: true,
  credits_reminder_do_not_miss_out: false,
  events_started: true,
  events_starts_soon: false,
  reward_assignment: true,
  reward_campaign_out_of_funds: false,
  reward_campaign_out_of_stock: false,
  governance_announcement: true,
  governance_voting_ended_voter: true,
};

function NotificationGroupCard({ group, expanded, onToggle, settings, onChangeSetting, hasEmail }) {
  return (
    <div className={"acng__acc" + (expanded ? " is-expanded" : "")}>
      <button
        type="button"
        className="acng__summary"
        aria-expanded={expanded}
        onClick={() => onToggle(group.key)}
      >
        <div className="acng__summary-text">
          <div className="acng__group-title">{group.label}</div>
          <div className="acng__group-desc">{group.description}</div>
        </div>
        <span className="acng__expand">
          <ExpandMoreIcon />
        </span>
      </button>

      {expanded && (
        <div className="acng__details">
          {group.types.map(([type, label]) => (
            <div className="acng__item" key={type}>
              <span className="acng__item-text">{label}</span>
              {hasEmail && (
                <Toggle
                  checked={!!settings[type]}
                  onChange={(v) => onChangeSetting(type, v)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationsPanel({
  isStreamingEnabled,
  isReferralEnabled,
  email,
  hasEmail,
}) {
  const [expandedPanel, setExpandedPanel] = useState("marketplace");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleToggle = (panel) =>
    setExpandedPanel((cur) => (cur === panel ? false : panel));

  const handleChangeSetting = (type, value) =>
    setSettings((s) => ({ ...s, [type]: value }));

  const visibleGroups = GROUPS.filter((g) => {
    if (g.flag === "streaming" && !isStreamingEnabled) return false;
    if (g.flag === "referral" && !isReferralEnabled) return false;
    return true;
  });

  return (
    <div className="acng">
      <div className="acng__header">
        <h1 className="acng__title">Email Notifications</h1>
        <p className="acng__desc">
          Don&apos;t miss any Decentraland notifications when you&apos;re AFK! Sign up to
          receive email notifications and pick &amp; choose which ones you want to get below.
        </p>
      </div>

      <div className="acng__wrapper">
        <div className="acng__email-card">
          <div className="acng__email-titlerow">
            <div className="acng__email-title">
              Your Email Address
              <span className="acng__email-badge">confirmed</span>
            </div>
            <Toggle checked={hasEmail} />
          </div>
          <p className="acng__email-cardesc">Your email has been confirmed.</p>
          <div className="acng__email-inputrow">
            <input
              className="acng__email-input"
              type="email"
              value={email}
              readOnly
              placeholder="example@decentraland.org"
            />
            <button type="button" className="acng__email-btn" disabled>
              save
            </button>
          </div>
        </div>

        {visibleGroups.map((group) => (
          <NotificationGroupCard
            key={group.key}
            group={group}
            expanded={expandedPanel === group.key}
            onToggle={handleToggle}
            settings={settings}
            onChangeSetting={handleChangeSetting}
            hasEmail={hasEmail}
          />
        ))}
      </div>
    </div>
  );
}

export default function AcNotificationGroupSettings({
  email = "jamie@decentraland.org",
  hasEmail = true,
  isStreamingEnabled = true,
  isReferralEnabled = true,
}) {
  const [tab, setTab] = useState("notifications");

  return (
    <AccountChrome>
      <div className="acng-page">
        <div className="acng-page__layout">
          <AccountSettingsRail active={tab} onTab={setTab} />

          <div className="acng-page__content">
            {tab === "notifications" ? (
              <NotificationsPanel
                email={email}
                hasEmail={hasEmail}
                isStreamingEnabled={isStreamingEnabled}
                isReferralEnabled={isReferralEnabled}
              />
            ) : (
              <div className="acng-page__placeholder">
                Select the Email Notifications tab to manage your subscriptions.
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
