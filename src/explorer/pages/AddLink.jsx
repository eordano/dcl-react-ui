import Modal from "../../components/Modal.jsx";
import Passport from "./Passport.jsx";
import "./addlink.css";

export default function AddLink({ avatarPreview = null }) {
  return (
    <>
      <div className="u-behind" aria-hidden="true" inert>
        <Passport avatarPreview={avatarPreview} />
      </div>
      <Modal width={360} className="modal__card--grad">
      <div className="al">
        <h2 className="al__title">Add Link</h2>

        <label className="al__field">
          <span className="al__sr">Link title</span>
          <input className="al__input" type="text" placeholder="Enter Link Title (E.g. Instagram)" maxLength={30} />
        </label>
        <label className="al__field">
          <span className="al__sr">URL</span>
          <input className="al__input" type="url" placeholder="Enter URL" />
        </label>

        <div className="al__actions">
          <button className="al__cancel" data-sb-linkto="Explorer/Pages/Passport">CANCEL</button>
          <button className="al__add" data-sb-linkto="Explorer/Pages/Passport">SAVE</button>
        </div>
      </div>
      </Modal>
    </>
  );
}
