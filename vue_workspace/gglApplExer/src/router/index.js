import { createRouter, createWebHistory } from 'vue-router'
import LoginSuccess from '@/components/loginSuccess.vue'
import Login from '@/components/loginBox.vue'
import Map from '@/components/map.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/success/:id', component: LoginSuccess, name:'success'},
    { path: '/', component: Login, props: true },
    { path : '/map', component : Map}

  ]
})

export default router
