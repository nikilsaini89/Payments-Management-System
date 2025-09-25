<template>
  <!-- Main navigation bar -->
  <nav class="navbar">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" width="40" height="40" />
      <router-link to="/" class="logo">Payment Management</router-link>
    </div>
    <div>
      <!-- Navigation links -->
      <router-link
        to="/"
        class="nav-link"
        :class="{ active : isActive('/dashboard') }"
        >Dashboard</router-link>

      <router-link v-if="isAdmin"
        to="/users"
        class="nav-link"
        :class="{ active : isActive('/users') }"
      >Users</router-link>
      
      <router-link to="/payments"
        class="nav-link"
        :class="{ active : isActive('/payments') }"
      >Payments</router-link>

      <!-- Dropdown menu for actions -->
      <div class="menu-container">
        <button class="dots-btn" @click="toggleMenu">
          ⋮
        </button>

        <ul v-if="showMenu" class="dropdown">
          <li @click="handleAction(ACTIONS.LOGOUT)">Logout</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ACTIONS, EVENTS, ROLE_TYPE } from '@/constants/constants';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      // Controls visibility of dropdown
      showMenu: false,
      ACTIONS
    };
  },

  computed:{
    // Check if user is admin
    isAdmin(){
        return this.$store.getters.getUserRole === ROLE_TYPE.ADMIN
    }
  },

  methods: {
    // Toggle dropdown visibility
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    // Handle menu actions
    handleAction(action) {
      if (action === ACTIONS.LOGOUT) {
        this.$store.commit('setUserRole', null);
        localStorage.clear()
        window.location.reload();
      }
      this.showMenu = false;
    },

    // Highlight active nav link
    isActive(path) {
        if (path === '/') {
            return this.$route.path === '/'
      } else {
            return this.$route.path.startsWith(path)
      }
    },

    // Close dropdown when clicking outside
    handleClickOutside(event) {
      const menu = this.$el.querySelector(".menu-container");
      if (menu && !menu.contains(event.target)) {
        this.showMenu = false;
      }
    }
  },

  mounted() {
    document.addEventListener(EVENTS.CLICK, this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener(EVENTS.CLICK, this.handleClickOutside);
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fefefe;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.logo {
  font-weight: 700;
  font-size: 1.4rem;
  color: #3b82f6;
  text-decoration: none;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.nav-right {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  color: #374151;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: #eff6ff;
  color: #3b82f6;
}

.nav-link.active {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
}

.menu-container {
  position: relative;
  display: inline-block;
}

.dots-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  right: 0;
  margin-top: 6px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  list-style: none;
  padding: 0.5rem 0;
  min-width: 120px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.dropdown li {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown li:hover {
  background: #f3f4f6;
}
</style>
