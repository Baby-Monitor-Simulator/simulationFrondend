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
        <v-btn class="ma-1 pa-2" to="/results":class="{ 'v-btn--active': $route.path === '/scenario' }">
          results
        </v-btn>
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
          v-if="devMode ? true : hasRole(['admin'])"
          @click="onNavbarClick"
        >
          Rolemap
        </v-btn>

        <v-divider></v-divider>

        <v-btn
          class="ma-1 pa-2"
          to="/lobbyCreate"
          :class="{ 'v-btn--active': $route.path === '/lobbyCreate' }"
          v-if="devMode ? true : hasRole(['instructeur'])"
          @click="onNavbarClick"
        >
          Create Lobby
        </v-btn>

        <v-divider></v-divider>

        <v-btn
          class="ma-1 pa-2"
          to="/lobby/join"
          :class="{ 'v-btn--active': $route.path === '/join' }"
          v-if="devMode ? true : hasRole(['deelnemer'])"
          @click="onNavbarClick"
        >
          Join Lobby
        </v-btn>

        <v-divider></v-divider>

        <v-btn
          class="ma-1 pa-2"
          to="/login"
          :class="{ 'v-btn--active': $route.path === '/login' }"
          v-if="devMode ? true : hasRole(['admin', 'deelnemer', 'instructeur'])"
          @click="onNavbarClick"
        >
          logout
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { hasRole, loadRoles, roles } from "./RoleManager";
const devMode = import.meta.env.VITE_DEV_MODE === "true";

// Declare a ref to store roles, which is an array of strings

onMounted(() => {
  nextTick(() => {
    loadRoles();
  });
});

// Watch for changes to roles, in case they are updated dynamically
watch(roles, (newRoles) => {
  console.log("Roles updated:", newRoles);
});

const onNavbarClick = () => {
  loadRoles(); // Refresh roles every time a navbar button is clicked
};
</script>

<style scoped>
.container {
  margin-right: 15px;
}
</style>
