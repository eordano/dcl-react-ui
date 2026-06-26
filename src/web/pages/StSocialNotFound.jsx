import SitesChrome from "../frames/SitesChrome.jsx";
import "./stsocialnotfound.css";

const T = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

const ErrorOutlineGlyph = () => (
  <svg
    className="stsnf__icon"
    width="72"
    height="72"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

export default function StSocialNotFound() {
  return (
    <SitesChrome active="legal" overlayNav>
      <div className="stsnf">
        <div className="stsnf__container">
          <ErrorOutlineGlyph />
          <h1 className="stsnf__title">{T.title}</h1>
          <p className="stsnf__desc">{T.description}</p>
        </div>
      </div>
    </SitesChrome>
  );
}
