<template>
    <div class="relative z-30 text-base text-black">
        <input type="text" 
            v-model="city" 
            placeholder="Search Location..."
            class="text-gray-800 my-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"
            @input="debouncedSearchCity" 
            @keydown.escape="closeSearch" 
        />

        <div v-if="searchStore.showResults" class="mt-2" 
            @keydown.escape="closeSearch">
            <div
                class="text-left text-gray-700  absolute top-10 rounded-t-none rounded-b-2xl shadow bg-gray-100 divide-y w-full max-h-40 overflow-auto">
                <div v-for="result in searchResults" :key="result.id" class="hover:text-sky-500 p-2 cursor-pointer"
                    @click="selectCity(result)">
                    {{ result.name }},
                    {{ result.sys.country }}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import _debounce from 'lodash.debounce';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useSearchStore } from '../stores/searchStore';

const searchStore = useSearchStore();
const router = useRouter();

let city = null;

// const city = computed(() => searchStore.location)
const searchResults = computed(() => searchStore.searchResults);

const searchCity = async () => {
    await searchStore.getCity(city)
};

const debouncedSearchCity = _debounce(searchCity, 500);

const selectCity = async (cityData) => {
    await searchStore.setShowResults(false);
    await searchStore.getWeatherForecast(cityData)
    router.push({ name: 'place-details', params: { name: cityData.name }});
};

const closeSearch = () => {
    searchStore.setShowResults(false);
};

// watch(() => searchStore.showResults, (newValue) => {
//     console.log('Search results visibility changed:', newValue);
// });

// watch(() => searchStore.location, () => {
//     searchStore.location = city
//     console.log('locato babe', searchStore.location);
// });


// Close the search results on component mount
onMounted(async () => {
    // await searchCity();
    // await selectCity();
});
</script>
  