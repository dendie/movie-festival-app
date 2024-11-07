<template>
  <div>
    <input v-model="searchTerm" @input="searchMovies" class="ml-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search movie..." />
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="movie in paginatedMovies" :key="movie.id" class="movie-item">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src="https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <router-link :to="`/movie/${movie.id}`">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ movie.title }}
                </router-link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <button @click="prevPage" :disabled="page === 1" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
      <button @click="nextPage" :disabled="page === totalPages" class="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useMoviesStore } from '@/stores/movie';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const moviesStore = useMoviesStore();
  const authStore = useAuthStore();
  const page = ref(1);
  const searchTerm = ref('');
  const router = useRouter();

  const paginatedMovies = computed(() => moviesStore.filteredMovies(page.value));
  const totalPages = computed(() => moviesStore.totalPages);

  const searchMovies = () => {
    if (searchTerm.value.length > 0) {
      moviesStore.searchMovies(searchTerm.value);
    } else {
      moviesStore.fetchMovies();
    }
  };

  const prevPage = () => {
    if (page.value > 1) page.value--;
  };

  const nextPage = () => {
    if (page.value < totalPages.value) page.value++;
  };

  onMounted(() => {
    if (!authStore.isAuthenticated) {
      router.push({ path: '/login' })
    };
    moviesStore.fetchMovies();
  });
</script>
