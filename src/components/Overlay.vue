<template>
    <v-overlay activator="parent" location-strategy="connected" scroll-strategy="block">
        <v-card class="mx-auto" max-width="425">
            <v-list lines="two">
                <v-list-subheader><b>Manual</b></v-list-subheader>
                <v-list-subheader>Hover over items below to learn how this application works.</v-list-subheader>

                <v-list-item v-on:mouseenter="triggerHover(HoverItem.Language)"
                    v-on:mouseleave="releaseHover(HoverItem.Language)" prepend-icon="mdi-web" title="Changing Language">
                    <template v-slot:subtitle>
                        You can change the language between Dutch and English here.
                    </template>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item v-on:mouseenter="triggerHover(HoverItem.Export)"
                    v-on:mouseleave="releaseHover(HoverItem.Export)" prepend-icon="mdi-download">
                    <template v-slot:title>
                        Exporting Data
                    </template>

                    <template v-slot:subtitle>
                        You can export all data to CSV format.
                    </template>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item v-on:mouseenter="triggerHover(HoverItem.Import)"
                    v-on:mouseleave="releaseHover(HoverItem.Import)" prepend-icon="mdi-upload" title="Importing Data">
                    <template v-slot:subtitle>
                        Placeholder
                    </template>
                </v-list-item>
            </v-list>
        </v-card>
    </v-overlay>
</template>
<script lang="ts" setup>
import { useHoverStore } from '@/stores/hover';
import HoverItem from "@/enums/hoverItems"

const hoverStore: any = useHoverStore()

// you can probably use `onmousemove` for both: https://www.w3schools.com/jsref/event_onmouseover.asp
const triggerHover = (item: HoverItem) => {
    switch (item) {
        case HoverItem.Language:
            hoverStore.language = true
            break
        case HoverItem.Export:
            hoverStore.export = true
            break
        case HoverItem.Import:
            hoverStore.import = true
            break
    }
}

const releaseHover = (item: any) => {
    switch (item) {
        case HoverItem.Language:
            hoverStore.language = false
            break
        case HoverItem.Export:
            hoverStore.export = false
            break
        case HoverItem.Import:
            hoverStore.import = false
            break
    }
}
</script>