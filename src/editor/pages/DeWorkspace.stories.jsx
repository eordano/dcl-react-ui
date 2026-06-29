import DeWorkspace from "./DeWorkspace.jsx";
import {
  GENESIS_PLAZA_TREE,
  GENESIS_PLAZA_INSPECTOR,
  GENESIS_PLAZA_CATALOG,
  GENESIS_PLAZA_TITLE,
} from "./genesisPlaza.fixture.js";

export default {
  title: "Editor/Pages/Workspace",
  component: DeWorkspace,
  parameters: { layout: "fullscreen" },
};

export const Default = { render: () => <DeWorkspace /> };

export const WithAssets = { render: () => <DeWorkspace left="assets" /> };

export const GenesisPlaza = {
  name: "Genesis Plaza (captured real data)",
  render: () => (
    <DeWorkspace
      left="scene"
      title={GENESIS_PLAZA_TITLE}
      tree={GENESIS_PLAZA_TREE}
      inspector={GENESIS_PLAZA_INSPECTOR}
      catalog={GENESIS_PLAZA_CATALOG}
    />
  ),
};

export const GenesisPlazaAssets = {
  name: "Genesis Plaza assets (captured real data)",
  render: () => (
    <DeWorkspace
      left="assets"
      title={GENESIS_PLAZA_TITLE}
      tree={GENESIS_PLAZA_TREE}
      inspector={GENESIS_PLAZA_INSPECTOR}
      catalog={GENESIS_PLAZA_CATALOG}
    />
  ),
};
