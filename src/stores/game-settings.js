import { defineStore } from 'pinia';

export const useGameSettingsStore = defineStore('gameSettings', {
  state: () => ({
    difficulty: localStorage.getItem('gameDifficulty') || 'easy',
    category: localStorage.getItem('gameCategory') || '9',
    questionCount: Number(localStorage.getItem('gameQuestionCount')) || 10
  }),
  actions: {
    setDifficulty(difficulty) {
      this.difficulty = difficulty;
      localStorage.setItem('gameDifficulty', difficulty);
    },
    setCategory(category) {
      this.category = category;
      localStorage.setItem('gameCategory', category);
    },
    setQuestionCount(count) {
      this.questionCount = Number(count);
      localStorage.setItem('gameQuestionCount', count.toString());
    }
  }
});