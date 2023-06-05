import { defineStore } from 'pinia'
import type MatlabFile from "@/interfaces/IExpectedFileContent"

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
      console.log("IN STORE CLEAR")
      this.graphData = []
      this.fetalHeartRate = []
      this.fetalBloodPressure = []
      this.uterineContractions = []
      this.fetalBlood = []
    }
  }
})