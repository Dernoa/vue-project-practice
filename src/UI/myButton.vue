<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
    .btn{
        margin: 5px;
        padding: 10px 15px;
        background: none;
        color: #0a2a2a;
        font-weight: bold;
        border: 3px solid #0a2a2a;
        border-radius: 15px;
    }
</style>