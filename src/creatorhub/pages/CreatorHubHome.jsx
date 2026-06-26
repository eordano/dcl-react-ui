import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import { asset } from "../../asset.js";
import "./creatorhubhome.css";

const SCENES = [
  { id: "s1", title: "Genesis Plaza Booth" },
  { id: "s2", title: "Neon Night Market" },
  { id: "s3", title: "Sakura Garden" },
  { id: "s4", title: "Cyber Arena" },
  { id: "s5", title: "Lo-Fi Lounge" },
  { id: "s6", title: "Desert Expo Hall" },
];

const LEARN_RESOURCES = [
  { title: "Let's build the metaverse together", href: "https://docs.decentraland.org/creator/", kind: "doc" },
  { title: "Scene Editor About", href: "https://docs.decentraland.org/creator/scene-editor/get-started/about-editor", kind: "doc" },
  { title: "Development Workflow", href: "https://docs.decentraland.org/creator/scenes-sdk7/getting-started/dev-workflow", kind: "doc" },
  { title: "Product Updates", href: "https://www.youtube.com/playlist?list=PLAcRraQmr_GMJw77zKvN84LX_OLyn-lVz", kind: "video" },
  { title: "SDK Tutorials", href: "https://www.youtube.com/playlist?list=PLAcRraQmr_GP_K8WN7csnKnImK4R2TgMA", kind: "video" },
];

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M12 3 3 8l9 5 9-5-9-5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 13l9 5 9-5M3 16l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.7" />
  </svg>
);
const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4.2L5 21V4.5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const VideoIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <rect x="3" y="5.5" width="13" height="13" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16 10.5 21 8v8l-5-2.5v-3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const EditorArt = () => (
  <img className="chh__bannerart" src={asset("assets/ch-home-editor.png")} alt="" aria-hidden="true" />
);
const BookArt = () => (
  <img className="chh__bannerart" src={asset("assets/ch-home-book.png")} alt="" aria-hidden="true" />
);
const InfluenceArt = () => (
  <img className="chh__feedbackart" src={asset("assets/ch-home-influence.png")} alt="" aria-hidden="true" />
);

function CardBanner({ art, title, onClick }) {
  const clickable = !!onClick;
  return (
    <div
      className={"chh__banner" + (clickable ? " is-clickable" : "")}
      onClick={onClick}
      {...(clickable ? { role: "button", tabIndex: 0 } : {})}
    >
      <span className="chh__bannerimg">{art}</span>
      <span className="chh__bannertitle">{title}</span>
    </div>
  );
}

function CardItem({ title, icon, href }) {
  const inner = (
    <>
      <span className="chh__itemicon" aria-hidden="true">{icon}</span>
      <span className="chh__itemtitle u-truncate">{title}</span>
    </>
  );
  if (href != null) {
    return (
      <a className="chh__item" href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className="chh__item">
      {inner}
    </button>
  );
}

function SignInCard({ onSignIn }) {
  return (
    <article className="chh__card chh__card--signin">
      <div className="chh__cardbody chh__cardbody--centered">
        <p className="chh__signintitle">Sign In to publish your scenes</p>
        <button type="button" className="chh__signinbtn" onClick={onSignIn}>
          Sign In
        </button>
      </div>
    </article>
  );
}

function ScenesCard({ scenes }) {
  const empty = scenes.length === 0;
  return (
    <article className="chh__card">
      <CardBanner art={<EditorArt />} title="Scenes" onClick={() => {}} />
      {empty ? (
        <div className="chh__cardbody chh__cardbody--centered chh__cardbody--empty">
          <p className="chh__emptytext">Create your first scene</p>
          <button type="button" className="chh__ghostbtn">Start Building</button>
        </div>
      ) : (
        <>
          <div className="chh__cardbody">
            <div className="chh__list">
              {scenes.slice(0, 6).map((s) => (
                <CardItem key={s.id} title={s.title} icon={<LayersIcon />} />
              ))}
            </div>
          </div>
          <div className="chh__cardactions">
            <button type="button" className="chh__seeall">See All</button>
          </div>
        </>
      )}
    </article>
  );
}

function LearnCard() {
  return (
    <article className="chh__card">
      <CardBanner art={<BookArt />} title="Learn" onClick={() => {}} />
      <div className="chh__cardbody">
        <div className="chh__list">
          {LEARN_RESOURCES.map((r, i) => (
            <CardItem
              key={i}
              title={r.title}
              href={r.href}
              icon={r.kind === "video" ? <VideoIcon /> : <BookmarkIcon />}
            />
          ))}
        </div>
      </div>
      <div className="chh__cardactions">
        <button type="button" className="chh__seeall">See All</button>
      </div>
    </article>
  );
}

function FeedbackCard() {
  return (
    <article className="chh__card chh__card--feedback">
      <div className="chh__cardbody chh__cardbody--centered">
        <span className="chh__feedbackimg" aria-hidden="true"><InfluenceArt /></span>
        <p className="chh__feedbacktitle">Shape the future of Creator Hub</p>
        <button type="button" className="chh__signinbtn">Submit Feedback</button>
      </div>
    </article>
  );
}

export default function CreatorHubHome({ scenes = SCENES, signedIn = true }) {
  const [tab, setTab] = useState("home");

  return (
    <CreatorHubChrome active={tab} onTab={setTab} signedIn={signedIn}>
      <main className="chh">
        <div className="chh__container">
          <h1 className="chh__title">Welcome to Creator Hub</h1>

          <div className="chh__grid">
            {!signedIn ? <SignInCard onSignIn={() => {}} /> : null}
            <ScenesCard scenes={scenes} />
            <LearnCard />
            <FeedbackCard />
          </div>
        </div>
      </main>
    </CreatorHubChrome>
  );
}
