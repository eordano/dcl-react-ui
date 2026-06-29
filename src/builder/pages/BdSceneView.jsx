import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdsceneview.css";

const Glyph = ({ d, size = 16, vb = 24, fill = false, sw = 1.6 }) => (
  <svg viewBox={`0 0 ${vb} ${vb}`} width={size} height={size} aria-hidden="true">
    <path
      d={d}
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ICON = {
  parcel:
    "M12 2.5l8 4.5v9l-8 4.5-8-4.5v-9l8-4.5zM4 7l8 4.5M20 7l-8 4.5M12 11.5V21",
  object:
    "M12 3l7 4v8l-7 4-7-4V7l7-4zM5 7l7 4 7-4M12 11v8",
  download: "M12 3v11M8 10l4 4 4-4M5 19h14",
  heart:
    "M12 20s-7-4.6-9.2-9.2C1.3 7.6 3 4.5 6.2 4.5c2 0 3.2 1.3 3.8 2.2.6-.9 1.8-2.2 3.8-2.2 3.2 0 4.9 3.1 3.4 6.3C19 15.4 12 20 12 20z",
  back: "M15 5l-7 7 7 7",
  alert: "M12 3l9 16H3zM12 9v5M12 17h0",
};

const SCENE = {
  id: "p-genesis-remix",
  title: "Genesis Plaza Remix",
  description:
    "A community remix of Genesis Plaza — a sprawling welcome hub with teleport portals, a central fountain and an open-air gallery of featured creations.",
  parcels: 5,
  items: 180,
  sdk: 7,
  hue: 280,
  author: { name: "voxelsmith", address: "0x9f3c…7a21", hue: 332 },
};

const POOL = { likes: 342, like: false };

function SDKTag({ sdk, loading }) {
  if (loading) {
    return (
      <span className="bdsceneview__sdk">
        <Spinner size={14} />
      </span>
    );
  }
  if (sdk === 6) {
    return (
      <span className="bdsceneview__sdk" title="Built with the legacy SDK 6 editor">
        <Glyph d={ICON.alert} size={12} /> SDK 6
      </span>
    );
  }
  return <span className="bdsceneview__sdk">SDK 7</span>;
}

function CircleChip({ children, isActive, isDisabled, onClick }) {
  return (
    <div
      className={
        "bdsceneview__chip" +
        (isActive ? " is-active" : "") +
        (isDisabled ? " is-disabled" : "")
      }
      onClick={isDisabled ? undefined : onClick}
    >
      {children}
    </div>
  );
}

export default function BdSceneView({
  scene = SCENE,
  variant = "public",
  loading = false,
  notFound = false,
  liked: likedProp = POOL.like,
}) {
  const [liked, setLiked] = useState(likedProp);
  const isPool = variant === "pool";
  const likes = POOL.likes + (liked && !likedProp ? 1 : 0) - (!liked && likedProp ? 1 : 0);

  if (loading) {
    return (
      <BuilderChrome active="overview">
        <div className="bdsceneview bdsceneview--loading">
          <Spinner size={56} />
        </div>
      </BuilderChrome>
    );
  }

  if (notFound) {
    return (
      <BuilderChrome active="overview">
        <div
          className="bdsceneview"
          style={{
            minHeight: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 8,
          }}
        >
          <h2 style={{ margin: 0 }}>Not found</h2>
          <p style={{ margin: 0, color: "var(--ink-7, #a09ba8)" }}>
            The scene you are looking for doesn&apos;t exist.
          </p>
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active="overview">
      <div className="bdsceneview">
        <div className="bdsceneview__backbar">
          <button type="button" className="bdsceneview__back" aria-label="Back">
            <Glyph d={ICON.back} size={20} sw={2} />
          </button>
          <button type="button" className="bdsceneview__download">
            <Glyph d={ICON.download} size={16} sw={1.7} />
            Download Scene
          </button>
        </div>

        <div className="bdsceneview__card">
          <div
            className="bdsceneview__thumb"
            style={{ "--hue": scene.hue }}
            role="img"
            aria-label={`${scene.title} preview`}
          >
            <span className="bdsceneview__thumbMark" aria-hidden="true">DCL</span>
          </div>

          <div className="bdsceneview__actions">
            {isPool && (
              <div className="bdsceneview__action">
                <CircleChip isActive={liked} onClick={() => setLiked((l) => !l)}>
                  <Glyph d={ICON.heart} size={18} fill={liked} sw={1.6} />
                  {likes > 0 && <span className="bdsceneview__likeCount">{likes}</span>}
                </CircleChip>
              </div>
            )}
          </div>

          <div className="bdsceneview__detail">
            <div className="bdsceneview__title">
              <h1>{scene.title}</h1>
              <SDKTag sdk={scene.sdk} />
            </div>

            <div className="bdsceneview__author">
              made by{" "}
              <span className="bdsceneview__authorLink" role="button" tabIndex={0}>
                <span
                  className="bdsceneview__authorAvatar u-avatar"
                  style={{ "--sz": "24px", "--hue": scene.author.hue }}
                />
                <span className="bdsceneview__authorName">{scene.author.name}</span>
              </span>
            </div>

            {scene.description && (
              <div className="bdsceneview__description">
                <p>{scene.description}</p>
              </div>
            )}

            <div className="bdsceneview__components">
              <div className="bdsceneview__component">
                <Glyph d={ICON.parcel} size={16} sw={1.4} /> {scene.parcels} parcels
              </div>
              <div className="bdsceneview__component">
                <Glyph d={ICON.object} size={16} sw={1.4} /> {scene.items} items
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}
