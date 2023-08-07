<template>
  <div>
    <h2>Hey jayce do you know makgeolri?</h2>
    <hr>
    <ul>
      <CheckboxItem v-for="idol in idols" :key="idol.id"
                    :idol="idol"></CheckboxItem>
    </ul>
  </div>
</template>

<script>
import CheckboxItem from './components/CheckboxItem2.vue'
  export default {
  components: { CheckboxItem },
  data(){

    return{
      
    idols :[
      {id:"idol",name:"tough it tough it",checked:true},
      {id:"iNeedu",name:"it goes around and around",checked:false},
      {id:"bloodAndSweat",name:"i`so sick of this fake love",checked:false},
      {id:"ON",name:"dungdungdungdungdungdungdungdung",checked:false},
    ]
    }
  }
  }
</script>

<style scoped>

</style>