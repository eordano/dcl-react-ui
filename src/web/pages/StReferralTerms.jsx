import LegalDocPageLayout from "../frames/LegalDocPageLayout.jsx";
import { LEGAL_DOCS } from "../../data/legalPageConfig.jsx";

export default function StReferralTerms() {
  return <LegalDocPageLayout doc={LEGAL_DOCS.referral} />;
}
