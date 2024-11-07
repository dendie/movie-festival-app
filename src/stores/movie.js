// src/store/movies.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    userVotes: [],
  }),
  actions: {
    async fetchMovies() {
      const { data } = await axios.get('http://localhost:3000/movies');
      this.movies = data;
    },
    async fetchMovieById(id) {
      const { data } = await axios.get(`http://localhost:3000/movies/${id}`);
      return data;
    },
    async searchMovies(query) {
      const lowerCaseQuery = query.toLowerCase();
      const searchMovies = this.movies
      this.movies = searchMovies.filter(movie => {
        return (
          movie.title.toLowerCase().includes(lowerCaseQuery) ||
          movie.description.toLowerCase().includes(lowerCaseQuery) ||
          movie.artists.some(artist => artist.toLowerCase().includes(lowerCaseQuery)) ||
          movie.genres.some(genre => genre.toLowerCase().includes(lowerCaseQuery))
        );
      });
      return this.movies;
    },
    isUserVoted(id) {
      return this.userVotes.includes(id);
    },
    async addMovie(newMovie) {
      try {
        const response = await axios.post('http://localhost:3000/movies', newMovie);
        this.movies.push(response.data);
      } catch (error) {
        console.error('Error adding movie:', error);
      }
    },
    // Fetch movie by ID
    async getMovieById (id) {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch movie by ID", error);
        return null;
      }
    },
    // Update movie
    async updateMovie (id, updatedMovie) {
      try {
        await axios.put(`http://localhost:3000/movies/${id}`, updatedMovie);
        const index = this.movies.findIndex((m) => m.id === id);
        if (index !== -1) this.movies[index] = updatedMovie;
        return true;
      } catch (error) {
        console.error("Failed to update movie", error);
        return false;
      }
    },
  },
  getters: {
    filteredMovies: (state) => (page) => {
      const perPage = 10;
      const start = (page - 1) * perPage;
      return state.movies.slice(start, start + perPage);
    },
    totalPages: (state) => {
      const perPage = 10;
      return Math.ceil(state.movies.length / perPage);
    },
  },
});
