<template>
    <div className="mt-5">
       <h4 class="mt2">{{ member.name }} {{ member.role }}</h4>
       <p>{{ member.desc }}</p>
       <router-link :to="{name:'members'}">목록</router-link> 
    </div>
</template>

<script>
import { useRoute} from 'vue-router';
import members from '@/members.json'

    export default {
        name : "MemberInfo",
        props:['id'],
        setup(props){
            // const currentRoute = useRoute()
            // const id =parseInt(currentRoute.params.id,10);
            // const member = members.find((m) =>m.id === id)
            const member = members.find((m)=>m.id === parseInt(props.id,10))
            return {member}
        }
    }
</script>

<style scoped>

</style>