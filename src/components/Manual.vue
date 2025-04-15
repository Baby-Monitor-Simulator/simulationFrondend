<script lang="ts" setup>
import { useHoverStore } from "@/stores/hover";
import HoverItem from "@/enums/hoverItems";
import { computed } from "vue";
import { ManualItem } from "./Manual/manual_items";
import { useTranslations } from "@/composables/useTranslations";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  items: ManualItem[];
  title?: string;
  explanation?: string;
}>();

const hoverStore: any = useHoverStore();
const { manual: manualTranslations } = useTranslations();

// you can probably use `onmousemove` for both: https://www.w3schools.com/jsref/event_onmouseover.asp
const changeHover = (item: HoverItem, bool: boolean) => {
  switch (item) {
    case HoverItem.Language:
      hoverStore.language = bool;
      break;
    case HoverItem.Export:
      hoverStore.export = bool;
      break;
    case HoverItem.Import:
      hoverStore.import = bool;
      break;
    case HoverItem.Submit:
      hoverStore.submit = bool;
      break;
  }
};
</script>

<template>
  <v-overlay activator="parent" location-strategy="connected" scroll-strategy="block">
    <v-card class="mx-auto" max-width="425">
      <v-list lines="two">
        <v-list-subheader><b>{{ title }}</b></v-list-subheader>
        <v-list-subheader>{{ explanation }}</v-list-subheader>
        
        <template v-for="(item, index) in items" :key="item.id">
          <v-list-item 
          v-on:mouseenter="changeHover(item.id, true)"
          v-on:mouseleave="changeHover(item.id, false)"
          :prepend-icon="item.icon"
          >
            <template v-slot:title>{{ t(item.titleKey) }}</template>
            <template v-slot:subtitle>{{ t(item.descriptionKey) }}</template>
          </v-list-item>
          <v-divider v-if="index < items.length - 1" inset></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-overlay>
</template>
