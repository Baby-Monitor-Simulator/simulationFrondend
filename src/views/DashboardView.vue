<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>
<template>
    <v-row justify="center" class="mt-2">
      <v-col sm="6">
        <v-slider></v-slider>
      </v-col>
    </v-row>
</template>
<style></style>
