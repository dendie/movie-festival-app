<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const role = JSON.parse(localStorage.getItem('role'));
  const isAdmin = (role == "admin");
  const router = useRouter();

  const logout = () => {
    authStore.logout();
    router.push({ path: '/login' });
  };
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink to="/login" v-if="!isAuthenticated">Login</RouterLink>
        <RouterLink to="/register" v-if="!isAuthenticated">Register</RouterLink>
        <RouterLink to="/admin/add" v-if="isAuthenticated && isAdmin">Admin</RouterLink>
        <RouterLink to="/" v-if="isAuthenticated && !isAdmin">User</RouterLink>
        <button @click="logout()" v-if="isAuthenticated">Logout</button>
      </nav>
    </div>
  </header>

  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
  width: 100%;
  flex-grow: 0;
  flex-shrink: 0;
}

.content {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
