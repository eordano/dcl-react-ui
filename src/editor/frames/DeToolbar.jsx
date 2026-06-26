import DclEditorChrome from "./DclEditorChrome.jsx";
import { DeToolbar as Toolbar } from "../pages/DeWorkspace.jsx";

export default function DeToolbarPage({
  tool = "translate",
  playing = false,
  menuOpen = false,
}) {
  return (
    <DclEditorChrome>
      <Toolbar tool={tool} playing={playing} menuOpen={menuOpen} />
    </DclEditorChrome>
  );
}
