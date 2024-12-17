<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { hasRole, loadRoles, roles } from "./components/RoleManager";
const devMode = import.meta.env.VITE_DEV_MODE === "true";

const showNavbar = ref(true);
const currentIcon = computed(() =>
  showNavbar.value ? "mdi-pencil-outline" : "mdi-menu"
);

const currentComponent = computed(() => (showNavbar.value ? Navbar : SideBar));

function toggleComponent() {
  showNavbar.value = !showNavbar.value;
}
</script>

<template>
  <v-app>
    <v-layout>
      <v-button
        class="toggle-button"
        @click="toggleComponent"
        v-if="devMode ? true : hasRole(['admin.deelnemer'])"
      >
        <v-icon :icon="currentIcon">{{ currentIcon }}</v-icon>
      </v-button>
      <component
        :is="currentComponent"
        v-if="devMode ? true : hasRole(['admin.deelnemer'])"
      ></component>

      <v-app-bar title="Application bar">
        <Header></Header>
      </v-app-bar>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.toggle-button {
  position: fixed;
  bottom: 20px;
  left: 300px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #2980b9;
}
</style>
