<template>
    <div>
        <div><button @click="addLike">Like</button></div>
        <div>Кол-во лайков {{likes}}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                likes: 0,
            }
        },
        methods: {
            addLike(){
                this.likes += 1;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>