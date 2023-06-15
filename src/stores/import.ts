import { defineStore } from 'pinia'
import type MatlabFile from "../interfaces/IExpectedFileContent"
import templateOptionV2 from '../enums/templateOptionsV2'
import earlyDecelsCTG from "../templates/exports/json/early/earlyDecelsCTG.json"
import { useGlobalStore } from './global';

export const useImportStore = defineStore('import', {
  
  state: () => {
    return {
      graphData: [] as MatlabFile[],
      fetalHeartRate: [] as MatlabFile[],
      fetalBloodPressure: [] as MatlabFile[],
      uterineContractions: [] as MatlabFile[],
      fetalBlood: [] as MatlabFile[],
    }
  },
  actions: {
    clearAll() {
      this.graphData = []
      this.fetalHeartRate = []
      this.fetalBloodPressure = []
      this.uterineContractions = []
      this.fetalBlood = []
    },
    fillGraph(scenario) {
      const globalStore: any = useGlobalStore()
      switch (scenario.value) {
        case templateOptionV2.EarlyDecels:
          globalStore.haltFetch = true
          this.fetalBloodPressure = []
          this.fetalBloodPressure.concat(earlyDecelsCTG)
      }
    }
  }
})