import { useMemo, useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Dropdown from "../../components/Dropdown.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdscenepoolsearch.css";
import { ChevronLeft } from "../../atoms/icons.jsx";

const RECORDS_PER_PAGE = 24;

function makePool(i, title, parcels, transforms, hue) {
  return {
    id: "pool-" + i,
    title,
    statistics: { parcels, transforms },
    layout: { cols: parcels, rows: 1 },
    likes: Math.floor(transforms / 7),
    hue,
  };
}

const POOLS = [
  makePool(1, "Genesis Plaza Remix", 5, 184, 280),
  makePool(2, "Wonderzone Casino", 8, 326, 18),
  makePool(3, "Dragon City Arena", 16, 612, 130),
  makePool(4, "Aetheria Hub", 4, 142, 220),
  makePool(5, "Vegas City Strip", 20, 884, 350),
  makePool(6, "Neon Night Market", 3, 97, 300),
  makePool(7, "Sakura Pavilion", 2, 58, 332),
  makePool(8, "Frostpeak Lodge", 1, 24, 192),
  makePool(9, "Pixel History Museum", 6, 210, 154),
  makePool(10, "Skybound Observatory", 9, 401, 24),
  makePool(11, "Retro Arcade Plaza", 3, 96, 48),
  makePool(12, "Coral Reef Gallery", 4, 133, 174),
];

const SORTS = ["Newest", "Name", "Likes", "Items", "Smart items", "Size"];
const USERS = ["All users", "Only me"];

const ParcelIcon = () => (
  <svg className="bdscenepoolsearch__icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 1.5l6 3.25v6.5L8 14.5 2 11.25v-6.5L8 1.5z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M2 4.75L8 8l6-3.25M8 8v6.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const ObjectIcon = () => (
  <svg className="bdscenepoolsearch__icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2.5 6.5h11M6.5 6.5v7" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

function PoolCard({ pool }) {
  const parcels = pool.statistics ? pool.statistics.parcels : pool.layout.cols * pool.layout.rows;
  return (
    <a className="bdscenepoolsearch__card" href={"#pool/" + pool.id}>
      <div
        className="bdscenepoolsearch__thumb"
        style={{ background: `linear-gradient(135deg, hsl(${pool.hue} 60% 42%), hsl(${(pool.hue + 40) % 360} 55% 26%))` }}
      />
      <div className="bdscenepoolsearch__data">
        <div className="bdscenepoolsearch__titlewrap">
          <div className="bdscenepoolsearch__title">{pool.title}</div>
        </div>
        <div className="bdscenepoolsearch__desc">
          <div className="bdscenepoolsearch__components">
            <div className="bdscenepoolsearch__component">
              <ParcelIcon /> {parcels} {parcels === 1 ? "parcel" : "parcels"}
            </div>
            {pool.statistics && (
              <div className="bdscenepoolsearch__component">
                <ObjectIcon /> {pool.statistics.transforms} {pool.statistics.transforms === 1 ? "item" : "items"}
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function BdScenePoolSearch({
  pools = POOLS,
  isLoggedIn = true,
  loading = false,
}) {
  const [tab, setTab] = useState("scenes");
  const [sort, setSort] = useState(SORTS[0]);
  const [user, setUser] = useState(USERS[0]);
  const [page, setPage] = useState(1);

  const total = Array.isArray(pools) ? pools.length : null;
  const totalPages = total === null ? null : Math.max(1, Math.ceil(total / RECORDS_PER_PAGE));

  const pageItems = useMemo(() => {
    if (!Array.isArray(pools)) return [];
    const start = (page - 1) * RECORDS_PER_PAGE;
    return pools.slice(start, start + RECORDS_PER_PAGE);
  }, [pools, page]);

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdscenepoolsearch">
        <div className="bdscenepoolsearch__container">
          <div className="bdscenepoolsearch__navigation">
            <div className="bdscenepoolsearch__narrow">
              <div className="bdscenepoolsearch__navrow">
                <button type="button" className="bdscenepoolsearch__back" aria-label="Back to your Scenes">
                  <ChevronLeft size={16} />
                </button>
                <h1 className="bdscenepoolsearch__h1">Scene Pool</h1>
                <div className="bdscenepoolsearch__filters">
                  {isLoggedIn && (
                    <Dropdown options={USERS} value={user} onChange={setUser} />
                  )}
                  <Dropdown options={SORTS} value={sort} onChange={setSort} />
                </div>
              </div>
            </div>
          </div>

          <div className="bdscenepoolsearch__narrow">
            <div className="bdscenepoolsearch__list">
              {loading && (
                <div className="bdscenepoolsearch__loader">
                  <Spinner size={56} />
                </div>
              )}
              {!loading && Array.isArray(pools) && total === 0 && (
                <div className="bdscenepoolsearch__empty">It looks like we don't have any Scenes</div>
              )}
              {!loading && Array.isArray(pools) && total !== 0 &&
                pageItems.map((pool) => <PoolCard key={pool.id} pool={pool} />)}
            </div>
          </div>

          {!loading && total !== null && totalPages !== null && totalPages > 1 && (
            <div className="bdscenepoolsearch__paginationwrap">
              <nav className="bdscenepoolsearch__pagination" aria-label="Pagination">
                {page !== 1 && (
                  <button
                    type="button"
                    className="bdscenepoolsearch__page is-edge is-prev"
                    aria-label="Previous page"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    ‹
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={"bdscenepoolsearch__page" + (n === page ? " is-active" : "")}
                    aria-current={n === page ? "page" : undefined}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                {page !== totalPages && (
                  <button
                    type="button"
                    className="bdscenepoolsearch__page is-edge is-next"
                    aria-label="Next page"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    ›
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </BuilderChrome>
  );
}
