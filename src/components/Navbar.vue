<script lang="ts" setup>
import FileReader from '@/components/FileReader.vue';

</script>
<template>
    <div class="container">
        <v-navigation-drawer theme="dark" :disable-resize-watcher="true" :permanent="true">
            <v-list>
                <v-list-item title="Data importeren">
                    <RouterLink to="/"></RouterLink>
                </v-list-item>
                <v-list-item title="Data exporteren"></v-list-item>
                <v-divider></v-divider>
                <v-list-item title="Taal selecteren"></v-list-item>
                <FileReader></FileReader>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<style scoped>
.container {
    margin-right: 15px;
}
</style>