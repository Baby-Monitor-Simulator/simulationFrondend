<script lang="ts" setup>
import Export from "./Export.vue";
import Import from "./Import.vue";
import Form from "./Form.vue";
</script>
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
        >
          Scenario
        </v-btn>

        <v-divider></v-divider>
        <v-btn class="ma-1 pa-2">Lorem Ipsum</v-btn>
        <v-divider></v-divider>
        <v-btn class="ma-1 pa-2">Lorem Ipsum</v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.container {
  margin-right: 15px;
}
</style>


