import type { ReactNode } from "react";

import "../../web/pages/stwhatsonadminpendingevents.css";
import "./placesmoderation.css";

export type AdPlacesModerationPageProps = {
  nav?: ReactNode;
  degraded?: boolean;
  children?: ReactNode;
};

export default function AdPlacesModerationPage({
  nav = undefined,
  degraded = false,
  children = undefined,
}: AdPlacesModerationPageProps) {
  return (
    <main className="admin-places-moderation-route">
      <nav className="admin-places-moderation-route__nav" aria-label="Admin consoles">
        {nav}
      </nav>

      {degraded && (
        <p className="admin-places-moderation-route__degraded" role="status">
          The live moderation queue could not be loaded (GET /api/reports is
          admin-bearer gated, fail-closed 403). Showing an empty queue until an
          admin bearer is provisioned.
        </p>
      )}

      {children}
    </main>
  );
}
