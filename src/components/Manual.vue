<script lang="ts" setup>
import { useHoverStore } from "@/stores/hover";
import HoverItem from "@/enums/hoverItems";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const hoverStore: any = useHoverStore();
const { t } = useI18n(); // call `useI18n`, and spread `t` from  `useI18n` returning

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

    submitTitle: t("message.submitTitle"),
    submitDescription: t("message.submitDescription"),
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
          v-on:mouseenter="changeHover(HoverItem.Language, true)"
          v-on:mouseleave="changeHover(HoverItem.Language, false)"
          prepend-icon="mdi-web"
        >
          <template v-slot:title>{{ titleStrs.Languagechange }}</template>
          <template v-slot:subtitle>{{ titleStrs.LanguageChangeDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Export, true)"
          v-on:mouseleave="changeHover(HoverItem.Export, false)"
          prepend-icon="mdi-download"
        >
          <template v-slot:title>{{ titleStrs.dataExportTitle }}</template>
          <template v-slot:subtitle>{{ titleStrs.dataExportDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Import, true)"
          v-on:mouseleave="changeHover(HoverItem.Import, false)"
          prepend-icon="mdi-upload"
        >
          <template v-slot:title> {{ titleStrs.dataImportTitle }} </template>
          <template v-slot:subtitle> {{ titleStrs.dataImportDescription }} </template>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
          v-on:mouseenter="changeHover(HoverItem.Submit, true)"
          v-on:mouseleave="changeHover(HoverItem.Submit, false)"
          prepend-icon="mdi-send"
        >
          <template v-slot:title> {{ titleStrs.submitTitle }} </template>
          <template v-slot:subtitle> {{ titleStrs.submitDescription }} </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-overlay>
</template>
