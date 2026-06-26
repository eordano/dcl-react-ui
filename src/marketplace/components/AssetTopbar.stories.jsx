import { useState } from "react";
import AssetTopbar from "./AssetTopbar.jsx";

export default {
  title: "Marketplace/Components/AssetTopbar",
  component: AssetTopbar,
  parameters: { layout: "padded" },
};

const COLLECTIBLE_SORTS = [
  { id: "recently_listed", label: "Recently listed" },
  { id: "newest", label: "Newest" },
  { id: "cheapest", label: "Cheapest" },
  { id: "most_expensive", label: "Most expensive" },
  { id: "recently_sold", label: "Recently sold" },
];

const LAND_SORTS = [
  { id: "newest", label: "Newest" },
  { id: "cheapest", label: "Cheapest" },
  { id: "most_expensive", label: "Most expensive" },
  { id: "name", label: "Name" },
  { id: "size", label: "Size" },
];

const GridGlyph = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
);
const AtlasGlyph = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

export const CollectiblesInline = () => {
  const [sort, setSort] = useState("recently_listed");
  const [view, setView] = useState("grid");
  return (
    <AssetTopbar
      searchPlaceholder="Search collectibles"
      count={12}
      sort={sort}
      onSort={setSort}
      sortOptions={COLLECTIBLE_SORTS}
      view={view}
      onView={setView}
    />
  );
};

export const LandStacked = () => {
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");
  return (
    <AssetTopbar
      layout="stacked"
      searchPlaceholder="Search Land..."
      count={12}
      countNoun={["item", "items"]}
      sort={sort}
      onSort={setSort}
      sortOptions={LAND_SORTS}
      view={view}
      onView={setView}
      viewOptions={[
        { id: "grid", label: "Grid view", icon: GridGlyph },
        { id: "atlas", label: "Atlas map view", icon: AtlasGlyph },
      ]}
    />
  );
};

export const SingleResult = () => {
  const [view, setView] = useState("grid");
  return (
    <AssetTopbar
      searchPlaceholder="Search collectibles"
      count={1}
      sortOptions={COLLECTIBLE_SORTS}
      sort="recently_listed"
      view={view}
      onView={setView}
    />
  );
};

export const SearchAndCountOnly = () => (
  <AssetTopbar searchPlaceholder="Search" count={248} />
);
