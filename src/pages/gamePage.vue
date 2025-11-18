<template>
    <div class="page">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="questions.length > 0 && !gameCompleted" class="question-label">
            <div v-if="currentQuestion.type == 'boolean'">
                <h2>Question: {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h2>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                </div>
                
                <div class="question">
                    <div class="question-text">
                        <strong>Question {{ currentQuestionIndex + 1 }}:</strong> 
                        {{ decodeHtml(currentQuestion.question) }}
                    </div>
                    <div class="answers">
                        <my-button @click="checkAnswer('True')">True</my-button>
                        <my-button @click="checkAnswer('False')">False</my-button>
                    </div>
                    <div v-if="userAnswers.has(currentQuestionIndex)" class="answer-status">
                        {{ userAnswers.get(currentQuestionIndex) ? '✅ Correct' : '❌ Wrong' }}
                    </div>
                </div>
            </div>
            <div v-if="currentQuestion.type == 'multiple'">
                <h2>Question: {{ currentQuestionIndex + 1 }} of {{ questions.length }}</h2>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: progress + '%' }"></div>
                </div>
                
                <div class="question">
                    <div class="question-text">
                        <strong>Question {{ currentQuestionIndex + 1 }}:</strong> 
                        {{ decodeHtml(currentQuestion.question) }}
                    </div>
                    <div class="answers">
                        <my-button 
                            v-for="(answer, index) in currentQuestion.incorrect_answers" 
                            :key="index"
                            @click="checkAnswer(answer)"
                        >
                            {{ answer }}
                        </my-button>
                    </div>
                    <div v-if="userAnswers.has(currentQuestionIndex)" class="answer-status">
                        {{ userAnswers.get(currentQuestionIndex) ? '✅ Correct' : '❌ Wrong' }}
                    </div>
                </div>
            </div>
        </div>

        <div v-if="gameCompleted" class="results-container">
            <h1>🎉 Quiz Completed!</h1>
            <div class="results-card">
                <h2>Your Results</h2>
                <div class="score">
                    {{ correctAnswersCount }} / {{ questions.length }}
                </div>
                <div class="percentage">
                    {{ correctPercentage }}% Correct
                </div>
                <div class="performance">
                    <span v-if="correctPercentage >= 80">Excellent! 🏆</span>
                    <span v-else-if="correctPercentage >= 60">Good job! 👍</span>
                    <span v-else-if="correctPercentage >= 40">Not bad! 😊</span>
                    <span v-else>Keep practicing! 💪</span>
                </div>
                
                <div class="results-actions">
                    <my-button @click="restartGame" class="restart-btn">
                        🎮 Play Again
                    </my-button>
                    <my-button @click="goToSettings" class="settings-btn">
                        ⚙️ Change Settings
                    </my-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useGameSettingsStore } from '@/stores/game-settings';
import { useGameAnswers } from '@/stores/game-answers';
import { useGameResults } from '@/stores/game-results';
import myButton from '@/UI/myButton.vue';

export default {
    data() {
        return {
            loading: false,
            error: null,
            questions: [],
            userAnswers: new Map(),
            currentQuestionIndex: 0,
            gameCompleted: false
        }
    },
    components: {
        myButton
    },
    computed: {
        gameSettings() {
            const store = useGameSettingsStore();
            return {
                questionCount: store.questionCount,
                category: store.category,
                difficulty: store.difficulty
            };
        },
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },
        progress() {
            return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        },
        correctAnswersCount() {
            let correct = 0;
            for (let [_, isCorrect] of this.userAnswers) {
                if (isCorrect) correct++;
            }
            return correct;
        },
        correctPercentage() {
            return Math.round((this.correctAnswersCount / this.questions.length) * 100);
        }
    },
    mounted() {
        this.loadQuestions();
    },
    methods: {
        async loadQuestions() {
            this.loading = true;
            this.error = null;
            
            try {
                const params = new URLSearchParams();
                params.append('amount', this.gameSettings.questionCount);
                
                if (this.gameSettings.category) {
                    params.append('category', this.gameSettings.category);
                }
                
                if (this.gameSettings.difficulty) {
                    params.append('difficulty', this.gameSettings.difficulty);
                }


                const url = `https://opentdb.com/api.php?${params.toString()}`;;

                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.response_code === 0) {
                    this.questions = data.results;
                    this.questions.forEach(question => {
                        if(question.incorrect_answers.length != 1){
                            question.incorrect_answers.splice(
                            Math.floor(Math.random() * 4), 
                            0, 
                            question.correct_answer
                        );
                        }
                    });
                } else {
                    throw new Error('API returned error: ' + data.response_code);
                }
                
            } catch (error) {
                this.error = 'Failed to load questions: ' + error.message;
                console.error('Loading error:', error);
            } finally {
                this.loading = false;
            }
        },
        
        checkAnswer(userAnswer) {
            const question = this.currentQuestion;
            const correctAnswer = question.correct_answer; 
            
            const isCorrect = userAnswer === correctAnswer;

            this.userAnswers.set(this.currentQuestionIndex, isCorrect);
            
            const answersStore = useGameAnswers();
            answersStore.setAnswer(this.currentQuestionIndex, isCorrect);
            

            setTimeout(() => {
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.currentQuestionIndex++;
                } else {
                    this.completeGame();
                }
            }, 1000);
        },

        completeGame() {
            this.gameCompleted = true;
            const settingsStore = useGameSettingsStore();
            const saveResults = useGameResults();
            saveResults.setGameData( settingsStore.difficulty,settingsStore.category,this.questions.length,this.correctPercentage)
        },

        restartGame() {
            const answersStore = useGameAnswers();
            answersStore.clearAnswers();
            
            this.userAnswers.clear();
            this.currentQuestionIndex = 0;
            this.gameCompleted = false;
            
            this.loadQuestions();
        },

        goToSettings() {
            const answersStore = useGameAnswers();
            answersStore.clearAnswers();
            
            this.$router.push('/settings');
        },

        decodeHtml(html) {
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        }
    }
}
</script>

<style scoped>
.page {
    min-height: 89vh;
    background-color: #fff7b1;
}
.error {
    color: red;
    font-weight: bold;
}

.loading{
    text-align: center;
}

.question {
    margin: 20px 0;
    padding: 20px;
    border: 3px solid #33b49c;
    border-radius: 12px;
}

.question-text {
    font-size: 1.2rem;
    margin-bottom: 20px;
    line-height: 1.5;
}

.answers {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.answer-status {
    margin-top: 15px;
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
}

.question-label {
    text-align: center;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: #e1e5e9;
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #4f46e5;
    transition: width 0.3s ease;
}

.results-container {
    text-align: center;
    padding: 20px;
}

.results-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
}

.score {
    font-size: 3rem;
    font-weight: bold;
    color: #4f46e5;
    margin: 20px 0;
}

.percentage {
    font-size: 1.5rem;
    color: #6b7280;
    margin-bottom: 15px;
}

.performance {
    font-size: 1.3rem;
    margin-bottom: 30px;
    font-weight: bold;
}

.results-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

.restart-btn {
    background: #4f46e5;
    color: white;
}

.settings-btn {
    background: #6b7280;
    color: white;
}
</style>