import { useState } from "react";
import ForumChrome from "../frames/ForumChrome.jsx";
import ForumBanner from "../components/ForumBanner.jsx";
import "./forumcategories.css";

const CATEGORIES = [
  {
    id: "governance",
    name: "Governance",
    color: "#F7941D",
    desc: "Dedicated to Decentraland Community members who want to discuss their ideas, have pre-proposal discussions, and collaborate on future Decentraland DAO Proposals.",
    count: 3257,
    week: 24,
    latest: { title: "[DAO:f8e1771] Revise Wearables Fee to 50 USD", hue: 10, time: "2d" },
  },
  {
    id: "dao_council",
    name: "DAO Council",
    color: "#0088CC",
    desc: "Updates and coordination from the elected Decentraland DAO Council.",
    count: 2,
    week: 1,
    latest: { title: "DAO Council Communication Thread", hue: 268, time: "May 8" },
  },
  {
    id: "implementation",
    name: "Implementation Journal",
    color: "#F1592A",
    desc: "A space for developers working on the platform itself, as well as for projects within the platform, to share their experiences and progress.",
    count: 10,
    week: 0,
    latest: { title: "Migrating the comms service to LiveKit", hue: 190, time: "3w" },
  },
  {
    id: "site_feedback",
    name: "Site Feedback",
    color: "#808281",
    desc: "Discussion about this site, its organization, how it works, and how we can improve it.",
    count: 24,
    week: 0,
    latest: { title: "Welcome to the Decentraland Forum!", hue: 48, time: "Sep 2023" },
  },
  {
    id: "design_document",
    name: "Design Document",
    color: "#0088CC",
    desc: "Technical descriptions of features that are in discussion or implemented already.",
    count: 16,
    week: 1,
    latest: { title: "Design Doc: Scene streaming budget v2", hue: 230, time: "1w" },
  },
  {
    id: "ideas_bag",
    name: "Ideas Bag",
    color: "#9EB83B",
    desc: "Half-baked ideas, brainstorms and what-ifs for the community to riff on before they become proposals.",
    count: 97,
    week: 3,
    latest: { title: "What if LAND auctions ran continuously?", hue: 130, time: "5d" },
  },
  {
    id: "questions",
    name: "Questions",
    color: "#BF1E2E",
    desc: "Ask anything about building, playing, or contributing to Decentraland.",
    count: 226,
    week: 6,
    latest: { title: "How do I deploy a Smart Wearable to a World?", hue: 305, time: "1w" },
  },
  {
    id: "support_sdk",
    name: "Support SDK",
    color: "#0088CC",
    desc: "Get help with the Decentraland SDK — scenes, components, and the toolchain.",
    count: 44,
    week: 2,
    latest: { title: "SDK7: scene fails to load after migrating from SDK6", hue: 90, time: "1w" },
  },
  {
    id: "regenesis",
    name: "DCL Regenesis Labs",
    color: "#92278F",
    desc: "The execution arm of the Decentraland DAO, created to help scale the impact of our ecosystem by transforming DAO-approved strategies into real-world outcomes.",
    count: 26,
    week: 4,
    latest: { title: "DCL Regenesis Labs | Bi-Weekly Community Meet-Up", hue: 110, time: "4d" },
  },
  {
    id: "community_wearables",
    name: "Community Wearables",
    color: "#3AB54A",
    desc: "Creators can be individuals, teams, or brands. Present your concept art and submit it through Agora for judging by the Decentraland community.",
    count: 5950,
    week: 41,
    latest: { title: "Cyberpunk Visor — feedback wanted", hue: 320, time: "1h" },
  },
];

function CategoryRow({ c }) {
  return (
    <article className="fcat__row">
      <span className="fcat__bar" style={{ "--c": c.color }} aria-hidden="true" />
      <div className="fcat__main">
        <a className="fcat__name" href="#">
          <span className="fcat__sq" style={{ "--c": c.color }} aria-hidden="true" />
          {c.name}
        </a>
        <p className="fcat__desc">{c.desc}</p>
      </div>
      <div className="fcat__stats">
        <span className="fcat__stat">
          <b>{c.count.toLocaleString()}</b>
          <span className="fcat__statlabel">topics</span>
        </span>
        <span className="fcat__week">{c.week}/week</span>
      </div>
      <div className="fcat__latest">
        <span className="fcat__latestavatar u-avatar" style={{ "--sz": "30px", "--hue": c.latest.hue }} aria-hidden="true" />
        <div className="fcat__latestmeta">
          <a className="fcat__latesttitle" href="#">{c.latest.title}</a>
          <span className="fcat__latesttime">{c.latest.time}</span>
        </div>
      </div>
    </article>
  );
}

export default function ForumCategories({ categories = CATEGORIES }) {
  const [tab, setTab] = useState("categories");

  return (
    <ForumChrome active={tab} onTab={setTab}>
      <div className="fcat">
        <ForumBanner />
        <div className="fcat__head" aria-hidden="true">
          <span className="fcat__headcat">Category</span>
          <span className="fcat__headstats">Topics</span>
          <span className="fcat__headlatest">Latest</span>
        </div>
        <div className="fcat__list">
          {categories.map((c) => (
            <CategoryRow key={c.id} c={c} />
          ))}
        </div>
      </div>
    </ForumChrome>
  );
}
