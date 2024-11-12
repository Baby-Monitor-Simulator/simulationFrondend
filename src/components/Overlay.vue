<script lang="ts" setup>
import { useHoverStore } from "@/stores/hover";
import HoverItem from "@/enums/hoverItems";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const hoverStore: any = useHoverStore();
const { t } = useI18n(); // call `useI18n`, and spread `t` from  `useI18n` returning

// you can probably use `onmousemove` for both: https://www.w3schools.com/jsref/event_onmouseover.asp
const triggerHover = (item: HoverItem) => {
  switch (item) {
    case HoverItem.Language:
      hoverStore.language = true;
      break;
    case HoverItem.Export:
      hoverStore.export = true;
      break;
    case HoverItem.Import:
      hoverStore.import = true;
      break;
  }
};

const releaseHover = (item: any) => {
  switch (item) {
    case HoverItem.Language:
      hoverStore.language = false;
      break;
    case HoverItem.Export:
      hoverStore.export = false;
      break;
    case HoverItem.Import:
      hoverStore.import = false;
      break;
  }
};

const titleStrs = computed(() => {
  return {
    manualTitle: t("message.manualTitle"),
    hoverExplanation: t("message.hoverExplanation"),

    Languagechange: t("message.languageChangeTitle"),
    LanguageChangeDescription: t("message.languageChangeDescription"),

    dataExportTitle: t("message.dataExportTitle"),
    dataExportDescription: t("message.dataExportDescription"),

    dataImportTitle: t("message.dataImportTitle"),
    dataImportDescription: t("message.dataImportDescription"),
  };
});
</script>

<template>
  <v-overlay activator="parent" location-strategy="connected" scroll-strategy="block">
    <v-card class="mx-auto" max-width="425">
      <v-list lines="two">
        <v-list-subheader
          ><b>{{ titleStrs.manualTitle }}</b></v-list-subheader
        >
        <v-list-subheader>{{ titleStrs.hoverExplanation }}</v-list-subheader>

        <v-list-item
          v-on:mouseenter="triggerHover(HoverItem.Language)"
          v-on:mouseleave="releaseHover(HoverItem.Language)"
          prepend-icon="mdi-web"
        >
          <template v-slot:title>{{ titleStrs.Languagechange }}</template>
          <template v-slot:subtitle>{{ titleStrs.LanguageChangeDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="triggerHover(HoverItem.Export)"
          v-on:mouseleave="releaseHover(HoverItem.Export)"
          prepend-icon="mdi-download"
        >
          <template v-slot:title>{{ titleStrs.dataExportTitle }}</template>
          <template v-slot:subtitle>{{ titleStrs.dataExportDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="triggerHover(HoverItem.Import)"
          v-on:mouseleave="releaseHover(HoverItem.Import)"
          prepend-icon="mdi-upload"
        >
          <template v-slot:title> {{ titleStrs.dataImportTitle }} </template>
          <template v-slot:subtitle> {{ titleStrs.dataImportDescription }} </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-overlay>
</template>
