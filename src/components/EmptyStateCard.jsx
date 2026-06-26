import EmptyState from "./EmptyState.jsx";

export default function EmptyStateCard({ className = "", ...rest }) {
  return (
    <EmptyState
      className={"es--card" + (className ? " " + className : "")}
      {...rest}
    />
  );
}
