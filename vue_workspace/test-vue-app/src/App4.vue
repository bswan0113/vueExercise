<template>
  <div>
    <Sender></Sender>
    <Receiver></Receiver>
  </div>
</template>

<script>
import Receiver from './components/Receiver.vue'
import Sender from './components/Sender.vue';

export default{
  name : "App4",
  components:{Sender, Receiver}
}
</script>

<style scoped>

</style>