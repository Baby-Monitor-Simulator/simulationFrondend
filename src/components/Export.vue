<script lang="ts" setup>
import FileReader from "@/components/Import.vue";
import Form from "@/components/Form.vue";
import { useHoverStore } from "@/stores/hover";
import { computed } from "vue";
import { useTranslations } from "@/composables/useTranslations";

const hoverStore: any = useHoverStore();
const { export: exportTranslations } = useTranslations();
</script>
<template>
  <v-sheet class="ma-1 pa-2">
    <v-btn
      :elevation="hoverStore.export ? 16 : 2"
      :color="hoverStore.export ? '#00FF00' : 'white'"
      block
      prepend-icon="mdi-download"
      title="Export Data"
      @click="null"
      variant="outlined"
      >{{ exportTranslations.exportData }}</v-btn
    >
  </v-sheet>
</template>
