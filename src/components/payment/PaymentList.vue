<template>
  <!-- Payments list page with filter and actions -->
  <div class="payment-list">
    <header class="header">
      <h1 style="margin: 0px;">Payments List</h1>
      <div class="header-right">
        <!-- Filter dropdown -->
        <div>
          <label for="dropdown" style="padding: 20px; font-family: Arial, Helvetica, sans-serif;">Select Filter:</label>
          <select name="dropdown" id="dropdown" class="dropdown" v-model="selectedStatus">
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        <!-- Create payment button for users -->
        <div v-if="isUser">        
          <button class="create-btn" @click="this.$router.push('/payments/new')">+ Create Payment</button>
        </div>
      </div>
    </header>

    <!-- Payments table -->
    <table class="payments-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>From User (Upi ID)</th>
          <th>To User (Upi ID)</th>
          <th>Payment Status</th>
          <th>Amount</th>
          <th v-if="isAdmin">Actions</th>
        </tr> 
      </thead>
      <tbody v-if="getFilterdPayments().length > 0">
        <!-- Display filtered payments -->
        <tr v-for="(payment, index) in getFilterdPayments()" :key="payment.id" @click="setPaymentDetailsInLocalStorage(payment.id)" style="cursor: pointer;">
          <td>{{ index + 1 }}</td>
          <td>{{ userMap[payment.fromUserId] || "Unknown" }} ({{ userUpiMap[payment.fromUserId] }})</td>
          <td>{{ userMap[payment.toUserId] || "Unknown" }} ({{ userUpiMap[payment.toUserId] }})</td>
          <td>{{ payment.status }}</td>
          <td>Rs. {{ payment.amount }}</td>
          <td v-if="isAdmin">
            <!-- Edit payment button -->
            <button class="update-btn" @click="navigateToEditPayment($event, payment.id)"> <span>🖊️</span> Update Payment</button>
          </td>
        </tr>  
      </tbody>
      <tbody v-else>
        <!-- Fallback when no payments exist -->
        <tr>
          <td colspan="5" style="text-align: center; padding: 1rem;">No Payments to show!</td>
        </tr>
      </tbody>
  </table>
  </div>
</template>

<script>
import { LOCAL_STORAGE, PAYMENT_STATUS, ROLE_TYPE } from '@/constants/constants';
import { getUsers } from '@/services/user-service';
import { getPayments } from '@/services/payment-service';

export default{
  name: "PaymentList",
  data(){
    return{
      payments : [],
      users: [],
      selectedStatus: PAYMENT_STATUS.ALL,
      isUser: false,
    }
  },

  methods:{
    // Save selected payment to localStorage and navigate
    setPaymentDetailsInLocalStorage(paymentId){
      const paymentDetails = JSON.stringify(this.payments.find(payment => payment.id === paymentId));
      localStorage.setItem(LOCAL_STORAGE.SELECTED_PAYMENT, paymentDetails);
      this.$router.push(`/payments/${paymentId}`);
    },

    // Filter payments based on user and status
    getFilterdPayments() {
      let result = this.payments;

      if (this.isUser) {
        const loggedInUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.LOGGED_IN_USER));
        result = result.filter(payment => payment.fromUserId === loggedInUser.id);
      }

      if (this.selectedStatus !== PAYMENT_STATUS.ALL) {
        result = result.filter(payment => payment.status === this.selectedStatus);
      }
      return result;
    },

    // Navigate to edit page without triggering row click
    navigateToEditPayment($event, paymentId) {
      $event.stopPropagation();
      this.$router.push(`/payments/${paymentId}/edit`);
    },
  },

  computed: {
    // Map user IDs to names
    userMap() {
      const map = {};
      this.users.forEach(user => {
        map[user.id] = user.name;
      });
      return map;
    },

    // Map user IDs to UPI IDs
    userUpiMap() {
      const map = {};
      this.users.forEach(user => {
        map[user.id] = user.upiId;
      });
      return map;
    },

    // Check if logged-in user is admin
    isAdmin(){
      return localStorage.getItem(LOCAL_STORAGE.USER_ROLE) === ROLE_TYPE.ADMIN
    }
  },

  async mounted() {
    // Determine user type and fetch data
    this.isUser = localStorage.getItem(LOCAL_STORAGE.USER_ROLE) === ROLE_TYPE.USER;
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

.update-btn {
  background-color: #3b82f6;
  border: none;
  color: rgb(15, 11, 11);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s;
}

.update-btn:hover {
  background-color: #2563eb;
}
</style>