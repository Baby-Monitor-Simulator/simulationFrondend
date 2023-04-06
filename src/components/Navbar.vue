<script lang="ts" setup>
import FileReader from '@/components/FileReader.vue';
import Form from '@/components/Form.vue';

</script>
<template>
    <div class="container">
        <v-navigation-drawer theme="dark" :disable-resize-watcher="true" :permanent="true">
            <v-list>
                <v-list-item title="Import Data">
                    <RouterLink to="/"></RouterLink>
                </v-list-item>
                <v-list-item title="Export data"></v-list-item>
                <v-divider></v-divider>
                <v-list-item title="Change Language"></v-list-item>
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