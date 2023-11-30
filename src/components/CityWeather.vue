<template>
    <div class="p-4 bg-gray-200">

        <div>
            <div v-for="cityWeather in searchResults" :key="cityWeather.id" class="mb-8 px-8 py-4">
                <div class="flex flex-col items-center rounded-md w-auto sm:px-12 bg-gray-700 text-gray-100 shadow-lg">
                    <div class="text-center">
                        <h2 class="text-xl font-semibold uppercase">{{ cityWeather.name }}, {{ cityWeather.sys.country }}
                        </h2>
                        <p class="text-sm text-gray-300">{{ formatDate(cityWeather.dt) }}</p>
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
                    <div class="mb-2 text-3xl font-semibold">{{ formatTemperature(cityWeather.main.temp) }}°C
                        <span class="mx-1 font-normal">/</span>{{ formatTemperature(cityWeather.main.feels_like) }}°C
                    </div>
                    <p class="text-gray-400">{{ cityWeather.weather[0].description }}</p>

                    <div class="flex items-center justify-between gap-8 p-4 border-t text-gray-400 border-gray-700">
                        <div class="flex items-center space-x-1">
                            <span class="font-bold">{{ cityWeather.main.humidity }}%</span>
                            <span class="text-sm">Humidity:</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <span class="font-bold">{{ cityWeather.wind.speed }} m/s</span>
                            <span class="text-sm">Wind Speed</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <span class="font-bold">{{ cityWeather.clouds.all }}%</span>
                            <span class="text-sm">Cloudiness</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script setup>
import axios from 'axios';
import _debounce from 'lodash.debounce';
import { ref } from 'vue';

const apiKey = '36b0cce24cddf78bf2dbec28d6d5bbb1'; // Replace with your API key
// const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';
const citySearchApiUrl = 'http://api.openweathermap.org/data/2.5/find';

let city = 'Search City Name'; // Default city

const searchResults = ref('');

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


const searchCity = async () => {
    try {
        const response = await axios.get(citySearchApiUrl, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric',
            },
        });
        console.log('search results', response.data);
        console.log('search results list ', response.data.list);
        searchResults.value = response.data.list;
        console.log('search results list 003 ', searchResults.value);
        console.log('search results list 003w ', searchResults.value[0].name);
    } catch (error) {
        console.error('Error searching for cities:', error);
    }
};

const debouncedSearchCity = _debounce(searchCity, 500);

</script>