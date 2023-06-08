<template>
    <v-overlay activator="parent" location-strategy="connected" scroll-strategy="block">
        <v-card class="mx-auto" max-width="425">
            <v-list lines="two">
                <v-list-subheader>Manual</v-list-subheader>

                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg" title="Changing Language">
                    <template v-slot:subtitle>
                        You can change the language between Dutch and English here.
                    </template>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item v-on:mouseenter="triggerHover(HoverItem.Language)" v-on:mouseleave="releaseHover(HoverItem.Language)"
                    prepend-avatar="https://cdn.vuetifyjs.com/images/lists/2.jpg">
                    <template v-slot:title>
                        Exporting Data
                    </template>

                    <template v-slot:subtitle>
                        <span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but
                        I'm out of town this weekend.
                    </template>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/lists/3.jpg" title="Importing Data">
                    <template v-slot:subtitle>
                        <span class="font-weight-bold">Sandra Adams</span> &mdash; Do you have Paris recommendations?
                        Have you ever been?
                    </template>
                </v-list-item>
            </v-list>
        </v-card>
    </v-overlay>
</template>
<script lang="ts" setup>
import { useHoverStore } from '@/stores/hover';
import HoverItem from "@/enums/hoverItems"
import { ref, computed, watch } from 'vue'

const hoverStore: any = useHoverStore()
const triggerHover = (item: HoverItem) => {
    switch (item) {
        case HoverItem.Language:
            hoverStore.language = true
    }
    console.log(hoverStore.language)
}

const releaseHover = (item: any) => {
    switch (item) {
        case HoverItem.Language:
            hoverStore.language = false
    }
    console.log(hoverStore.language)
}
</script>