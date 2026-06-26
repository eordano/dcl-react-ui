import { useState } from "react";
import ForumChrome from "../frames/ForumChrome.jsx";
import ForumBanner from "../components/ForumBanner.jsx";
import "./forumlatest.css";

const CATEGORIES = {
  governance: { label: "Governance", tone: "blue" },
  dao_council: { label: "DAO Council", tone: "purple" },
  regenesis: { label: "DCL Regenesis Labs", tone: "green" },
  site_feedback: { label: "Site Feedback", tone: "yellow" },
  questions: { label: "Questions", tone: "orange" },
  ideas: { label: "Ideas Bag", tone: "teal" },
  support_sdk: { label: "Support SDK", tone: "red" },
};

const TOPICS = [
  {
    id: 1,
    title: "DAO Council Communication Thread",
    cat: "dao_council",
    tags: [],
    pinned: true,
    posters: [268, 24, 190, 320, 130],
    replies: 21,
    views: "2.1k",
    activity: "May 8",
  },
  {
    id: 2,
    title: "Welcome to the Decentraland Forum!",
    cat: "site_feedback",
    tags: [],
    pinned: true,
    excerpt:
      "Welcome to the Decentraland forums! The purpose of this space is to discuss and coordinate the next steps for the project. We created this forum for the engineering team to start sharing ideas on how to…",
    posters: [200, 60, 300],
    replies: 17,
    views: "18.2k",
    activity: "Sep 2023",
  },
  {
    id: 3,
    title: "[DAO:f8e1771] Revise Wearables Fee to 50 USD",
    cat: "governance",
    tags: ["governance"],
    posters: [10, 140, 250, 30],
    replies: 13,
    views: 205,
    activity: "2d",
  },
  {
    id: 4,
    title: "[DAO:f656cfd] Independent Audit Proposal for Regenesis Labs (2025–2026)",
    cat: "governance",
    tags: ["governance", "audit"],
    posters: [80, 200, 312],
    replies: 3,
    views: 115,
    activity: "4d",
  },
  {
    id: 5,
    title: "DCL Regenesis Labs | Bi-Weekly Community Meet-Up",
    cat: "regenesis",
    tags: ["regenesis-labs"],
    posters: [130, 48, 290, 18, 220],
    replies: 11,
    views: 290,
    activity: "4d",
  },
  {
    id: 6,
    title: "[DAO:bafkrei] Decentraland Retro 2D Client and SDK Proposal",
    cat: "governance",
    tags: ["governance", "sdk"],
    posters: [210, 30, 305, 90, 160, 268],
    replies: 19,
    views: "1.6k",
    activity: "4d",
  },
  {
    id: 7,
    title: "May Status Update – DCL Regenesis Labs",
    cat: "regenesis",
    tags: ["monthly-updates"],
    posters: [130],
    replies: 0,
    views: 40,
    activity: "5d",
  },
  {
    id: 8,
    title: "Should we lower the Grant proposal vote-power threshold to 1M VP?",
    cat: "ideas",
    tags: ["grants", "voting-power"],
    posters: [48, 268, 12, 200],
    replies: 34,
    views: 642,
    activity: "6d",
  },
  {
    id: 9,
    title: "How do I deploy a Smart Wearable to a World?",
    cat: "questions",
    tags: ["worlds", "smart-wearables"],
    posters: [305, 60],
    replies: 5,
    views: 188,
    activity: "1w",
  },
  {
    id: 10,
    title: "SDK7: scene fails to load after migrating from SDK6",
    cat: "support_sdk",
    tags: ["sdk7", "bug"],
    posters: [90, 220, 30],
    replies: 8,
    views: 271,
    activity: "1w",
  },
  {
    id: 11,
    title: "Proposal: add a Genesis Plaza fountain as a Point of Interest",
    cat: "governance",
    tags: ["poi", "poll"],
    posters: [160, 12, 268],
    replies: 12,
    views: 208,
    activity: "2w",
  },
];

const ReplyGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 9a3 3 0 0 1-3 3H5l-3 3V4a2 2 0 0 1 2-2h7a3 3 0 0 1 3 3Z" />
  </svg>
);

const PinGlyph = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true" className="fl__pin">
    <path d="M9.5 1.5 8 3l3.5 3.5L13 5l1.5 1.5L11 10l1 4-2-1.5L6 16l1.5-4-3.5 1L1.5 11 5 9.5 1.5 6 3 4.5l3.5 3.5L8 5.5 6.5 4 8 2.5 9.5 1.5Z" />
  </svg>
);

function PosterCluster({ hues = [] }) {
  return (
    <span className="fl__posters" aria-label={`${hues.length} posters`}>
      {hues.slice(0, 5).map((hue, i) => (
        <span
          key={i}
          className="fl__poster u-avatar"
          style={{ "--sz": "22px", "--hue": hue, zIndex: hues.length - i }}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function TopicRow({ t }) {
  const cat = CATEGORIES[t.cat];
  return (
    <tr className="fl__row">
      <td className="fl__c-topic">
        <a className="fl__title" href="#">
          {t.pinned ? <PinGlyph /> : null}
          {t.title}
        </a>
        {t.excerpt ? <p className="fl__excerpt">{t.excerpt}</p> : null}
        <div className="fl__tags">
          {cat ? (
            <span className={"fl__cat fl__cat--" + cat.tone}>
              <span className="fl__catdot" aria-hidden="true" />
              {cat.label}
            </span>
          ) : null}
          {t.tags.map((tag) => (
            <span key={tag} className="fl__tag">{tag}</span>
          ))}
        </div>
      </td>
      <td className="fl__c-posters">
        <PosterCluster hues={t.posters} />
      </td>
      <td className="fl__c-num">
        <span className={"fl__count" + (t.replies > 0 ? " is-hot" : "")}>{t.replies}</span>
      </td>
      <td className="fl__c-num">
        <span className="fl__count">{t.views}</span>
      </td>
      <td className="fl__c-activity">
        <span className="fl__time">{t.activity}</span>
      </td>
    </tr>
  );
}

export default function ForumLatest({ topics = TOPICS, banner }) {
  const [tab, setTab] = useState("latest");

  return (
    <ForumChrome active={tab} onTab={setTab}>
      <div className="fl">
        <ForumBanner banner={banner} />

        <div className="fl__tablewrap">
          <table className="fl__table">
            <thead>
              <tr>
                <th className="fl__th-topic" scope="col">Topic</th>
                <th className="fl__th-posters" scope="col"><span className="u-visually" /></th>
                <th className="fl__th-num" scope="col">Replies</th>
                <th className="fl__th-num" scope="col">Views</th>
                <th className="fl__th-activity" scope="col">Activity</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <TopicRow key={t.id} t={t} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ForumChrome>
  );
}
