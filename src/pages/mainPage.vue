<template>
    <div class="page">
        <div class="play">
            <my-button @click="$router.push('/game')">Start Quiz</my-button>    
        </div>
    </div>
</template>

<script>
import MyButton from '@/UI/myButton.vue';

    export default {
        components: {
            MyButton,
        }
    }
</script>

<style scoped>
    div h1{
        text-align: center;
    }
    .page{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        min-height: 89vh;
        background-color: #fff7b1;
    }
    .play{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }
</style>