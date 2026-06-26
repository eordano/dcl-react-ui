import { useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./stwhatsonadminpendingevents.css";

const poster = (hue, image) =>
  image
    ? { backgroundImage: `url("${image}")`, backgroundSize: "cover", backgroundPosition: "center" }
    : {
        backgroundImage: `linear-gradient(150deg, hsl(${hue} 70% 52%) 0%, hsl(${(hue + 40) % 360} 60% 28%) 100%)`,
      };

const REJECT_REASONS = [
  { code: "invalid_image", title: "Invalid image", description: "Does not comply with our Terms or Code of Ethics" },
  { code: "invalid_event_name", title: "Invalid hangout name", description: "Does not comply with our Terms or Code of Ethics" },
  { code: "inappropriate_description", title: "Inappropriate description", description: "Contains language that is not allowed" },
  { code: "invalid_duration", title: "Invalid duration", description: "Too short or longer than 24 hours" },
  { code: "invalid_location", title: "Invalid location", description: "Incorrect coordinates" },
];

const PENDING = [
  { id: "p1", name: "Synthwave Rooftop Sessions", creator: "soundscape.dcl", time: "21:00", dateLabel: "TODAY", hue: 264 },
  { id: "p2", name: "Vegas City High-Roller Night", creator: "VegasCityDAO", time: "20:30", dateLabel: "TOMORROW", hue: 268 },
  { id: "p3", name: "Builder Workshop: Smart Items 201", creator: "0x7c…a4e1", time: "14:00", dateLabel: "IN 3 DAYS", hue: 130 },
  { id: "p4", name: "Wearable Drop: Neon Foundry", creator: "neonfoundry.dcl", time: "19:00", dateLabel: "12 JUL", hue: 320 },
  { id: "p5", name: "Open Mic Trivia & Hangout", creator: "hangouts.dcl", time: "17:30", dateLabel: "14 JUL", hue: 96 },
];

const APPROVED = [
  { id: "a1", name: "DAO Town Hall — Q3 Treasury", creator: "governance.dcl", time: "16:00", dateLabel: "TODAY", hue: 30 },
  { id: "a2", name: "Metaverse Art Gallery Opening", creator: "cryptoart.dcl", time: "19:00", dateLabel: "TOMORROW", hue: 210 },
  { id: "a3", name: "Dragon City Night Market", creator: "dragoncity.dcl", time: "18:00", dateLabel: "13 JUL", hue: 18 },
];

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
  </svg>
);
const CalendarPlus = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h7v-2H5V9h14v2h2V6a2 2 0 0 0-2-2Zm-1 14h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2Z" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
  </svg>
);
const CheckMark = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TABS = [
  { id: "whats_on", label: "What's On" },
  { id: "pending", label: "Pending Hangouts" },
  { id: "users", label: "Users" },
];

function AdminTabsBar({ active = "pending" }) {
  return (
    <div className="aq__bar" role="navigation" aria-label="Admin">
      <div className="aq__tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === active}
            className={"aq__tab" + (tab.id === active ? " is-active" : "")}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="aq__barright">
        <button type="button" className="aq__createbtn">
          + Create Hangout
        </button>
      </div>
    </div>
  );
}

function PendingEventCard({ event, status, onOpen }) {
  const isPending = status === "pending";
  return (
    <div className={"aq-frame" + (isPending ? " is-faded" : "")} aria-disabled={isPending}>
      <div className="aq-frame__chips">
        {event.dateLabel ? <span className="aq-chip aq-chip--date">{event.dateLabel}</span> : <span />}
        <span className={"aq-chip aq-chip--status aq-chip--" + status}>
          {status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Rejected"}
        </span>
      </div>

      <div className="aq-fc" role="button" tabIndex={0} onClick={() => onOpen && onOpen(event, status)}>
        <div className="aq-fc__img" style={poster(event.hue, event.image)} role="img" aria-label={event.name} />
        <div className="aq-fc__content">
          <h4 className="aq-fc__title u-truncate">{event.name}</h4>
          <div className="aq-fc__creatorrow" data-role="creator-row">
            <span className="aq-fc__avatar u-avatar" style={{ "--sz": "19px", "--hue": event.hue }} aria-hidden="true" />
            <span className="aq-fc__creator u-truncate">
              by <span className="aq-fc__creatorhi">{event.creator}</span>
            </span>
          </div>
          <div className="aq-fc__pill" data-role="time-pill">
            <ClockIcon />
            <span className="aq-fc__time">{event.time}</span>
          </div>
          <div className="aq-fc__actions" data-role="hover-actions">
            <button type="button" className="aq-fc__textbtn" onClick={(e) => e.stopPropagation()}>
              <CalendarPlus />
              <span>Add to calendar</span>
            </button>
            <button type="button" className="aq-fc__iconbtn" aria-label="Copy link" onClick={(e) => e.stopPropagation()}>
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetailModal({ event, onClose, onApprove, onReject, processing }) {
  return (
    <div className="aq-scrim" onClick={onClose}>
      <div className="aq-detail" role="dialog" aria-modal="true" aria-label={event.name} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="aq-detail__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="aq-detail__hero" style={poster(event.hue, event.image)} role="img" aria-label={event.name} />
        <div className="aq-detail__body">
          <h2 className="aq-detail__title">{event.name}</h2>
          <div className="aq-detail__creatorrow">
            <span className="u-avatar" style={{ "--sz": "28px", "--hue": event.hue }} aria-hidden="true" />
            <span className="aq-detail__creator">
              by <strong>{event.creator}</strong>
            </span>
          </div>
          <div className="aq-detail__meta">
            <span className="aq-detail__metaitem">
              <ClockIcon />
              {event.dateLabel} · {event.time}
            </span>
          </div>
          <p className="aq-detail__desc">
            A community-submitted hangout awaiting moderation. Review the poster, title, description and location
            before approving or rejecting.
          </p>
        </div>
        <div className="aq-detail__actions">
          <button type="button" className="aq-btn aq-btn--reject" disabled={processing} onClick={onReject}>
            Reject
          </button>
          <button type="button" className="aq-btn aq-btn--approve" disabled={processing} onClick={onApprove}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function RejectEventModal({ onClose, onSubmit, isSubmitting }) {
  const [selected, setSelected] = useState(() => new Set());
  const [notes, setNotes] = useState("");
  const [showError, setShowError] = useState(false);

  function toggle(code) {
    setShowError(false);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  function submit() {
    if (selected.size === 0) {
      setShowError(true);
      return;
    }
    onSubmit && onSubmit({ reasons: Array.from(selected), notes: notes.trim() });
  }

  return (
    <div className="aq-scrim" onClick={onClose}>
      <div className="aq-reject" role="dialog" aria-modal="true" aria-label="Reject Reason" onClick={(e) => e.stopPropagation()}>
        <h2 className="aq-reject__title">Reject Reason*</h2>
        <div className="aq-reject__list">
          {REJECT_REASONS.map((reason) => {
            const on = selected.has(reason.code);
            return (
              <label key={reason.code} className="aq-reject__row">
                <span
                  className={"aq-reject__box" + (on ? " is-checked" : "")}
                  onClick={() => toggle(reason.code)}
                  role="checkbox"
                  aria-checked={on}
                  aria-label={reason.title}
                >
                  {on && <CheckMark />}
                </span>
                <span className="aq-reject__label">
                  <strong>{reason.title}</strong> – ({reason.description})
                </span>
              </label>
            );
          })}
        </div>
        {showError && <p className="aq-reject__error">Select at least one reason</p>}
        <div className="aq-reject__notes">
          <label className="aq-reject__noteslabel">Other (optional)</label>
          <textarea
            className="aq-reject__textarea"
            rows={3}
            maxLength={2000}
            placeholder="User will receive a notification, be as descriptive as you can."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="aq-reject__actions">
          <button type="button" className="aq-btn aq-btn--cancel" disabled={isSubmitting} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="aq-btn aq-btn--submit" disabled={isSubmitting} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StWhatSOnAdminPendingEvents({
  pending = PENDING,
  approved = APPROVED,
  allowed = true,
  loading = false,
}) {
  const [detail, setDetail] = useState(null);
  const [rejecting, setRejecting] = useState(false);

  const pendingCards = useMemo(() => pending, [pending]);
  const approvedCards = useMemo(() => approved, [approved]);

  const openDetail = (event, status) => setDetail({ event, status });
  const closeDetail = () => setDetail(null);
  const isPendingDetail = detail !== null && detail.status === "pending";

  return (
    <SitesChrome active="play">
      <div className="aq">
        <AdminTabsBar active="pending" />

        <div className="aq__page">
          {loading ? (
            <div className="aq__loading" aria-busy="true">
              <span className="aq__spinner" aria-hidden="true" />
              <span className="aq__loadingtext">Loading pending hangouts…</span>
            </div>
          ) : !allowed ? (
            <div className="aq__unauth" role="alert">
              <h1 className="aq__unauthtitle">Not authorized</h1>
              <p className="aq__unauthtext">You don't have permission to review pending hangouts.</p>
            </div>
          ) : (
            <>
              <section className="aq__section">
                <h1 className="aq__sectiontitle">Pending Hangouts</h1>
                <div className="aq__grid">
                  {pendingCards.length === 0 ? (
                    <p className="aq__empty">No hangouts waiting for approval</p>
                  ) : (
                    pendingCards.map((event) => (
                      <PendingEventCard key={event.id} event={event} status="pending" onOpen={openDetail} />
                    ))
                  )}
                </div>
              </section>

              <section className="aq__section">
                <h2 className="aq__sectiontitle">
                  Recently Approved
                  <span className="aq__sectionsub">(Last 24hs)</span>
                </h2>
                <div className="aq__grid">
                  {approvedCards.map((event) => (
                    <PendingEventCard key={event.id} event={event} status="approved" onOpen={openDetail} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {detail && (
          <EventDetailModal
            event={detail.event}
            onClose={closeDetail}
            processing={false}
            onApprove={closeDetail}
            onReject={isPendingDetail ? () => setRejecting(true) : undefined}
          />
        )}

        {rejecting && (
          <RejectEventModal
            isSubmitting={false}
            onClose={() => setRejecting(false)}
            onSubmit={() => {
              setRejecting(false);
              closeDetail();
            }}
          />
        )}
      </div>
    </SitesChrome>
  );
}
