<template>
    <NavBar />


    <div class="md:min-h-screen md:flex md:items-center md:justify-center p-4 bg-gray-200">

        <div v-if="searchResults">
            <div class="flex flex-col md:flex-row justify-between gap-8">
                <div class="px-8 py-2 bg-gray-100 shadow-lg">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Weather Information</h3>
                    </div>
                    <div class="mt-6 border-t border-gray-100">
                        <dl class="divide-y divide-gray-150">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Location</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ searchResults.name
                                }},
                                    {{ searchResults.sys.country }}</dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Date</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ formatDate(searchResults.dt) }}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Temperature</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {{ formatTemperature(searchResults.main.temp) }}°C /
                                    {{ formatTemperature(searchResults.main.feels_like) }}°C
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Weather Description</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{{
                                    searchResults.weather[0].description }}</dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Humidity</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{{
                                    searchResults.main.humidity }}%</dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Wind Speed</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{{
                                    searchResults.main.speed }} m/s</dd>
                            </div>

                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-sm font-medium leading-6 text-gray-900">Cloudiness</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{{
                                    searchResults.clouds.all }}%</dd>
                            </div>


                        </dl>
                    </div>
                </div>
                <div class="px-8 py-2 bg-gray-100 shadow-lg">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-base font-semibold leading-7 text-gray-900">Weather Forecasting</h3>
                    </div>
                    <div v-for="forecastItem in paginatedForecast" :key="forecastItem.dt"
                        class="mt-6 border-t border-gray-100">


                        <dl class="divide-y divide-gray-150">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 hover:bg-gray-200">
                                <dt class="text-sm font-medium leading-6 text-gray-900">{{ forecastItem.dt_txt }}</dt>
                                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <p class="text-gray-700">
                                        Temperature: {{ formatForecastTemperature(forecastItem.main.temp) }}
                                        °C
                                    </p>
                                    <p class="text-gray-700 capitalize italic">

                                        {{ forecastItem.weather[0].description }}
                                    </p>
                                </dd>
                            </div>

                        </dl>
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
                        <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>

            </div>

            <div class="my-5 py-4 px-10 bg-gray-100">

                <!-- Display Hourly Forecast Chart -->
                <HourlyForecastChart :forecastData="forecastResults" />
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
import { ref, onBeforeMount, watch, computed } from 'vue';
// import { useRoute } from 'vue-router';
import HourlyForecastChart from '../components/HourlyForecastChart.vue';
import { useSearchStore } from '../stores/searchStore';

const searchStore = useSearchStore();

const searchResults = ref(null)
const forecastResults = ref(null)


const itemsPerPage = 5;
const currentPage = ref(1);
// const isLoading = computed(() => !searchResults.value && !forecastResults.value);

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
    return new Intl.DateTimeFormat('en-US').format(date);
};

const formatTemperature = (temperature) => {
    return Math.round(temperature * 10) / 10;
};

const formatForecastTemperature = (temperature) => {
    return Math.round(temperature) / 10;
};

const paginatedForecast = computed(() => {
    const list = forecastResults.value;
    if (list) {
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return list.slice(startIndex, endIndex);
    }
    return [];
});


// const totalPages = computed(() => Math.ceil((forecastResults.value.length || 0) / itemsPerPage));

const totalPages = computed(() => {
    const list = forecastResults.value;
    return list ? Math.ceil(list.length / itemsPerPage) : 0;
});


const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};


onBeforeMount(async () => {
  await searchStore.loadFromLocalStorage();

  // Set initial values
  searchResults.value = searchStore.placeData;
  forecastResults.value = searchStore.hourlyForecast;


  // Watch for changes in searchStore.placeData and update searchResults
  watch(() => searchStore.placeData, (newPlaceData) => {
    searchResults.value = newPlaceData;
  });

  // Watch for changes in searchStore.hourlyForecast and update forecastResults
  watch(() => searchStore.hourlyForecast, (newHourlyForecast) => {
    forecastResults.value = newHourlyForecast;
  });
});

</script>