import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdnameslist.css";
import { Caret } from "../../atoms/icons.jsx";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "ASC", text: "Name A→Z" },
  { value: "DESC", text: "Name Z→A" },
];

const NAMES = [
  {
    name: "Aria",
    subdomain: "aria.dcl.eth",
    tokenId: "1024",
    nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensAddressRecord: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    landId: "-59,144",
    isAlias: true,
    hue: 212,
  },
  {
    name: "NeonRider",
    subdomain: "neonrider.dcl.eth",
    tokenId: "2048",
    nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    landId: "Estate (143)",
    hue: 300,
  },
  {
    name: "Genesis",
    subdomain: "genesis.dcl.eth",
    tokenId: "512",
    nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensAddressRecord: "0x4b1d2e3c8a9f0b6c7d5e1a2f3b4c5d6e7f80a1b2",
    hue: 28,
  },
  {
    name: "VaporWave",
    subdomain: "vaporwave.dcl.eth",
    tokenId: "777",
    nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensOwnerAddress: "0x0000000000000000000000000000000000000000",
    hue: 160,
  },
  {
    name: "Pixelpunk",
    subdomain: "pixelpunk.dcl.eth",
    tokenId: "333",
    nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
    hue: 88,
  },
];

const CloneGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="5" y="5" width="9" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M11 5V3.6A1.6 1.6 0 0 0 9.4 2H3.6A1.6 1.6 0 0 0 2 3.6v5.8A1.6 1.6 0 0 0 3.6 11H5" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);
const PinGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="15" aria-hidden="true">
    <path d="M8 1.4c-2.5 0-4.5 2-4.5 4.5C3.5 9.3 8 14.6 8 14.6s4.5-5.3 4.5-8.7C12.5 3.4 10.5 1.4 8 1.4Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <circle cx="8" cy="5.9" r="1.7" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);
const RightRoundArrow = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
    <circle cx="9" cy="9" r="7.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M7 6l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AddRounded = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const ReclaimGlyph = () => (
  <svg viewBox="0 0 18 18" width="15" height="15" aria-hidden="true">
    <circle cx="9" cy="9" r="7.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M9 5.4v6M6.4 8.6 9 11.4l2.6-2.8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ExchangeGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path d="M2 5h9l-2.4-2.4M14 11H5l2.4 2.4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PencilGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path d="M11.2 2.6 13.4 4.8 5.2 13H3v-2.2L11.2 2.6Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
  </svg>
);
const InfoGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="bdnameslist__info">
    <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M8 7v4M8 4.6v.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const EthCoin = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" className="bdnameslist__ethcoin">
    <circle cx="16" cy="16" r="16" fill="#537FEE" />
    <path d="M16 6l5.5 9.3L16 18.6 10.5 15.3 16 6Z" fill="#fff" fillOpacity="0.85" />
    <path d="M16 19.7l5.5-3.3L16 25l-5.5-8.6L16 19.7Z" fill="#fff" fillOpacity="0.6" />
  </svg>
);
const EmptyHero = () => (
  <svg viewBox="0 0 87 86" width="87" height="86" aria-hidden="true">
    <rect x="3" y="16" width="81" height="54" rx="6" stroke="#a09ba8" strokeWidth="3" fill="none" />
    <path d="M6 20l37.5 27L81 20" stroke="#a09ba8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const shorten = (addr) => (addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "");

function AliasCell({ ens, avatarFace, hasProfileCreated }) {
  if (ens.isAlias) {
    return (
      <span className="bdnameslist__avatar">
        {avatarFace ? (
          <img className="bdnameslist__avatar-img" src={avatarFace} alt={ens.name} />
        ) : (
          <span className="bdnameslist__avatar-img u-avatar" style={{ "--sz": "32px", "--hue": ens.hue }} />
        )}
        <span className="bdnameslist__avatar-name">{ens.name}</span>
        <span className="bdnameslist__avatar-you">you</span>
      </span>
    );
  }
  return (
    <button type="button" className="bdnameslist__ghostbtn" disabled={!hasProfileCreated}>
      <AddRounded /> Assign to Avatar
    </button>
  );
}

function AddressCell({ ens }) {
  if (ens.ensOwnerAddress !== ens.nftOwnerAddress) {
    return (
      <button type="button" className="bdnameslist__ghostbtn">
        <ReclaimGlyph /> Reclaim to assign ETH address
      </button>
    );
  }
  if (ens.ensAddressRecord) {
    return (
      <span className="bdnameslist__address">
        <EthCoin />
        {shorten(ens.ensAddressRecord)}
        <span className="bdnameslist__copy" role="button" aria-label="copy address">
          <CloneGlyph />
        </span>
      </span>
    );
  }
  return (
    <button type="button" className="bdnameslist__ghostbtn">
      <AddRounded /> Assign ETH address
    </button>
  );
}

function LandCell({ ens }) {
  if (ens.ensOwnerAddress !== ens.nftOwnerAddress) {
    return (
      <button type="button" className="bdnameslist__ghostbtn">
        <ReclaimGlyph /> Reclaim to assign to location
      </button>
    );
  }
  if (!ens.landId) {
    return (
      <button type="button" className="bdnameslist__ghostbtn">
        <PinGlyph /> Assign to Location
      </button>
    );
  }
  return (
    <div className="bdnameslist__land">
      <span className="bdnameslist__land-coord">
        <PinGlyph />
        {ens.landId}
      </span>
      <a className="bdnameslist__land-redirect" href={`https://${ens.subdomain}.limo`} target="_blank" rel="noopener noreferrer" aria-label="Open world">
        <RightRoundArrow />
      </a>
    </div>
  );
}

function NameRow({ ens, avatarFace, hasProfileCreated }) {
  const unclaimed = ens.ensOwnerAddress !== ens.nftOwnerAddress;
  return (
    <tr className="bdnameslist__row">
      <td>
        <div className="bdnameslist__name">
          <span className="bdnameslist__name-icon u-avatar" style={{ "--sz": "32px", "--hue": ens.hue }} aria-hidden="true" />
          <span className="bdnameslist__subdomain">
            <span>{ens.name}</span>.dcl.eth
          </span>
          <span className="bdnameslist__copy" role="button" aria-label="copy subdomain">
            <CloneGlyph />
          </span>
          {unclaimed ? <span className="bdnameslist__unclaimed">Unclaimed</span> : null}
        </div>
      </td>
      <td><AliasCell ens={ens} avatarFace={avatarFace} hasProfileCreated={hasProfileCreated} /></td>
      <td><AddressCell ens={ens} /></td>
      <td><LandCell ens={ens} /></td>
      <td>
        <div className="bdnameslist__actions">
          <a className="bdnameslist__transfer" href={`https://decentraland.org/marketplace/contracts/0x2a187453064356c898cae034eaed119e1663acb8/tokens/${ens.tokenId}/transfer`} target="_blank" rel="noopener noreferrer">
            <ExchangeGlyph /> Transfer
          </a>
          <a className="bdnameslist__edit" href="#edit">
            <PencilGlyph /> Edit
          </a>
        </div>
      </td>
    </tr>
  );
}

function SkeletonRow() {
  return (
    <tr className="bdnameslist__row">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i}>
          <span className="u-skel" style={{ width: "100%" }}>
            <span className="u-skel__line" style={{ width: i === 0 ? "70%" : "55%" }} />
          </span>
        </td>
      ))}
    </tr>
  );
}

function EmptyState() {
  return (
    <div className="bdnameslist__empty">
      <div className="bdnameslist__empty-image">
        <EmptyHero />
      </div>
      <h3 className="bdnameslist__empty-title">Nothing Here Yet</h3>
      <span className="bdnameslist__empty-subtitle">
        Own your presence in the metaverse with a username free from numbers on the end (e.g.
        Genesis#1234), plus enjoy the added benefits of Voting Power and access to your own World!
      </span>
      <div className="bdnameslist__empty-actions">
        <button type="button" className="bdnameslist__primary">Claim Your Name</button>
      </div>
    </div>
  );
}

const HEADERS = [
  { key: "name", label: "Name", info: false },
  { key: "alias", label: "Linked Avatar", info: true },
  { key: "address", label: "Associated Address", info: true },
  { key: "land", label: "Linked LAND", info: true },
  { key: "actions", label: "Actions", info: false },
];

export default function BdNamesList({
  names = NAMES,
  alias = "aria.dcl.eth",
  avatarFace = null,
  hasProfileCreated = true,
  loading = false,
  initialSort = "ASC",
}) {
  const [navTab, setNavTab] = useState("names");
  const [sortBy, setSortBy] = useState(initialSort === "DESC" ? "DESC" : "ASC");
  const [sortOpen, setSortOpen] = useState(false);
  const [page] = useState(1);

  const total = names.length;
  const sorted = useMemo(() => {
    return [...names].sort((a, b) => {
      const cmp = a.subdomain.toLowerCase() < b.subdomain.toLowerCase() ? -1 : 1;
      return sortBy === "ASC" ? cmp : -cmp;
    });
  }, [names, sortBy]);

  const rows = sorted.map((n) => ({ ...n, isAlias: n.subdomain === alias }));
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const isEmpty = !loading && total === 0;
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.text ?? "";

  return (
    <BuilderChrome active={navTab} onTab={setNavTab}>
      <div className="bdnameslist">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="bdnameslist__content">
            <div className="bdnameslist__header">
              <div className="bdnameslist__title">
                <h1>Your NAMEs</h1>
                <span className="bdnameslist__count">
                  {total} {total === 1 ? "result" : "results"}
                </span>
              </div>
              <div className="bdnameslist__pageactions">
                {total > 1 ? (
                  <div className="bdnameslist__sortwrap">
                    Sort by
                    <div className="bdnameslist__sort">
                      <button
                        type="button"
                        className="bdnameslist__sortbtn"
                        onClick={() => setSortOpen((v) => !v)}
                        aria-expanded={sortOpen}
                      >
                        {sortLabel} <Caret size={12} />
                      </button>
                      {sortOpen && (
                        <div className="bdnameslist__sortmenu" role="menu">
                          {SORT_OPTIONS.map((o) => (
                            <button
                              key={o.value}
                              type="button"
                              role="menuitemradio"
                              aria-checked={o.value === sortBy}
                              className={"bdnameslist__sortitem" + (o.value === sortBy ? " is-active" : "")}
                              onClick={() => { setSortBy(o.value); setSortOpen(false); }}
                            >
                              {o.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
                <button type="button" className="bdnameslist__primary bdnameslist__primary--compact">
                  Mint a New NAME
                </button>
              </div>
            </div>

            <div className="bdnameslist__tablewrap">
              <table className="bdnameslist__table">
                <thead>
                  <tr>
                    {HEADERS.map((h) => (
                      <th key={h.key}>
                        <span className="bdnameslist__th">
                          {h.label}
                          {h.info ? <InfoGlyph /> : null}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                    : rows.map((ens) => (
                        <NameRow
                          key={ens.subdomain}
                          ens={ens}
                          avatarFace={avatarFace}
                          hasProfileCreated={hasProfileCreated}
                        />
                      ))}
                </tbody>
              </table>

              <div className="bdnameslist__tablefoot">
                <span className="bdnameslist__items">
                  {total} {total === 1 ? "result" : "results"}
                </span>
                <nav className="bdnameslist__pagination" aria-label="Pagination">
                  <button type="button" className="bdnameslist__page bdnameslist__page--nav" aria-label="Previous" disabled={page <= 1}>
                    ‹
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={"bdnameslist__page" + (i + 1 === page ? " is-active" : "")}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button type="button" className="bdnameslist__page bdnameslist__page--nav" aria-label="Next" disabled={page >= totalPages}>
                    ›
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </BuilderChrome>
  );
}
