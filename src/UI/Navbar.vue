<template>
    <div class="navbar">
        <H1>QuizMaster</H1>
        <div class="navbar_btns">
            <my-button @click="$router.push('/')">Menu</my-button>
            <my-button @click="$router.push('/settings')">Settings</my-button>
            <my-button @click="$router.push('/results')">Results</my-button>
        </div>
    </div>
</template>

<script>
    import myButton from './myButton.vue';
    export default {
        components:{
            myButton,
        }
    }
</script>

<style scoped>
    h1 {
        display: block;
    }
    .navbar{
        min-height: 11vh;
        background-color: #33b49c;
        box-sizing: 2px 2px 4px gray;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>