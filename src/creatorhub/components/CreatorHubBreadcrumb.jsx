import "./creatorhubbreadcrumb.css";

export default function CreatorHubBreadcrumb({
  to,
  label = "Back to scenes",
  LinkComponent,
}) {
  return (
    <nav aria-label="Breadcrumb" className="ch-breadcrumb">
      {LinkComponent ? (
        <LinkComponent className="ch-breadcrumb__link" to={to} prefetch="intent">
          ‹ {label}
        </LinkComponent>
      ) : (
        <a className="ch-breadcrumb__link" href={to}>
          ‹ {label}
        </a>
      )}
    </nav>
  );
}
