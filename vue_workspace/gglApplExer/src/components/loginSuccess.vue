<template>
    <div>
        <h2>로그인 성공화면</h2>
        <span >아이디:{{ user.id }}</span><br>
        <span>이름:{{ user.name }}</span><br>
        <span>직업: {{ user.job }}</span><br>
        <span>이메일:{{ user.email }}</span>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import UserList from '@/assests/userInfo.json'

const id =ref();
const route = useRoute();
id.value=route.params.id;
const user = UserList.find(u => u.id === id.value);
console.log(user)
</script>

<style scoped>

</style>