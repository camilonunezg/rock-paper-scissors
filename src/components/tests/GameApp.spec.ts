import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import GameApp from "../GameApp.vue";
import { PlayKeys, checkGameIsLose, checkGameIsDraw } from "../GameController";
import userEvent from "@testing-library/user-event";

describe("Given the game starts", () => {
  const wrapper = render(GameApp);
  const gameResult = screen.getByTestId("game-result");
  const rockSelector = screen.getByTestId(PlayKeys.Rock);
  const scissorsSelector = screen.getByTestId(PlayKeys.Scissors);

  describe("When player choose rock and machine chosse scissor", async () => {
    const drawOnRockSelection = checkGameIsDraw(
      {
        icon: "🗿",
        slugName: PlayKeys.Rock,
        beats: [PlayKeys.Scissors, PlayKeys.Lizard],
        defeatedBy: [PlayKeys.Paper, PlayKeys.Spock],
      },
      {
        icon: "🗿",
        slugName: PlayKeys.Rock,
        beats: [PlayKeys.Scissors, PlayKeys.Lizard],
        defeatedBy: [PlayKeys.Paper, PlayKeys.Spock],
      }
    );
    test("Then the message contains 'win'", () => {
      expect(drawOnRockSelection).toBe(true);
    });
  });
  describe("When player choose rock and machine chosse scissor", async () => {
    const drawOnRockSelection = checkGameIsDraw(
      {
        icon: "🗿",
        slugName: PlayKeys.Rock,
        beats: [PlayKeys.Scissors, PlayKeys.Lizard],
        defeatedBy: [PlayKeys.Paper, PlayKeys.Spock],
      },
      {
        icon: "📄",
        slugName: PlayKeys.Paper,
        beats: [PlayKeys.Rock, PlayKeys.Spock],
        defeatedBy: [PlayKeys.Scissors, PlayKeys.Lizard],
      }
    );
    test("Then the message contains 'win'", () => {
      expect(drawOnRockSelection).toBe(false);
    });
  });
});
