import { Coin } from "../../atoms/icons.jsx";
import "./marketplace.css";

const GOALS = [
  { title: "Visit 3 different scenes", prog: 3, total: 3, reward: 4, status: "claim" },
  { title: "Equip a wearable", prog: 1, total: 1, reward: 2, status: "completed" },
  { title: "Attend a live event", prog: 1, total: 1, reward: 5, status: "claimed" },
  { title: "Add a friend", prog: 1, total: 3, reward: 3, status: "progress" },
  { title: "Vote in a DAO proposal", prog: 0, total: 1, reward: 6, status: "progress" },
];

const STEPS = [
  { n: 1, text: "Complete your goals each week" },
  { n: 2, text: "Claim your earned Credits" },
  { n: 3, text: "Get Wearables & Emotes in the Marketplace for free! (1 Credit = 1 MANA)" },
];

function GoalRow({ g }) {
  return (
    <div className="mc__goal">
      <span className={"mc__goalcheck" + (g.status === "claimed" || g.status === "completed" || g.status === "claim" ? " is-done" : "")}>
        {(g.status === "claimed" || g.status === "completed" || g.status === "claim") ? "✓" : `${g.prog}/${g.total}`}
      </span>
      <div className="mc__goalinfo">
        <div className="mc__goaltitle">{g.title}</div>
        {g.status === "progress" && (
          <div className="mc__bar"><span style={{ width: (g.prog / g.total) * 100 + "%" }} /></div>
        )}
      </div>
      <div className="mc__goalreward"><Coin size={15} className="mc__coin" /> +{g.reward}</div>
      {g.status === "claim" && <button className="mc__claim">Claim to collect</button>}
      {g.status === "completed" && <span className="mc__tag mc__tag--ok">Completed</span>}
      {g.status === "claimed" && <span className="mc__tag mc__tag--done">Claimed</span>}
      {g.status === "progress" && <span className="mc__tag">In progress</span>}
    </div>
  );
}

export default function MarketplaceCredits() {
  const claimable = GOALS.filter((g) => g.status === "claim").reduce((a, g) => a + g.reward, 0);

  return (
    <div className="ep__backdrop">
      <div className="mc">
        <button className="ep__close mc__close" aria-label="Close">×</button>

        <div className="mc__scroll">
          <header className="mc__head">
            <h2 className="mc__title">Earn Marketplace Credits,<br />Go Shopping!</h2>
            <p className="mc__subtitle">How to Earn and Claim Marketplace Credits</p>

            <div className="mc__widget">
              <div className="mc__widgetlabel">Your Credits</div>
              <div className="mc__widgetval"><Coin size={30} className="mc__coin" /> {12 + claimable}</div>
              <div className="mc__widgetexpire">Expire in 5 days</div>
            </div>
          </header>

          <section className="mc__section">
            <div className="mc__sectionhead">
              <h3 className="mc__sectiontitle">Weekly Rewards</h3>
              <span className="mc__timeleft">Time Left: <b>2d 14h</b> · Resets Sunday 11:59pm UTC</span>
            </div>
            <div className="mc__goallabel">Your weekly goals</div>
            <div className="mc__goals">
              {GOALS.map((g) => <GoalRow key={g.title} g={g} />)}
            </div>
            {claimable > 0 && (
              <button className="mc__claimall"><Coin size={18} className="mc__coin" /> Claim {claimable} Credits</button>
            )}
          </section>

          <section className="mc__section">
            <h3 className="mc__sectiontitle">How it works</h3>
            <div className="mc__steps">
              {STEPS.map((s) => (
                <div className="mc__step" key={s.n}>
                  <span className="mc__stepnum">{s.n}</span>
                  <span className="mc__steptext">{s.text}</span>
                </div>
              ))}
            </div>
            <a className="mc__learn" href="/rewards-terms">LEARN MORE</a>
          </section>
        </div>
      </div>
    </div>
  );
}
