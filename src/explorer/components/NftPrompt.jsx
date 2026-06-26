import "./nftprompt.css";

export default function NftPrompt() {
  return (
    <div className="nftp" role="dialog" aria-modal="true">
      <h2 className="nftp__name">Furbeard #2163</h2>

      <div className="nftp__body">
        <div className="nftp__art" aria-hidden="true" />

        <div className="nftp__info">
          <div className="nftp__field">
            <span className="nftp__label">OWNER</span>
            <span className="nftp__ownerval">0x69...673d</span>
          </div>

          <div className="nftp__pricerow">
            <div className="nftp__field">
              <span className="nftp__label">LAST SOLD FOR</span>
              <span className="nftp__status">NEVER SOLD</span>
            </div>
            <div className="nftp__field">
              <span className="nftp__label">PRICE</span>
              <span className="nftp__status nftp__status--red">NOT FOR SALE</span>
            </div>
          </div>

          <div className="nftp__descblock">
            <span className="nftp__label">DESCRIPTION</span>
            <p className="nftp__desc">Avast ye! I'm the dread pirate Furbeard, and I'll most likely scratch you in the morning. This Old Salt knows a few tricks: how to avoid a monentny, how to get out of swabbing the litter deck, and just where the captain's log is buried. Beware the Krakitten in the briny deep. Or is that Pickles?</p>
          </div>
        </div>
      </div>

      <div className="nftp__actions">
        <button className="nftp__cancel">CANCEL</button>
        <button className="nftp__market">VIEW ON OPENSEA</button>
      </div>
    </div>
  );
}
