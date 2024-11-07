<template>
  <div>
    <div class="pt-6">
      <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8">
        <img src="https://images.pexels.com/photos/821652/pexels-photo-821652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      </div>
      <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <div>
          <h3 class="text-lg font-medium">{{ movie?.title }}</h3>

          <div class="space-y-6">
            <p class="text-base text-gray-900">{{ movie?.description }}</p>
          </div>
        </div>

        <div class="mt-10">
          <h2 class="text-sm font-medium text-gray-900">Details</h2>

          <div class="mt-4 space-y-6 mb-4">
            <span class="text-sm text-gray-600">Duration: {{ movie?.duration }} minutes</span>
            <br>
            <span class="text-sm text-gray-600">Genre: {{ movie?.genres.join(', ') }}</span>
          </div>
          <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="toggleVote">{{ isVoted ? 'Unvote' : 'Vote' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useMoviesStore } from '@/stores/movie';
  import { useAuthStore } from '@/stores/auth';
  import { useRoute, useRouter } from 'vue-router';

  const moviesStore = useMoviesStore();
  const authStore = useAuthStore();
  const router = useRouter();
  const route = useRoute();
  const movie = ref(null);
  const isVoted = ref(false);

  const toggleVote = () => {
    if (!authStore.isAuthenticated) {
      alert("Please log in to vote")
      setTimeout(() => {
        router.push({ path: '/login' })
      }, 2000)
      return
    };

    if (isVoted.value) {
      moviesStore.unvoteMovie(movie.value.id);
    } else {
      moviesStore.voteMovie(movie.value.id);
    }
    isVoted.value = !isVoted.value;
  };

  onMounted(async () => {
    const movieId = route.params.id;
    movie.value = await moviesStore.fetchMovieById(movieId);
    moviesStore.incrementViewCount(movieId);
    isVoted.value = moviesStore.isUserVoted(movieId);
  });
</script>
