<script lang="ts" setup>
import GraphVue from '@/components/Graph.vue';
import {markRaw, onMounted, ref} from "vue";
import {useImportStore} from '@/stores/import';
import type MatlabFile from "@/interfaces/IExpectedFileContent";
import {useGlobalStore} from '@/stores/global';
import GraphType from "@/enums/graphTypes";

import Navbar from '@/components/Navbar.vue';
import HeaderComponent from '@/components/Header.vue';
import { RouterView } from 'vue-router';
import { useRouter } from "vue-router";

//connect graphs to back-end imports
import { connectGraph, sendUserId, disconnect } from "@/components/websocket.js";


const importStore: any = useImportStore()
const globalStore: any = useGlobalStore()
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



//connecting graphs to back-end
let first: boolean = true;
const userId = import.meta.env.VITE_APP_TEMP_USERID; //TODO: make this unique for each user

function webhookConnect()
{
    const waitForConnection = setInterval(() => {
        if (first)
        {
            connectGraph(userId);
            first = false;
        }
        else
        {
            sendUserId(userId);
            clearInterval(waitForConnection);
            console.log("connected baby!")
        }


    },1000);
}

const router = useRouter();
//leave lobby
const leaveLobby = async () => 
{
  try {
    // Send a request to the back-end
    const id = localStorage.getItem('userId'); // could be that this isn't saved in the current front-end version. Save it in home or login.
    axios.delete(`${import.meta.env.VITE_APP_API_LOBBY}/${id}`).then(response => {
        console.log('Participant removed', response.data);}).catch(error => {console.error('Error removing participant:', error);});

    //close websocket
    disconnect();

    // Redirect to the home page
    router.push("/");
  } catch (error) {
    console.error('Have you made the leave lobby back-end request functional? If not then comment it out or make it work!:', error);
    alert('Failed to leave the lobby.');
  }
}

onMounted(() => {
  webhookConnect();
  fetchData()
})
</script>
<template>
  <v-main>
          

          <RouterView />

          <!-- Leave Lobby Button -->
          <button class="leave-lobby-btn" @click="leaveLobby">Leave Lobby</button>
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

.leave-lobby-btn {
  position: absolute;
  top: 80px;
  right: 45px;
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.leave-lobby-btn:hover {
  background-color: #d32f2f;
}
</style>
