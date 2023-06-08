<script lang="ts" setup>
import FileReader from '@/components/FileReader.vue';
import Form from '@/components/Form.vue';
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useHoverStore } from '@/stores/hover';

const hoverStore: any = useHoverStore()
const { locale } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning

const switchLanguage = () => {
    locale.value === "en" ? locale.value = "nl" : locale.value = "en"
}

const languageString = computed(() => {
    return locale.value === "en" ? "English" : "Nederlands"
})

</script>
<template>
    <div class="container">
        <v-navigation-drawer theme="dark" :disable-resize-watcher="true" :permanent="true">
            <v-list>
                <v-sheet class="ma-1 pa-2">
                        <v-btn :elevation="hoverStore.language ? 16 : 2" :color="hoverStore.language ? 'white' : 'blue-grey'" block prepend-icon="mdi-web" :title="languageString" @click="switchLanguage()"
                            variant="outlined">{{ languageString }}</v-btn>
                </v-sheet>
                <v-sheet class="ma-1 pa-2">
                    <v-btn block prepend-icon="mdi-download" title="Export Data" @click="null" variant="outlined"
                        color="blue-grey">Export Data</v-btn>
                </v-sheet>
                <v-divider></v-divider>
                <FileReader></FileReader>
                <Form></Form>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<style scoped>
.container {
    margin-right: 15px;
}
</style>