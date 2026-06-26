import SitesChrome from "../frames/SitesChrome.jsx";
import "./ststoragenotfound.css";

const COPY = {
  pageTitle: "Storage · Page not found",
  code: "404",
  title: "Page Not Found",
  subtitle: "The page you are looking for does not exist.",
  goHome: "Go Home",
};

const HOME_HREF = "https://decentraland.org/storage/select";

export default function StStorageNotFound() {
  return (
    <SitesChrome active="legal" overlayNav>
      <div className="ststoragenotfound" title={COPY.pageTitle}>
        <div className="ststoragenotfound__container">
          <p className="ststoragenotfound__code">{COPY.code}</p>
          <h1 className="ststoragenotfound__title">{COPY.title}</h1>
          <p className="ststoragenotfound__subtitle">{COPY.subtitle}</p>
          <a className="ststoragenotfound__btn" href={HOME_HREF}>
            {COPY.goHome}
          </a>
        </div>
      </div>
    </SitesChrome>
  );
}
