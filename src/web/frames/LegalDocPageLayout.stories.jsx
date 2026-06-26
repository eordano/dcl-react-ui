import LegalDocPageLayout from "./LegalDocPageLayout.jsx";
import { LEGAL_DOCS } from "../../data/legalPageConfig.jsx";

export default {
  title: "Web/Frames/LegalDocPageLayout",
  component: LegalDocPageLayout,
  parameters: { layout: "fullscreen" },
};

const fromDoc = (doc) => ({
  render: () => (
    <LegalDocPageLayout doc={doc} onNavClick={(e) => e.preventDefault()} />
  ),
});

// The Terms story is a LAYOUT demo, not canonical copy: a short slice exercising
// nested TOC depth, h3 subheadings, paragraphs and a list. The full document lives
// in ../data/legalPageConfig.jsx (LEGAL_DOCS.terms), which /terms renders verbatim.
const termsDemo = {
  title: "Terms of Use",
  activeSlug: "/terms",
  tableOfContents: [
    { id: "acceptance-of-terms", label: "1. Acceptance of Terms" },
    { id: "section-1-1", label: "1.1 Introduction", depth: 1 },
    { id: "section-1-2", label: "1.2 Services", depth: 1 },
    { id: "eligibility", label: "2. Eligibility" },
    { id: "representations-and-risks", label: "3. Representations and Risks" },
  ],
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "1. Acceptance of Terms",
      body: [
        { type: "h3", id: "section-1-1", content: "1.1 Introduction" },
        "The Decentraland Platform is a community-driven virtual space supported by the Decentraland Foundation and guided by its users through transparent governance.",
        { type: "h3", id: "section-1-2", content: "1.2 Services" },
        "The Foundation makes the following available for the benefit of the Decentraland community:",
        {
          type: "ul",
          items: [
            "the Clients — the applications through which users access Decentraland;",
            "the Tools — additional features such as the Marketplace, Builder and DAO interface;",
            "the Site — the website located at decentraland.org.",
          ],
        },
      ],
    },
    {
      id: "eligibility",
      heading: "2. Eligibility",
      body: [
        "You represent and warrant that you are of the legal age of majority in your jurisdiction and are otherwise legally permitted to use the Services where you live.",
      ],
    },
    {
      id: "representations-and-risks",
      heading: "3. Representations and Risks",
      body: [
        'Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, either express or implied.',
      ],
    },
  ],
};

export const Terms = fromDoc(termsDemo);

export const Privacy = fromDoc(LEGAL_DOCS.privacy);

export const Content = fromDoc(LEGAL_DOCS.content);

export const Ethics = fromDoc(LEGAL_DOCS.ethics);

export const Rewards = fromDoc(LEGAL_DOCS.rewards);

export const Referral = fromDoc(LEGAL_DOCS.referral);

export const Security = fromDoc(LEGAL_DOCS.security);

export const Brand = fromDoc(LEGAL_DOCS.brand);

export const PropOverride = {
  render: () => (
    <LegalDocPageLayout
      doc={LEGAL_DOCS.privacy}
      tableOfContents={[]}
      onNavClick={(e) => e.preventDefault()}
    />
  ),
};
