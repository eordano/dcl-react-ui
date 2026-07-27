import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { primeBootPosition } from "../app/BootGate";
import { PlaceSchema } from "../data/catalyst/placesSchema";
import { toPlaceView } from "../data/catalyst/places";
import { qk } from "../data/queryKeys";
import { renderBoot } from "./harness";
import type { BootHarness } from "./harness";

const parcelPlace = toPlaceView(
  PlaceSchema.parse({
    id: "p1",
    title: "Plaza Party",
    base_position: "10,-20",
    positions: ["10,-20"],
    user_count: 9,
  }),
);

const worldPlace = toPlaceView(
  PlaceSchema.parse({
    id: "w1",
    title: "Kickoff World",
    world: true,
    world_name: "kickoff.dcl.eth",
    base_position: "0,0",
  }),
);

const PICKER_PARAMS = { limit: 48, order_by: "most_active", order: "desc" };

function openPicker(harness: BootHarness): void {
  harness.queryClient.setQueryData(qk.places(PICKER_PARAMS), [
    parcelPlace,
    worldPlace,
  ]);
  fireEvent.click(screen.getByRole("checkbox"));
  const jump = screen.getByText("JUMP IN");
  fireEvent.click(jump.closest("button") ?? jump);
}

function pickCard(title: string): void {
  fireEvent.click(screen.getByText(title));
}

beforeEach(() => {
  window.dclEngineReady = true;
  window.dclEngineStart = vi.fn();
});
afterEach(() => {
  delete window.dclEngineReady;
  delete window.dclEngineStart;
  document.getElementById("position")?.remove();
});

function installPositionInput(): HTMLInputElement {
  const input = document.createElement("input");
  input.id = "position";
  document.body.appendChild(input);
  return input;
}

describe("destination picker jump", () => {
  test("picker cards come from the places summary cache, no entity fetches", () => {
    const harness = renderBoot();
    openPicker(harness);
    expect(screen.getByText("Plaza Party")).toBeInTheDocument();
    expect(screen.getByText("Kickoff World")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalledWith(
      expect.stringContaining("entities/active"),
      expect.anything(),
    );
  });

  test("parcel pick primes the engine boot position and skips the Teleport", () => {
    const input = installPositionInput();
    const harness = renderBoot();
    openPicker(harness);
    pickCard("Plaza Party");

    expect(input.value).toBe("10,-20");
    expect(window.dclEngineStart).toHaveBeenCalledTimes(1);

    harness.bridge.pushIdentity({ isGuest: true, name: "guest" });
    harness.bridge.expectNotSent("Teleport");
    harness.bridge.expectNotSent("ChangeRealm");
  });

  test("without the host position input the parcel pick falls back to Teleport", () => {
    const harness = renderBoot();
    openPicker(harness);
    pickCard("Plaza Party");

    expect(window.dclEngineStart).toHaveBeenCalledTimes(1);
    harness.bridge.expectNotSent("Teleport");

    harness.bridge.pushIdentity({ isGuest: true, name: "guest" });
    harness.bridge.expectSent("Teleport", { x: 10 * 16 + 8, z: -20 * 16 + 8 });
  });

  test("world pick keeps the deferred ChangeRealm and never touches the position input", () => {
    const input = installPositionInput();
    const harness = renderBoot();
    openPicker(harness);
    pickCard("Kickoff World");

    expect(input.value).toBe("");
    expect(window.dclEngineStart).toHaveBeenCalledTimes(1);

    harness.bridge.pushIdentity({ isGuest: true, name: "guest" });
    harness.bridge.expectSent("ChangeRealm", { realm: "kickoff.dcl.eth" });
    harness.bridge.expectNotSent("Teleport");
  });
});

describe("primeBootPosition", () => {
  test("null and world destinations leave the input alone", () => {
    const input = installPositionInput();
    expect(primeBootPosition(null)).toBe(false);
    expect(primeBootPosition({ kind: "world", realm: "a.dcl.eth" })).toBe(false);
    expect(input.value).toBe("");
  });

  test("parcel destination writes x,y and reports success", () => {
    const input = installPositionInput();
    expect(primeBootPosition({ kind: "parcel", x: -29, y: 55 })).toBe(true);
    expect(input.value).toBe("-29,55");
  });
});
