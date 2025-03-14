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
      <v-list v-if="rolesLoaded">
        <v-btn class="ma-1 pa-2" to="/" :class="{ 'v-btn--active': $route.path === '/' }"
          >Home</v-btn
        >
        <v-btn
          class="ma-1 pa-2"
          to="/results"
          :class="{ 'v-btn--active': $route.path === '/scenario' }"
        >
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
          to="/lobby/Create"
          :class="{ 'v-btn--active': $route.path === '/lobby/Create' }"
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
          @click="onLogoutClick"
        >
          logout
        </v-btn>
      </v-list>
      <div v-else class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from "vue";
import { hasRole, loadRoles, roles } from "./RoleManager";
import { useRouter } from "vue-router";
import { dispatchTokenChangedEvent } from "../utils/events";

const router = useRouter();
const devMode = import.meta.env.VITE_DEV_MODE === "true";

// Add a flag to track when roles are loaded
const rolesLoaded = ref(false);

// Add a function to check for token changes
const checkToken = () => {
  rolesLoaded.value = false;

  try {
    // Use nextTick to ensure the UI updates before we start loading roles
    nextTick(() => {
      loadRoles();
      rolesLoaded.value = true;
    });
  } catch (error) {
    // Ensure we set rolesLoaded to true even if there's an error
    rolesLoaded.value = true;
  }
};

// Handler for token changes
const handleTokenChange = (event: Event) => {
  checkToken();
};

// Handler for storage events
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === "token" || event.key === "_event_trigger") {
    checkToken();
  }
};

// Watch for route changes
watch(
  () => router.currentRoute.value.path,
  (newPath, oldPath) => {
    checkToken();
  }
);

onMounted(() => {
  // Initial token check
  checkToken();

  // Add event listener for custom token-changed event
  window.addEventListener("token-changed", handleTokenChange);

  // Also listen on document for better event capture
  document.addEventListener("token-changed", handleTokenChange);

  // Also listen for storage events (for changes from other tabs)
  window.addEventListener("storage", handleStorageChange);

  // Force a check after a short delay to ensure everything is loaded
  setTimeout(() => {
    checkToken();
  }, 500);
});

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener("token-changed", handleTokenChange);
  document.removeEventListener("token-changed", handleTokenChange);
  window.removeEventListener("storage", handleStorageChange);
});

// Watch for changes to roles, in case they are updated dynamically
watch(roles, (newRoles) => {
  // Role updates are handled automatically
});

// Also check for token on route changes
const onNavbarClick = () => {
  checkToken();
};

const onLogoutClick = () => {
  localStorage.removeItem("token");
  checkToken();
  // Dispatch token-changed event to notify other components
  dispatchTokenChangedEvent();
};
</script>

<style scoped>
.container {
  margin-right: 15px;
}
</style>
