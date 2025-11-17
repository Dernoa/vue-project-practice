import { defineStore } from "pinia";

export const useGameResults = defineStore('gameResults',{
    state: () => ({
        gameData: {
            gameOrder: [],
            gameDifficulty: [],
            gameCategory: [],
            gameQuestionCount: [],
            gameProcentage: []
        },
        gameOrderCount: 0,
    }),
    actions: {
        setGameData(gameDifficulty,gameCategory,gameQuestionCount,gameProcentage){
            this.gameData.gameOrder.push(this.gameOrderCount);
            this.gameData.gameDifficulty.push(gameDifficulty);
            this.gameData.gameCategory.push(gameCategory);
            this.gameData.gameQuestionCount.push(gameQuestionCount);
            this.gameData.gameProcentage.push(gameProcentage);
            this.gameOrderCount++;
        },
        getGameData(){
            return this.gameData
        }
    }
}

)