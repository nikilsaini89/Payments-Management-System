<template>
  <!-- Header -->
  <div class="payment-list">
    <header class="header">
      <h1 style="margin: 0px;">Payments List</h1>
      <div class="header-right">
        <div>
          <label for="dropdown" style="padding: 20px; font-family: Arial, Helvetica, sans-serif;">Select Filter:</label>
          <select name="dropdown" id="dropdown" class="dropdown" v-model="selectedStatus">
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        <div>        
          <button class="create-btn" @click="this.$router.push('/payments/new')">+ Create Payment</button>
        </div>
      </div>
    </header>

    <table class="payments-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>From User Name (User ID)</th>
          <th>To User Name (User ID)</th>
          <th>Payment Status</th>
          <th>Amount</th>
        </tr> 
      </thead>
      <tbody v-if="payments.length">
        <tr v-for="(payment, index) in getFilterdPayments()" :key="payment.id" @click="setPaymentDetailsInLocalStorage(payment.id)" style="cursor: pointer;">
          <td>{{ index + 1 }}</td>
          <td>{{ userMap[payment.fromUserId] || "Unknown" }} ({{ payment.fromUserId }})</td>
          <td>{{ userMap[payment.toUserId] || "Unknown" }} ({{ payment.toUserId }})</td>
          <td>{{ payment.status }}</td>
          <td>Rs. {{ payment.amount }}</td>
        </tr>  
      </tbody>
  </table>
  </div>
</template>

<script>
import { LOCAL_STORAGE, PaymentStatus } from '@/constants/constants';
import { getPayments, getUsers } from '@/services/dataService';

export default{
  name: "PaymentList",
  data(){
    return{
      payments : [],
      users: [],
      selectedStatus: PaymentStatus.ALL
    }
  },

  methods:{
    setPaymentDetailsInLocalStorage(paymentId){
      const paymentDetails = JSON.stringify(this.payments.find(payment => payment.id === paymentId));
      localStorage.setItem(LOCAL_STORAGE.SELECTED_PAYMENT, paymentDetails);
      this.$router.push(`/payments/${paymentId}`);
    },

    getFilterdPayments() {
      if (this.selectedStatus === PaymentStatus.ALL) {
        return this.payments;
      }
      return this.payments.filter(payment => payment.status === this.selectedStatus);
    },
  },

  computed: {
    userMap() {
      const map = {};
      this.users.forEach(user => {
        map[user.id] = user.name;
      });
      return map;
    },
  },

  async beforeMount() {
    this.users = await getUsers();
    this.payments = await getPayments()
  }
}
</script>

<style scoped>
.header{
  display: flex;
  margin-bottom: 1.5rem; 
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
}


.dropdown {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.dropdown:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(64, 135, 248, 0.2);
}

.dropdown caret{
  padding: 5px;
}

.payment-list{
  padding: 1rem 2rem 2rem 2rem;
}

.payments-table {
  width: 100%;
  border-collapse: collapse;
}

.payments-table th,
.payments-table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

.payments-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.payments-table tr:nth-child(even) {
  background-color: #fafafa;
} 

.create-btn {
  margin-left: 1rem;
  padding: 0.6rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.create-btn:hover {
  background-color: #2563eb;
}

</style>