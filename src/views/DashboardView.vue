<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import GraphVue from '@/components/Graph.vue';
// reactive state
const count = ref(0)

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>
<template>
    <v-row justify="center" class="mt-2">
      <v-col sm="2">
        <v-slider></v-slider>
      </v-col>
      <v-col sm="10">
        <v-row>
          <GraphVue></GraphVue>
        </v-row>
      </v-col>
    </v-row>
</template>
<style>
v-row{
  min-height: 50vh;
  min-width: 100vw;
}

</style>
