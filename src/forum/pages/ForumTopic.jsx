import { useState } from "react";
import ForumChrome from "../frames/ForumChrome.jsx";
import ForumBanner from "../components/ForumBanner.jsx";
import "./forumtopic.css";

const TOPIC = {
  title: "[DAO:f8e1771] Revise Wearables Fee to 50 USD",
  category: { label: "Governance", color: "#F7941D" },
  tags: ["governance", "wearables"],
  created: "Jun 18, 2026",
  replies: 13,
  views: 205,
  participants: 6,
};

const POSTS = [
  {
    id: 1,
    author: "HirokiAlonzo",
    handle: "@hiroki",
    hue: 10,
    op: true,
    time: "Jun 18",
    likes: 14,
    body: [
      "This proposal seeks community consensus to lower the Wearables publication fee from 100 USD to 50 USD, paid in MANA at the time of submission.",
      "The current fee was set when MANA traded much higher. Halving it lowers the barrier for new creators while keeping enough friction to deter spam submissions.",
    ],
  },
  {
    id: 2,
    author: "agus",
    handle: "@agus",
    hue: 268,
    time: "Jun 18",
    likes: 8,
    body: [
      "Strongly in favor. The fee was always meant to track real-world cost, not to be a revenue line. 50 USD is still meaningful friction.",
    ],
  },
  {
    id: 3,
    author: "metaryuk",
    handle: "@metaryuk",
    hue: 190,
    time: "Jun 19",
    likes: 3,
    body: [
      "One concern: do we have data on how many low-quality submissions the current fee actually filters out? Would be good to see the curation committee's rejection rate before we change it.",
    ],
  },
  {
    id: 4,
    author: "HirokiAlonzo",
    handle: "@hiroki",
    hue: 10,
    op: true,
    time: "Jun 19",
    likes: 11,
    solution: true,
    body: [
      "Good question. Pulling the last quarter from the curation dashboard: ~7% of paid submissions were rejected. The fee mostly filters obvious spam, which a 50 USD floor still covers.",
      "I'll add the figures to the proposal body so they're on the record before voting opens.",
    ],
  },
];

const HeartGlyph = ({ filled }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path
      d="M8 14S2 10.2 2 6.1A3.1 3.1 0 0 1 8 4.7 3.1 3.1 0 0 1 14 6.1C14 10.2 8 14 8 14Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const ReplyGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 4 4 8l5 4M4 8h6a3 3 0 0 1 3 3v1" />
  </svg>
);

const ShareGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6.5 8M6.5 8 11 11M12 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM4 6.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM12 8.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" />
  </svg>
);

function Post({ p, index }) {
  return (
    <article className={"ft__post" + (p.op ? " is-op" : "")}>
      <div className="ft__postside">
        <span className="ft__postavatar u-avatar" style={{ "--sz": "44px", "--hue": p.hue }} aria-hidden="true" />
      </div>
      <div className="ft__postmain">
        <header className="ft__posthead">
          <span className="ft__author">{p.author}</span>
          {p.op ? <span className="ft__opbadge">Original Poster</span> : null}
          <span className="ft__handle">{p.handle}</span>
          <span className="ft__posttime">{p.time}</span>
        </header>

        {p.solution ? (
          <div className="ft__solution">
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
              <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Solution
          </div>
        ) : null}

        <div className="ft__body">
          {p.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <footer className="ft__actions">
          <button type="button" className={"ft__act" + (p.likes ? " is-liked" : "")}>
            <HeartGlyph filled={false} />
            {p.likes ? <span className="ft__actcount">{p.likes}</span> : null}
          </button>
          <button type="button" className="ft__act ft__act--share" aria-label="Share">
            <ShareGlyph />
          </button>
          <button type="button" className="ft__act ft__act--reply">
            <ReplyGlyph />
            Reply
          </button>
        </footer>
      </div>
    </article>
  );
}

export default function ForumTopic({ topic = TOPIC, posts = POSTS }) {
  const [tab, setTab] = useState("latest");
  const total = posts.length;

  return (
    <ForumChrome active={tab} onTab={setTab} hideNav>
      <div className="ft">
        <ForumBanner />
        <header className="ft__head">
          <h1 className="ft__title">{topic.title}</h1>
          <div className="ft__tags">
            <span className="ft__cat" style={{ "--c": topic.category.color }}>
              <span className="ft__catdot" aria-hidden="true" />
              {topic.category.label}
            </span>
            {topic.tags.map((t) => (
              <span key={t} className="ft__tag">{t}</span>
            ))}
          </div>
          <div className="ft__topicmeta">
            <span><b>{topic.replies}</b> replies</span>
            <span><b>{topic.views}</b> views</span>
            <span><b>{topic.participants}</b> participants</span>
            <span>created {topic.created}</span>
          </div>
        </header>

        <div className="ft__layout">
          <div className="ft__posts">
            {posts.map((p, i) => (
              <Post key={p.id} p={p} index={i} />
            ))}

            <div className="ft__replybox">
              <span className="ft__replyavatar u-avatar" style={{ "--sz": "36px", "--hue": 300 }} aria-hidden="true" />
              <button type="button" className="ft__replyfield">Reply to this topic…</button>
            </div>
          </div>

          <aside className="ft__timeline" aria-label="Topic progress">
            <div className="ft__tlcard">
              <span className="ft__tldate">{topic.created}</span>
              <div className="ft__tlbar" role="img" aria-label={`Post ${total} of ${topic.replies + 1}`}>
                <span className="ft__tlfill" style={{ height: "100%" }} />
              </div>
              <div className="ft__tlcounts">
                <span className="ft__tlnow">{total + 1}</span>
                <span className="ft__tltotal">/ {topic.replies + 1}</span>
              </div>
              <span className="ft__tldate">{posts[posts.length - 1].time}</span>
            </div>
          </aside>
        </div>
      </div>
    </ForumChrome>
  );
}
