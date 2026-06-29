import "./forumbanner.css";

const DEFAULT_BANNER = {
  badge: "Decentraland DAO",
  title: "Code of Ethics",
  body:
    "As the Decentraland DAO continues to experience rapid growth and attract incremental participation from diverse community members and stakeholders, the need for a robust Code of Ethics becomes increasingly evident.",
  cta: "read more",
};

export default function ForumBanner({ banner = DEFAULT_BANNER }) {
  if (!banner) return null;
  return (
    <section className="fbn" aria-label="Announcement">
      <span className="fbn__badge">{banner.badge}</span>
      <div className="fbn__main">
        <h2 className="fbn__title">{banner.title}</h2>
        <p className="fbn__body">
          {banner.body} <span className="fbn__cta" role="button" tabIndex={0}>{banner.cta}</span>
        </p>
      </div>
      <button type="button" className="fbn__close" aria-label="Dismiss">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </section>
  );
}
