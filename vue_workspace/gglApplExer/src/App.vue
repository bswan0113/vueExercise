
<template>
  <div class="main">
   <h2> 로그인구현샘플</h2>
    <RouterView></RouterView>
    <router-link to="/">home</router-link> <br>
    <router-link to="/map">googlemap</router-link>
  </div>
</template>
<script setup>

</script>

<style scoped>
.main{
  padding: 50px;
  width: 80%;
}
</style>
