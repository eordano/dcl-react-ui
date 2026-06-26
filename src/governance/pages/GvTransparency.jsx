import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvtransparency.css";

const MISSION_LINKS = [
  { id: "discord", label: "Join our Discord", icon: "discord", href: "#" },
  { id: "docs", label: "Check our docs", icon: "doc", href: "#" },
  { id: "dashboard", label: "Transparency Dashboard", icon: "chart", href: "#" },
  { id: "data", label: "DCL Data Source", icon: "database", href: "#" },
];
const MEMBER_LINKS = [
  { id: "how", label: "How the DAO Works", icon: "doc-outline", href: "#" },
  { id: "curator", label: "Apply as Wearables Curator", icon: "person", href: "#" },
  { id: "delegate", label: "Apply as DAO Delegate", icon: "person", href: "#" },
];

const BALANCES = [
  { symbol: "MANA", amount: 18432905 },
  { symbol: "USDC", amount: 1240500 },
  { symbol: "USDT", amount: 642118 },
  { symbol: "DAI", amount: 305744 },
  { symbol: "ETH", amount: 412 },
  { symbol: "MATIC", amount: 89320 },
  { symbol: "WETH", amount: 58 },
];

const INCOME = {
  total: 1284530,
  previous: 12.4,
  details: [
    { name: "Vesting Contract", value: 962400, description: "MANA released from the 10-year DAO vesting contract." },
    { name: "Marketplace Fees", value: 214860, description: "2.5% secondary-market fee accrued to the DAO." },
    { name: "Names & LAND Auctions", value: 78420, description: "Primary sales of DCL names and LAND parcels." },
    { name: "Wearable Curation Fees", value: 22150, description: "Submission fees from collection curation." },
    { name: "Returned Grants", value: 6700, description: "Unspent grant funds returned to the treasury." },
    { name: "Misc Donations", value: 0.62, description: "Rounding / dust returns." },
  ],
};
const EXPENSES = {
  total: 1098240,
  previous: -8.1,
  details: [
    { name: "Community Grants", value: 742300, description: "Disbursements to active grant projects." },
    { name: "Core Unit Operations", value: 196500, description: "Facilitation, SAB and DAO Committee operations." },
    { name: "Infrastructure & Catalysts", value: 88420, description: "Catalyst node operators and hosting." },
    { name: "Events & Marketing", value: 54120, description: "Community events and growth initiatives." },
    { name: "Audits & Legal", value: 16500, description: "Smart-contract audits and legal counsel." },
    { name: "Gas & Transaction Fees", value: 0.4, description: "On-chain settlement dust." },
  ],
};

const COMMITTEES = [
  {
    name: "Security Advisory Board",
    description:
      "The Security Advisory Board (SAB) holds the keys that can pause or revoke malicious smart contracts in an emergency.",
    members: [
      { name: "Yemel Jardi", address: "0x71c…a4e1", hue: 268 },
      { name: "Esteban Ordano", address: "0x12c…9f0c", hue: 210 },
      { name: "Agustin Mendez", address: "0xab1…77d3", hue: 130 },
      { name: "Nicolas Santangelo", address: "0x55a…1b2a", hue: 30 },
      { name: "Pablo De Haro", address: "0x3e7…c901", hue: 305 },
    ],
  },
  {
    name: "DAO Council",
    description:
      "The DAO Council reviews grant requests, enacts passed proposals, and represents the community in operational matters.",
    members: [
      { name: "Marcos Nieto", address: "0x9f3…7a21", hue: 190 },
      { name: "Tobias Bordenave", address: "0x44e…0b58", hue: 48 },
      { name: "Lautaro Petaccio", address: "0x7d2…e3a9", hue: 340 },
    ],
  },
  {
    name: "Wearable Curation Committee",
    description:
      "The Wearable Curation Committee reviews and approves wearables and emotes submitted to the Decentraland marketplace.",
    members: [
      { name: "Hiro Lambert", address: "0xc0f…12ab", hue: 96 },
      { name: "Sara Khoury", address: "0x6b8…44cd", hue: 12 },
      { name: "Dévora Lin", address: "0x2a1…99ef", hue: 280 },
      { name: "Karl Renz", address: "0x8de…5577", hue: 160 },
    ],
  },
];

const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtBal = (n) => Math.round(n).toLocaleString("en-US");

const Glyph = {
  discord: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M19.5 5.3A17 17 0 0 0 15.3 4l-.3.5a13 13 0 0 1 3.7 1.2 11 11 0 0 0-9.4 0A13 13 0 0 1 13 4.5L12.7 4A17 17 0 0 0 8.5 5.3C5.9 9.1 5.2 12.8 5.5 16.5a17 17 0 0 0 5.2 2.6l.6-1a11 11 0 0 1-1.8-.9l.4-.3a8 8 0 0 0 7.2 0l.4.3a11 11 0 0 1-1.8.9l.6 1a17 17 0 0 0 5.2-2.6c.4-4.3-.6-8-2.8-11.2ZM9.7 14.3c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5Zm4.6 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5Z" />
    </svg>
  ),
  doc: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Z" />
    </svg>
  ),
  chart: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M5 21V10h3v11H5Zm5.5 0V3h3v18h-3ZM16 21V14h3v7h-3ZM3 23h18v-1.6H3V23Z" />
    </svg>
  ),
  database: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2c-4.4 0-8 1.3-8 3v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5c0-1.7-3.6-3-8-3Zm6 17c0 .5-2.4 1.5-6 1.5S6 19.5 6 19v-2.6c1.5.8 3.7 1.1 6 1.1s4.5-.3 6-1.1V19Zm0-5c0 .5-2.4 1.5-6 1.5S6 14.5 6 14v-2.6c1.5.8 3.7 1.1 6 1.1s4.5-.3 6-1.1V14Zm-6-4.5C8.4 9.5 6 8.5 6 8V5.4c1.5.8 3.7 1.1 6 1.1s4.5-.3 6-1.1V8c0 .5-2.4 1.5-6 1.5Z" />
    </svg>
  ),
  "doc-outline": () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  ),
  person: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  open: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  ),
  chevron: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  info: () => (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM9 12H7V7.2h2V12Z" />
    </svg>
  ),
};

function SidebarLinkButton({ label, icon, href }) {
  const Icon = Glyph[icon];
  return (
    <a className="gvtransparency__linkbtn" href={href} target="_blank" rel="noreferrer">
      <span className="gvtransparency__linkbtnInner">
        {Icon ? <span className="gvtransparency__linkicon"><Icon /></span> : null}
        <span className="gvtransparency__linklabel">{label}</span>
      </span>
      <span className="gvtransparency__linkopen"><Glyph.open /></span>
    </a>
  );
}

function Sidebar({ title, description, links }) {
  return (
    <div className="gvtransparency__sidebar">
      <h2 className="gvtransparency__sidebarTitle">{title}</h2>
      <p className="gvtransparency__sidebarDesc">{description}</p>
      <div className="gvtransparency__links">
        {links.map((l) => (
          <SidebarLinkButton key={l.id} {...l} />
        ))}
      </div>
    </div>
  );
}

function DaoVestingCard() {
  return (
    <a className="gvtransparency__financial" href="https://decentraland.org/vesting/#/" target="_blank" rel="noreferrer">
      <div>
        <span className="gvtransparency__financialTitle">
          DAO vesting contract
          <span className="gvtransparency__helper" title="The main source of financial support for the Decentraland DAO is a 10-year vesting contract worth 222,000,000 MANA tokens vested continuously that started on February 19, 2020.">
            <Glyph.info />
          </span>
        </span>
        <div className="gvtransparency__financialValue">$1,204,860 releasable</div>
        <div className="gvtransparency__financialSub">$118,420,300 unvested</div>
      </div>
      <span className="gvtransparency__financialChevron"><Glyph.chevron /></span>
    </a>
  );
}

function TokenBalanceCard({ symbol, amount }) {
  return (
    <div className="gvtransparency__token">
      <span className="gvtransparency__tokenCoin" data-sym={symbol}>{symbol.slice(0, 1)}</span>
      <div className="gvtransparency__tokenDesc">
        <span className="gvtransparency__tokenSymbol">{symbol} Tokens</span>
        <span className="gvtransparency__tokenAmount">{fmt(amount)}</span>
      </div>
    </div>
  );
}

const MAX_TAGS = 5;
function MonthlyTotal({ title, data, invertDiffColors = false }) {
  const [full, setFull] = useState(false);
  const big = data.details.filter((d) => Number(d.value) > 1);
  const small = data.details.filter((d) => Number(d.value) <= 1);
  const visible = full ? [...big, ...small] : big.slice(0, MAX_TAGS);
  const hidden = Math.max(big.length - MAX_TAGS, 0) + small.length;
  const positive = data.previous >= 0;
  const numberClass = invertDiffColors
    ? positive
      ? "is-red"
      : "is-green"
    : positive
      ? "is-green"
      : "is-red";

  return (
    <div className="gvtransparency__monthly">
      <div className="gvtransparency__monthlyHead">
        <span className="gvtransparency__monthlyLabel">{title}</span>
        <div className="gvtransparency__monthlyTotal">
          ${fmtBal(data.total)}
          <span className="gvtransparency__monthlyUsd">USD</span>
        </div>
        <div className="gvtransparency__monthlySub">
          <strong className={"gvtransparency__number " + numberClass}>
            {fmtBal(data.previous)}%
          </strong>{" "}
          vs previous 30 days
        </div>
      </div>

      <div className="gvtransparency__details">
        {visible.map((d, i) => {
          const isSmall = Number(d.value) <= 1;
          return (
            <div
              key={["detail", i].join("::")}
              className={"gvtransparency__detail" + (isSmall ? " is-small" : "")}
            >
              <span className="gvtransparency__detailName">{d.name}</span>
              <span className="gvtransparency__detailValue">
                <span>${fmtBal(d.value)}</span>
                <span className="gvtransparency__helper" title={d.description}>
                  <Glyph.info />
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {hidden > 0 && (
        <button type="button" className="gvtransparency__viewmore" onClick={() => setFull((v) => !v)}>
          {full ? "Show less" : `View ${hidden} more...`}
        </button>
      )}
    </div>
  );
}

function MemberCard({ member }) {
  return (
    <a className="gvtransparency__member" href={`/governance/profile/activity?address=${member.address}`}>
      <span className="gvtransparency__memberAvatar u-avatar" style={{ "--sz": "42px", "--hue": member.hue }} aria-hidden="true" />
      <span className="gvtransparency__memberName">{member.name}</span>
    </a>
  );
}

function MembersSection({ committee }) {
  return (
    <div className="gvtransparency__committee">
      <h3 className="gvtransparency__committeeHead">
        {committee.name}
        <span className="gvtransparency__helper" title={committee.description}>
          <Glyph.info />
        </span>
      </h3>
      <div className="gvtransparency__members">
        {committee.members.map((m) => (
          <MemberCard key={m.address} member={m} />
        ))}
      </div>
    </div>
  );
}

export default function GvTransparency({
  balances = BALANCES,
  income = INCOME,
  expenses = EXPENSES,
  committees = COMMITTEES,
  loading = false,
}) {
  const [tab, setTab] = useState("transparency");

  return (
    <GovernanceChrome active={tab} onTab={setTab}>
      <div className="gvtransparency">
        {loading ? (
          <div className="gvtransparency__loading" role="status" aria-label="Loading">
            <span className="gvtransparency__spinner" aria-hidden="true" />
          </div>
        ) : (
          <div className="gvtransparency__container">
            <div className="gvtransparency__grid">
              <Sidebar
                title="Our Mission"
                description="To support and facilitate the continual growth of the Decentraland platform."
                links={MISSION_LINKS}
              />
              <div className="gvtransparency__col">
                <DaoVestingCard />

                <div className="gvtransparency__card gvtransparency__balanceCard">
                  <h2 className="gvtransparency__cardTitle">Current Balance</h2>
                  <div className="gvtransparency__tokens">
                    {balances.map((b, i) => (
                      <TokenBalanceCard key={["bal", i].join("::")} {...b} />
                    ))}
                  </div>
                </div>

                <div className="gvtransparency__monthlyTotals">
                  <MonthlyTotal title="Last 30 Days Income" data={income} />
                  <MonthlyTotal title="Last 30 Days Expenses" data={expenses} invertDiffColors />
                </div>
              </div>
            </div>

            <div className="gvtransparency__grid">
              <Sidebar
                title="We do have brain-power"
                description="This set of individuals was chosen by the community to represent them."
                links={MEMBER_LINKS}
              />
              <div className="gvtransparency__col">
                <div className="gvtransparency__card">
                  {committees.map((c, i) => (
                    <MembersSection key={[c.name, i].join("::")} committee={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GovernanceChrome>
  );
}
