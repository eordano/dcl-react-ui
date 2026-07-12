import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ChCurateCommitteeView from "./ChCurateCommitteeView";

type Props = ComponentProps<typeof ChCurateCommitteeView>;
type Row = NonNullable<Props["collections"]>[number];

const rows: Row[] = [
  {
    id: "c1",
    name: "Genesis Threads",
    type: "standard",
    status: "under_review",
    count: 12,
    owner: "0xa1b2…44ff",
    curationStatus: "to_review",
    assignee: null,
    date: "Review request",
    ago: "2 hours ago",
    forumLink: null,
    forumTopicId: 4821,
    thumbs: [
      "linear-gradient(135deg,#438fff,#2f004d)",
      "linear-gradient(135deg,#ff2d55,#350447)",
      "linear-gradient(135deg,#ff4bed,#220040)",
      "linear-gradient(135deg,#982de2,#1a0a2e)",
    ],
    comments: [],
  },
  {
    id: "c2",
    name: "Neon Streetwear Drop",
    type: "standard",
    status: "under_review",
    count: 8,
    owner: "0xc3d4…21aa",
    curationStatus: "under_review",
    assignee: "0x9f3c4d1e7a2188cf90b3a6e7c4d5f6a7b8c9d0e1",
    assigneeName: "kira.eth",
    you: true,
    date: "Review request",
    ago: "5 hours ago",
    forumLink: null,
    forumTopicId: 4822,
    thumbs: [
      "linear-gradient(135deg,#1f8a70,#06231c)",
      "linear-gradient(135deg,#ff743a,#3a1500)",
      "linear-gradient(135deg,#73d3d3,#062a2a)",
      "linear-gradient(135deg,#ffc647,#3a2c00)",
    ],
    comments: [
      {
        id: "cm1",
        collection_id: "c2",
        author: "0x7c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f70615243",
        authorName: "marco.eth",
        decision: "approved",
        raw: "Meshes look clean and the hoodie rig weights are solid. Good to go from my side.",
        topic_id: 4822,
        created_at: "2026-06-30T10:00:00Z",
      },
    ],
  },
  {
    id: "c3",
    name: "Aether Linked Wearables",
    type: "third_party",
    status: null,
    isProgrammatic: true,
    count: 24,
    owner: null,
    curationStatus: "to_review",
    assignee: null,
    date: "Published",
    ago: "1 day ago",
    forumLink: null,
    forumTopicId: null,
    thumbs: [
      "linear-gradient(135deg,#b05cff,#2f004d)",
      "linear-gradient(135deg,#438fff,#06231c)",
      "linear-gradient(135deg,#ff2d55,#3a1500)",
      "linear-gradient(135deg,#34ce76,#062a2a)",
    ],
    comments: [],
  },
];

const activeRow = rows[1]!;
const noop = () => {};

const meta = {
  title: "CreatorHub/Workflows/Curate Committee",
  component: ChCurateCommitteeView,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ChCurateCommitteeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="dashboard"
      step="dashboard"
      isCommittee
      collections={rows}
      onDashboardClick={noop}
    />
  ),
};

export const Reviewing: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="reviewing"
      step="review"
      isCommittee
      collections={rows}
      activeRow={activeRow}
      activeId={activeRow.id}
      builderHref="#"
      onBack={noop}
      onDraftApprove={noop}
      onDraftReject={noop}
    />
  ),
};

export const CommentingApprove: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="commenting"
      step="comment"
      isCommittee
      collections={rows}
      activeRow={activeRow}
      activeId={activeRow.id}
      decision="approved"
      draftComment="Great silhouette work and clean topology — approving."
      authorName="kira.eth"
      onBack={noop}
      onChangeComment={noop}
      onSubmit={noop}
    />
  ),
};

export const CommentingReject: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="commenting"
      step="comment"
      isCommittee
      collections={rows}
      activeRow={activeRow}
      activeId={activeRow.id}
      decision="rejected"
      draftComment="The feet mesh clips through the ankle bone in the walk cycle — please fix and resubmit."
      authorName="kira.eth"
      onBack={noop}
      onChangeComment={noop}
      onSubmit={noop}
    />
  ),
};

export const Deciding: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="deciding"
      step="deciding"
      isCommittee
      collections={rows}
      activeRow={activeRow}
      activeId={activeRow.id}
      decision="approved"
      draftComment="Great silhouette work and clean topology — approving."
    />
  ),
};

export const DecidedApproved: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="decided"
      step="decided"
      isCommittee
      collections={rows}
      activeRow={activeRow}
      activeId={activeRow.id}
      decision="approved"
      postedComment={{
        postId: 55123,
        link: "#",
        raw: "Great silhouette work and clean topology — approving.",
      }}
      onBackToQueue={noop}
    />
  ),
};

export const DecidedRejected: Story = {
  render: () => (
    <ChCurateCommitteeView
      view="decided"
      step="decided"
      isCommittee
      collections={rows}
      activeRow={activeRow}
      activeId={activeRow.id}
      decision="rejected"
      onBackToQueue={noop}
    />
  ),
};
