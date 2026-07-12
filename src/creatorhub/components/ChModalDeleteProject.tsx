import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome";
import Modal from "../../components/Modal";
import Button from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import "./chmodaldeleteproject.css";

const COPY = {
  title: (t: string) => `Are you sure you want to delete ${t} from 'My Scenes'?`,
  filesCheckbox: "Also delete this scene's files from my computer",
  filesWarning:
    "Deleting scene files from your computer is permanent, you won't be able to access this scene again.",
  cancel: "Cancel",
  confirm: "Confirm",
};

interface Project {
  id: string;
  title: string;
  path: string;
}

interface ChModalDeleteProjectProps {
  open?: boolean;
  project?: Project;
  deleteFiles?: boolean;
  chrome?: boolean;
  showFilesOption?: boolean;
  note?: string;
  onClose?: () => void;
  onSubmit?: (project: Project, deleteFiles: boolean) => void;
  onToggleFiles?: (checked: boolean) => void;
}

export default function ChModalDeleteProject({
  open = true,
  project = { id: "", title: "", path: "" },
  deleteFiles = false,
  chrome = true,
  showFilesOption = true,
  note = undefined,
  onClose = () => {},
  onSubmit = () => {},
  onToggleFiles = undefined,
}: ChModalDeleteProjectProps) {
  const [shouldDeleteFiles, setShouldDeleteFiles] = useState(deleteFiles);

  const handleToggleFiles = (checked: boolean) => {
    setShouldDeleteFiles(checked);
    onToggleFiles?.(checked);
  };

  if (!open) {
    return chrome ? <CreatorHubChrome active="scenes" /> : null;
  }

  const handleSubmit = () =>
    onSubmit(project, showFilesOption && shouldDeleteFiles);

  const modal = (
    <Modal
      width={540}
      className="chmodaldeleteproject"
      ariaLabel={COPY.title(project.title)}
      onClose={onClose}
      showClose={false}
    >
      <h5 className="chmodaldeleteproject__title">
        {COPY.title(project.title)}
      </h5>

      <div className="chmodaldeleteproject__content">
        {note ? (
          <p
            className="chmodaldeleteproject__delete-files-warning"
            style={{ margin: "0 0 4px" }}
          >
            {note}
          </p>
        ) : null}

        {showFilesOption ? (
          <Checkbox checked={shouldDeleteFiles} onChange={handleToggleFiles}>
            {COPY.filesCheckbox}
          </Checkbox>
        ) : null}

        {showFilesOption && shouldDeleteFiles && (
          <p className="chmodaldeleteproject__delete-files-warning">
            {COPY.filesWarning}
          </p>
        )}
      </div>

      <div className="chmodaldeleteproject__actions">
        <Button variant="secondary" size="lg" onClick={onClose}>
          {COPY.cancel}
        </Button>
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          {COPY.confirm}
        </Button>
      </div>
    </Modal>
  );

  if (!chrome) return modal;

  return <CreatorHubChrome active="scenes">{modal}</CreatorHubChrome>;
}
