<template>
    <NavBar />
    <div class="p-4 bg-gray-200">

        <div v-if="searchResults">
            <div class="mb-8 px-8 py-4">
                <div class="flex flex-col items-center p-8 rounded-md w-auto sm:px-12 bg-gray-700 text-gray-100 shadow-lg">

                    <div class="text-center">
                        <div>
                            <h3 class="text-l uppercase">Location :</h3>
                            <h2 class="text-xl font-semibold uppercase">
                                {{ searchResults.name }}
                                , {{ searchResults.sys.country }}
                            </h2>
                        </div>
                        <div class="text-sm text-gray-300">
                            <h3 class="text-l uppercase">Date :</h3>
                            <h2 class="text-xl font-semibold uppercase">
                                {{ formatDate(searchResults.dt) }}
                            </h2>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                        class="w-32 h-32 p-6 text-yellow-400 fill-current">
                        <path
                            d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z">
                        </path>
                        <rect width="32" height="48" x="240" y="16"></rect>
                        <rect width="32" height="48" x="240" y="448"></rect>
                        <rect width="48" height="32" x="448" y="240"></rect>
                        <rect width="48" height="32" x="16" y="240"></rect>
                        <rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
                        <rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
                        <rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)">
                        </rect>
                        <rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
                    </svg>
                    <div class="mb-2 text-3xl font-semibold">{{ formatTemperature(searchResults.main.temp) }}°C
                        <span class="mx-1 font-normal">/</span>{{ formatTemperature(searchResults.main.feels_like) }}°C
                    </div>
                    <p class="text-gray-400">{{ searchResults.weather[0].description }}</p>

                    <div class="flex items-center justify-between gap-8 p-4 border-t text-gray-400 border-gray-700">
                        <div class="flex items-center space-x-1">
                            <span class="font-bold">{{ searchResults.main.humidity }}%</span>
                            <span class="text-sm">Humidity</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <span class="font-bold">{{ searchResults.wind.speed }} m/s</span>
                            <span class="text-sm">Wind Speed</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <span class="font-bold">{{ searchResults.clouds.all }}%</span>
                            <span class="text-sm">Cloudiness</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-else>
            <p class="text-center text-gray-600 px-16 py-8">
                Loading Data ...
            </p>
        </div>


    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const searchResults = ref(null);

// const { cityData } = defineProps(['cityData']);

onMounted(() => {

    const placeData = route.query.data;

    if (placeData) {
        try {
            searchResults.value = JSON.parse(placeData);
            console.log('City weather data:', searchResults.value);
            console.log('City weather data name:', searchResults.value.name);
            console.log('City weather data dt:', searchResults.value.dt);
            console.log('City weather data main.temp:', searchResults.value.main.temp);
            console.log('City weather data weather[0].description:', searchResults.value.weather[0].description);
        } catch (error) {
            console.error('Error parsing city data:', error);
        }
    } else {
        console.warn('No city data found in route query.');
    }
});

onBeforeUnmount(() => {
    // Perform any cleanup when the component is unmounted
    // For example, remove event listeners or clear data
});

// const formatDate = (timestamp) => {
//     // Ensure that the timestamp is a valid number
//     if (typeof timestamp !== 'number' || isNaN(timestamp)) {
//         console.error('Invalid timestamp:', timestamp);
//         return 'Invalid Date';
//     }

//     // Assuming timestamp is in seconds, multiply by 1000 for milliseconds
//     const date = new Date(timestamp * 1000);

//     // Check if the Date object is valid
//     if (isNaN(date.getTime())) {
//         console.error('Invalid Date object:', date);
//         return 'Invalid Date';
//     }

//     // Format the date using Intl.DateTimeFormat
//     return new Intl.DateTimeFormat('en-US').format(date);
// };

const formatDate = (timestamp) => {
    // Implement your date formatting logic here
    // For example, you can use the Intl.DateTimeFormat API
    const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
    return new Intl.DateTimeFormat('en-US').format(date);
};

const formatTemperature = (temperature) => {
    // Implement your temperature formatting logic here
    // For example, you can round the temperature to one decimal place
    return Math.round(temperature * 10) / 10;
};


</script>