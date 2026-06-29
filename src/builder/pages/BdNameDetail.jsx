import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdnamedetail.css";

const ENS = {
  name: "Aria",
  subdomain: "aria.dcl.eth",
  tokenId: "1024",
  nftOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  ensOwnerAddress: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  ensAddressRecord: "0x9f3c1bd2a4e57f0019aa83b2c01d9e7c5b6a7a21",
  landId: "-59,144",
  hue: 212,
};

const ChevronLeft = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloneGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <rect x="5" y="5" width="9" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M11 5V3.6A1.6 1.6 0 0 0 9.4 2H3.6A1.6 1.6 0 0 0 2 3.6v5.8A1.6 1.6 0 0 0 3.6 11H5" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);
const PencilGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d="M11.2 2.6 13.4 4.8 5.2 13H3v-2.2L11.2 2.6Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
  </svg>
);
const UserPlusGlyph = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
    <circle cx="7" cy="6" r="2.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M2.5 15c0-2.5 2-4.2 4.5-4.2 1 0 1.9.3 2.6.7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    <path d="M13.5 10v5M11 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const CrosshairsGlyph = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
    <circle cx="9" cy="9" r="4.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M9 1.4v3M9 13.6v3M1.4 9h3M13.6 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PinGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="16" aria-hidden="true">
    <path d="M8 1.4c-2.5 0-4.5 2-4.5 4.5C3.5 9.3 8 14.6 8 14.6s4.5-5.3 4.5-8.7C12.5 3.4 10.5 1.4 8 1.4Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <circle cx="8" cy="5.9" r="1.7" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);
const InfoGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="bdnamedetail__info">
    <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M8 7v4M8 4.6v.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const EthCoin = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true" className="bdnamedetail__ethcoin">
    <circle cx="16" cy="16" r="16" fill="#537FEE" />
    <path d="M16 6l5.5 9.3L16 18.6 10.5 15.3 16 6Z" fill="#fff" fillOpacity="0.85" />
    <path d="M16 19.7l5.5-3.3L16 25l-5.5-8.6L16 19.7Z" fill="#fff" fillOpacity="0.6" />
  </svg>
);
const ProfileGlyph = () => (
  <svg viewBox="0 0 30 30" width="30" height="30" aria-hidden="true">
    <circle cx="15" cy="15" r="15" fill="#43404a" />
    <circle cx="15" cy="12" r="5" fill="#a09ba8" />
    <path d="M5.5 25c0-4.5 4-7.5 9.5-7.5s9.5 3 9.5 7.5" fill="#a09ba8" />
  </svg>
);
const EmptyHero = () => (
  <svg viewBox="0 0 87 86" width="87" height="86" aria-hidden="true">
    <rect x="3" y="16" width="81" height="54" rx="6" stroke="#a09ba8" strokeWidth="3" fill="none" />
    <path d="M6 20l37.5 27L81 20" stroke="#a09ba8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const shorten = (addr) => (addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "");
const isCoords = (v) => /^-?\d+,-?\d+$/.test(v || "");

function ENSEmptyState({ name, error }) {
  const unavailable = error === "Name unavailable" && name;
  return (
    <div className="bdnamedetail__empty">
      <div className="bdnamedetail__empty-image">
        <EmptyHero />
      </div>
      <h3 className="bdnamedetail__empty-title">{unavailable ? "Unavailable NAME" : "Nothing Here Yet"}</h3>
      <span className="bdnamedetail__empty-subtitle">
        {unavailable
          ? "See if it's on sale in the Marketplace"
          : "Own your presence in the metaverse with a username free from numbers on the end (e.g. Genesis#1234), plus enjoy the added benefits of Voting Power and access to your own World!"}
      </span>
      <div className="bdnamedetail__empty-actions">
        <button type="button" className="bdnamedetail__primary">
          {unavailable ? "Continue" : "Claim Your Name"}
        </button>
      </div>
    </div>
  );
}

function AliasField({ ens, alias, avatarFace }) {
  let field;
  if (alias !== ens.subdomain) {
    field = (
      <div className="bdnamedetail__editable">
        <span className="bdnamedetail__placeholder">Assign to Avatar</span>
        <button type="button" className="bdnamedetail__action bdnamedetail__action--primary" aria-label="Assign to Avatar">
          <UserPlusGlyph />
        </button>
      </div>
    );
  } else {
    field = (
      <div className="bdnamedetail__editable">
        <span className="bdnamedetail__avatar" data-testid="alias-avatar">
          {avatarFace ? (
            <img className="bdnamedetail__avatar-img" src={avatarFace} alt={ens.name} />
          ) : (
            <ProfileGlyph />
          )}
          <span className="bdnamedetail__avatar-name">{ens.name}</span>
          you
        </span>
      </div>
    );
  }
  return (
    <div className="bdnamedetail__field">
      <span className="bdnamedetail__field-title">
        Linked Avatar
        <span className="bdnamedetail__tip" title="You can only assign one NAME per avatar">
          <InfoGlyph />
        </span>
      </span>
      {field}
    </div>
  );
}

function AddressField({ ens, shouldReclaim }) {
  let field;
  if (shouldReclaim) {
    field = (
      <div className="bdnamedetail__editable">
        <span className="bdnamedetail__placeholder">Reclaim to assign address</span>
        <button type="button" className="bdnamedetail__action" disabled aria-label="Reclaim to assign address">
          <PencilGlyph />
        </button>
      </div>
    );
  } else if (!ens.ensAddressRecord) {
    field = (
      <div className="bdnamedetail__editable">
        <span className="bdnamedetail__placeholder">Assign ETH address</span>
        <button type="button" className="bdnamedetail__action" aria-label="Assign ETH address">
          <PencilGlyph />
        </button>
      </div>
    );
  } else {
    field = (
      <span className="bdnamedetail__editable">
        <span className="bdnamedetail__editable-value">
          <EthCoin />
          {shorten(ens.ensAddressRecord)}
        </span>
        <button type="button" className="bdnamedetail__action" aria-label="Edit address">
          <PencilGlyph />
        </button>
      </span>
    );
  }
  return (
    <div className={"bdnamedetail__field" + (shouldReclaim ? " is-disabled" : "")}>
      <span className="bdnamedetail__field-title">
        Associated Address
        <span className="bdnamedetail__tip" title="Use your Decentraland NAME across Web3 thanks to a partnership with ENS.">
          <InfoGlyph />
        </span>
      </span>
      {field}
    </div>
  );
}

function LandField({ ens, shouldReclaim }) {
  let field;
  if (shouldReclaim) {
    field = (
      <div className="bdnamedetail__editable">
        <span className="bdnamedetail__placeholder">Reclaim to assign location</span>
        <button type="button" className="bdnamedetail__action" disabled aria-label="Reclaim to assign location">
          <CrosshairsGlyph />
        </button>
      </div>
    );
  } else if (!ens.landId) {
    field = (
      <div className="bdnamedetail__editable">
        <span className="bdnamedetail__placeholder">Assign to Location</span>
        <button type="button" className="bdnamedetail__action" aria-label="Assign to Location">
          <CrosshairsGlyph />
        </button>
      </div>
    );
  } else if (isCoords(ens.landId)) {
    field = (
      <div className="bdnamedetail__editable" data-testid="land-field">
        <span className="bdnamedetail__editable-value">
          <div className="bdnamedetail__pin">
            <PinGlyph />
          </div>
          {ens.landId}
        </span>
        <button type="button" className="bdnamedetail__action" aria-label="Edit location">
          <PencilGlyph />
        </button>
      </div>
    );
  } else {
    field = (
      <div className="bdnamedetail__editable" data-testid="estate-field">
        <span className="bdnamedetail__editable-value">
          <div className="bdnamedetail__pin">
            <PinGlyph />
          </div>
          {`Estate (${ens.landId})`}
        </span>
        <button type="button" className="bdnamedetail__action" aria-label="Edit location">
          <PencilGlyph />
        </button>
      </div>
    );
  }
  return (
    <div className={"bdnamedetail__field" + (shouldReclaim ? " is-disabled" : "")}>
      <span className="bdnamedetail__field-title">
        Linked LAND
        <span
          className="bdnamedetail__tip"
          title="When you assign a LAND parcel or estate a NAME it can be easily navigated to with a dedicated URL (e.g. https://name.dcl.eth or https://name.dcl.eth.limo)."
        >
          <InfoGlyph />
        </span>
      </span>
      {field}
    </div>
  );
}

export default function BdNameDetail({
  ens = ENS,
  alias = "aria.dcl.eth",
  avatarFace = null,
  isLoading = false,
  error = null,
}) {
  const [navTab, setNavTab] = useState("names");

  const shouldReclaim = useMemo(
    () => (ens ? ens.ensOwnerAddress !== ens.nftOwnerAddress : false),
    [ens]
  );

  return (
    <BuilderChrome active={navTab} onTab={setNavTab}>
      <div className="bdnamedetail">
        {isLoading ? (
          <div className="bdnamedetail__loader">
            <span className="bdnamedetail__spinner" aria-label="Loading" />
          </div>
        ) : !isLoading && error ? (
          <ENSEmptyState name={ens?.name} error={error} />
        ) : ens ? (
          <>
            <a className="bdnamedetail__return" href="/builder/names">
              <ChevronLeft />
              Return
            </a>

            <div className="bdnamedetail__main">
              <span
                className="bdnamedetail__image u-avatar"
                style={{ "--sz": "268px", "--hue": ens.hue }}
                aria-label={ens.subdomain}
              />

              <div className="bdnamedetail__fields">
                <div className="bdnamedetail__field-container bdnamedetail__field-container--header">
                  <div>
                    <span className="bdnamedetail__field-title">Name</span>
                    <span className="bdnamedetail__subdomain">
                      <span>
                        <span>{ens.name}</span>.dcl.eth
                      </span>
                      <span className="bdnamedetail__copy" role="button" aria-label="copy name">
                        <CloneGlyph />
                      </span>
                      {shouldReclaim ? <span className="bdnamedetail__unclaimed">Unclaimed</span> : null}
                    </span>
                  </div>
                  <div className="bdnamedetail__actions">
                    <a className="bdnamedetail__transfer" href={`https://decentraland.org/marketplace/contracts/0x2a187453064356c898cae034eaed119e1663acb8/tokens/${ens.tokenId}/transfer`} target="_blank" rel="noopener noreferrer">
                      Transfer
                    </a>
                    {shouldReclaim ? (
                      <button type="button" className="bdnamedetail__primary bdnamedetail__primary--reclaim">
                        Reclaim name
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="bdnamedetail__field-container">
                  <AliasField ens={ens} alias={alias} avatarFace={avatarFace} />
                  <AddressField ens={ens} shouldReclaim={shouldReclaim} />
                  <LandField ens={ens} shouldReclaim={shouldReclaim} />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </BuilderChrome>
  );
}
