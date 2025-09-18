<template>
  <nav class="navbar">
    <div class="nav-left">
      <img src="../../src/assets/logo.png" alt="logo" width="40" height="40" />
      <router-link to="/" class="logo">Payment Management</router-link>
    </div>
    <div>
      <router-link
        to="/"
        class="nav-link"
        :class="{ active : isActive('/') }"
        >Dashboard</router-link>

      <router-link
      to="/users"
      class="nav-link"
      :class="{ active : isActive('/users') }"
      >Users</router-link>
      
      <router-link to="/payments"
      class="nav-link"
      :class="{ active : isActive('/payments') }"
      >Payments</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  methods: {
    isActive(path) {
        if (path === '/') {
            return this.$route.path === '/'
        } else {
            return this.$route.path.startsWith(path)
        }
    }
  }
}
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
</style>
