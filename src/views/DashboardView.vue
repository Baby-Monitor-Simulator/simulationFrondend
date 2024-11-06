<script lang="ts" setup>
import GraphVue from '@/components/Graph.vue';
import {markRaw, onMounted,getCurrentInstance, ref} from "vue";
import {useImportStore} from '@/stores/import';
import type MatlabFile from "@/interfaces/IExpectedFileContent";
import {useGlobalStore} from '@/stores/global';
import GraphType from "@/enums/graphTypes"

const importStore: any = useImportStore()
const globalStore: any = useGlobalStore()
const fetalBloodArr = markRaw<Array<MatlabFile>>([])
const fetalBloodPressureArr = markRaw<Array<MatlabFile>>([])
const UterineContractionsArr = markRaw<Array<MatlabFile>>([])
const FetalHeartRateArr = markRaw<Array<MatlabFile>>([])

const fetchData = () => {
  let source = new EventSource("http://localhost:8080/api/sse")
  console.log(Date.now());

  source.onmessage = (event) => { // this is really ugly src
    if (!globalStore.haltFetch) {
      const body = JSON.parse(event.data)
      let fetalBlood = {x: (body.x / 1000), y: body.fetalBlood}
      let fetalBloodPressure = {x: (body.x / 1000), y: body.fetalBloodPressure}
      let uterineContractions = {x: (body.x / 1000), y: body.uterineContractions}
      let fetalHeartRate = {x: (body.x / 1000), y: body.fetalHeartRate}

      fetalBloodArr.push(fetalBlood)
      fetalBloodPressureArr.push(fetalBloodPressure)
      UterineContractionsArr.push(uterineContractions)
      FetalHeartRateArr.push(fetalHeartRate)

      importStore.fetalBlood = fetalBloodArr
      importStore.fetalBloodPressure = fetalBloodPressureArr
      importStore.uterineContractions = UterineContractionsArr
      importStore.fetalHeartRate = FetalHeartRateArr
    }
  }
}

const currentTime = ref(new Date().toLocaleTimeString()); // Create a reactive reference for current time
let intervalId = null; // Variable to hold the interval ID

const updateCurrentTime = () => {
  currentTime.value = new Date().toLocaleTimeString(); // Update the time
};


onMounted(() => {
  fetchData()
})
</script>
<template>
  <div v-show="globalStore.showGraph">
      <v-col md-6>
        <GraphVue :type="GraphType.FetalHeartRate" :y-min="60" :y-max="200" :xMin="0" :xMax="11" :y-step-size="1"
                  :chart-title="'Fetal Heart Rate (FHR)'"></GraphVue>
      </v-col>
      <v-col md-6>
        <GraphVue :type="GraphType.FetalBloodPressure" :y-min="35" :y-max="55" :xMin="0" :xMax="11" :y-step-size="1"
                  :chart-title="'Fetal Blood Pressure (MAP)'"></GraphVue>
      </v-col>

      <v-col md-6>
        <GraphVue  :type="GraphType.UterineContractions" :y-min="0" :y-max="100"  :xMin="0" :xMax="11" :y-step-size="1"
                  :chart-title="'Uterine Contractions (UP)'"></GraphVue>
      </v-col>
      <v-col md-6>
        <GraphVue  :type="GraphType.FetalBlood" :y-min="10" :y-max="20" :xMin="0" :xMax="11" :y-step-size="1"
                  :chart-title="'Fetal Blood (Po2)'"></GraphVue>
      </v-col>
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
