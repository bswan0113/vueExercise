<template>
    <div class="card card-body">
        <h2>About : {{ user.name }}</h2>
        <p>Tel : {{ user.tel }}</p>
        <p>Address : {{ user.address }}</p>
    </div>
</template>

<script>
import {reactive} from 'vue'

    export default {
        async setup(){
            
        }
    }
</script>
