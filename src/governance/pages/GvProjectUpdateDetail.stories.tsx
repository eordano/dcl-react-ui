import type { Meta, StoryObj } from "@storybook/react-vite";
import GvProjectUpdateDetail, {
  type GvProjectUpdate,
  type GvUpdateComment,
  type GvUpdateProject,
} from "./GvProjectUpdateDetail";

const PROJECT: GvUpdateProject = {
  id: "0x9f3c-7a21",
  title: "Decentraland Builders Hackathon Season 5",
  authorHue: 268,
};

const UPDATE: GvProjectUpdate = {
  id: "u-0007",
  index: 4,
  status: "late",
  health: "onTrack",
  author: "buildersdao.dcl",
  completion_date: "Jun 12, 2026",
  updated_at: "Jun 13, 2026",
  due_date: "Jun 09, 2026",
  due_amount: "3 days",
  introduction:
    "Season 5 wrapped its mid-program checkpoint this week. We onboarded 38 new builders, ran two live office-hours sessions, and shipped the first batch of mentor-paired scenes to a staging world for review.",
  highlights: [
    "38 first-time builders completed SDK onboarding (target was 30).",
    "12 playable scenes deployed to the staging world for mentor review.",
    "Public retention dashboard is live and tracking 30-day activity.",
  ],
  blockers:
    "Mentor availability dipped during the second week, which pushed three review sessions back. We have since added two backup mentors from the previous cohort to keep reviews on schedule.",
  next_steps:
    "Finalize the community-choice award shortlist, publish the 60-day retention snapshot, and prepare the post-program write-up with per-scene metrics.",
  additional_notes:
    "Retention dashboard and the staging world coordinates are linked in the forum thread for anyone who wants to playtest the submitted scenes.",
  financial_records: [
    {
      category: "Operational",
      records: [
        { description: "Mentor stipends (cohort)", receiver: "0x55…1b2a", token: "USDC", amount: 6000, link: "#tx1" },
        { description: "Office-hours hosting", receiver: "0x71…9c0d", token: "USDC", amount: 1200, link: "" },
      ],
    },
    {
      category: "Prizes",
      records: [
        { description: "Tier 3 prize pool top-up", receiver: "0x9a…4e51", token: "MANA", amount: 8500, link: "#tx3" },
      ],
    },
  ],
  funds: {
    released: "$24,000.00",
    releasedTxCount: 3,
    releasedTime: "Jun 11, 2026",
    disclosed: "$15,700.00",
    undisclosed: "$8,300.00",
  },
  discourse_topic_id: 81422,
};

const COMMENTS: GvUpdateComment[] = [
  {
    id: 1,
    name: "metaverse-mike.dcl",
    hue: 200,
    validated: true,
    time: "2 days ago",
    text: "Great checkpoint. The staging-world playtest was smooth and the mentor pairing is clearly paying off in scene quality.",
  },
  {
    id: 2,
    name: "0xab…77d3",
    hue: 12,
    validated: false,
    time: "1 day ago",
    text: "Appreciate the public retention dashboard — that transparency is exactly what we asked for last season. Looking forward to the 60-day snapshot.",
  },
];

const meta = {
  title: "Governance/Pages/Project Update Detail",
  component: GvProjectUpdateDetail,
  parameters: { layout: "fullscreen" },
  args: {
    update: UPDATE,
    project: PROJECT,
    comments: COMMENTS,
  },
} satisfies Meta<typeof GvProjectUpdateDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AtRiskHealth: Story = {
  args: {
    update: { ...UPDATE, health: "atRisk" },
  },
};

export const Loading: Story = {
  args: { state: "loading" },
};

export const NotFound: Story = {
  args: { state: "error" },
};
