<template>
  <div
    style="background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1684487747385-442d674962f2) no-repeat center;background-size:cover"
    class="flex items-center justify-center h-screen text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto">
    <div class="w-full max-w-screen-lg">
      <h1 class="pb-4">CITIWEATHER APP</h1>
      <div class="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue';
</script>

<style scoped>
/* Add your styling here */
</style>
