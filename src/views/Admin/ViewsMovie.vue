<template>
  <div class="pt-1">
    <h2 class="text-lg font-medium">Movie Statistics</h2>
    <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 lg:grid-cols-6 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 ">
      <div v-if="mostViewedMovie" class="lg:mb-5">
        <h3 class="text-lg font-medium">Most Viewed Movie</h3>
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:px-8">
          <img src="https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <p class="text-lg font-medium">Title: {{ mostViewedMovie.title }}</p>
        <p class="text-lg font-medium">Views: {{ mostViewedMovie.views }}</p>
      </div>
      <div v-if="mostViewedGenre">
        <h3 class="text-lg font-medium">Most Viewed Genre</h3>
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:px-8">
          <img src="https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <p class="text-lg font-medium">Genre: {{ mostViewedGenre.genre }}</p>
        <p class="text-lg font-medium">Views: {{ mostViewedGenre.views }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMoviesStore } from '@/stores/movie';

const moviesStore = useMoviesStore();
const mostViewedMovie = ref(null);
const mostViewedGenre = ref(null);

onMounted(async () => {
  mostViewedMovie.value = await moviesStore.getMostViewedMovie();
  mostViewedGenre.value = await moviesStore.getMostViewedGenre();
});
</script>
s
