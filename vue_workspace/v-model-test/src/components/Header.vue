<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark mt2">
        <span class="navbar-brand">Egoist</span>
        <button class="navbar-toggler" type="button" @click="changeIsNavShow">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navClass">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/members">Members</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/videos">Videos</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {reactive, computed} from 'vue'

    export default {
        setup(){
            const state = reactive({
                isNavShow : false
            })

            const navClass =computed(()=> state.isNavShow ? "collapse navbar-collapse show" : "collapse navbar-collapse")

            const changeIsNavShow = () => { state.isNavShow = !state.isNavShow;}
         
            return {state, navClass, changeIsNavShow}
        }        
    }
</script>

<style scoped>

</style>