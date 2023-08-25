<template>
    <div class="card card-body">
        <h2>404 Not Found</h2>
        <p>존재하지않는 요청경로 : {{ $route.fullPath }}</p>adasd
    </div>
</template>

<script>
    export default {
        name:"NotFound",
        created(){
            console.log(this.$route.params)
        }
    }
</script>

<style scoped>

</style>