<template>
    <div class="page">
    <div class="results">
        <div v-for="(game, index) in gameResults.gameData.gameOrder" :key="index" class="gameInfo">
            <div>
                <div><strong>Game №</strong> {{ game + 1 }}</div>
                <div><strong>Difficulty:</strong> {{ gameResults.gameData.gameDifficulty[index] }}</div>
                <div><strong>Category:</strong> {{ getCategoryName(gameResults.gameData.gameCategory[index]) }}</div>
                <div><strong>Questions Count:</strong> {{ gameResults.gameData.gameQuestionCount[index] }}</div>
                <div><strong>Percentage:</strong> {{ gameResults.gameData.gameProcentage[index] }}%</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
    import { useGameResults } from '@/stores/game-results';
    const gameResults = useGameResults();
    function getCategoryName(value) {
        const categories = {
            9: 'General Knowledge',
            10: 'Entertainment: Books',
            11: 'Entertainment: Film',
            12: 'Entertainment: Music',
            13: 'Entertainment: Musicals & Theatres',
            14: 'Entertainment: Television',
            15: 'Entertainment: Video Games',
            16: 'Entertainment: Board Games',
            17: 'Science & Nature',
            18: 'Science: Computers',
            19: 'Science: Mathematics',
            20: 'Mythology',
            21: 'Sports',
            22: 'Geography',
            23: 'History',
            24: 'Politics',
            25: 'Art',
            26: 'Celebrities',
            27: 'Animals',
            28: 'Vehicles',
            29: 'Entertainment: Comics',
            30: 'Science: Gadgets',
            31: 'Entertainment: Japanese Anime & Manga',
            32: 'Entertainment: Cartoon & Animations'
        };

        return categories[value] || 'Unknown category';
    }
</script>

<style scoped>

    .page{
        min-height: 89vh;
        background-color: #fff7b1;
    }
    .results{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .gameInfo{
        margin: 5px 20px;
        border: 3px solid #0a2a2a;
    }

</style>