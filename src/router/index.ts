import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import LobbyCreate from '../views/LobbyCreate.vue'
import ResultView from '@/views/ResultView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/login', // Path for the homepage
      name: 'login',
      component: Login, 
    },
    {
      path: '/register', // Path for the homepage
      name: 'register',
      component: Register, 
    },
    {
      path: '/lobbyCreate', // Path for the homepage
      name: 'lobbyCreate',
      component: LobbyCreate, 
    },
    {
      path: '/results',
      name: 'results',
      component: ResultView
    }
  ]
})

export default router
