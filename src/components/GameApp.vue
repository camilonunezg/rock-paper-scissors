<script setup lang="ts">
import { reactive, ref } from "vue";

enum PlayKeys {
  Rock = "ROCK",
  Scissors = "SCISSORS",
  Paper = "PAPER",
  Spock = "SPOCK",
  Lizard = "LIZARD",
}

interface IPlayOption {
  icon: string;
  slugName: PlayKeys;
  beats: PlayKeys[];
  defeatedBy: PlayKeys[];
}
enum Results {
  Win = "Win",
  Lose = "Lose",
  Draw = "Draw",
}
const playOptions = reactive<IPlayOption[]>([
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
const machinePick = ref<any>(null);
const showResult = ref('');
function getMachinePick() {
  const randomIndex = Math.floor(Math.random() * playOptions.length);
  machinePick.value = playOptions[randomIndex];
}

const checkGameIsDraw = (optionSelected: IPlayOption) => optionSelected.slugName === machinePick.value.slugName
const checkGameIsLose = (optionSelected: IPlayOption) => optionSelected.defeatedBy.includes(machinePick.value.slugName)

function startToPlay(optionSelected: IPlayOption) {
  getMachinePick();
  const userLose = checkGameIsLose(optionSelected)
  const isDraw = checkGameIsDraw(optionSelected)
  if (!userLose && !isDraw) {
    showResult.value = Results.Win;
  } else if (isDraw) {
    showResult.value = Results.Draw;
  } else {
    showResult.value = Results.Lose;
  }
}
</script>

<template>
  <section>
    <h1>Rock, Paper, Scissors</h1>
    <h2 v-if="showResult">!!! You {{ showResult }} !!!</h2>
    <div class="main-container">
      <div class="container">
        <button
          class="btn"
          v-for="option in playOptions"
          :key="option.slugName"
          @click="startToPlay(option)"
        >
          {{ option.icon }}
        </button>
      </div>
      <div class="container">
        <button
          class="btn"
          v-for="option in playOptions"
          :key="option.slugName"
          :disabled="option.slugName !== machinePick?.slugName ?? ''"
        >
          {{ option.icon }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.btn {
  font-size: 2rem;
  width: fit-content;
}
</style>
