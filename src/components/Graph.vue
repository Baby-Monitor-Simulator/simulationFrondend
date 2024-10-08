<template>
    <div class="container">
        <Line ref="myChart" :data="data" :options="options" />
    </div>
    
</template>
  
<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, type ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'
import { useImportStore } from '@/stores/import';
import GraphType from "@/enums/graphTypes"
import { useGlobalStore } from '@/stores/global';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

const lineChartRef = ref(null); 

const importStore: any = useImportStore()
const globalStore: any = useGlobalStore()

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

const myChart = ref(null);

onMounted(() => {
    // Interval to increment x-axis max value
    const xIntervalId = setInterval(() => {
             
        if (waitForChange.value > 11)
        {    
            incrementXMaxValue();
            const chart = myChart.value.chart; 
            chart.options.scales.x.min = maxXValue.value-11;
            chart.options.scales.x.max = maxXValue.value; // Update the x-axis max value
            chart.update();
        }

        waitForChange.value += 0.1;
        
    },100); // Every 1 seconds

    // Control graph properties based on type
    switch (props.type) {
        case GraphType.FetalHeartRate:
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
                            data: importStore.fetalBloodPressure,
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
                            data: importStore.uterineContractions,
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
                            data: importStore.fetalBlood,
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

