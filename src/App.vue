<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
import HeaderComponent from '@/components/Header.vue';
</script>

<template>
  <v-app>
    <v-card>
      <v-layout>
        <Navbar></Navbar>
        <v-app-bar title="Application bar">
          <HeaderComponent></HeaderComponent>
        </v-app-bar>

        <v-main style="min-height: 300px;">
          <RouterView />
        </v-main>
      </v-layout>
    </v-card>

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
