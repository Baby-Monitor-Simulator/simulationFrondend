<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import { ref, reactive, computed } from 'vue'
import { useImportStore } from '@/stores/import'

const importStore: any = useImportStore()

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const props = defineProps({
    yMin: Number,
    yMax: Number,
    yStepSize: Number,
    chartTitle: String
})

const chartData: any = reactive({
    title: 'test',
    //x op de grafiek
    labels: [0, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    datasets: [
        {
            //naam van de data
            label: 'Old',
            data: [{ x: 0.25, y: 37 }, { x: 0.5, y: 38 }],
            pointRadius: 0,
            backgroundColor: [
                'rgba(164, 154, 159, 1)',
            ],
            borderColor: [
                'rgba(164, 154, 159, 1)',
            ],
        },
        {
            //naam van de data
            label: 'New',
            data: [{ x: 0.25, y: 37 }, { x: 0.5, y: 38 }],
            pointRadius: 0,
            backgroundColor: [
                'rgba(255,99,132,1)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
        },
    ]
})

const chartOptions: any = reactive({
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: props.chartTitle
        }
    },
    scales: {
        y: {
            min: props.yMax,
            max: props.yMax,
            ticks: {
                stepSize: props.yStepSize
            }
        },
        x: {
            type: 'linear',
            min: 0,
            max: 15,
            ticks: {
                stepSize: 1
            }
        }
    },
})
</script>

<template>
    <div class="container">
        <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
        {{ importStore.fileContent }}
    </div>
</template>


<style scoped>
.container {
    height: 40vh;
    width: 35vw;
    padding: 1%;
}
</style>