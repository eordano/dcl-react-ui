import { describe, it, expect } from "vitest";

import { CommunitySchema } from "./communitiesSchema";
import { serviceBase } from "./client";

const ID = "e99471aa-31c4-4952-abf6-99905445f43b";

describe("CommunitySchema thumbnailUrl", () => {
  it("maps the service's literal N/A sentinel to null", () => {
    const c = CommunitySchema.parse({ id: ID, thumbnailUrl: "N/A" });
    expect(c.thumbnailUrl).toBeNull();
  });

  it("maps missing thumbnails to null (prod omits the field unsigned)", () => {
    const c = CommunitySchema.parse({ id: ID });
    expect(c.thumbnailUrl).toBeNull();
  });

  it("repoints cdn.decentraland.org thumbnails at the communities CDN base", () => {
    const c = CommunitySchema.parse({
      id: ID,
      thumbnailUrl: `https://cdn.decentraland.org/social/communities/${ID}/raw-thumbnail.png`,
    });
    expect(c.thumbnailUrl).toBe(
      `${serviceBase("communitiesCdn")}/social/communities/${ID}/raw-thumbnail.png`,
    );
  });

  it("leaves other hosts untouched (prod assets CDN, the CDN base itself)", () => {
    const assets = `https://assets-cdn.decentraland.org/social/communities/${ID}/raw-thumbnail.png`;
    expect(CommunitySchema.parse({ id: ID, thumbnailUrl: assets }).thumbnailUrl).toBe(assets);

    const own = `${serviceBase("communitiesCdn")}/social/communities/${ID}/raw-thumbnail.png`;
    expect(CommunitySchema.parse({ id: ID, thumbnailUrl: own }).thumbnailUrl).toBe(own);
  });

  it("does not rewrite cdn.decentraland.org outside community thumbnail paths", () => {
    const other = "https://cdn.decentraland.org/some/other/asset.png";
    expect(CommunitySchema.parse({ id: ID, thumbnailUrl: other }).thumbnailUrl).toBe(other);
  });
});
