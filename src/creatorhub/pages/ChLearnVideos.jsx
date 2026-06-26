import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chlearnvideos.css";

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path
      d="M3 6C2.45 6 2 6.45 2 7V20C2 21.1 2.9 22 4 22H17C17.55 22 18 21.55 18 21C18 20.45 17.55 20 17 20H5C4.45 20 4 19.55 4 19V7C4 6.45 3.55 6 3 6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM12 14.5V5.5L17.47 9.6C17.74 9.8 17.74 10.2 17.47 10.4L12 14.5Z"
      fill="#A09BA8"
    />
  </svg>
);

const BackArrow = () => (
  <svg viewBox="0 0 45 46" width="45" height="45" aria-hidden="true">
    <path
      d="M34.1673 21.5423H16.4194L24.5715 13.3902L22.5007 11.334L10.834 23.0007L22.5007 34.6673L24.5569 32.6111L16.4194 24.459H34.1673V21.5423Z"
      fill="white"
      fillOpacity="0.56"
    />
  </svg>
);

function Thumbnail({ src, alt }) {
  return (
    <img
      className="chlv__thumbnail"
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        const el = e.currentTarget;
        if (el.dataset.fallen) return;
        el.dataset.fallen = "1";
        el.classList.add("is-fallback");
        el.removeAttribute("src");
      }}
    />
  );
}

function Video({ id, list, title }) {
  const url = `https://youtu.be/${id}?list=${list}`;
  return (
    <a
      className="chlv__video"
      href={url}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      <Thumbnail src={`https://img.youtube.com/vi/${id}/0.jpg`} alt={title} />
      <span className="chlv__videotitle u-truncate">{title}</span>
    </a>
  );
}

function Playlist({ title, list, videos }) {
  return (
    <div className="chlv__playlist">
      <div className="chlv__plhead">
        <i className="chlv__plicon" aria-hidden="true">
          <VideoIcon />
        </i>
        <h2 className="chlv__pltitle">{title}</h2>
      </div>
      <div className="chlv__content">
        {videos.map((v) => (
          <Video key={v.id} list={list} id={v.id} title={v.title} />
        ))}
      </div>
    </div>
  );
}

const PLAYLISTS = [
  {
    title: "Product Updates",
    list: "PLAcRraQmr_GMJw77zKvN84LX_OLyn-lVz",
    videos: [
      { id: "nWiyoX70vtc", title: "New Decentralans Builder Templates" },
      { id: "biJ6UDo7D6Q", title: "Update: Saved Outfits" },
      { id: "qdS2KuXH0-k", title: "Decentraland Profile Updates" },
      { id: "l0D1LTo-0_o", title: "Introducing DCL Camera" },
      { id: "08Q0qcWmAwM", title: "Decentraland Emotes 2.0" },
    ],
  },
  {
    title: "Editor (No Code) Tutorials",
    list: "PLAcRraQmr_GOJiVO5ZtZ86hef4unLsEkf",
    videos: [
      { id: "52LiG-4VI9c", title: "Making a Scene with the Creator Hub" },
      { id: "cNl02PFPdcQ", title: "Item Positioning" },
      { id: "UepXpH-k0EI", title: "Using Custom 3D Art" },
      { id: "z7HF4GR01hE", title: "Smart Items - Basics" },
      { id: "m_xWCSDDxpQ", title: "Actions And Triggers" },
      { id: "wnnEU8GCLjc", title: "Making Any Item Smart" },
      { id: "wm8ZD2kSyKA", title: "Smart Item States and Conditions" },
    ],
  },
  {
    title: "SDK7 Tutorials",
    list: "PLAcRraQmr_GPrMmQekqbMWhyBxo3lXs8p",
    videos: [{ id: "55H37rygD7M", title: "Customizing Smart Items with Code" }],
  },
  {
    title: "Emote Tutorials",
    list: "PLAcRraQmr_GN8LcnnQk2BByo9L2Orvp9c",
    videos: [
      { id: "-iWslh4uQIk", title: "Decentraland Tutorial - Animation tips for emotes" },
      { id: "B3Oqgg25kBY", title: "Decentraland Tutorial - Creating an emote" },
      { id: "EJ_z0Hs-QC8", title: "Decentraland Tutorial - Rig Overview" },
      { id: "5PEF2pwZxtY", title: "Emote Workshop by Isa" },
    ],
  },
];

export default function ChLearnVideos() {
  return (
    <CreatorHubChrome active="learn">
      <main className="chlv">
        <div className="chlv__container">
          <h1 className="chlv__title">
            <span className="chlv__titlehead" role="button" tabIndex={0}>
              <i className="chlv__back" aria-hidden="true">
                <BackArrow />
              </i>{" "}
              <span className="chlv__titletext">Videos</span>
            </span>
          </h1>

          <div className="chlv__playlists">
            {PLAYLISTS.map((p) => (
              <Playlist
                key={p.list}
                title={p.title}
                list={p.list}
                videos={p.videos}
              />
            ))}
          </div>
        </div>
      </main>
    </CreatorHubChrome>
  );
}
