<script setup lang="ts">
import {
  playOptions,
  machinePick,
  labelResult,
  startToPlay,
} from "./GameController";
</script>

<template>
  <section>
    <h1>Rock, Paper, Scissors</h1>
    <h2 v-show="labelResult" data-testid="game-result">
      !!! You {{ labelResult }} !!!
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
            option.slugName === machinePick?.slugName ? 'machine-pick' : ''
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
