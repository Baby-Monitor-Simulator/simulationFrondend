<script lang="ts" setup>
import GraphVue from '@/components/Graph.vue';
import { markRaw, onMounted, reactive, ref } from "vue";
import { useImportStore } from '@/stores/import';
import type MatlabFile from "@/interfaces/IExpectedFileContent";
import { useGlobalStore } from '@/stores/global';

const counter = ref(0)
const data = markRaw<Array<MatlabFile>>([])
const importStore: any = useImportStore()
const globalStore: any = useGlobalStore()

onMounted(() => {
  let source = new EventSource("http://localhost:8080/api/sse")
  source.onmessage = (event) => {
    let value = { x: counter.value, y: Number(event.data) + 10 }
    data.push(value)
    importStore.graphData = data
    counter.value = counter.value + 0.25
  }
})
</script>
<template>
  <div v-show="globalStore.showGraph">
    <v-row>
      <v-col md-6>
        <GraphVue :y-min="60" :y-max="200" :y-step-size="1" :chart-title="'Fetal Heart Rate (FHR)'"></GraphVue>
      </v-col>
      <v-col md-6>
        <GraphVue :y-min="35" :y-max="55" :y-step-size="5" :chart-title="'Fetal Blood Pressure (MAP)'"></GraphVue>
      </v-col>
    </v-row>
    <v-row>
      <v-col md-6>
        <GraphVue :y-min="0" :y-max="100" :y-step-size="10" :chart-title="'Uterine Contractions (UP)'"></GraphVue>
      </v-col>
      <v-col md-6>
        <GraphVue :y-min="10" :y-max="20" :y-step-size="1" :chart-title="'Fetal Blood (Po2)'"></GraphVue>
      </v-col>
    </v-row>
  </div>
  <div id="popup" v-show="!globalStore.showGraph">
    <h1>Test Title</h1>
    <p>Test tekst</p>
  </div>
</template>
<style>
#popup {
  max-width: 80vw;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px;
  z-index: 9;
}
</style>
