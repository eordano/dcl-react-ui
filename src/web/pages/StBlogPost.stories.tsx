import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import StBlogPost from "./StBlogPost";

const meta = {
  title: "Web/Pages/Blog/Post",
  component: StBlogPost,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof StBlogPost>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_POST: NonNullable<ComponentProps<typeof StBlogPost>["post"]> = {
  id: "sample-post",
  slug: "sample-post",
  title: "Sample Post Title for the Blog Detail Layout",
  description:
    "A short description used to preview the blog post detail layout in Storybook.",
  publishedDate: "Jun 18, 2026",
  image: { url: "", width: 1200, height: 600 },
  category: { id: "announcements", title: "Announcements", slug: "announcements", url: "/blog?category=announcements" },
  author: {
    id: "sample-author",
    title: "Sample Author",
    slug: "sample-author",
    image: { url: "" },
    url: "/blog",
  },
  body: [
    { type: "p", content: "Opening paragraph of the sample post body." },
    { type: "h2", content: "A Section Heading" },
    { type: "p", content: "Another paragraph to show body rhythm and spacing." },
    { type: "quote", content: "A pull quote to preview the blockquote style." },
    { type: "h3", content: "A Subsection" },
    { type: "ul", items: ["First list item", "Second list item", "Third list item"] },
  ],
};

const SAMPLE_RELATED: NonNullable<ComponentProps<typeof StBlogPost>["related"]> = [
  {
    id: "rel-1",
    title: "Related Post One",
    publishedDate: "Jun 12, 2026",
    image: { url: "" },
    category: { title: "Platform", slug: "platform", url: "/blog?category=platform" },
    url: "/blog",
  },
  {
    id: "rel-2",
    title: "Related Post Two",
    publishedDate: "Jun 05, 2026",
    image: { url: "" },
    category: { title: "Community", slug: "community", url: "/blog?category=community" },
    url: "/blog",
  },
  {
    id: "rel-3",
    title: "Related Post Three",
    publishedDate: "May 29, 2026",
    image: { url: "" },
    category: { title: "Announcements", slug: "announcements", url: "/blog?category=announcements" },
    url: "/blog",
  },
];

export const Default: Story = {
  render: () => <StBlogPost post={SAMPLE_POST} related={SAMPLE_RELATED} />,
};

export const Loading: Story = {
  render: () => <StBlogPost state="loading" />,
};

export const Error: Story = {
  render: () => <StBlogPost state="error" />,
};

export const NoRelated: Story = {
  render: () => <StBlogPost post={SAMPLE_POST} related={[]} />,
};

export const Empty: Story = {
  render: () => <StBlogPost />,
};
