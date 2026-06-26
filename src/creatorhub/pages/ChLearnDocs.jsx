import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chlearndocs.css";

const DocIcon = () => (
  <svg className="chld__icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path
      d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V6C7 5.45 7.45 5 8 5H16C16.55 5 17 5.45 17 6V18Z"
      fill="#A09BA8"
    />
  </svg>
);

const BackArrow = () => (
  <svg viewBox="0 0 45 46" width="45" height="46" aria-hidden="true">
    <path
      d="M34.1673 21.5423H16.4194L24.5715 13.3902L22.5007 11.334L10.834 23.0007L22.5007 34.6673L24.5569 32.6111L16.4194 24.459H34.1673V21.5423Z"
      fill="white"
      fillOpacity="0.56"
    />
  </svg>
);

function Link({ url, title }) {
  return (
    <a className="chld__link" href={url} target="_blank" rel="noreferrer noopener">
      <DocIcon />
      <span className="chld__linktitle">{title}</span>
    </a>
  );
}

const START_LINKS = [
  { title: "Wearable Overview", url: "https://docs.decentraland.org" },
  { title: "3D Model Essentials", url: "https://docs.decentraland.org/creator/3d-modeling/3d-models/" },
  {
    title: "Entities and components",
    url: "https://docs.decentraland.org/creator/scenes-sdk7/architecture/entities-components",
  },
];

const TUTORIALS = [
  { title: "Example Scenes", url: "https://docs.decentraland.org/creator/tutorials-and-examples/examples" },
  {
    title: "SDK & Editor Videos",
    url: "https://www.youtube.com/playlist?list=PLAcRraQmr_GP_K8WN7csnKnImK4R2TgMA",
  },
  {
    title: "Emotes Videos",
    url: "https://www.youtube.com/playlist?list=PLAcRraQmr_GN8LcnnQk2BByo9L2Orvp9c",
  },
];

const SDK = [
  {
    title: "Entities and components",
    url: "https://docs.decentraland.org/creator/scenes-sdk7/architecture/entities-components",
  },
  { title: "Systems", url: "https://docs.decentraland.org/creator/scenes-sdk7/architecture/systems" },
  {
    title: "Custom components",
    url: "https://docs.decentraland.org/creator/scenes-sdk7/architecture/custom-components",
  },
  {
    title: "Querying components",
    url: "https://docs.decentraland.org/creator/scenes-sdk7/architecture/querying-components",
  },
  {
    title: "Data oriented programming",
    url: "https://docs.decentraland.org/creator/scenes-sdk7/architecture/data-oriented-programming",
  },
];

const MODELING = [
  { title: "3D Model Essentials", url: "https://docs.decentraland.org/creator/3d-modeling/3d-models/" },
  { title: "Meshes", url: "https://docs.decentraland.org/creator/3d-modeling/meshes/" },
  { title: "Materials", url: "https://docs.decentraland.org/creator/3d-modeling/materials/" },
  { title: "Textures", url: "https://docs.decentraland.org/creator/3d-modeling/textures/" },
  { title: "Colliders", url: "https://docs.decentraland.org/creator/3d-modeling/colliders/" },
  { title: "Animations", url: "https://docs.decentraland.org/creator/3d-modeling/animations/" },
  { title: "Create a Rig", url: "https://docs.decentraland.org/creator/3d-modeling/create-a-rig/" },
];

const WEARABLES = [
  {
    title: "Wearable Overview",
    url: "https://docs.decentraland.org/creator/wearables/wearables-overview/",
  },
  {
    title: "Creating Wearables",
    url: "https://docs.decentraland.org/creator/wearables/creating-wearables/",
  },
  {
    title: "Linked Wearables",
    url: "https://docs.decentraland.org/creator/wearables/linked-wearables/",
  },
];

const EMOTES = [
  { title: "Emotes Overview", url: "https://docs.decentraland.org/creator/emotes/emotes-overview/" },
  {
    title: "Creating Emotes",
    url: "https://docs.decentraland.org/creator/emotes/emotes-overview/",
  },
  { title: "Avatar Rig", url: "https://docs.decentraland.org/creator/emotes/avatar-rig/" },
];

export default function ChLearnDocs() {
  return (
    <CreatorHubChrome active="home">
      <main className="chld">
        <div className="chld__container">
          <div className="chld__title" role="button" tabIndex={0}>
            <span className="chld__back">
              <BackArrow />
            </span>
            <span className="chld__titletext">Documentation</span>
          </div>

          <div className="chld__docs">
            <div className="chld__start">
              <div className="chld__section">
                <h1 className="chld__h1">Where to start</h1>
                <div className="chld__links chld__links--horizontal">
                  {START_LINKS.map((l) => (
                    <Link key={l.title} {...l} />
                  ))}
                </div>
              </div>
            </div>

            <div className="chld__sections">
              <div className="chld__col">
                <div className="chld__section">
                  <h4 className="chld__h4">Wearables &amp; Emotes</h4>
                  <div className="chld__links chld__links--vertical">
                    <h5 className="chld__h5">Wearables</h5>
                    {WEARABLES.map((l) => (
                      <Link key={l.title} {...l} />
                    ))}
                    <h5 className="chld__h5">Emotes</h5>
                    {EMOTES.map((l) => (
                      <Link key={l.title} {...l} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="chld__col">
                <div className="chld__section">
                  <h4 className="chld__h4">Tutorials &amp; Examples</h4>
                  <div className="chld__links chld__links--vertical">
                    {TUTORIALS.map((l) => (
                      <Link key={l.title} {...l} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="chld__col">
                <div className="chld__section">
                  <h4 className="chld__h4">SDK</h4>
                  <div className="chld__links chld__links--vertical">
                    {SDK.map((l) => (
                      <Link key={l.title} {...l} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="chld__col">
                <div className="chld__section">
                  <h4 className="chld__h4">3D Modeling &amp; Animations</h4>
                  <div className="chld__links chld__links--vertical">
                    {MODELING.map((l) => (
                      <Link key={l.title} {...l} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </CreatorHubChrome>
  );
}
