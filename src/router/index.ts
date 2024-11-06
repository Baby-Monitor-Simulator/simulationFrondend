import { createRouter, createWebHistory } from 'vue-router'
import HookTest from '../components/HookTest.vue'
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
      path: '/hooktest', // Path for the homepage
      name: 'test',
      component: HookTest, // Set hooktest as the component for the home route
    },
  ]
})

export default router
