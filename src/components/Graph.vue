<template>
    <div class="container">
        <Line :data="data" :options="options" />
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, type ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'
import { useImportStore } from '@/stores/import';
import GraphType from "@/enums/graphTypes"
import { useGlobalStore } from '@/stores/global';

ChartJS.register(Title, Tooltip, Legend, PointElement,
    LineElement, CategoryScale, LinearScale)

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
    normalized: true,
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
            max: 11,
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

onMounted(() => { // control individual graph properties
    switch (props.type) {
        case GraphType.FetalHeartRate:
            const intId = setInterval(() => {
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
                if (globalStore.haltFetch) {
                    clearInterval(intId)
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
                if (globalStore.haltFetch) {
                    clearInterval(fetalBloodPressureId)
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
                if (globalStore.haltFetch) {
                    clearInterval(utertineContractionsId)
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
                if (globalStore.haltFetch) {
                    clearInterval(fetalBloodId)
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