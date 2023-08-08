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
    <component :is="currentTab"></component>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import pMinDelay from 'p-min-delay'
import Loading from './components/Loading.vue'

const CoralSeaTab = defineAsyncComponent({
  loader : () => pMinDelay(import ('./components/CoralSeaTab.vue'), 2000),
  loadingComponent: Loading
})
const LeyTeGulfTab = defineAsyncComponent({
  loader : () => pMinDelay(import ('./components/LeyTeGulfTab.vue'), 2000),
  loadingComponent: Loading
})
const MidwayTab = defineAsyncComponent({
  loader : () => pMinDelay(import ('./components/MidwayTab.vue'), 2000),
  loadingComponent: Loading
})


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