// Degraded / auth-gated fallback data. These JSON files are captured catalyst
// responses living next to the SSR app; Vite imports JSON natively so they are
// inlined into the relevant lazy chunk. Panels import a named fixture and render
// it whenever the live endpoint is edge-404 / 401 (anon) — flip to live later by
// attaching a signed auth header through the same getJSON path, no structural change.

import passportFixture from "../../../sites/app/fixtures/bevy-overlay-passport.json";
import notificationsFixture from "../../../sites/app/fixtures/bevy-overlay-notifications.json";
import friendsFixture from "../../../sites/app/fixtures/bevy-overlay-friend-request.json";
import mapJumpFixture from "../../../sites/app/fixtures/bevy-overlay-map-jump.json";
import backpackEmotesFixture from "../../../sites/app/fixtures/bevy-overlay-backpack-emotes.json";
import backpackEquipFixture from "../../../sites/app/fixtures/bevy-overlay-backpack-equip.json";
import communityCreateFixture from "../../../sites/app/fixtures/bevy-overlay-community-create.json";
import communityJoinFixture from "../../../sites/app/fixtures/bevy-overlay-community-join.json";
import outfitSaveFixture from "../../../sites/app/fixtures/bevy-overlay-outfit-save.json";
import settingsFixture from "../../../sites/app/fixtures/bevy-overlay-settings.json";
import voiceJoinFixture from "../../../sites/app/fixtures/bevy-overlay-voice-join.json";

export {
  passportFixture,
  notificationsFixture,
  friendsFixture,
  mapJumpFixture,
  backpackEmotesFixture,
  backpackEquipFixture,
  communityCreateFixture,
  communityJoinFixture,
  outfitSaveFixture,
  settingsFixture,
  voiceJoinFixture,
};
