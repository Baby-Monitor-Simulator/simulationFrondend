<template>
    <div class="container">
        <Line :data="data" :options="options" />
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, type ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'
import { useImportStore } from '@/stores/import';

ChartJS.register(Title, Tooltip, Legend, PointElement,
    LineElement, CategoryScale, LinearScale)

const importStore: any = useImportStore()


const props = defineProps({
    yMin: Number,
    yMax: Number,
    yStepSize: Number,
    chartTitle: String
})

const options: any = {
    animation: false,
    spanGaps: true,
    normalized: true,
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: props.chartTitle
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
            }
        },
        x: {
            type: 'linear',
            min: 0,
            max: 12,
            ticks: {
                stepSize: 1
            }
        }
    },
    maintainAspectRatio: false,
}
const data: any = ref<ChartData<'line'>>({
    datasets: []
})

onMounted(() => {
    setInterval(() => {
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
                    data: importStore.fileContent,
                }
            ]
        }
    }, 3000)
})
</script>

<style scoped>
   
    .container {
        height: 40vh;
        padding: 1%;
    } 



</style>