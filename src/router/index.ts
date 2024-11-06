import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
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
      component: Login, // Set hooktest as the component for the home route
    },
    {
      path: '/register', // Path for the homepage
      name: 'register',
      component: Register, // Set hooktest as the component for the home route
    },
  ]
})

export default router
