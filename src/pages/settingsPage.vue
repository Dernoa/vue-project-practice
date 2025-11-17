<template>
    <div class="page">
        <h1>Choose game difficulty</h1>
        <my-select v-model="selectedDifficulty" :options="difficultyOptions"></my-select>
        
        <h1>Choose category</h1>
        <my-select v-model="selectedCategory" :options="categoryOptions"></my-select>
        
        <label for="inputNumber">
            <h1>Number of Questions </h1>
        </label>
        <input 
            type='number' 
            max="50" 
            min="1" 
            id='inputNumber'
            v-model.number="questionCount"
        >
        <h2>All changes saves automatically</h2>
    </div>
</template>

<script>
import mySelect from '@/UI/mySelect.vue';
import { useGameSettingsStore } from '@/stores/game-settings';

export default {
    components: {
        mySelect,
    },
    data() {
        return {
            difficultyOptions: [
                {value: 'easy', name: 'Easy'},
                {value: 'medium', name: 'Medium'},
                {value: 'hard', name: 'Hard'},
            ],
            categoryOptions: [
                {value: 9, name: 'General Knowledge'},
                {value: 10, name: 'Entertainment: Books'},
                {value: 11, name: 'Entertainment: Film'},
                {value: 12, name: 'Entertainment: Music'},
                {value: 13, name: 'Entertainment: Musicals & Theatres'},
                {value: 14, name: 'Entertainment: Television'},
                {value: 15, name: 'Entertainment: Video Games'},
                {value: 16, name: 'Entertainment: Board Games'},
                {value: 17, name: 'Science & Nature'},
                {value: 18, name: 'Science: Computers'},
                {value: 19, name: 'Science: Mathematics'},
                {value: 20, name: 'Mythology'},
                {value: 21, name: 'Sports'},
                {value: 22, name: 'Geography'},
                {value: 23, name: 'History'},
                {value: 24, name: 'Politics'},
                {value: 25, name: 'Art'},
                {value: 26, name: 'Celebrities'},
                {value: 27, name: 'Animals'},
                {value: 28, name: 'Vehicles'},
                {value: 29, name: 'Entertainment: Comics'},
                {value: 30, name: 'Science: Gadgets'},
                {value: 31, name: 'Entertainment: Japanese Anime & Manga'},
                {value: 32, name: 'Entertainment: Cartoon & Animations'}
            ]
        }
    },
    computed: {
        selectedDifficulty: {
            get() {
                const gameSettings = useGameSettingsStore();
                return gameSettings.difficulty;
            },
            set(value) {
                const gameSettings = useGameSettingsStore();
                gameSettings.setDifficulty(value);
            }
        },
        selectedCategory: {
            get() {
                const gameSettings = useGameSettingsStore();
                return gameSettings.category;
            },
            set(value) {
                const gameSettings = useGameSettingsStore();
                gameSettings.setCategory(value);
            }
        },
        questionCount: {
            get() {
                const gameSettings = useGameSettingsStore();
                return gameSettings.questionCount;
            },
            set(value) {
                const gameSettings = useGameSettingsStore();
                gameSettings.setQuestionCount(value);
            }
        }
    }
}
</script>

<style scoped>
    .page{    
        min-height: 89vh;
        background-color: #fff7b1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
       
    label {
        text-align: center;
    }
    
    #inputNumber {
        padding: 10px;
        font-weight: bold;
        border: 3px solid #0a2a2a;
        background: none;
        border-radius: 5px;
        width: 100px;
        text-align: center;
    }


</style>
