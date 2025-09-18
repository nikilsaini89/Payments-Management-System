<template>
  <div class="dashboard">

    <header class="dashboard-header">
      <h1 class="payment-header">Dashboard</h1>
      <p class="subtitle">Overview of users and payments</p>
    </header>

    <section class="stats-cards">
      <div class="card card-blue">
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
      <div class="action-card" @click="$router.push('/users')">
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
import { getUsers, getPayments } from '../services/dataService'
import { PaymentStatus } from '@/constants/constants'

export default {
  name: "DashboardComponent",
  data() {
    return {
      users: [],
      payments: []
    }
  },
  async mounted() {
    this.users = await getUsers()
    this.payments = await getPayments()
  },
  computed: {
    totalUsers() {
      return this.users.length
    },
    totalPayments() {
      return this.payments.length
    },
    successPayments() {
      return this.payments.filter(p => p.status === PaymentStatus.SUCCESS).length
    },
    pendingPayments() {
      return this.payments.filter(p => p.status === PaymentStatus.PENDING).length
    },
    failedPayments() {
      return this.payments.filter(p => p.status === PaymentStatus.FAILED).length
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
