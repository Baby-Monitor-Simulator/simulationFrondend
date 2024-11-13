<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <v-app>
    <v-layout>
      <Navbar></Navbar>
      <!-- <SideBar></SideBar> -->
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
</style>
