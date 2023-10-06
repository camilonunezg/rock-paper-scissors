import { reactive, ref } from "vue";

export enum PlayKeys {
  Rock = "ROCK",
  Scissors = "SCISSORS",
  Paper = "PAPER",
  Spock = "SPOCK",
  Lizard = "LIZARD",
}

export enum Results {
  Win = "Win",
  Lose = "Lose",
  Draw = "Draw",
}

export interface IPlayOption {
  icon: string;
  slugName: PlayKeys;
  beats: PlayKeys[];
  defeatedBy: PlayKeys[];
}

export const playOptions = reactive<IPlayOption[]>([
  {
    icon: "🗿",
    slugName: PlayKeys.Rock,
    beats: [PlayKeys.Scissors, PlayKeys.Lizard],
    defeatedBy: [PlayKeys.Paper, PlayKeys.Spock],
  },
  {
    icon: "✂️",
    slugName: PlayKeys.Scissors,
    beats: [PlayKeys.Paper, PlayKeys.Lizard],
    defeatedBy: [PlayKeys.Rock, PlayKeys.Spock],
  },
  {
    icon: "📄",
    slugName: PlayKeys.Paper,
    beats: [PlayKeys.Rock, PlayKeys.Spock],
    defeatedBy: [PlayKeys.Scissors, PlayKeys.Lizard],
  },
  {
    icon: "🦎",
    slugName: PlayKeys.Lizard,
    beats: [PlayKeys.Paper, PlayKeys.Spock],
    defeatedBy: [PlayKeys.Rock, PlayKeys.Scissors],
  },
  {
    icon: "🖖",
    slugName: PlayKeys.Spock,
    beats: [PlayKeys.Rock, PlayKeys.Scissors],
    defeatedBy: [PlayKeys.Paper, PlayKeys.Lizard],
  },
]);

export const machinePick = ref<any>(null);

export const checkGameIsDraw = (
  optionSelected: IPlayOption,
  machinePick: IPlayOption
) => optionSelected.slugName === machinePick.slugName;
export const checkGameIsLose = (optionSelected: IPlayOption) =>
  optionSelected.defeatedBy.includes(machinePick.value.slugName);
