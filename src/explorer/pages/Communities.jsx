import { useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import SearchField from "../../atoms/SearchField.jsx";
import { fmt } from "../../atoms/primitives.jsx";
import "./communities.css";

const COMMUNITIES = [
  { name: "Crystal Pavilion", owner: "crystal.dao", members: 860, vis: "Public", hue: 270, joined: false },
  { name: "Neon Collective", owner: "neon.eth", members: 25000000, vis: "Public", hue: 200, joined: false },
  { name: "Builders Guild", owner: "guild.eth", members: 432, vis: "Unlisted", hue: 95, joined: true },
  { name: "Fashion House", owner: "mvfw.eth", members: 2100, vis: "Public", hue: 330, joined: false },
  { name: "Crypto Lounge", owner: "cv.dcl.eth", members: 318, vis: "Public", hue: 45, joined: false },
  { name: "Art Salon", owner: "art.dao", members: 540, vis: "Public", hue: 180, joined: false },
  { name: "DAO Builders", owner: "dao.eth", members: 1980, vis: "Public", hue: 95, joined: true },
  { name: "Pixel Pals", owner: "pixel.eth", members: 612, vis: "Public", hue: 160, joined: false },
  { name: "SheFi", owner: "shefi.eth", members: 310, vis: "Private", hue: 220, joined: false },
  { name: "Toxic Events", owner: "toxic.eth", members: 587, vis: "Public", hue: 280, joined: false },
];

function Card({ c }) {
  const isPublic = c.vis === "Public";
  return (
    <article className="cm__card" data-sb-linkto="Explorer/Pages/CommunityCard">
      <div className="cm__banner" style={{ "--hue": c.hue }}>
        <span className="cm__bannermark" aria-hidden="true">{c.name}</span>
      </div>
      <div className="cm__cardbody">
        <div className="cm__name u-truncate" title={c.name}>{c.name}</div>
        <div className="cm__meta">
          <span className="cm__vispill">
            <span className="cm__visicon" aria-hidden="true">{isPublic ? "🌐" : "🔒"}</span>
            <span className={"cm__vis" + (isPublic ? " is-public" : "")}>{c.vis}</span>
          </span>
          <span className="cm__memberchip">
            <span className="cm__membicon" aria-hidden="true">👤</span>
            {fmt(c.members)} Members
          </span>
        </div>
        <div className="cm__actions">
          {c.joined ? (
            <button className="cm__joined" type="button">
              Joined
              <span className="cm__btncoin" aria-hidden="true">◆</span>
            </button>
          ) : (
            <button className="cm__join" type="button">
              {isPublic ? "Join" : "Request to join"}
              <span className="cm__btncoin" aria-hidden="true">◆</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

const BULLETS = [
  { icon: "♥", text: "Connect over shared interests" },
  { icon: "⚑", text: "Get notified about community events" },
  { icon: "✦", text: "Chat in a shared channel" },
];

export default function Communities() {
  const [tab, setTab] = useState("communities");

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="cm">
        <aside className="cm__side">
          <button className="cm__create" type="button" data-sb-linkto="Explorer/Components/CommunityCreate">+ Create a Community</button>

          <button className="cm__invites" type="button">
            <span>Invites &amp; Requests</span>
            <span className="cm__invbadge">3</span>
          </button>

          <div className="cm__promo">
            <div className="cm__promotitle">
              <span className="cm__promospark" aria-hidden="true">✦</span>
              Discover Communities!
            </div>
            <div className="cm__promosub">Find your people. Join the fun.</div>

            <div className="cm__promoart" aria-hidden="true">
              <span className="cm__crew" style={{ "--hue": 280, left: "16%" }} />
              <span className="cm__crew" style={{ "--hue": 50, left: "42%" }} />
              <span className="cm__crew" style={{ "--hue": 0, left: "68%" }} />
              <span className="cm__fire" />
            </div>

            <ul className="cm__bullets">
              {BULLETS.map((b) => (
                <li className="cm__bullet" key={b.text}>
                  <span className="cm__bicon" aria-hidden="true">{b.icon}</span>
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="cm__main">
          <div className="cm__header">
            <h1 className="cm__title">Communities</h1>
            <div className="cm__searchwrap">
              <SearchField placeholder="Search" />
            </div>
          </div>

          <div className="cm__section">
            <div className="cm__seclabel">Browse Communities ({COMMUNITIES.length})</div>
            <div className="cm__grid">
              {COMMUNITIES.map((c) => <Card key={c.name} c={c} />)}
            </div>
          </div>
        </section>
      </div>
    </ExploreChrome>
  );
}
