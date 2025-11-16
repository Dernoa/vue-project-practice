import { defineStore } from 'pinia';

export const useGameAnswers = defineStore('gameAnswers', {
  state: () => ({
    answers: new Map(),
  }),
  actions: {
    setAnswer(questionId, answer) {
        this.answers.set(questionId, answer);
    },
    clearAnswers() {
        this.answers.clear();
    },
    getAnswer(questionId) {
        return this.answers.get(questionId);
    },
    getAllAnswers() {
        return Array.from(this.answers.entries());
    }
  }
});