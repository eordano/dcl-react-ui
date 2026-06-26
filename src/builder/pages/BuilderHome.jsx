import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import { asset } from "../../asset.js";
import "./builderhome.css";

const CARDS = [
  {
    id: "collections",
    target: "collections",
    title: "Collections",
    description: "Create, review and publish your collections of Wearables and Emotes.",
    cta: "MANAGE COLLECTIONS",
    learnMore:
      "https://docs.decentraland.org/creator/wearables/wearables-overview/#collections",
    img: "assets/builder-home-collections.webp",
  },
  {
    id: "scenes",
    target: "scenes",
    title: "Scenes",
    description: "Build your space in your LAND. You can use free 3D models or upload your own.",
    cta: "BUILD SCENES",
    learnMore: "https://docs.decentraland.org/creator/scene-editor/get-started/about-editor",
    img: "assets/builder-home-scenes.webp",
  },
  {
    id: "land",
    target: "land",
    title: "Land",
    description: "Publish Scenes, create Estates and manage permissions of your LAND.",
    cta: "MANAGE YOUR LAND",
    learnMore: "https://docs.decentraland.org/marketplace/land-manager",
    img: "assets/builder-home-land.webp",
  },
  {
    id: "names",
    target: "names",
    title: "Names",
    description: "Claim your unique name and assign it to your avatar or your parcels.",
    cta: "CLAIM NAME",
    learnMore:
      "https://decentraland.org/blog/project-updates/manage-names-in-the-builder/",
    img: "assets/builder-home-names.webp",
  },
];

function ProductCard({ card, onTab }) {
  return (
    <article className="bh__card">
      <div className="bh__cardbody">
        <h2 className="bh__cardtitle">{card.title}</h2>
        <p className="bh__carddesc">{card.description}</p>
        <div className={"bh__cardimage bh__cardimage--" + card.id}>
          <img className="bh__cardimg" src={asset(card.img)} alt="" aria-hidden="true" />
        </div>
      </div>
      <div className="bh__cardextra">
        <button type="button" className="bh__cta" onClick={() => onTab?.(card.target)}>
          {card.cta}
        </button>
        <a
          className="bh__learn"
          href={card.learnMore}
          rel="noopener noreferrer"
          target="_blank"
        >
          LEARN MORE
        </a>
      </div>
    </article>
  );
}

export default function BuilderHome({ onTab }) {
  const [tab, setTab] = useState("overview");
  const handleTab = onTab || setTab;

  return (
    <BuilderChrome active={tab} onTab={handleTab}>
      <div className="bh">
        <div className="bh__container">
          <h1 className="bh__title">Let's build the Metaverse together!</h1>

          <div className="bh__cards">
            {CARDS.map((card) => (
              <ProductCard key={card.id} card={card} onTab={handleTab} />
            ))}
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}
