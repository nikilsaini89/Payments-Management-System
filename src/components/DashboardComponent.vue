<template>
  <!-- Dashboard wrapper -->
  <div class="dashboard">

    <!-- Header section with user info -->
    <header class="dashboard-header">
      <h2 class="payment-header">Welcome {{ loggedInUser?.name }} <span class="font-weight-200">({{ loggedInUser?.role }})</span></h2>
      <p class="subtitle">Overview of <span v-if="isAdmin">users and</span> payments</p>
    </header>

    <!-- Stats cards section -->
    <section class="stats-cards">
      <!-- Total users visible only to admin -->
      <div class="card card-blue" v-if="isAdmin">
        <h2>Total Users</h2>
        <p class="count">{{ totalUsers }}</p>
      </div>
      <!-- Total payments -->
      <div class="card card-indigo">
        <h2>Total Payments</h2>
        <p class="count">{{ totalPayments }}</p>
      </div>
      <!-- Successful payments -->
      <div class="card card-green">
        <h2>Success</h2>
        <p class="count">{{ successPayments }}</p>
      </div>
      <!-- Pending payments -->
      <div class="card card-yellow">
        <h2>Pending</h2>
        <p class="count">{{ pendingPayments }}</p>
      </div>
      <!-- Failed payments -->
      <div class="card card-red">
        <h2>Failed</h2>
        <p class="count">{{ failedPayments }}</p>
      </div>
    </section>

    <!-- Quick action buttons -->
    <section class="quick-actions">
      <!-- Admin-only action -->
      <div v-if="isAdmin" class="action-card" @click="$router.push('/users')">
        <span class="icon">👤</span>
        <h2>Manage Users</h2>
      </div>
      <!-- Manage payments action -->
      <div class="action-card" @click="$router.push('/payments')">
        <span class="icon">💳</span>
        <h2>Manage Payments</h2>
      </div>
    </section>
  </div>
</template>

<script>
import { getUsers } from '@/services/user-service'
import { getPayments } from '@/services/payment-service'
import { LOCAL_STORAGE, PAYMENT_STATUS, ROLE_TYPE } from '@/constants/constants'

export default {
  name: "DashboardComponent",
  data() {
    return {
      // Holds all users fetched
      users: [],
      // Holds all payments fetched
      payments: [],
      // Currently logged in user info
      loggedInUser: null
    }
  },
  beforeMount() {
    /** Retrieve logged in user from localStorage */
    const user = localStorage.getItem(LOCAL_STORAGE.LOGGED_IN_USER)
    this.loggedInUser = user ? JSON.parse(user) : null;
  },
  async mounted() {
    /** Fetch initial data for users and payments */
    this.users = await getUsers()
    this.payments = await getPayments()

    /** Set role and login status in Vuex store */
    const role = localStorage.getItem(LOCAL_STORAGE.USER_ROLE);
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE.IS_LOGGED_IN);

    this.$store.commit('setIsLoggedIn', isLoggedIn);
    if (role) {
      this.$store.commit('setUserRole', role);
    }
  },
  computed: {
    /** Check if current user is admin */
    isAdmin() {
      const userRole = localStorage.getItem(LOCAL_STORAGE.USER_ROLE)
      return userRole === ROLE_TYPE.ADMIN;
    },
    /** Total number of users */
    totalUsers() {
      return this.users?.length
    },
    /** Total payments, filtered for non-admin users */
    totalPayments() {
      if(this.isAdmin){
        return this.payments.length
      }
      return this.payments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    },
    /** Count of successful payments */
    successPayments() {
      const successPayments = this.payments.filter(payment => payment.status === PAYMENT_STATUS.SUCCESS);
      if(this.isAdmin){
        return successPayments.length
      }
      return successPayments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    },
    /** Count of pending payments */
    pendingPayments() {
      const pendingPayments = this.payments.filter(payment => payment.status === PAYMENT_STATUS.PENDING);
      if(this.isAdmin){
        return pendingPayments.length
      }
      return pendingPayments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    },
    /** Count of failed payments */
    failedPayments() {
      const failedPayments = this.payments.filter(payment => payment.status === PAYMENT_STATUS.FAILED);
      if(this.isAdmin){
        return failedPayments.length
      }
      return failedPayments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    }
  }
}
</script>

<style scoped>
/** Card colors for different stats */
.card-blue { background-color: #3b82f6; }
.card-indigo { background-color: #6366f1; }
.card-green { background-color: #22c55e; }
.card-yellow { background-color: #eab308; }
.card-red { background-color: #ef4444; }

/** Header styles */
.payment-header{
  margin: 0px;
}

.font-weight-200{
  font-weight: 400;
}

/** Dashboard container */
.dashboard {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;
}

.dashboard-header h1 {
  font-size: 2rem;
  margin-bottom: 0.3rem;
}

.dashboard-header .subtitle {
  color: #777;
  margin-bottom: 2rem;
}

/** Stats cards layout */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

/** Individual card styling */
.card {
  padding: 1.5rem;
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card h2 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card .count {
  font-size: 1.8rem;
  font-weight: bold;
}

/** Quick actions layout */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

/** Action card styling */
.action-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  transform: translateY(-4px);
}

.action-card .icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.action-card h2 {
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
