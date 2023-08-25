import Login from '@/views/login.vue'
import Map from '@/views/map.vue'
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path:'/map',
      component:Map
    }
  ]
});

export default router
