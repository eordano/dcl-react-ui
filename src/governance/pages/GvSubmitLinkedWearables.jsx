import { useState } from "react";
import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import { asset } from "../../asset.js";
import "./gvsubmitlinkedwearables.css";

const TITLE = "Linked Wearables Registry";
const DESCRIPTION =
  "Linked Wearables are a way to represent NFTs as Wearables in Decentraland. Third parties need to submit a proposal to be approved by the DAO in order to access the tool in the Builder and get slots to submit the 3D models. By using this tool, you will be able to submit NFTs as Wearables to be curated and made available for your NFT holders inside Decentraland.";
const DESCRIPTION_NOTE =
  "Note that after being approved, you will need to create an API with the endpoints described in this Document.";
const MAX_IMAGES = 10;

const PROGRAMMATIC_NOTE =
  "In general, large collections of more than 5k NFTs are not created manually, they are systematically generated from individual traits that were designed individually. If your Linked Wearables Collection is made like this, share the details below.";

function MarkdownNotice() {
  return (
    <span className="gvsubmitlinkedwearables__mdnotice" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
        <path d="M4 10V6l2 2 2-2v4M11 6v4M9.5 8.5 11 10l1.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Markdown supported</span>
    </span>
  );
}

function Section({ label, sub, markdown, children }) {
  return (
    <section className="gvsubmitlinkedwearables__section">
      <div className="gvsubmitlinkedwearables__label">
        {label}
        {markdown && <MarkdownNotice />}
      </div>
      {sub && <p className="gvsubmitlinkedwearables__sublabel">{sub}</p>}
      {children}
    </section>
  );
}

function ListSection({ label, sub, placeholder, addLabel, items, onAdd, onEdit, onRemove, canAdd = true }) {
  return (
    <Section label={label} sub={sub}>
      <div className="gvsubmitlinkedwearables__list">
        {items.map((item) => (
          <div key={item.id} className="gvsubmitlinkedwearables__listrow">
            <input
              className="gvsubmitlinkedwearables__input"
              placeholder={placeholder}
              value={item.value}
              onChange={(e) => onEdit(item.id, e.target.value)}
            />
            <button
              type="button"
              className="gvsubmitlinkedwearables__remove"
              aria-label="Remove"
              onClick={() => onRemove(item.id)}
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        ))}
        {canAdd && (
          <button type="button" className="gvsubmitlinkedwearables__add" onClick={onAdd}>
            {addLabel}
          </button>
        )}
      </div>
    </Section>
  );
}

function MarkdownArea({ placeholder, value, onChange, limit }) {
  return (
    <>
      <textarea
        className="gvsubmitlinkedwearables__textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="gvsubmitlinkedwearables__counter">{value.length}/{limit}</div>
    </>
  );
}

let _uid = 100;
const seed = (values) => values.map((v) => ({ id: ++_uid, value: v }));

export default function GvSubmitLinkedWearables({ signedIn = true }) {
  const [tab, setTab] = useState("proposals");

  const [name, setName] = useState("");
  const [marketplaceLink, setMarketplaceLink] = useState("");
  const [links, setLinks] = useState(seed([""]));
  const [images, setImages] = useState(seed([""]));
  const [nftCollections, setNftCollections] = useState("");
  const [motivation, setMotivation] = useState("");
  const [items, setItems] = useState("1");
  const [governance, setGovernance] = useState("");
  const [contracts, setContracts] = useState(seed([""]));
  const [managers, setManagers] = useState(seed([""]));
  const [programmatic, setProgrammatic] = useState(false);
  const [method, setMethod] = useState("");
  const [coAuthor, setCoAuthor] = useState("");

  const editList = (setter) => (id, value) =>
    setter((arr) => arr.map((it) => (it.id === id ? { ...it, value } : it)));
  const addList = (setter) => () => setter((arr) => [...arr, { id: ++_uid, value: "" }]);
  const removeList = (setter) => (id) =>
    setter((arr) => {
      const next = arr.filter((it) => it.id !== id);
      return next.length ? next : [{ id: ++_uid, value: "" }];
    });

  if (!signedIn) {
    return (
      <GovernanceChrome active={tab} onTab={setTab}>
        <div className="gvsubmitlinkedwearables gvsubmitlinkedwearables--gate">
          <div className="gvsubmitlinkedwearables__signin">
            <img className="gvsubmitlinkedwearables__signinlogo" src={asset("assets/dcl-logo.png")} alt="" />
            <h2 className="gvsubmitlinkedwearables__signintitle">{TITLE}</h2>
            <p className="gvsubmitlinkedwearables__signindesc">
              You need to sign in to submit a Linked Wearables Registry proposal.
            </p>
            <button type="button" className="gvsubmitlinkedwearables__submit">Sign in</button>
          </div>
        </div>
      </GovernanceChrome>
    );
  }

  return (
    <GovernanceChrome active={tab} onTab={setTab}>
      <div className="gvsubmitlinkedwearables">
        <div className="gvsubmitlinkedwearables__layout">
          <a className="gvsubmitlinkedwearables__back" href="/governance/submit" aria-label="Back to submit">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4l-4 4 4 4" />
            </svg>
          </a>

          <form className="gvsubmitlinkedwearables__container" onSubmit={(e) => e.preventDefault()}>
            <section className="gvsubmitlinkedwearables__section">
              <h1 className="gvsubmitlinkedwearables__h1">{TITLE}</h1>
            </section>

            <section className="gvsubmitlinkedwearables__section">
              <p className="gvsubmitlinkedwearables__desc">{DESCRIPTION}</p>
              <p className="gvsubmitlinkedwearables__desc">{DESCRIPTION_NOTE}</p>
            </section>

            <Section
              label="Name"
              sub="Please enter the name that represents your Project, Company, or Community as a whole"
            >
              <input
                className="gvsubmitlinkedwearables__input"
                placeholder="Enter the name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="gvsubmitlinkedwearables__counter">{name.length}/80</div>
            </Section>

            <Section
              label="NFT Marketplace Listing"
              sub="Provide an URL where users can see your NFT collection listed in an NFT marketplace like OpenSea, Rarible, or any other"
            >
              <input
                className="gvsubmitlinkedwearables__input"
                placeholder="Add a link here"
                value={marketplaceLink}
                onChange={(e) => setMarketplaceLink(e.target.value)}
              />
            </Section>

            <ListSection
              label="Links"
              sub="Links for your project website, Discord server, social media, or any other relevant space for your Project"
              placeholder="Add a link here"
              addLabel="Add another link"
              items={links}
              onAdd={addList(setLinks)}
              onEdit={editList(setLinks)}
              onRemove={removeList(setLinks)}
            />

            <ListSection
              label="Collection Images"
              sub={`Provide up to ${MAX_IMAGES} images to show the community what your collection and wearables looks like. JPG, PNG, BMP & WEBP formats supported.`}
              placeholder="Insert image URL"
              addLabel="Add another image"
              items={images}
              onAdd={addList(setImages)}
              onEdit={editList(setImages)}
              onRemove={removeList(setImages)}
              canAdd={images.length < MAX_IMAGES}
            />

            <Section
              label="NFT Collections"
              sub="Describe the NFT Collections you created. If it’s only one, just describe that one"
              markdown
            >
              <MarkdownArea
                placeholder="Describe the NFT Collections you created here"
                value={nftCollections}
                onChange={setNftCollections}
                limit={3500}
              />
            </Section>

            <Section
              label="Motivation"
              sub="Why do you want to have your NFTs represented in Decentraland?"
              markdown
            >
              <MarkdownArea
                placeholder="A brief motivation"
                value={motivation}
                onChange={setMotivation}
                limit={3500}
              />
            </Section>

            <Section
              label="Items in Linked Wearables Collection"
              sub="How many 3D models (Linked Wearables) will be uploaded. Note: This is not the number of NFTs in the original collection."
            >
              <input
                className="gvsubmitlinkedwearables__input gvsubmitlinkedwearables__input--number"
                type="number"
                min="1"
                placeholder="Add the number of items you will upload"
                value={items}
                onChange={(e) => setItems(e.target.value)}
              />
            </Section>

            <Section
              label="Intellectual Property"
              sub="Provide proof that you are the rightful owner or representative of the Project, Company, or Community. Please share any links with relevant information."
              markdown
            >
              <MarkdownArea
                placeholder="Provide proof here"
                value={governance}
                onChange={setGovernance}
                limit={3500}
              />
            </Section>

            <ListSection
              label="Smart Contracts"
              sub="Share the Addresses of the smart contracts of your NFT collections"
              placeholder="Add Ethereum address"
              addLabel="Add another address"
              items={contracts}
              onAdd={addList(setContracts)}
              onEdit={editList(setContracts)}
              onRemove={removeList(setContracts)}
            />

            <ListSection
              label="Managers"
              sub="Addresses of the representatives that will Manage the tool. Note: Managers are the only ones allowed to add item representations and manage the tool"
              placeholder="Add Ethereum address"
              addLabel="Add another address"
              items={managers}
              onAdd={addList(setManagers)}
              onEdit={editList(setManagers)}
              onRemove={removeList(setManagers)}
            />

            <Section
              label="Is this collection programmatically generated?"
              sub="The collection you will upload to Decentraland as Linked Wearables is programmatically generated. This means the 3D models you will submit to Decentraland were made this way."
            >
              <div className="gvsubmitlinkedwearables__radios">
                <label className="gvsubmitlinkedwearables__radio">
                  <input
                    type="radio"
                    name="gvlw-programmatic"
                    checked={programmatic}
                    onChange={() => setProgrammatic(true)}
                  />
                  <span className="gvsubmitlinkedwearables__radiomark" aria-hidden="true" />
                  Yes
                </label>
                <label className="gvsubmitlinkedwearables__radio">
                  <input
                    type="radio"
                    name="gvlw-programmatic"
                    checked={!programmatic}
                    onChange={() => setProgrammatic(false)}
                  />
                  <span className="gvsubmitlinkedwearables__radiomark" aria-hidden="true" />
                  No
                </label>
              </div>
              <p className="gvsubmitlinkedwearables__postlabel">{PROGRAMMATIC_NOTE}</p>
            </Section>

            {programmatic && (
              <Section
                label="Method"
                sub="Describe the method used to create the programmatic collection. If possible, share proof and links to the repository."
                markdown
              >
                <MarkdownArea
                  placeholder="Describe the method"
                  value={method}
                  onChange={setMethod}
                  limit={3500}
                />
              </Section>
            )}

            <Section
              label="Co-Authors"
              sub="Add the Decentraland addresses of any co-authors of this proposal"
            >
              <input
                className="gvsubmitlinkedwearables__input"
                placeholder="Add Ethereum address"
                value={coAuthor}
                onChange={(e) => setCoAuthor(e.target.value)}
              />
            </Section>

            <section className="gvsubmitlinkedwearables__section">
              <button type="submit" className="gvsubmitlinkedwearables__submit">Submit</button>
            </section>
          </form>
        </div>
      </div>
    </GovernanceChrome>
  );
}
