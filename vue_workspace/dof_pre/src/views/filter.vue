<template>
    <div>
      <table>
        <thead>
          <tr>
            <th :class="{ active: isActive[0] }" @click="toggleActive(0), mine(0)">전체</th>
            <th :class="{ active: isActive[1] }" @click="toggleActive(1), mine(1)">내well</th>
            <th :class="{ active: isActive[2] }" @click="toggleActive(2), mine(2)">즐겨찾기 well</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :class="{ active: isActive[3] }" @click="toggleActive(3)">전체</td>
            <td :class="{ active: isActive[4] }" @click="toggleActive(4)">요청</td>
            <td :class="{ active: isActive[5] }" @click="toggleActive(5)">진행</td>
            <td :class="{ active: isActive[6] }" @click="toggleActive(6)">완료</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, getCurrentInstance } from 'vue';
  
  const instance = getCurrentInstance();

  const isActive = ref([false, false, false, false, false, false, false]);
  
  const toggleActive = (index) => {
    isActive.value = isActive.value.map((value, i) => i === index ? !value : false);
  };

  const mine = (a) =>{
    instance.emit('mine',a)
  };
  </script>

<style scoped>
table{
    border-spacing: 5px;
    border-collapse: separate;
}
th, td{
    height: 60px;
    width: 120px;
    background-color: #dae1e6;
    border-radius: 50px 50px 50px 50px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    padding: 8px;
}
th:hover, td:hover{
    background-color: #a1a3a5d5;
}
.active{
    background-color: #a1a3a5d5;
}
</style>