<template>
    <div class="page">
    <div class="results">
        <div v-for="(game, index) in gameResults.gameData.gameOrder" :key="index" class="gameInfo">
            <div>
                <div><strong>Game №</strong> {{ game + 1 }}</div>
                <div><strong>Difficulty:</strong> {{ gameResults.gameData.gameDifficulty[index] }}</div>
                <div><strong>Category:</strong> {{ gameResults.gameData.gameCategory[index] }}</div>
                <div><strong>Questions Count:</strong> {{ gameResults.gameData.gameQuestionCount[index] }}</div>
                <div><strong>Percentage:</strong> {{ gameResults.gameData.gameProcentage[index] }}%</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
    import { useGameResults } from '@/stores/game-results';
    const gameResults = useGameResults()
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