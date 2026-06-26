import "../frames/scenelabchrome.css";

export default function SlLoadingScene() {
  return (
    <div className="sl-loading" role="status" aria-live="polite">
      <div className="sl-loading__spin" />
      Loading scene…
    </div>
  );
}
