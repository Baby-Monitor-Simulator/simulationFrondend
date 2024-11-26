import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import LobbyCreate from '../views/LobbyCreate.vue'
import ResultView from '@/views/ResultView.vue'
import DashboardView from '../views/DashboardView.vue'
import Scenario from '@/views/Scenario.vue'
import ScenarioDetail from "@/views/ScenarioDetail.vue";
import CreateScenario from "@/views/CreateScenario.vue";
import RoleMapping from "@/views/RoleMapping.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
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
      path: '/scenario',
      name: 'Scenario',
      component: Scenario,
    },
    {
      path: '/scenario/:id',
      name: 'ScenarioDetail',
      component: ScenarioDetail,
    },
    {
      path: '/scenario/create',
      name: 'CreateScenario',
      component: CreateScenario
    },
    {
      path: '/role',
      name: 'role',
      component: RoleMapping
    },
    {

      path: '/results',
      name: 'results',
      component: ResultView
    }
  ]
})

export default router
