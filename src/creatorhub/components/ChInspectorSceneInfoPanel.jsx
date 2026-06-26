import Spinner from "../../atoms/Spinner.jsx";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chinspectorsceneinfopanel.css";

const InfoIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 1024 1024"
    height="1em"
    width="1em"
    aria-hidden="true"
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    <path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 1024 1024"
    height="1em"
    width="1em"
    aria-hidden="true"
  >
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

function SceneAbout() {
  return (
    <>
      <h1>Genesis Plaza</h1>
      <p>
        A community hub at the heart of Decentraland. This scene welcomes new
        visitors with a portal grid, an interactive jump board, and a rotating
        gallery of featured creations.
      </p>

      <h2>Getting started</h2>
      <p>
        Open <code>src/index.ts</code> to edit the scene logic, or drop new
        assets from the <strong>Assets</strong> panel onto the canvas. Run a
        local preview from the toolbar to test your changes.
      </p>

      <ul>
        <li>
          Read the <a href="https://docs.decentraland.org/creator/">SDK7 docs</a>
        </li>
        <li>
          Edit the spawn point in{" "}
          <a href="./scene.json">scene.json</a>
        </li>
        <li>Drag a smart item to add interactivity</li>
      </ul>

      <h2>Controls</h2>
      <p>The plaza supports the following bindings:</p>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Key</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Move</td>
            <td>
              <code>W A S D</code>
            </td>
          </tr>
          <tr>
            <td>Jump</td>
            <td>
              <code>Space</code>
            </td>
          </tr>
          <tr>
            <td>Open emotes</td>
            <td>
              <code>B</code>
            </td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <header>Note</header>
        Remember to keep all entities inside the parcel bounds, otherwise they
        may not render in-world.
      </blockquote>

      <h2>Example snippet</h2>
      <pre>
        <code>{`engine.addEntity(door)
Transform.create(door, { position: Vector3.create(8, 0, 8) })`}</code>
      </pre>

      <hr />
      <p>
        Built with the Decentraland Creator Hub. See the{" "}
        <a href="https://decentraland.org/governance/">DAO</a> for grant info.
      </p>
    </>
  );
}

export default function ChInspectorSceneInfoPanel({
  content = true,
  isLoading = false,
}) {
  return (
    <CreatorHubChrome active="scenes">
      <div className="chinspectorsceneinfopanel">
        <div className="chinspectorsceneinfopanel__stage">
          <div className="chinspectorsceneinfopanel__stagehint">
            <div className="grid" />
            <span>Renderer viewport</span>
          </div>
        </div>

        <div className="chinspectorsceneinfopanel__handle" />

        <div className="chinspectorsceneinfopanel__panel">
          <div className="SceneInfoPanel">
            <div className="SceneInfoHeader">
              <div className="TitleWrapper">
                <InfoIcon />
                <div className="Title">Scene Info</div>
                {isLoading && (
                  <div className="Loading">
                    <Spinner size={16} />
                  </div>
                )}
              </div>

              <div className="Actions">
                <button className="CloseButton" type="button" title="Close panel">
                  <CloseIcon />
                </button>
              </div>
            </div>

            {!!content && (
              <div className="MarkdownRenderer">
                <SceneAbout />
              </div>
            )}
          </div>
        </div>
      </div>
    </CreatorHubChrome>
  );
}
