import type { ReactNode } from "react";

import SitesChrome from "../../web/frames/SitesChrome";
import "../../web/pages/stwhatsonadminusers.css";
import "../components/sceneadmins.css";

export type OpSceneAdminsPageProps = {
  placesUnavailable?: boolean;
  children?: ReactNode;
};

export default function OpSceneAdminsPage({
  placesUnavailable = false,
  children = undefined,
}: OpSceneAdminsPageProps) {
  return (
    <SitesChrome active="create" signedIn>
      <main className="sa-route">
        {placesUnavailable && (
          <p className="sa-route__demo" role="alert">
            Couldn&apos;t load operated places right now — the places service is
            unavailable. Try again shortly.
          </p>
        )}
        {children}
      </main>
    </SitesChrome>
  );
}
