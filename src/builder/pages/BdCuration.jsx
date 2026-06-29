import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdcuration.css";
import { Caret } from "../../atoms/icons.jsx";

const SORT_OPTIONS = [
  { value: "MOST_RELEVANT", text: "Most relevant" },
  { value: "CREATED_AT_DESC", text: "Newest" },
  { value: "NAME_ASC", text: "Name asc" },
  { value: "NAME_DESC", text: "Name desc" },
];

const STATUS_OPTIONS = [
  { value: "ALL_STATUS", text: "All status" },
  { value: "under_review", text: "Under Review" },
  { value: "to_review", text: "To Review" },
  { value: "approved", text: "Approved" },
  { value: "rejected", text: "Rejected" },
];

const TYPE_OPTIONS = [
  { value: "ALL_TYPES", text: "All types" },
  { value: "standard", text: "Standard" },
  { value: "third_party", text: "Linked" },
];

const ASSIGNEE_OPTIONS = [
  { value: "all", text: "All assignees" },
  { value: "0x9f3c4d1e7a2188cf90b3a6e7c4d5f6a7b8c9d0e1", text: "kira.eth (you)" },
  { value: "0x4b1a8e6f3c2d9b0a7e5f1c2d3b4a5e6f70819203", text: "0x4b1a…9203" },
  { value: "0x7c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f70615243", text: "marco.eth" },
];

const COLLECTIONS = [
  {
    id: "c1", name: "Genesis Threads", type: "standard", status: "under_review",
    count: 12, owner: "0xa1b2…44ff", curationStatus: "to_review",
    assignee: null, date: "Review request", ago: "2 hours ago",
    forumLink: null,
    thumbs: ["linear-gradient(135deg,#438fff,#2f004d)", "linear-gradient(135deg,#ff2d55,#350447)", "linear-gradient(135deg,#ff4bed,#220040)", "linear-gradient(135deg,#982de2,#1a0a2e)"],
  },
  {
    id: "c2", name: "Neon Streetwear Drop", type: "standard", status: "under_review",
    count: 8, owner: "0xc3d4…21aa", curationStatus: "under_review",
    assignee: "0x9f3c4d1e7a2188cf90b3a6e7c4d5f6a7b8c9d0e1", assigneeName: "kira.eth", you: true,
    date: "Review request", ago: "5 hours ago",
    forumLink: null,
    thumbs: ["linear-gradient(135deg,#1f8a70,#06231c)", "linear-gradient(135deg,#ff743a,#3a1500)", "linear-gradient(135deg,#73d3d3,#062a2a)", "linear-gradient(135deg,#ffc647,#3a2c00)"],
  },
  {
    id: "c3", name: "Aether Linked Wearables", type: "third_party", isProgrammatic: true,
    count: 24, owner: null, curationStatus: "to_review",
    assignee: null, date: "Published", ago: "1 day ago", forumLink: null,
    thumbs: ["linear-gradient(135deg,#b05cff,#2f004d)", "linear-gradient(135deg,#438fff,#06231c)", "linear-gradient(135deg,#ff2d55,#3a1500)", "linear-gradient(135deg,#34ce76,#062a2a)"],
  },
  {
    id: "c4", name: "Cyber Samurai Armory", type: "standard", status: "synced",
    count: 5, owner: "0xe5f6…77bb", curationStatus: "approved",
    assignee: "0x7c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f70615243", assigneeName: "marco.eth",
    date: "Review request", ago: "3 days ago",
    forumLink: null,
    thumbs: ["linear-gradient(135deg,#b05cff,#2f004d)", "linear-gradient(135deg,#438fff,#06231c)", "linear-gradient(135deg,#ff2d55,#3a1500)"],
  },
  {
    id: "c5", name: "Lo-Fi Emote Pack", type: "standard", status: "unsynced",
    count: 4, owner: "0x0918…3344", curationStatus: "rejected",
    assignee: "0x4b1a8e6f3c2d9b0a7e5f1c2d3b4a5e6f70819203", assigneeName: "0x4b1a…9203",
    date: "Review request", ago: "4 days ago",
    forumLink: null,
    thumbs: ["linear-gradient(135deg,#ff4bed,#350447)", "linear-gradient(135deg,#34ce76,#06231c)", "linear-gradient(135deg,#ffc647,#3a2c00)", "linear-gradient(135deg,#438fff,#1a0a2e)"],
  },
  {
    id: "c6", name: "Desert Festival Wearables", type: "standard", status: null,
    count: 0, owner: "0x1234…99ee", curationStatus: "disabled",
    assignee: "0x9f3c4d1e7a2188cf90b3a6e7c4d5f6a7b8c9d0e1", assigneeName: "kira.eth", you: true,
    date: "Review request", ago: "1 week ago", forumLink: null, thumbs: [],
  },
  {
    id: "c7", name: "Pixel Heroes Helmets", type: "third_party", isProgrammatic: false,
    count: 16, owner: null, curationStatus: "approved",
    assignee: "0x7c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f70615243", assigneeName: "marco.eth",
    date: "Published", ago: "1 week ago",
    forumLink: null,
    thumbs: ["linear-gradient(135deg,#982de2,#220040)", "linear-gradient(135deg,#ff743a,#3a1500)", "linear-gradient(135deg,#73d3d3,#062a2a)", "linear-gradient(135deg,#ff2d55,#350447)"],
  },
];

const TYPE_BADGE_LABEL = { standard: "Regular", third_party: "Linked Wearables" };
const STATUS_DOT_TITLE = { under_review: "Under Review", synced: "Synced", unsynced: "Unsynced", loading: "Loading..." };

const SearchGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="7" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const CheckGlyph = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseGlyph = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const PencilGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M11.2 2.4 13.6 4.8 5.2 13.2 2.4 14l.8-2.8 8-8.8Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
  </svg>
);

function CollectionImage({ thumbs = [], count }) {
  if (count === 0 || thumbs.length === 0) {
    return (
      <div className="bdcur__image bdcur__image--empty">
        <span className="bdcur__noitems">No items</span>
      </div>
    );
  }
  const first = thumbs.slice(0, 2);
  const second = thumbs.slice(2, 4);
  const rowStyle = { height: second.length ? "50%" : "100%" };
  return (
    <div className="bdcur__image">
      {first.length > 0 && (
        <div className="bdcur__imgrow" style={rowStyle}>
          {first.map((g, i) => (
            <span key={i} className="bdcur__imgcell" style={{ background: g }} />
          ))}
        </div>
      )}
      {second.length > 0 && (
        <div className="bdcur__imgrow" style={rowStyle}>
          {second.map((g, i) => (
            <span key={i} className="bdcur__imgcell" style={{ background: g }} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatusDot({ status, type }) {
  if (!status || type === "third_party") return null;
  return <span className={"bdcur__statusdot bdcur__statusdot--" + status} title={STATUS_DOT_TITLE[status]} />;
}

function TypeBadge({ type }) {
  const isThirdParty = type === "third_party";
  return (
    <span className={"bdcur__badge " + (isThirdParty ? "bdcur__badge--linked" : "bdcur__badge--regular")}>
      {TYPE_BADGE_LABEL[type]}
    </span>
  );
}

function KindBadge({ type, isProgrammatic }) {
  const programmatic = type === "third_party" && isProgrammatic;
  return (
    <span className={"bdcur__badge " + (programmatic ? "bdcur__badge--programmatic" : "bdcur__badge--standard")}>
      {programmatic ? "Programmatic" : "Standard"}
    </span>
  );
}

function CurationState({ status }) {
  switch (status) {
    case "approved":
      return (
        <div className="bdcur__action bdcur__action--approved">
          <span className="bdcur__action-text">Approved</span> <CheckGlyph />
        </div>
      );
    case "rejected":
      return (
        <div className="bdcur__action bdcur__action--rejected">
          <span className="bdcur__action-text">Rejected</span> <CloseGlyph />
        </div>
      );
    case "disabled":
      return (
        <div className="bdcur__action bdcur__action--disabled">
          <span className="bdcur__action-text">Disabled</span> <CloseGlyph />
        </div>
      );
    case "under_review":
      return <span>Under Review</span>;
    case "to_review":
    default:
      return <span>To review</span>;
  }
}

function FilterDropdown({ value, options, onChange, className }) {
  const [open, setOpen] = useState(false);
  const label = options.find((o) => o.value === value)?.text ?? "";
  return (
    <div className={"bdcur__dropdown" + (className ? " " + className : "")}>
      <button
        type="button"
        className="bdcur__dropbtn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="bdcur__droplabel">{label}</span> <Caret size={11} />
      </button>
      {open && (
        <div className="bdcur__dropmenu" role="listbox">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              className={"bdcur__dropitem" + (o.value === value ? " is-active" : "")}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionRow({ collection }) {
  const {
    name, type, isProgrammatic, status, count, owner, curationStatus,
    assignee, assigneeName, you, date, ago, forumLink, thumbs,
  } = collection;
  return (
    <tr className="bdcur__row">
      <td className="bdcur__cell bdcur__cell--collection">
        <div className="bdcur__imagecol">
          <CollectionImage thumbs={thumbs} count={count} />
          <div className="bdcur__info">
            <div className="bdcur__title">
              <StatusDot status={status} type={type} />
              <span className="u-truncate">{name}</span>
            </div>
            <div className="bdcur__subtitle">{count} {count === 1 ? "item" : "items"}</div>
          </div>
        </div>
      </td>
      <td className="bdcur__cell">
        <TypeBadge type={type} />
      </td>
      <td className="bdcur__cell">
        <KindBadge type={type} isProgrammatic={isProgrammatic} />
      </td>
      <td className="bdcur__cell">
        <div>{type === "third_party" ? "-" : owner}</div>
      </td>
      <td className="bdcur__cell">
        <div className="bdcur__date">
          <span>{date}</span> {ago}
        </div>
      </td>
      <td className="bdcur__cell">
        <div className="bdcur__actions bdcur__text-centered">
          <CurationState status={curationStatus} />
        </div>
      </td>
      <td className="bdcur__cell">
        <div className="bdcur__edit">
          {assignee ? (
            <>
              <div className="bdcur__curator u-truncate">
                {assigneeName}
                {you ? <> (you)</> : null}
              </div>
              {curationStatus !== "approved" ? (
                <button type="button" className="bdcur__pencil" aria-label="Reassign curator">
                  <PencilGlyph />
                </button>
              ) : null}
            </>
          ) : (
            <div className="bdcur__assignee">
              Unassigned
              <span className="bdcur__link">Assign to me</span>
            </div>
          )}
        </div>
      </td>
      <td className="bdcur__cell">
        <div className="bdcur__text-centered">
          {forumLink ? (
            <a className="bdcur__link" href={forumLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              Link
            </a>
          ) : (
            <span className="bdcur__muted">Not posted</span>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function BdCuration({
  collections = COLLECTIONS,
  loading = false,
  embedded = false,
}) {
  const [navTab, setNavTab] = useState("curation");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("MOST_RELEVANT");
  const [filterStatus, setFilterStatus] = useState("ALL_STATUS");
  const [filterType, setFilterType] = useState("ALL_TYPES");
  const [assignee, setAssignee] = useState("all");
  const [campaign, setCampaign] = useState(false);

  const total = collections.length;
  const hasResults = total > 0;
  const resultsLabel = useMemo(
    () => (total > 0 ? `${total} ${total === 1 ? "result" : "results"}` : ""),
    [total]
  );

  const body = (
      <div className="bdcur">
        <div className="bdcur__filters">
          <div className="bdcur__searchrow">
            <span className="bdcur__searchicon" aria-hidden="true"><SearchGlyph /></span>
            <input
              type="text"
              placeholder="Search by name or owner address"
              aria-label="Search by name or owner address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bdcur__controls">
            <div className="bdcur__results">{!loading && hasResults ? resultsLabel : ""}</div>
            <div className="bdcur__filtercluster">
              <label className="bdcur__toggle">
                <input
                  type="checkbox"
                  checked={campaign}
                  onChange={(e) => setCampaign(e.target.checked)}
                />
                <span className="bdcur__toggletrack" aria-hidden="true"><span className="bdcur__toggleknob" /></span>
                <span className="bdcur__togglelabel">Summer Festival</span>
              </label>
              <FilterDropdown className="bdcur__dropdown--assignees" value={assignee} options={ASSIGNEE_OPTIONS} onChange={setAssignee} />
              <FilterDropdown value={filterType} options={TYPE_OPTIONS} onChange={setFilterType} />
              <FilterDropdown value={filterStatus} options={STATUS_OPTIONS} onChange={setFilterStatus} />
              <FilterDropdown value={sort} options={SORT_OPTIONS} onChange={setSort} />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bdcur__loader" role="status" aria-label="Loading">
            <span className="bdcur__spinner" />
          </div>
        ) : (
          <>
            {hasResults ? (
              <div className="bdcur__tablewrap">
                <table className="bdcur__table">
                  <thead>
                    <tr>
                      <th>Collection</th>
                      <th>Type</th>
                      <th>Kind</th>
                      <th>Owner</th>
                      <th>Date</th>
                      <th className="bdcur__th-centered">Status</th>
                      <th>Assignee</th>
                      <th className="bdcur__th-centered">Discussion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections.map((c) => (
                      <CollectionRow key={c.id} collection={c} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bdcur__empty">
                <div>There are no collections to review yet.</div>
              </div>
            )}

            {hasResults && (
              <nav className="bdcur__pagination" aria-label="Pagination">
                <button type="button" className="bdcur__page is-active">1</button>
                <button type="button" className="bdcur__page">2</button>
                <button type="button" className="bdcur__page">3</button>
              </nav>
            )}
          </>
        )}
      </div>
  );

  return embedded ? (
    body
  ) : (
    <BuilderChrome active={navTab} onTab={setNavTab}>
      {body}
    </BuilderChrome>
  );
}
