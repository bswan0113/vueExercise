<template>
    <form class="search-box" @submit.prevent="submitSearch">
        <input type="text" class="form-control" v-model="searchText">
        <button class="btn btn-primary search">검색</button>
    </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const searchText = ref('')
const emit = defineEmits()

const submitSearch = () => {
    emit('search', searchText.value);
    console.log(searchText)
}
</script>

<style scoped>
.search-box{
    position: relative;
}
.search{
    position: absolute;
    top: 0;
    right: 0;
}
</style>