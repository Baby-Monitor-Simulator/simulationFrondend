import { defineStore } from 'pinia'
import type MatlabFile from "@/interfaces/IExpectedFileContent"

export const useImportStore = defineStore('import', {
  state: () => {
    return {
      graphData: [] as MatlabFile[],
      fetalBlood: [] as MatlabFile[],
      fetalBloodPressure: [] as MatlabFile[],
      uterineContractions: [] as MatlabFile[],
      fetalHeartRate: [] as MatlabFile[]
    }
  },
})