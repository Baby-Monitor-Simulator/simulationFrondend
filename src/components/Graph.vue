<script lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
    props: {
        yMin: Number,
        yMax: Number,
        yStepSize: Number,
        chartTitle: String
    },
    name: 'LineChart',
    components: { Line },
    mounted() {
    
    },
    data() {
        return {
            
            chartData: {
                Title: 'test',
                //x op de grafiek
                labels: [0,0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                datasets: [ 
                    {
                        //naam van de data
                        label: 'Old',
                        data: [{y:42,x:0.25}, 42, 41, 40, 47, 50, 52, 42, 40, 39, 38, 40, 41, 42, 53, 52, 55],
                        pointRadius:0,
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
                        data: [{x:0.25,y:37}, {x:0.5,y:38}, {x:0.75,y:40}, {x:1,y:51}, {x:1.25,y:51},{x:1.5,y:51},{x:1.75,y:51},{x:2,y:51},{x:2.25,y:51},{x:2.5,y:51}, 53, 53, 52, 38, 42, 46, 42, 42, 43],
                        pointRadius:0,
                        backgroundColor: [
                            'rgba(255,99,132,1)',
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                        ],
                    },
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title:{
                        display: true,
                        text: this.chartTitle
                    }
                },
                scales: {
                    y:{
                        min: this.yMin,
                        max: this.yMax,
                        ticks: {
                            stepSize: this.yStepSize
                        }
                    },
                    x:{
                        type: 'linear',
                        min: 0, 
                        max: 15,
                        ticks: {
                            stepSize: 1
                        }
                    }    
                },
                
            }
        }
    }
}
</script>

<template>
    <div class="container">
            <Line id="my-chart-id" :options="options" :data="chartData"/>

    </div>
</template>


<style scoped>
.container{
    height: 40vh;
    width: 35vw;
    padding: 1%;
}
</style>