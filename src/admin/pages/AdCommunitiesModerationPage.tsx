import Spinner from "../../atoms/Spinner";
import AdCommunityModerationList from "./AdCommunityModerationList";
import AdCommunityReviewCard from "./AdCommunityReviewCard";
import AdSuspendDecisionBar from "./AdSuspendDecisionBar";
import type {
  CommunityDecision,
  CommunityModerationCard,
  CommunityStatus,
  ModerateCommunitiesStateValue,
} from "./AdCommunityTypes";
import "../../web/pages/stwhatsonadminusers.css";
import "./communitymoderation.css";

export type AdCommunitiesModerationPageProps = {
  step: string;
  value: ModerateCommunitiesStateValue;
  cards: CommunityModerationCard[];
  search: string;
  status: CommunityStatus;
  counts: Record<CommunityStatus, number>;
  activeCard?: CommunityModerationCard;
  decision: CommunityDecision;
  error?: string;
  resultSuspended?: boolean;
  onSignIn: () => void;
  onSearch: (value: string) => void;
  onStatus: (status: CommunityStatus) => void;
  onReview: (communityId: string) => void;
  onBack: () => void;
  onDecide: (decision: CommunityDecision, reason?: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onContinue: () => void;
};

export default function AdCommunitiesModerationPage({
  step,
  value,
  cards,
  search,
  status,
  counts,
  activeCard = undefined,
  decision,
  error = undefined,
  resultSuspended = undefined,
  onSignIn,
  onSearch,
  onStatus,
  onReview,
  onBack,
  onDecide,
  onConfirm,
  onCancel,
  onContinue,
}: AdCommunitiesModerationPageProps) {
  return (
    <main className="admin-communities-moderation-route">
      <div className="cmw" data-step={step} data-state={value}>
        {value === "authGate" && (
          <div className="cmw-gate" role="region" aria-label="Moderator sign in">
            <div className="cmw-gate__panel">
              <h2 className="cmw-gate__title">Community moderation</h2>
              <p className="cmw-gate__text">
                Browsing the community list is public. <strong>Suspend / unsuspend
                performs a real moderation write</strong> against the communities service
                and requires this node&apos;s admin bearer token — unauthorized attempts
                return an explicit error (nothing is faked).
              </p>
              <button
                type="button"
                className="sdb__btn sdb__btn--primary"
                onClick={onSignIn}
              >
                Continue to moderation list
              </button>
            </div>
          </div>
        )}

        {value === "list" && (
          <AdCommunityModerationList
            cards={cards}
            search={search}
            status={status}
            counts={counts}
            onSearch={onSearch}
            onStatus={onStatus}
            onReview={onReview}
          />
        )}

        {(value === "reviewCommunity" || value === "decision") && activeCard && (
          <div className="au">
            <div className="au__container cmw__reviewwrap">
              <button type="button" className="cmw__back" onClick={onBack}>
                ← Back to list
              </button>
              <AdCommunityReviewCard card={activeCard} />

              {value === "reviewCommunity" && (
                <div className="sdb__actions cmw__reviewactions">
                  <button
                    type="button"
                    className="sdb__btn sdb__btn--unsuspend"
                    onClick={() => onDecide("unsuspend")}
                    disabled={!activeCard.suspended}
                    title={activeCard.suspended ? "" : "Community is not suspended"}
                  >
                    Unsuspend
                  </button>
                  <button
                    type="button"
                    className="sdb__btn sdb__btn--primary sdb__btn--danger"
                    onClick={() => onDecide("suspend")}
                    disabled={activeCard.suspended}
                    title={activeCard.suspended ? "Community is already suspended" : ""}
                  >
                    Suspend…
                  </button>
                </div>
              )}

              {value === "decision" && (
                <AdSuspendDecisionBar
                  suspended={activeCard.suspended}
                  decision={decision}
                  error={error}
                  onDecide={onDecide}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                />
              )}
            </div>
          </div>
        )}

        {value === "submitting" && (
          <div className="au">
            <div className="au__container cmw__centered">
              <div className="cmw-submitting" role="status">
                <Spinner size={22} aria-hidden="true" />
                <p className="cmw-gate__text">Applying moderation…</p>
              </div>
            </div>
          </div>
        )}

        {value === "moderated" && activeCard && (
          <div className="au">
            <div className="au__container cmw__centered">
              <div className="cmw-done" role="status" aria-live="polite">
                <h2 className="cmw-gate__title">Moderation applied</h2>
                <p className="cmw-gate__text">
                  <strong>{activeCard.name}</strong> &middot;{" "}
                  {resultSuspended ? "Suspended" : "Unsuspended"}.
                </p>
                <button
                  type="button"
                  className="sdb__btn sdb__btn--primary"
                  onClick={onContinue}
                >
                  Back to list
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
