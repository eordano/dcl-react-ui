import GovernanceChrome from "../frames/GovernanceChrome.jsx";
import "./gvmaintenancescreen.css";

const COPY = {
  title: "Site under maintenance",
  description: "We will be back soon, sorry for the inconvenience...",
};

function MaintenancePage({ title = COPY.title, description = COPY.description }) {
  return (
    <div className="gvmaintenancescreen__container">
      <div className="gvmaintenancescreen">
        <h2 className="gvmaintenancescreen__heading">{title}</h2>
        <p className="gvmaintenancescreen__text">{description}</p>
      </div>
    </div>
  );
}

export default function GvMaintenanceScreen({
  active = "proposals",
  title,
  description,
}) {
  return (
    <GovernanceChrome active={active}>
      <MaintenancePage title={title} description={description} />
    </GovernanceChrome>
  );
}
