<template>
    <div class="p-4 bg-gray-200">
        <div class="container flex justify-between h-16 mx-auto">

            <div class="flex items-center w-full md:space-x-4">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" title="Search" class="p-1 focus:outline-none focus:ring">
                            <svg fill="currentColor" viewBox="0 0 512 512" class="w-4 h-4 text-gray-400">
                                <path
                                    d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z">
                                </path>
                            </svg>
                        </button>
                    </span>
                    <input type="search" v-model="city" name="Search" placeholder="Search City Name"
                        @input="debouncedSearchCity"
                        class="w-full py-2 pl-10 pr-4 text-sm rounded-md sm:w-auto focus:outline-none text-gray-400 focus:bg-gray-300">
                </div>
            </div>

        </div>

        <div v-if="searchResults && searchResults.length > 0">
            <div v-for="cityWeather in searchResults" :key="cityWeather.id" class="mb-8 px-8 py-4">
                <div class="flex flex-col items-center p-8 rounded-md w-auto sm:px-12 bg-gray-700 text-gray-100 shadow-lg">
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

        <div v-else>

            <section class="p-6 bg-gray-300 text-gray-100">
                <div class="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
                    <div class="w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-700 shadow-md">
                        <!-- <span class="block mb-2 text-violet-400">CimWeather</span> -->
                        <h1 class="text-5xl font-extrabold text-gray-50">CimWeather</h1>
                        <div class="my-8">
                            <span class="font-medium text-gray-50">Search a Place </span> See its current weather.
                            <p class="text-gray-100">
                                "If you don't like the weather, wait five minutes. It will change... or not. Who knows?"
                            </p>
                        </div>
                        <div>

                        </div>

                    </div>
                    <img src="../assets/images/skyy.jpg" alt=""
                        class="object-cover w-full rounded-md xl:col-span-3 bg-gray-500">
                </div>
            </section>

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

let city = null; // Default city

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