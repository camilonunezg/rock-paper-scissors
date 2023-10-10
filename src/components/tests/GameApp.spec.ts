import { describe, test, expect, assert } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import GameApp from "../GameApp.vue";

import {
  PlayKeys,
  getMachinePick,
  machinePick,
  getPlayOptionBySlugName,
  checkGameIsLose,
  checkGameIsDraw,
} from "../GameController";

describe("Given the game starts", () => {
  render(GameApp);
  const machinePickSelector = screen.queryByTestId("machine-pick");

  describe("When game starts with any interaction", () => {
    test("Then no machine choose is selected", async () => {
      expect(machinePickSelector).toBe(null)
    })
  })

  describe("When player choose rock and machine chosse paper", async () => {
    const rockSelection = getPlayOptionBySlugName(PlayKeys.Rock)
    const paperSelection = getPlayOptionBySlugName(PlayKeys.Paper)
    machinePick.value = paperSelection
    const userLose = checkGameIsLose(rockSelection);
    test("Then the message contains 'lose'", async () => {
      await waitFor(() => expect(userLose).toBe(true))
    });
  });

  describe("When player choose rock and machine chosse scissors", async () => {
    const rockSelection = getPlayOptionBySlugName(PlayKeys.Rock)
    const scissorsSelection = getPlayOptionBySlugName(PlayKeys.Scissors)
    machinePick.value = scissorsSelection
    const userLose = checkGameIsLose(rockSelection);
    const isDraw = checkGameIsDraw(rockSelection, scissorsSelection);
    test("Then the player wins", async () => {
      expect(!userLose && !isDraw).toBe(true)
    });
  });

  describe("When a random choose is compared with itself", async () => {
    getMachinePick()
    test("Then the game result is a 'draw'", () => {
      assert.equal(machinePick.value.slugName, machinePick.value.slugName)
    })
  })
});
