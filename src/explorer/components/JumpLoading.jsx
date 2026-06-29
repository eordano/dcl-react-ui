import "./jumploading.css";

export default function JumpLoading({ name }) {
  return (
    <div className="jl" role="status" aria-live="polite">
      <div className="jl__spinner" aria-hidden="true" />
      <div className="jl__text">Teleporting{name ? ` to ${name}` : ""}…</div>
    </div>
  );
}
