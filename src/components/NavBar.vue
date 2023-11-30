<template>
    <header class="p-4 bg-sky-400 text-gray-100">
        <div class="container px-8 flex flex-col md:flex-row justify-between h-24 md:h-16 mx-auto items-center">
            
                <router-link to="/" class="text-lg font-bold">
                    CITI<span class="text-white">WEATHER</span>
                </router-link>

                <div class="w-11/12 md:w-3/4">
                    <SearchBar />
                </div>
        


        </div>
    </header>
</template>

<script setup>
import SearchBar from './SearchBar.vue';
</script>