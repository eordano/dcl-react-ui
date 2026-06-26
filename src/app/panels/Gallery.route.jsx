// Gallery panel — route id "gallery" (nav GALLERY [K]).
//
// Reuses the ui3 explorer Reel (camera-reel / photo gallery) page. The
// camera-reel backend is auth-gated/empty on this catalyst today, so the page
// renders its built-in placeholder until a signed reel fetch is wired through
// the same getJSON path. This route just makes the previously-dead GALLERY tab
// open a panel instead of an empty HUD.
import Reel from "../../explorer/pages/Reel.jsx";

export default function GalleryPanel() {
  return <Reel />;
}
