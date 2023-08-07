<template>
  <div>
    <h2>idol</h2>
    <hr>
    <ul>
      <CheckboxItem v-for="idol in idols" :key="idol.id"
                    :id="idol.id" :name="idol.name" :checked="idol.checked"></CheckboxItem>
    </ul>
  </div>
</template>

<script>
import CheckboxItem from './components/CheckboxItem.vue'
  export default {
  components: { CheckboxItem },
  data(){

    return{
      idols :[
        {id:"idol",name:"BTS",checked:true},
        {id:"iNeedu",name:"EXo", checked:1},
        {id:"bloodAndSweat",name:"DBSGB"},
        {id:"ON",name:"spjnaer"},
      ]
    }
  }
  }
</script>

<style scoped>

</style>