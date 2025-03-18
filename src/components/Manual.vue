<script lang="ts" setup>
import { useHoverStore } from "@/stores/hover";
import HoverItem from "@/enums/hoverItems";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const hoverStore: any = useHoverStore();

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

const { t } = useI18n();
const languageStrs = computed(() => {
  return {
    manualTitle: t("header.manualTitle"),
    hoverExplanation: t("header.hoverExplanation"),
    languageChangeTitle: t("header.languageChangeTitle"),
    languageChangeDescription: t("header.languageChangeDescription"),
    dataExportTitle: t("header.dataExportTitle"),
    dataExportDescription: t("header.dataExportDescription"),
    dataImportTitle: t("header.dataImportTitle"),
    dataImportDescription: t("header.dataImportDescription"),
    submitTitle: t("header.submitTitle"),
    submitDescription: t("header.submitDescription"),
  };
});
</script>

<template>
  <v-overlay activator="parent" location-strategy="connected" scroll-strategy="block">
    <v-card class="mx-auto" max-width="425">
      <v-list lines="two">
        <v-list-subheader
          ><b>{{ languageStrs.manualTitle }}</b></v-list-subheader
        >
        <v-list-subheader>{{ languageStrs.hoverExplanation }}</v-list-subheader>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Language, true)"
          v-on:mouseleave="changeHover(HoverItem.Language, false)"
          prepend-icon="mdi-web"
        >
          <template v-slot:title>{{ languageStrs.languageChangeTitle }}</template>
          <template v-slot:subtitle
            >{{ languageStrs.languageChangeDescription }}
          </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Export, true)"
          v-on:mouseleave="changeHover(HoverItem.Export, false)"
          prepend-icon="mdi-download"
        >
          <template v-slot:title>{{ languageStrs.dataExportTitle }}</template>
          <template v-slot:subtitle>{{ languageStrs.dataExportDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Import, true)"
          v-on:mouseleave="changeHover(HoverItem.Import, false)"
          prepend-icon="mdi-upload"
        >
          <template v-slot:title> {{ languageStrs.dataImportTitle }} </template>
          <template v-slot:subtitle> {{ languageStrs.dataImportDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Submit, true)"
          v-on:mouseleave="changeHover(HoverItem.Submit, false)"
          prepend-icon="mdi-send"
        >
          <template v-slot:title> {{ languageStrs.submitTitle }} </template>
          <template v-slot:subtitle> {{ languageStrs.submitDescription }} </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-overlay>
</template>
