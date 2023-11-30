<template>
    <div>
        <h3 class="text-lg font-semibold leading-7 text-gray-900">
            Weather Forecast Line graph
        </h3>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Chart from 'chart.js/auto';
import { DateTime } from 'luxon';

const props = defineProps(['forecastData']);
const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {


    const canvas = chartCanvas.value;

    if (!canvas) {
        // Canvas not available
        return;
    }

    const ctx = canvas.getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
        
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: props.forecastData.slice(0, 10).map((item) => ({
                        x: new Date(item.dt_txt).getTime(),
                        // x: new Date(item.dt_txt).getTime(),
                        y: item.main.temp / 10,
                    })),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time (Hour)',
                    },
                    ticks: {
                        callback: (value) => DateTime.fromMillis(value).toFormat('dd, h:mm a'),                       
                         // callback: (value) => new Date(value).toLocaleString(),
                        // callback: (value) => new Date(value).toLocaleString(),
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                    },
                },
            },
        },
    });
};

onMounted(() => {
    createChart();
});

watchEffect(() => {
    if (props.forecastData) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        createChart();
    }
});
</script>
  
<style scoped>
/* Add any styling specific to your graph component */
</style>
  