<script lang="ts" setup>
import GraphVue from '@/components/Graph.vue';
import {markRaw, onMounted, ref} from "vue";
import {useImportStore} from '@/stores/import';
import type MatlabFile from "@/interfaces/IExpectedFileContent";
import {useGlobalStore} from '@/stores/global';
import GraphType from "@/enums/graphTypes";

import Navbar from '@/components/Navbar.vue';
import HeaderComponent from '@/components/Header.vue';
import { RouterView, useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps({
  lobbyId: {
    type: String,
    required: true,
  },
});

const importStore: any = useImportStore()
const globalStore: any = useGlobalStore()
const router = useRouter();

const fetalBloodArr = markRaw<Array<MatlabFile>>([])
const fetalBloodPressureArr = markRaw<Array<MatlabFile>>([])
const UterineContractionsArr = markRaw<Array<MatlabFile>>([])
const FetalHeartRateArr = markRaw<Array<MatlabFile>>([])

const fetchData = () => {
  let source = new EventSource(import.meta.env.VITE_APP_WEBSOCKET)
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

const stopLobby = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API_LOBBY}/${props.lobbyId}/close`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Lobby successfully stopped:", response.data);
    globalStore.showToast("Lobby successfully stopped", "success");
    console.log("Navigating to /lobby/Create");
    router.push("/lobby/create");
  } catch (error) {
    console.error("Error stopping the lobby:", error);
    globalStore.showToast("Error stopping the lobby", "error");
  }
};

onMounted(() => {
  fetchData()
})
</script>
<template>
  <v-main>
          <RouterView />
  </v-main>

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

  <div class="stop-lobby">
    <button @click="stopLobby">Stop Lobby</button>
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

.stop-lobby {
  margin-top: 20px;
  text-align: center;
}

.stop-lobby button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.stop-lobby button:hover {
  background-color: darkred;
}
</style>
