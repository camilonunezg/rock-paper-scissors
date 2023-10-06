<script setup lang="ts">
import { ref } from "vue";
import {
  playOptions,
  IPlayOption,
  Results,
  machinePick,
  checkGameIsLose,
  checkGameIsDraw,
} from "./GameController";

const showResult = ref("");
function getMachinePick() {
  const randomIndex = Math.floor(Math.random() * playOptions.length);
  machinePick.value = playOptions[randomIndex];
}

function startToPlay(optionSelected: IPlayOption) {
  getMachinePick();
  const userLose = checkGameIsLose(optionSelected);
  const isDraw = checkGameIsDraw(optionSelected, machinePick.value);
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
    <h2 v-show="showResult" data-testid="game-result">
      !!! You {{ showResult }} !!!
    </h2>
    <div class="main-container">
      <div class="container">
        <button
          class="btn"
          v-for="option in playOptions"
          :key="option.slugName"
          :data-testid="option.slugName"
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
          :data-testid="
            option.slugName !== machinePick?.slugName ? 'machine-pick' : ''
          "
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
