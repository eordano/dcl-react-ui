import SitesChrome from "../frames/SitesChrome.jsx";
import "./stprofilenotfoundstub.css";

export default function StProfileNotFoundStub({
  address = "0xnot-a-valid-address",
  title = "Profile not found",
}) {
  const description = `The address "${address ?? ""}" is not a valid Ethereum address.`;

  return (
    <SitesChrome active="legal" overlayNav>
      <div className="stprofilenotfoundstub">
        <h3 className="stprofilenotfoundstub__title">{title}</h3>
        <p className="stprofilenotfoundstub__desc">{description}</p>
      </div>
    </SitesChrome>
  );
}
