<template>
    <select :value="modelValue" @change="changeOption">
        <option disabled value="">Choose</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
    </select>
</template>

<script>
    export default {
        name: 'my-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }    
        },
        methods: {
            changeOption(event){
                this.$emit('update:modelValue',event.target.value)
            }
        }
    }
</script>

<style scoped>
    select{
        background: none;
        font-weight: bold;
        border: 3px solid #0a2a2a;
    }
    select option{
        background-color: #fff7b1;
        font-weight: bold;
    }
</style>