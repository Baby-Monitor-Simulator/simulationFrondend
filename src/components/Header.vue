<script lang="ts" setup>
import { useGlobalStore } from '@/stores/global';

const globalStore: any = useGlobalStore()

const controlManual = () => {
    globalStore.showGraph = !globalStore.showGraph
}

</script>
<template>
    <div class="container">
        <v-row>
            <v-col md-9>
                <p>Babymonitor CTG Simulator</p>
            </v-col>
            <v-col md-3>
                <!--  <button class="manual-btn">{{ $t("message.manual")}}</button> -->
                <button class="manual-btn" @click="controlManual()">{{ globalStore.showGraph ? $t("message.manual") : $t("message.showGraph")}}</button>
            </v-col>
        </v-row>
    </div>

</template>

<style scoped>

.container{
    margin: 15px;
    padding: 10px;
    width: 100%;
}
.manual-btn{
    float: right;
}
</style>