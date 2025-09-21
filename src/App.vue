<template>
  <div v-if="showNavbar">
    <Navbar/>
  </div>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { LOCAL_STORAGE } from './constants/constants';

export default {
  name: 'App',
  components: {
    Navbar
  },

  computed: {
    showNavbar() {
      const isLoggedIn = this.$store.getters.getIsLoggedIn;
      return !!isLoggedIn;
    }
  },
  mounted() {
    const role = localStorage.getItem(LOCAL_STORAGE.USER_ROLE);
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE.IS_LOGGED_IN);

    this.$store.commit('setIsLoggedIn', isLoggedIn);
    if (role) {
      this.$store.commit('setUserRole', role);
    }
  }
}
</script>

<style>
</style>
