<template>
  <div v-if="showNavbar">
    <Navbar/>
  </div>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue';
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
  }
}
</script>

<style>
</style>
