<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global";
import { ref, computed, watch } from "vue";
import Overlay from "@/components/Manual.vue";
import { useI18n } from "vue-i18n";
import { useHoverStore } from "@/stores/hover";

const globalStore: any = useGlobalStore();
const overlay = ref(false);
const hoverStore: any = useHoverStore();
const { locale } = useI18n(); // call `useI18n`, and spread `t` from  `useI18n` returning

const switchLanguage = () => {
  locale.value === "en" ? (locale.value = "nl") : (locale.value = "en");
};
const languageString = computed(() => {
  return locale.value === "en" ? "English" : "Nederlands";
});

const displayedIcon = computed(() => {
  return globalStore.showGraph ? "mdi-help" : "mdi-chart-line";
});
</script>
<template>
  <div class="container">
    <v-row>
      <v-col md-9>
        <p>Babymonitor CTG Simulator</p>
      </v-col>
      <v-col md-3>
        <v-btn
          block
          :append-icon="displayedIcon"
          @click="overlay = !overlay"
          variant="outlined"
          color="blue-grey"
          >{{ globalStore.showGraph ? $t("message.manual") : $t("message.showGraph") }}
        </v-btn>
        <Overlay />
      </v-col>
      <v-col class="md-3">
        <v-btn
          :elevation="hoverStore.language ? 16 : 2"
          :color="hoverStore.language ? '#00FF00' : 'blue-gray'"
          block
          prepend-icon="mdi-web"
          :title="languageString"
          @click="switchLanguage()"
          variant="outlined"
          >{{ languageString }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.container {
  margin: 15px;
  padding: 10px;
  width: 100%;
}

.manual-btn {
  float: right;
}
</style>
