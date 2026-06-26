import { useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./stcreate.css";

const HERO = {
  titleFirstLine: "Create your own",
  changingWords: ["Wearables", "Emotes", "Worlds", "Experiences", "Scenes", "Games"],
  titleLastLine: "in Decentraland",
  subtitle:
    "Download the Creator Hub to start building immersive scenes and interactive experiences in Decentraland.",
};

const WHY_CARDS = [
  {
    id: "join",
    title: "Join a Community of Creators",
    description:
      "Share knowledge, collaborate, and build relationships in a community of artists, designers, and developers where you can see your work appreciated everyday.",
    grad: "linear-gradient(206deg, #c640cd 2.47%, #691fa9 98.81%)",
  },
  {
    id: "create",
    title: "Create in an Open, Decentralized Ecosystem",
    description:
      "Retain full control over your content on a platform that's governed by its users and build side-by-side with other creators in an open virtual world ready to be explored.",
    grad: "radial-gradient(2917.83% 156.44% at 16.06% 114.57%, #ff4f57 13.42%, #ffa25a 100%)",
  },
  {
    id: "benefit",
    title: "Benefit from a Creator-Centric Economy",
    description:
      "Decentraland is owned by its users, so you keep 97.5% of Marketplace sales while the rest funds community grants for creators like you. Plus, you'll get 2.5% royalties on resales.",
    grad: "linear-gradient(208deg, #ff2d55 13.94%, #c640cd 80.96%)",
  },
];

const CREATE_CARDS = [
  {
    id: "design-unique-wearables",
    title: "Design Unique Wearables",
    description:
      "In Decentraland, Wearables go beyond clothing. Think floating elements, glowing fabrics, robot prosthetics, alien bodies—anything is possible!",
    imgGrad: "linear-gradient(160deg, #c640cd 0%, #691fa9 100%)",
    tabs: [
      {
        title: "Regular",
        descriptionTitle: "Shape Your Digital Identity",
        descriptionSubTitle:
          "Craft the skins, clothes, accessories, and bodies that provide the Decentraland community with endless options to customize their digital identities.",
        skills: ["3D MODELING", "IMAGINATIVE FASHION SENSE"],
        links: [
          { label: "Creating Wearables", url: "https://docs.decentraland.org/creator/wearables/creating-wearables/" },
          {
            label: "Wearables in the Marketplace",
            url: "https://decentraland.org/marketplace/browse?section=wearables&vendor=decentraland&page=1&sortBy=newest&status=on_sale",
          },
          { label: "Publishing Wearables", url: "https://docs.decentraland.org/creator/wearables-and-emotes/publishing-collections" },
          { label: "Wearable Tutorials", url: "https://www.youtube.com/watch?v=zl43Fw7zROQ" },
        ],
      },
      {
        title: "Smart Wearables",
        descriptionTitle: "Experiences & Fashion Combined",
        descriptionSubTitle:
          "Want to create a jet pack that lets you fly or glasses that reveal a secret world? Tie Portable Experiences to Wearables, for a whole new realm of possibilities.",
        skills: ["ANIMATION", "IMAGINATIVE FASHION SENSE", "3D MODELING", "TYPESCRIPT"],
        links: [
          { label: "Portable Experience Docs", url: "https://docs.decentraland.org/creator/development-guide/sdk7/portable-experiences/" },
          { label: "SDK 7 Docs", url: "https://docs.decentraland.org/creator/development-guide/sdk7/sdk-101/" },
          { label: "Smart Wearables Docs", url: "https://docs.decentraland.org/creator/development-guide/sdk7/smart-wearables/" },
          {
            label: "Smart Wearables in the Marketplace",
            url: "https://decentraland.org/marketplace/browse?assetType=item&section=wearables&onlySmart=true",
          },
        ],
      },
    ],
  },
  {
    id: "animate-expressive-emotes",
    title: "Animate Expressive Emotes",
    description:
      "Create the avatar animations that allow Decentraland's community to form connections, share emotions, and participate in endless fun activities.",
    imgGrad: "linear-gradient(160deg, #ff4f57 0%, #ffa25a 100%)",
    tabs: [
      {
        title: "More than Motion",
        descriptionTitle: "More than Motion",
        descriptionSubTitle:
          "Surpassing simple animations, in Decentraland, Emotes take expression to the next level with the option of adding props and sounds!",
        skills: ["TYPESCRIPT", "3D MODELING", "ANIMATION"],
        links: [
          { label: "Creating Emotes", url: "https://docs.decentraland.org/creator/emotes/emotes-overview/" },
          { label: "Emote Tutorials", url: "https://www.youtube.com/watch?v=-iWslh4uQIk" },
          { label: "Publishing Emotes", url: "https://docs.decentraland.org/creator/wearables-and-emotes/publishing-collections" },
          { label: "Emotes in the Marketplace", url: "https://decentraland.org/marketplace/browse?assetType=item&section=emotes" },
        ],
      },
    ],
  },
  {
    id: "craft-immersive-experiences",
    title: "Craft Immersive Experiences",
    description:
      "Construct captivating scenes, interactive experiences, and games in an open-world ecosystem. Claim your own World or rent/buy LAND to start building.",
    imgGrad: "linear-gradient(160deg, #ff2d55 0%, #c640cd 100%)",
    tabs: [
      {
        title: "Basic",
        descriptionTitle: "Ideal for Beginners",
        descriptionSubTitle:
          "Drag and drop pre-made elements into place to create your dream scene or start with a scene template and customize the details to make it your own.",
        skills: ["ABILITY TO CLICK A MOUSE", "OVERACTIVE IMAGINATION"],
        links: [
          { label: "Explore Places", url: "https://decentraland.org/places/" },
          { label: "Download Creator Hub", url: "https://decentraland.org/download/creator-hub" },
          { label: "Building Tutorials", url: "https://www.youtube.com/watch?v=wm8ZD2kSyKA" },
          { label: "Worlds Essential Guide", url: "https://decentraland.org/blog/about-decentraland/decentraland-worlds-your-own-virtual-space" },
        ],
      },
      {
        title: "Advanced",
        descriptionTitle: "Complete Control Over Your Creations",
        descriptionSubTitle:
          "Transform your ideas to reality with Decentraland's SDK 7. Craft anything you can imagine, from complex scenes and interactive experiences to fully fledged games.",
        skills: ["TYPESCRIPT", "3D MODELING", "ANIMATION"],
        links: [
          { label: "Open Source Resources & Templates", url: "https://studios.decentraland.org/resources" },
          { label: "Download Creator Hub", url: "https://decentraland.org/download/creator-hub" },
          { label: "Building Docs", url: "https://docs.decentraland.org/creator/development-guide/sdk7/sdk-101/" },
          { label: "Building Tutorials", url: "https://www.youtube.com/watch?v=wm8ZD2kSyKA" },
        ],
      },
    ],
  },
];

const CONNECT_CARDS = [
  {
    id: "mrdhingia",
    name: "MrDhingia",
    description:
      "I love being a DCL creator because it lets me freely create cool 3D spaces. It's great to work with others, learn new things, and monetize my content, reaching people worldwide.",
    hue: 280,
    url: "https://x.com/MrDhingia",
  },
  {
    id: "canessa",
    name: "Canessa",
    description:
      "I think having unique Emotes is a way of making your avatar another form of yourself. I made myself a unique Emote so I could always have a special greeting [distinct from the standard animations everyone uses] for my friends.",
    hue: 330,
  },
  {
    id: "polygonal-mind",
    name: "Polygonal Mind",
    description:
      "Decentraland evolves almost every day on a technical level, but also on a community level. Newcomers come into the platform with new ideas that make the whole platform spin to accommodate them. It is very exciting to see the change in real time.",
    hue: 200,
  },
  {
    id: "tangpoko",
    name: "TangPoko",
    description:
      "There is a lot of gratification in creating Wearables and Emotes in Decentraland when you see everyone around you wearing and using them!",
    hue: 25,
  },
  {
    id: "nikki-fuego",
    name: "Nikki Fuego",
    description:
      "My whole life I've been a gamer and the one thing I've always wanted from games was ultimate customization with my character's wearables. [In Decentraland,] that fantasy became a reality.",
    hue: 0,
  },
];

const LEARN_CARDS = [
  {
    id: "isamazing",
    title: "Emote Workshop | Create Great Animations",
    name: "Isamazing",
    date: "January 30, 2024",
    hue: 300,
    url: "https://youtu.be/5PEF2pwZxtY",
  },
  {
    id: "kjwalker",
    title: "Making Skins | Creating Wearables",
    name: "KJWalker",
    date: "January 31, 2024",
    hue: 210,
    url: "https://www.youtube.com/watch?v=zx2CBy3pPfo",
  },
  {
    id: "nicoe",
    title: "Creating Scenes | SDK 7 and Smart Items",
    name: "NicoE",
    date: "January 31, 2024",
    hue: 160,
    url: "https://www.youtube.com/watch?v=J_EO1LZkaiA",
  },
  {
    id: "sango",
    title: "How to Make a Wearable | Workshop Series",
    name: "Sango",
    date: "January 24, 2024",
    hue: 30,
    url: "https://youtu.be/zl43Fw7zROQ",
  },
  {
    id: "sinful",
    title: "Publishing Wearables & Emotes",
    name: "Sinful",
    date: "January 31, 2024",
    hue: 350,
    url: "https://www.youtube.com/watch?v=vY7IYksmC2M",
  },
];

const EARN_SKILLS = [
  "3D MODELING",
  "CREATIVE DIRECTION",
  "LAND RENTAL",
  "LINKED WEARABLES",
  "VENUE RENTAL",
  "ADVERTISING",
  "EMOTE DESIGN",
  "ENTERTAINMENT",
  "PROGRAMMING",
  "WEARABLE DESIGN",
];

const FAQS = [
  {
    question: "What is Decentraland?",
    answer:
      "Launched in 2020, Decentraland is a virtual social world, the first decentralized metaverse, and the only one that is open source. Within the Decentraland platform, which can run on a browser or desktop app, users can create, experience, and monetize content and applications as well as socialize and attend a wide range of daily, community-driven events. Decentraland is unique in that it is owned, created, and governed by the people who use it every day. Through Decentraland's decentralized autonomous organization (DAO) users can submit and vote on proposals and even apply for grants for the community to vote on.",
  },
  {
    question: "What can I create in Decentraland?",
    answer:
      "It would be easier to ask what you can't create in Decentraland! As a virtual world created by its users, in Decentraland you can create just about everything.\nDecentraland Creators make all the components that go into crafting a digital identity, such as Wearables (this can include whole skins, body parts, articles of clothing, hair styles, accessories, etc.) as well as Emotes, animations for your avatar which can include props and sounds in addition to movement.\nThe landscape and activities of Decentraland are also all shaped by creators. Walking through Decentraland's Genesis City, you can explore a variety of content from different creators, built side-by-side: art galleries, theaters, gardens, night clubs, racetracks, casinos, entire game experiences, and more can be explored and created by everyone! To start building, download Decentraland's Creator Hub.",
  },
  {
    question: "How do I become a Decentraland creator?",
    answer:
      "Anyone can be a Decentraland creator, all it takes is a little knowhow and endless creative ideas! Depending on what you want to create, the knowledge you need to know differs. If you just want to create cool virtual scenes for yourself or to host events, and learning programming and 3D modeling isn't in your plans, then you can get started creating scenes right away by downloading Decentraland's Creator Hub.\n\nFor those familiar with or willing to learn 3D modeling and/or programming, all the technical specs and procedures you need to know to create in Decentraland can be found on the Creator Docs page, and there are many tutorials available online for creating Wearables, Emotes, and experiences.",
  },
  {
    question: "Is it possible to monetize my creations?",
    answer:
      "Yes, of course! Decentraland creators are able to monetize their skills in many ways.\n\nWearable and Emote creators publish their creations in the Marketplace, paying a $100 USD publication fee which goes to the DAO to fund community grants, and as a result earn 97.5% of the profits on all primary sales and 2.5% royalties on any secondary sales.\nSome scene creators monetize their experiences, the revenue of which they are able to keep fully for themselves, and lastly many creators offer their services for hire through Decentraland Studios.",
  },
  {
    question: "Do I need to own LAND to create experiences in Decentraland?",
    answer:
      "No, owning LAND is not necessary to create scenes or interactive experiences in Decentraland. Anyone is free to create content using Decentraland's SDK 7 or no-code Editor. Then, if you want to publish your creations so that you and others can explore and enjoy them, there are multiple options available to you, in addition to owning LAND.",
  },
  {
    question: "Do I need cryptocurrency or a digital wallet to use Decentraland?",
    answer:
      "You do not need to own cryptocurrency to enjoy Decentraland as it is free to use. If you decide to purchase a community-made creation from the Marketplace, there are multiple payment options available, such as credit/debit card and bank transfer in addition to various cryptocurrencies.\n\nAs for owning a digital wallet, if you don't already have one, you don't need to get one yourself if you don't want to. When you sign-in to Decentraland for the first time-creating your account-a digital wallet will be created for you behind the scenes, it's as simple as that!",
  },
];

const CREATOR_HUB_DOWNLOAD_URL = "https://decentraland.org/download/creator-hub";

const ChevronDown = () => (
  <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
    <path d="M8 12l8 8 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const PlayMark = () => (
  <svg className="stcreate__play" viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
    <circle cx="40" cy="40" r="38" fill="rgba(0,0,0,.45)" stroke="#fff" strokeWidth="2" />
    <path d="M33 28l22 12-22 12V28Z" fill="#fff" />
  </svg>
);

const DiscordMark = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true">
    <path
      d="M19.6 4.6A18 18 0 0 0 15.1 3.2l-.2.4a16.7 16.7 0 0 1 4 1.3 15.1 15.1 0 0 0-12 0 16.7 16.7 0 0 1 4-1.3l-.2-.4A18 18 0 0 0 4.4 4.6 18.9 18.9 0 0 0 1.2 17.2 18.1 18.1 0 0 0 6.7 20l.4-.6a11.9 11.9 0 0 1-1.9-.9l.5-.4a12.9 12.9 0 0 0 10.6 0l.5.4a11.9 11.9 0 0 1-1.9.9l.4.6a18 18 0 0 0 5.5-2.8 18.9 18.9 0 0 0-3.2-12.6ZM8.4 14.6c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm7.2 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"
      fill="#fff"
    />
  </svg>
);

const FaqArrow = ({ open }) => (
  <svg className={open ? "stcreate__faqarrow is-open" : "stcreate__faqarrow"} viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
    <circle cx="20" cy="20" r="18.5" fill="none" stroke="#a09ba8" strokeWidth="1.5" />
    <path d="M13 17l7 7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

function CreateCard({ card }) {
  const [active, setActive] = useState(card.tabs[0].title);
  const tab = card.tabs.find((t) => t.title === active) || card.tabs[0];
  return (
    <article className="stcreate__createcard">
      <div className="stcreate__createimg" style={{ background: card.imgGrad }} aria-hidden="true" />
      <div className="stcreate__createinfo">
        <h3 className="stcreate__createtitle">{card.title}</h3>
        <p className="stcreate__createdesc">{card.description}</p>
        <div className="stcreate__tabwrap">
          {card.tabs.length > 1 && (
            <div className="stcreate__tabbtns" role="tablist">
              {card.tabs.map((t) => (
                <button
                  key={t.title}
                  type="button"
                  role="tab"
                  aria-selected={active === t.title}
                  className={"stcreate__tabbtn" + (active === t.title ? " is-active" : "")}
                  onClick={() => setActive(t.title)}
                >
                  {t.title}
                </button>
              ))}
            </div>
          )}
          <div className="stcreate__tabblock">
            <h4 className="stcreate__tabtitle">{tab.descriptionTitle}</h4>
            <p className="stcreate__tabsub">{tab.descriptionSubTitle}</p>
          </div>
          <div className="stcreate__tabblock">
            <h4 className="stcreate__tabtitle">Required Skills</h4>
            <div className="stcreate__skills">
              {tab.skills.map((s) => (
                <span key={s} className="stcreate__skill">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="stcreate__tabblock">
            <h4 className="stcreate__tabtitle">Useful Links</h4>
            <div className="stcreate__links">
              {tab.links.map((link) => (
                <a key={link.url} className="stcreate__link" href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className={"stcreate__faqitem" + (open ? " is-open" : "")} role="button" tabIndex={0} aria-expanded={open} onClick={onToggle}>
      <div className="stcreate__faqrow">
        <span className="stcreate__faqq">{faq.question}</span>
        <FaqArrow open={open} />
      </div>
      <div className="stcreate__faqanswer" aria-hidden={!open}>
        <p className="stcreate__faqa">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function StCreate({
  whyCards = WHY_CARDS,
  createCards = CREATE_CARDS,
  connectCards = CONNECT_CARDS,
  learnCards = LEARN_CARDS,
  faqs = FAQS,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SitesChrome active="create" overlayNav>
      <div className="stcreate">
        <section className="stcreate__hero">
          <div className="stcreate__herobg" aria-hidden="true" />
          <div className="stcreate__heroscrim" aria-hidden="true" />
          <div className="stcreate__heroinner">
            <h1 className="stcreate__herotitle">
              {HERO.titleFirstLine}
              <br />
              <span className="stcreate__grad">{HERO.changingWords[0]}</span>
              <br />
              {HERO.titleLastLine}
            </h1>
            <p className="stcreate__herosub">{HERO.subtitle}</p>
            <div className="stcreate__heroactions">
              <a className="stcreate__cta" href={CREATOR_HUB_DOWNLOAD_URL}>
                Download Creator Hub
              </a>
            </div>
          </div>
          <div className="stcreate__chevron">
            <ChevronDown />
          </div>
        </section>

        <section className="stcreate__why">
          <h2 className="stcreate__sectitle">
            <span className="stcreate__grad">Why</span> creators choose Decentraland
          </h2>
          <div className="stcreate__whygrid">
            {whyCards.map((card) => (
              <div key={card.id} className="stcreate__whycard" style={{ background: card.grad }}>
                <div className="stcreate__whyinner">
                  <div className="stcreate__whyimg" aria-hidden="true" />
                  <div className="stcreate__whytext">
                    <h3 className="stcreate__whytitle">{card.title}</h3>
                    <p className="stcreate__whydesc">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="stcreate__create">
          <h2 className="stcreate__sectitle">
            Explore the <span className="stcreate__grad">creative</span> possibilities
          </h2>
          <div className="stcreate__createrail">
            {createCards.map((card) => (
              <CreateCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        {connectCards.length > 0 && (
        <section className="stcreate__connect">
          <h2 className="stcreate__sectitle">
            <span className="stcreate__grad">What</span> Decentraland creators say
          </h2>
          <div className="stcreate__connectrail">
            {connectCards.map((card) => (
              <a
                key={card.id}
                className="stcreate__connectcard"
                href={card.url || undefined}
                target={card.url ? "_blank" : undefined}
                rel={card.url ? "noopener noreferrer" : undefined}
              >
                <p className="stcreate__connectdesc">&ldquo;{card.description}&rdquo;</p>
                <div className="stcreate__connectuser">
                  <span className="u-avatar" style={{ "--hue": card.hue, "--sz": "40px" }} aria-hidden="true" />
                  <span className="stcreate__connectname">{card.name}</span>
                </div>
              </a>
            ))}
          </div>
          <a className="stcreate__discord" href="https://dcl.gg/discord" target="_blank" rel="noopener noreferrer">
            <span className="stcreate__discordtitle">Join the Community</span>
            <DiscordMark />
          </a>
        </section>
        )}

        {learnCards.length > 0 && (
        <section className="stcreate__learn">
          <h2 className="stcreate__sectitle">
            <span className="stcreate__grad">Learn</span> from Community Tutorials
          </h2>
          <div className="stcreate__learnrail">
            {learnCards.map((card) => (
              <a key={card.id} className="stcreate__learncard" href={card.url} target="_blank" rel="noopener noreferrer">
                <div className="stcreate__learnvideo" style={{ background: `linear-gradient(140deg, hsl(${card.hue} 60% 45%), hsl(${card.hue + 40} 55% 28%))` }}>
                  <PlayMark />
                </div>
                <div className="stcreate__learninfo">
                  <div className="stcreate__learnrow">
                    <div className="stcreate__learnuser">
                      <span className="u-avatar" style={{ "--hue": card.hue, "--sz": "40px" }} aria-hidden="true" />
                      <span className="stcreate__learnname">{card.name}</span>
                    </div>
                    <span className="stcreate__learndate">{card.date}</span>
                  </div>
                  <h3 className="stcreate__learntitle">{card.title}</h3>
                </div>
              </a>
            ))}
          </div>
          <div className="stcreate__learnextra">
            <div className="stcreate__extrablock">
              Want to see more?
              <a
                className="stcreate__btn stcreate__btn--filled"
                href="https://www.youtube.com/@decentraland_foundation/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                visit our youtube channel
              </a>
            </div>
            <div className="stcreate__extrablock">
              Think your tutorial should be featured here?
              <a
                className="stcreate__btn stcreate__btn--white"
                href="https://docs.google.com/forms/d/e/1FAIpQLScn1HL8_ZFL_Lw-7sbqL9g4WLctWALWUKthGEtjBGQlmIuHLQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit tutorial for review
              </a>
            </div>
          </div>
        </section>
        )}

        <section className="stcreate__earn">
          <div className="stcreate__earnbg" aria-hidden="true" />
          <div className="stcreate__earninner">
            <h2 className="stcreate__earntitle">
              Want to create but not a creator? Hire the best through <span className="stcreate__grad">Decentraland Studios</span>
            </h2>
            <p className="stcreate__earnsub">Browse a vetted registry of Decentraland's most talented creators skilled in:</p>
            <div className="stcreate__earnskills">
              {EARN_SKILLS.map((s) => (
                <span key={s} className="stcreate__earnskill">
                  {s}
                </span>
              ))}
            </div>
            <div className="stcreate__earnactions">
              <div className="stcreate__extrablock">
                Ready to get started?
                <a
                  className="stcreate__btn stcreate__btn--filled"
                  href="https://studios.decentraland.org/studios"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  browse creators
                </a>
              </div>
              <div className="stcreate__extrablock">
                Already a creator?
                <a
                  className="stcreate__btn stcreate__btn--white"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc_KsbODUsJdC4_UTn7T91RTYwSJBAEZIWlCAxnk3rRBinFWg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Registry
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="stcreate__faqs" aria-label="Frequently Asked Questions">
          <div className="stcreate__faqborder">
            <div className="stcreate__faqcontainer">
              <p className="stcreate__faqsub">Learn more about Decentraland</p>
              <h2 className="stcreate__faqtitle">
                Frequently Asked
                <br />
                Questions
              </h2>
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} open={expanded === i} onToggle={() => setExpanded(expanded === i ? false : i)} />
              ))}
              <a className="stcreate__faqcta" href="https://docs.decentraland.org/faqs/decentraland-101" target="_blank" rel="noopener noreferrer">
                see more
              </a>
            </div>
          </div>
        </section>
      </div>
    </SitesChrome>
  );
}
