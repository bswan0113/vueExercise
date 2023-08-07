<template>
  <div class="header">
    <h1 class="headerText">태평양 전쟁의 해전</h1>
    <nav>
      <ul class="nav nav-tabs nav-fill">
        <li v-for="tab in tabs" :key="tab.id" class="nav-item">
          <a style="cursor: pointer;" class="nav-link" :class="{active : tab.id === currentTab}" @click="changeTab(tab.id)">{{ tab.label }}</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container">
    <KeepAlive include="CoralSeaTab, MidwayTab">
    <component :is="currentTab"></component>
  </KeepAlive>
  </div>
</template>

<script>
import CoralSeaTab from './components/CoralSeaTab.vue';
import LeyTeGulfTab from './components/LeyTeGulfTab.vue';
import MidwayTab from './components/MidwayTab.vue'; 
export default {
    name : 'App',
    components : {CoralSeaTab, LeyTeGulfTab, MidwayTab},
    data(){
      return{
        currentTab : 'CoralSeaTab',
        tabs: [
          {id:"CoralSeaTab", label:"산호해 해전"},
          {id:"MidwayTab", label:"미드웨이 해전"},
          {id:"LeyTeGulfTab", label:"레이테만 해전"}
        ]
      }
    },
    methods:{
      changeTab(tab){
        this.currentTab=tab;
      }
    }
  }
</script>

<style scoped>

</style>