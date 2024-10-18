<template>
  <div class="container">
    <Line ref="myChart" :data="data" :options="options" />
  </div>
  <!-- <div>
    <button @click="webhookConnect">More things!!!</button>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, type ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'
import { useImportStore } from '@/stores/import';
import GraphType from "@/enums/graphTypes"
import { useGlobalStore } from '@/stores/global';

import { connectGraph, sendUserId } from "./websocket.js";
import eventBusGraphData from "./eventBusGraphData.js";

import MatlabTestExport from "./MatlabTestExport.json";
import UPResult from '@/models/results/UPResult.js';
import FHRResult from '@/models/results/FHRResult.js';
import MAPResult from '@/models/results/MAPResult.js';
import O2PResult from '@/models/results/O2PResult.js';
import FMPResult from '@/models/results/FMPResult.js';
import Response from '@/models/Response.js';


ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

const lineChartRef = ref(null);

const importStore: any = useImportStore()
const globalStore: any = useGlobalStore()

let coordinates = [];
const myChart = ref(null);
const basex = ref(0);
const userId = "7dd58dee-9d44-4c63-b7aa-4ed3dec6293b";


let upResults: UPResult[] = [];
let fhrResults: FHRResult[] = [];
let mapResults: MAPResult[] = [];
let o2PResults: O2PResult[] = [];
let updated: boolean = false;
let first: boolean = true;

/*
upResults = MatlabTestExport.upResults;
fhrResults = MatlabTestExport.fhrResults;
mapResults = MatlabTestExport.mapResults;
o2PResults = MatlabTestExport.o2PResults;
*/

// const upResults = MatlabTestExport.upResult.map(item => ({
//     x: item.timeSpan,
//     y: item.uPressure
//   }));

//   const fhrResults = MatlabTestExport.fhrResult.map(item => ({
//     x: item.timeSpan,
//     y: item.heartRate
//   }));

//   const mapResults = MatlabTestExport.mapResult.map(item => ({
//     x: item.timeSpan,
//     y: item.MAP
//   }));

//   const o2PResults = MatlabTestExport.o2PResult.map(item => ({
//     x: item.timeSpan,
//     y: item.o2Pressure
//   }));


const updateArray = (json) => {
        //coordinates = newArray; // Update items with new data
        console.log("test");
        //let fmpResult: FMPResult = Object.assign(new FMPResult(), json)
        //let response: Response = Object.assign(new Response(), json);
        //console.log(response);
        let res = json[0];
        console.log(res);
        if (res.fmp) {
            if (res.fmp.upResult) {
                upResults = res.fmp.upResult;  // Assigning nested fields manually if necessary
            }
            if (res.fmp.fhrResult) {
                fhrResults = res.fmp.fhrResult;  // Assigning nested fields manually if necessary
            }
            if (res.fmp.mapResult) {
                mapResults = res.fmp.mapResult;  // Assigning nested fields manually if necessary
            }
            if (res.fmp.o2PResult) {
                o2PResults = res.fmp.o2PResult;  // Assigning nested fields manually if necessary
            }
        // Add more fields as necessary depending on what json contains.
        }
        updated = true;
        console.log(upResults);
        console.log(fhrResults);
        console.log(mapResults);
        console.log(o2PResults);
        //upResults = response.fmp.upResult;
}

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



const props = defineProps({
    type: Number,
    yMin: Number,
    yMax: Number,
    yStepSize: Number,
    chartTitle: String,
})

const options: any = {
    animation: false,
    spanGaps: true,
    normalized: false,
    responsive: true,
    plugins: {
        title: {
            display: false,
            text: props.chartTitle
        },
        legend: {
            display: false
        }
    },
    datasets: {
        line: {
            pointRadius: 0
        }
    },
    scales: {
        y: {
            type: 'linear',
            min: props.yMin,
            max: props.yMax,
            ticks: {
                stepSize: props.yStepSize
            },
            title: {
                display: true,
                text: props.chartTitle,
                color: '#911',
                font: {
                    family: 'Cascadia Mono',
                    size: 16,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: { top: 0, left: 0, right: 20, bottom: 0 }
            }
        },
        x: {
            type: 'linear',
            min: 0,
            max: 11, // Initial max
            ticks: {
                stepSize: 1
            },
            title: {
                display: true,
                text: 'Time (s)',
                color: '#911',
                font: {
                    family: 'Cascadia Mono',
                    size: 16,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 }
            }
        }
    },
    maintainAspectRatio: false,
}

const data: any = ref<ChartData<'line'>>({
    datasets: []
})

const maxXValue = ref(11); // Reactive variable for the x-axis max value
const waitForChange = ref(0); // Reactive variable for the x-axis max value

// Increment x-axis max value
const incrementXMaxValue = () => {
    maxXValue.value += 0.1; // Increase max by 10
}


onMounted(() => {
    webhookConnect();
    // Interval to increment x-axis max value

    const xIntervalId = setInterval(() => {
        const chart = myChart.value.chart;
        /*
        const arrayLength = coordinates.length;
        const newestValue = coordinates[arrayLength - 1];

        if (typeof newestValue !== 'undefined')
        {
            const newX = newestValue.x-11;
            const newXMax = newestValue.x;

            const chart = myChart.value.chart;
            chart.options.scales.x.min = newX;
            chart.options.scales.x.max = newXMax;
            chart.update();
        }
        */
       //console.log(myChart.value);
        if (waitForChange.value > 11 && updated)
        {
            if (chart.options.scales.x.max < upResults[upResults.length-1].timeSpan){
                incrementXMaxValue();
                chart.options.scales.x.min = maxXValue.value-11;
                chart.options.scales.x.max = maxXValue.value; // Update the x-axis max value
            }

        }
        chart.update();



       waitForChange.value += 0.1;


    },100); // Every 1 seconds

    // Control graph properties based on type
    switch (props.type) {
        case GraphType.FetalHeartRate:
            const heartRateId = setInterval(() => {
                options.scales.x.max = maxXValue.value;

                eventBusGraphData.on('arrayUpdated', updateArray);

                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: fhrResults,//coordinates,//importStore.fetalHeartRate,
                        }
                    ]
                }
                // Check if fetching should be halted
                if (globalStore.haltFetch) {
                    clearInterval(heartRateId);
                    clearInterval(xIntervalId); // Clear the x-axis increment interval
                }
            }, 250)
            /*
            const heartRateId = setInterval(() => {
                options.scales.x.max = maxXValue.value;
                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: importStore.fetalHeartRate,
                        }
                    ]
                }
                // Check if fetching should be halted
                if (globalStore.haltFetch) {
                    clearInterval(heartRateId);
                    clearInterval(xIntervalId); // Clear the x-axis increment interval
                }
            }, 250)
            */
            break;
        case GraphType.FetalBloodPressure:
            const fetalBloodPressureId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: upResults,//importStore.fetalBloodPressure,
                        }
                    ]
                }
                // Check if fetching should be halted
                if (globalStore.haltFetch) {
                    clearInterval(fetalBloodPressureId);
                    clearInterval(xIntervalId); // Clear the x-axis increment interval
                }
            }, 250)
            break;
        case GraphType.UterineContractions:
            const utertineContractionsId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: mapResults//importStore.uterineContractions,
                        }
                    ]
                }
                // Check if fetching should be halted
                if (globalStore.haltFetch) {
                    clearInterval(utertineContractionsId);
                    clearInterval(xIntervalId); // Clear the x-axis increment interval
                }
            }, 250)
            break;
        case GraphType.FetalBlood:
            const fetalBloodId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            label: 'Data',
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: o2PResults,//importStore.fetalBlood,
                        }
                    ]
                }
                // Check if fetching should be halted
                if (globalStore.haltFetch) {
                    clearInterval(fetalBloodId);
                    clearInterval(xIntervalId); // Clear the x-axis increment interval
                }
            }, 250)
            break;
    }
})
</script>

<style scoped>
.container {
  height: 40vh;
  padding: 1%;
}
</style>
