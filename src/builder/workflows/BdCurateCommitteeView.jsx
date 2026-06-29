import { useEffect, useState } from "react";

import BdCuration from "../pages/BdCuration.jsx";
import "./bdcuratecommitteeview.css";

export default function BdCurateCommitteeView({
  view = "dashboard",
  step = "dashboard",
  isCommittee = true,
  collections =([]),
  collectionsKey = "",
  onDashboardClick =(undefined),
  activeRow =(undefined),
  activeId =(undefined),
  builderHref = "#",
  decision =(undefined),
  draftComment = "",
  authorName = "",
  error =(undefined),
  postedComment =(undefined),
  onBack =(undefined),
  onDraftReject =(undefined),
  onDraftApprove =(undefined),
  onChangeComment =(undefined),
  onSubmit =(undefined),
  onBackToQueue =(undefined),
}) {
  if (view === "dashboard" || view === "assigning") {
    return (
      <div
        className="curw"
        data-step={step}
        onClick={view === "dashboard" ? onDashboardClick : undefined}
      >
        <BdCuration
          key={collectionsKey}
          embedded
          collections={isCommittee ? collections : []}
          loading={false}
        />
        {view === "assigning" && (
          <p className="curw__hint" role="status" aria-live="polite">
            Saving your assignment…
          </p>
        )}
      </div>
    );
  }

  if (view === "reviewing") {
    const count = activeRow?.count ?? 0;
    return (
      <div className="curw" data-step={step}>
        <section className="curw__panel" aria-labelledby="curw-review-title">
          <p className="curw__eyebrow">Curation review</p>
          <h1 id="curw-review-title" className="curw__title">
            Review “{activeRow?.name ?? activeId}”
          </h1>
          <p className="curw__lead">
            {count} item{count === 1 ? "" : "s"} ·{" "}
            {activeRow ? DISPLAY_LABEL[activeRow.curationStatus] : "To review"}. Opening
            the collection's items for review on{" "}
            <a className="curw__deeplink" href={builderHref}>
              the Builder
            </a>
            .
          </p>

          <CommentThread comments={activeRow?.comments ?? []} />

          <div className="curw__controls" role="group" aria-label="Decision">
            <button type="button" className="curw__btn" onClick={onBack}>
              Back to dashboard
            </button>
            <button
              type="button"
              className="curw__btn curw__btn--reject"
              onClick={onDraftReject}
            >
              Reject with comment…
            </button>
            <button
              type="button"
              className="curw__btn curw__btn--approve"
              onClick={onDraftApprove}
            >
              Approve with comment…
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (view === "commenting") {
    const dec = decision ?? "approved";
    return (
      <div className="curw" data-step={step}>
        <section className="curw__panel" aria-labelledby="curw-comment-title">
          <p className="curw__eyebrow">
            {dec === "approved" ? "Approving" : "Rejecting"} “{activeRow?.name ?? activeId}”
          </p>
          <h1 id="curw-comment-title" className="curw__title">
            Add a {dec === "approved" ? "comment" : "reason"}
          </h1>
          <p className="curw__lead">
            Your comment is posted to the collection's forum topic
            {activeRow?.forumTopicId ? ` (#${activeRow.forumTopicId})` : ""} alongside the
            decision. This is a preview and will not be posted yet.
          </p>

          <CommentComposer
            decision={dec}
            value={draftComment}
            onChange={onChangeComment}
            authorName={authorName}
          />

          {error ? (
            <p className="curw__error" role="alert">
              {error} — could not save your decision; your draft was kept,
              try again.
            </p>
          ) : null}

          <div className="curw__controls" role="group" aria-label="Submit decision">
            <button type="button" className="curw__btn" onClick={onBack}>
              Back to review
            </button>
            <button
              type="button"
              className={`curw__btn ${dec === "approved" ? "curw__btn--approve" : "curw__btn--reject"}`}
              onClick={onSubmit}
            >
              {draftComment.trim()
                ? `Submit ${dec} + comment`
                : `Submit ${dec} without comment`}
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (view === "deciding") {
    return (
      <div className="curw" data-step={step}>
        <section className="curw__status" aria-live="polite">
          <div className="curw__spinner" aria-hidden="true" />
          <h1 className="curw__title">
            {decision === "rejected" ? "Rejecting" : "Approving"} items…
          </h1>
          <p className="curw__lead">
            Submitting the curation decision{draftComment.trim() ? " and posting your comment" : ""}.
            This decision is a preview and will not be published yet.
          </p>
        </section>
      </div>
    );
  }

  const decided = decision ?? "approved";
  return (
    <div className="curw" data-step={step}>
      <section className="curw__status" aria-labelledby="curw-done-title">
        <svg
          className={`curw__bigmark curw__bigmark--${decided}`}
          viewBox="0 0 64 64"
          width="64"
          height="64"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="4" />
          {decided === "approved" ? (
            <path
              d="M20 33l8 8 16-18"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path d="M22 22l20 20M42 22L22 42" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          )}
        </svg>
        <h1 id="curw-done-title" className="curw__title">
          {decided === "approved" ? "Approved" : "Rejected"} “{activeRow?.name ?? activeId}”
        </h1>
        <p className="curw__lead">
          The curation decision (<strong>{decided}</strong>) was committed
          {postedComment ? " and your comment was posted to the forum topic" : " (no comment posted)"}.
          This decision is a preview and will not be published yet.
        </p>
        {postedComment ? (
          <blockquote className="curw__quote">{postedComment.raw}</blockquote>
        ) : null}
        <div className="curw__controls">
          <button
            type="button"
            className="curw__btn curw__btn--primary"
            onClick={onBackToQueue}
          >
            Back to the curation queue
          </button>
        </div>
      </section>
    </div>
  );
}

function CommentThread({ comments =([]) }) {
  if (!comments.length) {
    return (
      <p className="curw__nocomments" aria-live="polite">
        No committee comments yet — yours will be the first.
      </p>
    );
  }
  return (
    <ul className="curw__thread" aria-label="Committee comments">
      {comments.map((c) => (
        <li key={c.id} className="curw__comment">
          <div className="curw__commenthead">
            <span className="curw__commentauthor">{c.authorName}</span>
            {c.decision ? (
              <span className={`curw__tag curw__tag--${c.decision}`}>{c.decision}</span>
            ) : null}
          </div>
          <p className="curw__commentbody">{c.raw}</p>
        </li>
      ))}
    </ul>
  );
}

function CommentComposer({
  decision,
  value,
  onChange,
  authorName,
}) {
  const [local, setLocal] = useState(value);
  useEffect(() => {
    setLocal(value);
  }, [value]);
  return (
    <div className="curw__composer">
      <label className="curw__label" htmlFor="curw-comment">
        Comment as {authorName}
      </label>
      <textarea
        id="curw-comment"
        className="curw__textarea"
        rows={5}
        placeholder={
          decision === "approved"
            ? "Optional: note anything the creator should know (mesh, rig, theme)…"
            : "Explain what needs to change so the creator can resubmit…"
        }
        value={local}
        onChange={(e) => {
          setLocal(e.target.value);
          onChange?.(e.target.value);
        }}
      />
      <p className="curw__count">{local.trim().length} characters</p>
    </div>
  );
}

const DISPLAY_LABEL = {
  to_review: "To review",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  disabled: "Disabled",
};
