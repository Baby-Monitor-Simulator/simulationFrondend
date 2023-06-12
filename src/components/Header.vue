<script lang="ts" setup>
import { useGlobalStore } from '@/stores/global';
import { ref, computed, watch } from 'vue'
import Overlay from "@/components/Overlay.vue"

const globalStore: any = useGlobalStore()
const overlay = ref(false)

const displayedIcon = computed(() => {
    return globalStore.showGraph ? "mdi-help" : "mdi-chart-line"
})

</script>
<template>
    <div class="container">
        <v-row>
            <v-col md-9>
                <p>Babymonitor CTG Simulator</p>
            </v-col>
            <v-col md-3>
                <v-btn block :append-icon="displayedIcon" @click="overlay = !overlay" variant="outlined"
                    color="blue-grey">{{ globalStore.showGraph ? $t("message.manual") : $t("message.showGraph") }}
                </v-btn>
                <Overlay />
            </v-col>
        </v-row>
    </div>
</template>

<style scoped>
.container {
    margin: 15px;
    padding: 10px;
    width: 100%;
}

.manual-btn {
    float: right;
}
</style>