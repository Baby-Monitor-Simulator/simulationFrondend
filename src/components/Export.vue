<script lang="ts" setup>
import FileReader from "@/components/Import.vue";
import Form from "@/components/Form.vue";
import { useHoverStore } from "@/stores/hover";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const hoverStore: any = useHoverStore();
const { t } = useI18n();
const strs = computed(() => {
  return {
    exportData: t("message.fileExport"),
  };
});
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
      >Export Data</v-btn
    >
  </v-sheet>
</template>
