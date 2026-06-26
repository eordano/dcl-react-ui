import LegalDocPageLayout from "../frames/LegalDocPageLayout.jsx";
import { LEGAL_DOCS } from "../../data/legalPageConfig.jsx";

export default function StContentPolicy() {
  return <LegalDocPageLayout doc={LEGAL_DOCS.content} />;
}
