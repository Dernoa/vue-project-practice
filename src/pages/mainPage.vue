<template>
    <div class="page">
        <div class="main">
            <div>
                <button @click="$router.push('/game')">Начать викторину</button>
            </div>
            <div>
                Последние результаты
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    div h1{
        text-align: center;
    }
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
    }

</style>