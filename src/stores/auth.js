import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);          // Holds user data after login
  const token = ref(null);          // Holds the authentication token
  const role = ref(null);          // Holds the authentication role
  const isAuthenticated = ref(false); // Boolean indicating authentication status

  // Load token and user from localStorage (if present) when store initializes
  if (localStorage.getItem('token')) {
    token.value = localStorage.getItem('token');
    user.value = JSON.parse(localStorage.getItem('user'));
    isAuthenticated.value = true;
  }

  // Login function
  async function login(credentials) {
    try {
      const { data } = await axios.get('http://localhost:3000/users');
      const response = data.filter((user) => {
        return (user.username === credentials.username && user.password === credentials.password) ?? user;
      })
      token.value = response[0].token;
      user.value = response[0].username;
      role.value = response[0].role;
      isAuthenticated.value = true;

      // Store token and user in localStorage for session persistence
      localStorage.setItem('token', token.value);
      localStorage.setItem('user', JSON.stringify(user.value));
      localStorage.setItem('role', JSON.stringify(role.value));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  // Register function
  async function register(userData) {
    try {
      const response = await axios.post('http://localhost:3000/users', userData);
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  // Logout function
  function logout() {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;

    // Clear token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  // Check if the user is authenticated (optional utility function)
  function checkAuth() {
    return isAuthenticated.value;
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };
});
