

<template>
  <div class="container">
    <v-navigation-drawer
      theme="dark"
      :width="275"
      :disable-resize-watcher="true"
      :disable-route-watcher="true"
      :floating="true"
      :permanent="true"
    >
      <v-list>
        <v-btn class="ma-1 pa-2" to="/" :class="{ 'v-btn--active': $route.path === '/' }">Home</v-btn>
        <v-divider></v-divider>

        <v-btn
          class="ma-1 pa-2"
          to="/scenario"
          :class="{ 'v-btn--active': $route.path === '/scenario' }"
          @click="onNavbarClick"
        >
          Scenario
        </v-btn>

        <v-divider></v-divider>
        <v-btn
          class="ma-1 pa-2"
          to="/Dashboard"
          :class="{ 'v-btn--active': $route.path === '/Dashboard' }"
          @click="onNavbarClick"
        >
          Dashboard
        </v-btn>

        <v-divider></v-divider>

        <!-- Only show the rolemap button if the user is an admin -->
        <v-btn
          class="ma-1 pa-2"
          to="/role"
          :class="{ 'v-btn--active': $route.path === '/role' }"
          v-if="hasRole(['admin'])"
          @click="onNavbarClick"
        >
          Rolemap
        </v-btn>
        <v-btn
          class="ma-1 pa-2"
          to="/login"
          :class="{ 'v-btn--active': $route.path === '/login' }"
          v-if="hasRole(['admin','deelnemer','instructeur'])"
          @click="onNavbarClick"
        >
          logout
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>

import Export from "./Export.vue";
import Import from "./Import.vue";
import Form from "./Form.vue";
import { ref, computed, onMounted , watch, nextTick} from 'vue';

// Declare a ref to store roles, which is an array of strings
const roles = ref<string[]>([]);

// Computed property to check if the user has any of the roles in the given array
const hasRole = (requiredRoles: string[]) => {
  return requiredRoles.some(role => roles.value.includes(role));
};

onMounted(() => {
  loadRoles();
});

// Watch for changes to roles, in case they are updated dynamically
watch(roles, (newRoles) => {
  console.log("Roles updated:", newRoles);
});

// onMounted hook to decode the JWT and retrieve roles from localStorage
const loadRoles = () => {
  const token = localStorage.getItem('token');
  if (token) 
  {
    try {
      // Decode the JWT token and parse the payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      roles.value = payload.realm_access?.roles || [];
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  else
  {
    console.log("no role");
    roles.value = ['norole'];
  }
};

const onNavbarClick = () => {
  loadRoles();  // Refresh roles every time a navbar button is clicked
};
</script>


<style scoped>
.container {
  margin-right: 15px;
}
</style>


