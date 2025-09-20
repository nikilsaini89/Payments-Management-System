<template>
  <div class="dashboard">

    <header class="dashboard-header">
      <h2 class="payment-header">Welcome {{ loggedInUser?.name }} <span class="font-weight-200">({{ loggedInUser?.role }})</span></h2>
      <p class="subtitle">Overview of <span v-if="isAdmin">users and</span> payments</p>
    </header>

    <section class="stats-cards">
      <div class="card card-blue" v-if="isAdmin">
        <h2>Total Users</h2>
        <p class="count">{{ totalUsers }}</p>
      </div>
      <div class="card card-indigo">
        <h2>Total Payments</h2>
        <p class="count">{{ totalPayments }}</p>
      </div>
      <div class="card card-green">
        <h2>Success</h2>
        <p class="count">{{ successPayments }}</p>
      </div>
      <div class="card card-yellow">
        <h2>Pending</h2>
        <p class="count">{{ pendingPayments }}</p>
      </div>
      <div class="card card-red">
        <h2>Failed</h2>
        <p class="count">{{ failedPayments }}</p>
      </div>
    </section>

    <section class="quick-actions">
      <div v-if="isAdmin" class="action-card" @click="$router.push('/users')">
        <span class="icon">👤</span>
        <h2>Manage Users</h2>
      </div>
      <div class="action-card" @click="$router.push('/payments')">
        <span class="icon">💳</span>
        <h2>Manage Payments</h2>
      </div>
    </section>
  </div>
</template>

<script>
import { authStore } from '@/store/auth'
import { getUsers, getPayments } from '../services/data-service'
import { LOCAL_STORAGE, PAYMENT_STATUS, ROLE_TYPE } from '@/constants/constants'

export default {
  name: "DashboardComponent",
  data() {
    return {
      users: [],
      payments: [],
      loggedInUser: null,
      store: authStore()
    }
  },
  beforeMount() {
    const user = localStorage.getItem(LOCAL_STORAGE.LOGGED_IN_USER)
    this.loggedInUser = user ? JSON.parse(user) : null;
  },
  async mounted() {
    this.users = await getUsers()
    this.payments = await getPayments()
    
    const role = localStorage.getItem(LOCAL_STORAGE.USER_ROLE);
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE.IS_LOGGED_IN);

    this.store.setIsLoggedIn(isLoggedIn);
    if (role) {
      this.store.setUserRole(role);
    }
  },
  computed: {
    isAdmin() {
      const userRole = localStorage.getItem(LOCAL_STORAGE.USER_ROLE)
      return userRole === ROLE_TYPE.ADMIN;
    },
    totalUsers() {
      return this.users?.length
    },
    totalPayments() {
      if(this.isAdmin){
        return this.payments.length
      }
      return this.payments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    },
    successPayments() {
      const successPayments = this.payments.filter(payment => payment.status === PAYMENT_STATUS.SUCCESS);
      if(this.isAdmin){
        return successPayments.length
      }
      return successPayments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    },
    pendingPayments() {
      const pendingPayments = this.payments.filter(payment => payment.status === PAYMENT_STATUS.PENDING);
      if(this.isAdmin){
        return pendingPayments.length
      }
      return pendingPayments.filter(payment => payment.fromUserId === this.loggedInUser?.id).length;
    },
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
.card-blue { background-color: #3b82f6; }
.card-indigo { background-color: #6366f1; }
.card-green { background-color: #22c55e; }
.card-yellow { background-color: #eab308; }
.card-red { background-color: #ef4444; }

.payment-header{
  margin: 0px;
}

.font-weight-200{
  font-weight: 400;
}

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

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;
}

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

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

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
