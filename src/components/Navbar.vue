<template>
  <nav class="navbar">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" width="40" height="40" />
      <router-link to="/" class="logo">Payment Management</router-link>
    </div>
    <div>
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

      <!-- Three dots -->
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
import { ACTIONS, EVENTS, LOCAL_STORAGE, ROLE_TYPE } from '@/constants/constants';
import { authStore } from '@/store/auth';


export default {
  name: 'NavbarComponent',
  data() {
    return {
      showMenu: false,
      store: authStore(),
      ACTIONS
    };
  },

  computed:{
    isAdmin(){
        return this.store.getUserRole === ROLE_TYPE.ADMIN
    }
  },

  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    handleAction(action) {
      if (action === ACTIONS.LOGOUT) {
        this.store.setUserRole(null);
        localStorage.removeItem(LOCAL_STORAGE.USER_ROLE);
        localStorage.removeItem(LOCAL_STORAGE.IS_LOGGED_IN);
        localStorage.removeItem(LOCAL_STORAGE.LOGGED_IN_USER);
        window.location.reload();
      }
      this.showMenu = false;
    },

    isActive(path) {
        if (path === '/') {
            return this.$route.path === '/'
      } else {
            return this.$route.path.startsWith(path)
      }
    },

    handleClickOutside(event) {
      const menu = this.$el.querySelector(".menu-container");
      if (menu && !menu.contains(event.target)) {
        this.showMenu = false;
      }
    }
  },

  mounted() {
    const role = localStorage.getItem(LOCAL_STORAGE.USER_ROLE);
    if (role) {
      this.store.setUserRole(role);
    }
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
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  font-weight: 700;
  font-size: 1.4rem;
  color: #3b82f6;
  text-decoration: none;
  letter-spacing: 0.5px;
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
