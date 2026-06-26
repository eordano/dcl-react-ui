import LegalDocPageLayout from "../frames/LegalDocPageLayout.jsx";
import { LEGAL_DOCS } from "../../data/legalPageConfig.jsx";

export default function StCodeOfEthics() {
  return <LegalDocPageLayout doc={LEGAL_DOCS.ethics} />;
}
