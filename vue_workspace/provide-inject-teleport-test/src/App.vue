<template>
  <div>
    <h2>최신 인기곡</h2>
    <SongList :songs="songs"></SongList>
    <br> <br>
    <button  @click="changeModal">텔레뽀트</button>
    <teleport to='#modal'>
      <Modal v-if="isModal"></Modal>
    </teleport>
  </div>
</template>

<script>
import Modal from './components/Modal.vue';
import SongList from './components/SongList.vue'
import {computed} from 'vue';

  export default {
    name : "App",
    components:{ SongList, Modal },
    data(){
      return{
      songs : [
        {id : 1, title : "Blueming", done:true},
        {id : 2, title : "Dynamite", done:true},
        {id : 3, title : "Lovesic Girls", done:true},
        {id : 4, title : "maria", done:false},
      ],
      isModal : false
    }
    },
    provide(){
      return{
        icons:{
          checked:"far fa-check-circle",
          unChecked : "far fa-circle"
        },
    doneCount : computed (()=> {
      return this.songs.filter((s)=>s.done === true).length
    })
      }
    },
    methods:{
      changeModal(){
        this.isModal=true;
        setTimeout(()=>{this.isModal = false},2000)
      }
    }
   
  }
</script>

<style scoped>
@import url("http://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css")
</style>