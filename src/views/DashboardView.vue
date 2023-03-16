<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import GraphVue from '@/components/Graph.vue';
import Navbar from '@/components/Navbar.vue';
import HeaderComponent from '@/components/Header.vue';
// reactive state
const count = ref(0)

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>
<template>
    <v-row>
      <v-col md="2">
        <Navbar></Navbar>
        <!--<v-slider></v-slider> -->
      </v-col>
      <v-col md="10">
        <v-row>
            <HeaderComponent></HeaderComponent>
        </v-row>
        <v-row>
          <v-col md-6>
            <GraphVue></GraphVue>
          </v-col>
          <v-col md-6>
            <GraphVue></GraphVue>
          </v-col>
        </v-row>
        <v-row>
          <v-col md-6>
            <GraphVue></GraphVue>
          </v-col>
          <v-col md-6>
            <GraphVue></GraphVue>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
</template>
<style>


</style>
