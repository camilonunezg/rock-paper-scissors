<script setup lang="ts">
import { reactive } from 'vue';

enum PlayKeys {
  Rock = "ROCK",
  Scissors = "SCISSORS",
  Paper = "PAPER",
}

interface IPlayOption {
  icon: string,
  slugName: string,
  beats: PlayKeys[],
  defeatedBy: PlayKeys[],
}

const playOptions = reactive<IPlayOption[]>([
  {
    icon: "🗿",
    slugName: PlayKeys.Rock,
    beats: [PlayKeys.Scissors],
    defeatedBy: [PlayKeys.Paper],
  },
  {
    icon: "✂️",
    slugName: PlayKeys.Scissors,
    beats: [PlayKeys.Paper],
    defeatedBy: [PlayKeys.Rock],
  },
  {
    icon: "📄",
    slugName: PlayKeys.Paper,
    beats: [PlayKeys.Rock],
    defeatedBy: [PlayKeys.Scissors],
  },
])
</script>

<template>
  <section>
    <h1>Rock, Paper, Scissors</h1>
    <div class="container">
      <button class="btn" v-for="option in playOptions" :key="option.slugName">
        {{ option.icon }}
      </button>
    </div>
  </section>
</template>

<style scoped>
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
