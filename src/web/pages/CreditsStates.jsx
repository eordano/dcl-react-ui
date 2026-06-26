import "./creditsstates.css";

function CreditsCoin({ size = 18, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="cs2coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a7bff" />
          <stop offset="1" stopColor="#5b4ad6" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#cs2coin)" stroke="#3a2fa0" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#cdc6ff" strokeWidth="1.2" opacity=".7" />
      <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="800" fill="#f2efff">C</text>
    </svg>
  );
}

const GOALS = [
  { id: "walk", title: "Walk around Genesis City", status: "progress", prog: 2, total: 5, reward: 100 },
  { id: "avatar", title: "Customize your avatar", status: "claimed", reward: 50 },
];

function InfoIcon({ size = 13 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.5h.01" />
    </svg>
  );
}

function ClockIcon({ size = 12 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" />
    </svg>
  );
}

function GoalIcon({ size = 22 }) {
  return (
    <span className="cs2__goalicon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
      </svg>
    </span>
  );
}

const NAV_ICONS = [
  "M12 3l8 6v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1V9z",
  "M9 3v18M15 3v18M3 9h18M3 15h18",
  "M4 7h16M4 12h16M4 17h10",
  "M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z",
  "M12 8a4 4 0 100 8 4 4 0 000-8z",
  "M4 4h16v12H5l-1 4z",
];

function GoalRow({ g }) {
  return (
    <div className="cs2__goal">
      <GoalIcon />
      <div className="cs2__goalinfo">
        <div className="cs2__goaltitle">{g.title} <InfoIcon size={11} /></div>
        {g.status === "progress" ? (
          <div className="cs2__progress">
            <div className="cs2__bar"><span style={{ width: (g.prog / g.total) * 100 + "%" }} /></div>
            <span className="cs2__progresslabel">{g.prog}/{g.total}</span>
          </div>
        ) : (
          <button className="cs2__claimed">CLAIMED</button>
        )}
      </div>
      <span className="cs2__reward"><CreditsCoin size={16} className="cs2__coin" /> +{g.reward}</span>
    </div>
  );
}

export default function CreditsStates() {
  return (
    <div className="cs2__stage">
      <div className="cs2__world" aria-hidden="true">
        <div className="cs2__nameplate">EvaristoXR0370</div>
        <div className="cs2__avatar" />
      </div>

      <nav className="cs2__sidebar" aria-hidden="true">
        {NAV_ICONS.map((d, i) => (
          <span className="cs2__navicon" key={i}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
              strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
          </span>
        ))}
      </nav>

      <div className="cs2__chat" aria-hidden="true">
        <div className="cs2__chatday">Today</div>
        <div className="cs2__chatmsg">
          <span className="cs2__chatname">DCL System</span>
          <span className="cs2__chatbody">Type /help for available commands</span>
          <span className="cs2__chattime">11:32 PM</span>
        </div>
        <div className="cs2__chatinput">Press Enter to Chat</div>
      </div>

      <section className="cs2" role="dialog" aria-label="Weekly Rewards">
        <button className="cs2__close" aria-label="Close">×</button>

        <header className="cs2__head">
          <div className="cs2__headmain">
            <h2 className="cs2__title">Weekly Rewards <InfoIcon /></h2>
            <p className="cs2__subtitle">Earn Marketplace Credits, Go Shopping!</p>
          </div>
          <div className="cs2__credits">
            <div className="cs2__creditsrow">
              <span className="cs2__creditsicon" aria-hidden="true"><CreditsCoin size={20} /></span>
              <span className="cs2__creditslabel">Your Credits</span>
            </div>
            <div className="cs2__creditsval">0</div>
            <button className="cs2__market">GO TO MARKETPLACE</button>
          </div>
        </header>

        <div className="cs2__goalshead">
          <span className="cs2__goalslabel">Your Weekly Goals</span>
          <span className="cs2__timeleft"><ClockIcon /> Time Left: <b>3 Days, 6 Hours</b></span>
        </div>

        <div className="cs2__goals">
          {GOALS.map((g) => <GoalRow key={g.id} g={g} />)}
        </div>
      </section>
    </div>
  );
}
