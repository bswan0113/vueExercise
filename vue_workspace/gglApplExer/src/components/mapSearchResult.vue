<template>
    <div class="container">
        <div class=""  v-if="result.name !=''">
            <h2>{{ result.name }}</h2>
            <p>{{ result.info }} <br></p>
            <p>
            생산량 : {{result.data.production }}   <br> 
            최근방문일 : {{result.data.lastVisitDate }}   <br> 
            체크여부 :  
            <span v-if="result.data.isChecked">O</span>
            <span v-else>X</span>
            </p>
            <hr>
            <div class="recent-search">

            </div>
        </div>
    </div>
</template>

<script setup>
import {inject}  from 'vue'

const result = inject('result');


</script>

<style scoped>
.container{
    border: 1px solid #dae1e6;
    width: 300px;
    margin-left: -1px;
}
.recent-search{
    height:40%;
}
</style>