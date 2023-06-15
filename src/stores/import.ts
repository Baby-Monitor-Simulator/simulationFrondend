import { defineStore } from 'pinia'
import type MatlabFile from "../interfaces/IExpectedFileContent"
import templateOptionV2 from '../enums/templateOptionsV2'
import earlyDecelsCTG from "../templates/exports/json/early/earlyDecelsCTG.json"

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
      switch (scenario.value) {
        case "Early Decels":
          this.fetalBloodPressure = earlyDecelsCTG
      }
    },
  }
})