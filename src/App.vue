<template>
  <div v-if="showNavbar">
    <Navbar/>
  </div>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { LOCAL_STORAGE } from './constants/constants';
import { authStore } from './store/auth';

export default {
  name: 'App',
  components: {
    Navbar
  },

  data() {
    return {
      store: authStore()
    }
  },

  computed: {
    showNavbar() {
      const isLoggedIn = this.store.getIsLoggedIn;
      return !!isLoggedIn;
    }
  },
  mounted() {
    const role = localStorage.getItem(LOCAL_STORAGE.USER_ROLE);
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE.IS_LOGGED_IN);

    this.store.setIsLoggedIn(isLoggedIn);
    if (role) {
      this.store.setUserRole(role);
    }
  }
}
</script>

<style>
</style>
