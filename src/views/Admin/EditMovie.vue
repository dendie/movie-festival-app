<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Edit Movie
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="updateMovie">
            <div>
              <label for="movie-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie Title:</label>
              <input
                type="text"
                id="movie-title"
                name="movie-title"
                class="ml-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Movie Title"
                v-model="movie.title"
                required
              />
            </div>

            <div>
              <label for="movie-description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
              <textarea
                v-model="movie.description"
                id="movie-description"
                placeholder="Description"
                required
              />
            </div>

            <div>
              <label for="movie-artists" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Artists:</label>
              <input
                type="text"
                id="movie-artists"
                name="movie-genre"
                class="ml-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Artists (comma-separated)"
                v-model="movie.artists"
                required
              />
            </div>

            <div>
              <label for="movie-genres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre:</label>
              <input
                type="number"
                id="movie-genres"
                name="movie-genre"
                class="ml-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Genres (comma-separated)"
                v-model="movie.genres"
                required
              />
            </div>

            <div>
              <label for="movie-url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Watch Url:</label>
              <input
                type="text"
                id="movie-url"
                name="movie-url"
                class="ml-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Watch URL"
                v-model="movie.watchUrl"
                required
              />
            </div>

            <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Update Movie</button>
            <p v-if="message">{{ message }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMoviesStore } from '@/stores/movie';

const route = useRoute();
const router = useRouter();
const moviesStore = useMoviesStore();

const movieId = Number(route.params.id);
const movie = null;
const message = null;

onMounted(async () => {
  movie.value = await moviesStore.getMovieById(movieId); // Fetch existing movie details
  console.log(movie);
});

const updateMovie = async () => {
  if (movie.value) {
    const success = await moviesStore.updateMovie(movieId, movie.value);
    message.value = success ? "Movie updated successfully!" : "Failed to update movie.";
    if (success) router.push({ path: '/admin/add'}); // Redirect after update
  }
};
</script>
