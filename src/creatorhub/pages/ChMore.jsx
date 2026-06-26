import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import Button from "../../atoms/Button.jsx";
import "./chmore.css";

const BUILDER_URL = "https://decentraland.org/builder";
const SUBMIT_EVENT_URL = "https://decentraland.org/events/submit";

const NewEventArt = () => (
  <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
    <rect x="22" y="30" width="96" height="86" rx="10" fill="#2f2b36" stroke="#56505f" strokeWidth="2.5" />
    <rect x="22" y="30" width="96" height="24" rx="10" fill="var(--more-primary)" />
    <rect x="40" y="20" width="7" height="20" rx="3.5" fill="#8a8492" />
    <rect x="93" y="20" width="7" height="20" rx="3.5" fill="#8a8492" />
    <circle cx="70" cy="84" r="20" fill="none" stroke="#fff" strokeWidth="5" />
    <path d="M70 73v22M59 84h22" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
  </svg>
);
const EditorArt = () => (
  <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
    <rect x="18" y="34" width="104" height="72" rx="8" fill="#2f2b36" stroke="#56505f" strokeWidth="2.5" />
    <rect x="18" y="34" width="104" height="16" rx="8" fill="#46414e" />
    <circle cx="30" cy="42" r="3" fill="var(--more-primary)" />
    <circle cx="40" cy="42" r="3" fill="var(--more-danger)" />
    <circle cx="50" cy="42" r="3" fill="var(--more-success)" />
    <path d="M48 88l-14-14 14-14" stroke="var(--more-epic)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M92 88l14-14-14-14" stroke="var(--more-epic)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M78 64l-16 24" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
  </svg>
);
const CollectionsArt = () => (
  <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
    <rect x="24" y="44" width="92" height="64" rx="9" fill="#2f2b36" stroke="#56505f" strokeWidth="2.5" />
    <rect x="34" y="34" width="72" height="10" rx="5" fill="#56505f" />
    <rect x="44" y="24" width="52" height="10" rx="5" fill="#46414e" />
    <path d="M70 60l5.7 11.6 12.8 1.9-9.3 9 2.2 12.8L70 96.3 58.6 102l2.2-12.8-9.3-9 12.8-1.9L70 60Z" fill="var(--more-legendary)" />
  </svg>
);
const NamesArt = () => (
  <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
    <rect x="22" y="42" width="96" height="56" rx="10" fill="#2f2b36" stroke="#56505f" strokeWidth="2.5" />
    <path d="M38 84V58l24 26V58" stroke="var(--more-epic)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M76 84V58h12a9 9 0 0 1 0 18h-12m12 0 8 8" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LandArt = () => (
  <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
    <path d="M70 24l44 26-44 26-44-26 44-26Z" fill="#2f2b36" stroke="#56505f" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 50v24l44 26 44-26V50" fill="none" stroke="#56505f" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M70 24l44 26-44 26-44-26 44-26Z" fill="rgba(255,45,85,.16)" />
    <path d="M48 39l44 26M70 76V50M92 39 48 65" stroke="#6e6776" strokeWidth="2" />
    <circle cx="70" cy="50" r="6" fill="var(--more-primary)" />
  </svg>
);

const CREATE_CARDS = [
  {
    key: "submit_event",
    title: "Submit Event",
    description: "Host your own event on Decentraland.",
    art: <NewEventArt />,
    href: SUBMIT_EVENT_URL,
  },
  {
    key: "legacy_web_editor",
    title: "Legacy Web Editor",
    description: "Access the old web editor to continue working on your scenes.",
    art: <EditorArt />,
    flip: true,
    href: `${BUILDER_URL}/scenes`,
  },
  {
    key: "collections",
    title: "Collections",
    description: "Create, review and publish your collections of Wearables and Emotes.",
    art: <CollectionsArt />,
    href: `${BUILDER_URL}/collections`,
  },
];

const MANAGE_CARDS = [
  {
    key: "names",
    title: "NAMEs",
    description: "Claim your unique name and assign it to your avatar or your parcels.",
    art: <NamesArt />,
    href: `${BUILDER_URL}/names`,
  },
  {
    key: "land",
    title: "LAND",
    description: "Publish Scenes, creata Estates and manage permissions of your LAND.",
    art: <LandArt />,
    href: `${BUILDER_URL}/land`,
  },
];

function HorizontalCardWithImage({ card }) {
  return (
    <div className={"more__card" + (card.flip ? " more__card--flip" : "")}>
      <div className="more__cardimage">{card.art}</div>
      <div className="more__cardcontent">
        <div className="more__cardtext">
          <p className="more__cardtitle">{card.title}</p>
          <p className="more__carddesc">{card.description}</p>
        </div>
        <div className="more__cardactions">
          <Button variant="primary" size="sm">Open in Browser</Button>
        </div>
      </div>
    </div>
  );
}

export default function ChMore() {
  return (
    <CreatorHubChrome active="manage">
      <main className="MorePage">
        <div className="more__container">
          <h1 className="more__title">More</h1>

          <h2 className="more__section">Create</h2>
          <div className="more__grid more__grid--3">
            {CREATE_CARDS.map((c) => (
              <div key={c.key} className="more__cell">
                <HorizontalCardWithImage card={c} />
              </div>
            ))}
          </div>

          <h2 className="more__section">Manage</h2>
          <div className="more__grid more__grid--2">
            {MANAGE_CARDS.map((c) => (
              <div key={c.key} className="more__cell">
                <HorizontalCardWithImage card={c} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </CreatorHubChrome>
  );
}
