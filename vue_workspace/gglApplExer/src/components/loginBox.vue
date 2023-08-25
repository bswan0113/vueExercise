<template>
    <form @submit.prevent="login" class="form-group login-box">
        <div class="login-input">
            <input type="text" class="form-control mb-2" v-model="id"> 
            <input type="password" class="form-control" v-model="pw">
        </div>
        <div class="login-service mb-2 mt-1">
            <input type="checkbox" name="" id="">자동로그인
            <input type="checkbox" name="" id="">아이디저장 
        </div>
        <div class="login-btn-box">
            <button type="submit" class="btn btn-primary">로그인</button>
            <button type="button" class="btn btn-danger">구글 로그인</button>
            <button type="button" class="btn btn-basic border">애플 로그인</button> 
        </div>
        <div class="signup-box mt-1">
            <button type="button" class="signup-btn">회원가입</button>
            <button type="button" class="signup-btn">간편회원가입</button>
        </div>
    </form>
</template>

<script setup>
    import UserList from '@/assests/userInfo.json'
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'
    
    const id = ref();
    const pw = ref();
    const router = useRouter();

    const login = ()=>{
        const user = {id : id.value, pw :pw.value};
        const matchedUser = UserList.find(u => u.id === user.id && u.password === user.pw);

        if (matchedUser) {
            router.push({name:'success', params:{ id: user.id}});
        } else {
        alert('로그인 실패! 아이디와 비밀번호를 확인해주세요!');
        }
    }
</script>

<style scoped>
.login-box{
    margin-top: 20px;
    width:40%;
}
.btn-basic{
    font-weight: bold;
}
.btn-basic:hover{
    background-color: #dae1e6;
}
.signup-btn{
    border:none;
    background-color: white;
    font-size: 16px;
    border-radius: 3%;
    padding: 4px;

}
.signup-btn:hover{
    background-color: #dae1e6;
    font-weight: bold;
}
</style>