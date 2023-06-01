<script lang="ts" setup>
import FileReader from '@/components/FileReader.vue';
import Form from '@/components/Form.vue';
import { useI18n } from 'vue-i18n'

const { t, locale, availableLocales } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning

const switchLanguage = () => {
    locale.value === "en" ? locale.value = "nl" : locale.value = "en"
}
</script>
<template>
    <div class="container">
        <v-navigation-drawer theme="dark" :disable-resize-watcher="true" :permanent="true">
            <v-list>
                <v-list-item title="Import Data">
                    <RouterLink to="/"></RouterLink>
                </v-list-item>
                <v-list-item title="Export Data"></v-list-item>
                <v-divider></v-divider>
                <v-list-item title="Change Language">
                    <v-btn @click="switchLanguage()" variant="outlined" color="blue-grey" icon="mdi-web">
                    </v-btn>
                </v-list-item>
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