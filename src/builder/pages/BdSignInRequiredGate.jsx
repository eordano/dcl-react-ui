import BuilderChrome from "../frames/BuilderChrome.jsx";
import "./bdsigninrequiredgate.css";

export default function BdSignInRequiredGate({
  active = "land",
  pathname = "/activity",
}) {
  const signInHref = `/sign-in?redirectTo=${encodeURIComponent(pathname)}`;
  return (
    <BuilderChrome active={active} account="">
      <div className="bdsigninrequiredgate">
        <div className="bdsigninrequiredgate__center">
          <div className="bdsigninrequiredgate__text">
            You need to{" "}
            <a className="bdsigninrequiredgate__link" href={signInHref}>
              Sign in
            </a>{" "}
            to access this page.
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}
