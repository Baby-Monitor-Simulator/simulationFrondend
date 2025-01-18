import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import LobbyCreate from '../views/LobbyCreate.vue'
import ResultView from '@/views/Result.vue'
import DashboardView from '../views/DashboardView.vue'
import Scenario from '@/views/Scenario.vue'
import ScenarioDetail from "@/views/ScenarioDetail.vue";
import CreateScenario from "@/views/CreateScenario.vue";
import ResultDetail from '@/views/ResultDetail.vue'
import RoleMapping from "@/views/RoleMapping.vue";
import HomePage from "@/views/HomePage.vue";
import LobbyJoin from '@/views/LobbyJoin.vue';
import Lobby from '@/views/Lobby.vue';
import StartLobby from '@/views/StartLobby.vue';

const devMode = import.meta.env.VITE_DEV_MODE === "true";

interface DecodedJWT 
{
  exp: number;
  realm_access?: {
    roles: string[];
  };
  [key: string]: any; // To allow other properties if needed
}

function decodeJWT(token: string): DecodedJWT 
{
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload)) as DecodedJWT;
}


function isTokenValid(token: string): boolean 
{
  if (!token || token.split('.').length !== 3) return false;
  const decoded = decodeJWT(token);
  const now = Math.floor(Date.now() / 1000);
  return true;//decoded.exp && decoded.exp > now;
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['instructeur','deelnemer','admin']} // Protected route
    },
    {
      path: '/dashboard/:lobbyId',
      name: 'dashboard',
      component: DashboardView,
      //meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['deelnemer','admin']} // Protected route
      props: true,

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
      path: '/lobby/create', // Path for the homepage
      name: 'lobbyCreate',
      component: LobbyCreate, 
      //meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['instructeur'] } // Protected route
    },
    {
      path: '/lobby/join', // Path for joining lobby
      name: 'lobbyJoin',
      component: LobbyJoin, 
      meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['deelnemer']}
    },
    {
      path: '/lobby/:lobbyCode', // Path for joined lobby with lobbycode
      name: 'lobby',
      component: Lobby, 
      meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['deelnemer', 'instructeur']},
      props: true
    },
    {
      path: '/startlobby/:lobbyCode', // Path for joined lobby with lobbycode
      name: 'startlobby',
      component: StartLobby, 
      props: true
    },
    {
      path: '/scenario',
      name: 'Scenario',
      component: Scenario,
      meta: { requiresAuth: (devMode ? false : true ) } // Protected route
    },
    {
      path: '/scenario/:id',
      name: 'ScenarioDetail',
      component: ScenarioDetail,
      meta: { requiresAuth: (devMode ? false : true ) } // Protected route
    },
    {
      path: '/scenario/create',
      name: 'CreateScenario',
      component: CreateScenario,
      meta: { requiresAuth: (devMode ? false : true ) } // Protected route
    },
    {
      path: '/role',
      name: 'role',
      component: RoleMapping,
      meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['admin'] } // Protected route
    },

    {
      path: '/results',
      name: 'Result',
      component: ResultView,
      meta: { requiresAuth: (devMode ? false : true ) , allowedRoles: ['deelnemer'] } // Protected route
    },
    {
      path: '/results/:id',
      name: 'resultDetail',
      component: ResultDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || !isTokenValid(token)) {
      next({ name: 'login' });
    } else {
      const decoded = decodeJWT(token);
      const roles = decoded.realm_access?.roles || [];
      console.log(roles);

      // Role-based access check
      if (to.meta.allowedRoles && !to.meta.allowedRoles.some(role => roles.includes(role))) 
      {
        next({ name: 'unauthorized' }); // Redirect to an unauthorized page if needed
      } else {

        next();
      }
    }
  } else {
    next();
  }
});

export default router
