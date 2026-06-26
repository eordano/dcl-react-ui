import LegalDocPageLayout from "../frames/LegalDocPageLayout.jsx";

export default function StSecurityPolicy() {
  return (
    <LegalDocPageLayout
      title="Vulnerability Disclosure Procedure"
      activeSlug="/security"
      tableOfContents={[]}
      onNavClick={(e) => e.preventDefault()}
    >
      <p className="legaldoc__p">
        At Decentraland, we take every measure necessary to ensure the security
        of the platform. If you are a security researcher and took a look at
        some of our code, contracts, or websites and found a vulnerability,
        you&apos;re eligible for a bounty for doing a responsible disclosure of
        that bug.
      </p>

      <a
        className="legaldoc__button"
        href="https://immunefi.com/bounty/decentraland/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Submit a report on Immunefi
      </a>
    </LegalDocPageLayout>
  );
}
