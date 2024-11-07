import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '../views/Users/MovieList.vue';
import Login from '@/views/Authentication/Login.vue';
import Register from '@/views/Authentication/Register.vue';

const routes = [
  { path: '/', component: MovieList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/movie/:id', component: () => import('../views/Users/MovieDetail.vue') },
  { path: '/admin/add', component: () => import('../views/Admin/AddMovie.vue') },
  { path: '/admin/edit', component: () => import('../views/Admin/EditMovie.vue') }
];

export default createRouter({
  history: createWebHistory("/"),
  routes,
});
