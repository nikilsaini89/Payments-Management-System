<template>
  <!-- Show payment details if available -->
  <div v-if="paymentDetails" class="payment-detail">
    <h2>Payment Details</h2>
    <div class="detail-row">
      <span class="label">ID:</span>
      <span class="value">{{ paymentDetails.id }}</span>
    </div>
    <div class="detail-row">
      <span class="label">From :</span>
      <span class="value">{{ userUpiMap[paymentDetails.fromUserId] }}</span>
    </div>
    <div class="detail-row">
      <span class="label">To:</span>
      <span class="value">{{ userUpiMap[paymentDetails.toUserId] }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Amount:</span>
      <span class="value">₹{{ paymentDetails.amount }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Status:</span>
      <span class="value" :class="statusClass(paymentDetails.status)">
        {{ paymentDetails.status }}
      </span>
    </div>
    <div class="detail-row">
      <span class="label">Method:</span>
      <span class="value">{{ paymentDetails.method }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Reference ID:</span>
      <span class="value">{{ paymentDetails.referenceId }}</span>
    </div>
    <div class="detail-row">
      <span class="label">Timestamp:</span>
      <span class="value">{{ new Date(paymentDetails.timestamp).toLocaleString() }}</span>
    </div>
  </div>

  <!-- Fallback message if no payment is selected -->
  <div v-else class="no-data">
    <p>No payment details found.</p>
  </div>
</template>

<script>
import { LOCAL_STORAGE } from '@/constants/constants';
import { getUsers } from '@/services/user-service';

export default {
  name: "PaymentDetail",

  data() {
    return {
      // Selected payment info
      paymentDetails: null,
      // All users
      users: [],
      userMap: {},
    }
  },

  mounted: async function() {
    /** Fetch all users to map UPI IDs */
    this.users = await getUsers();
  },

  computed: {
    // Map user IDs to their UPI IDs
    userUpiMap() {
      const map = {};
      this.users.forEach(user => {
        map[user.id] = user.upiId;
      });
      return map;
    },
  },

  created() {
    /** Load selected payment from localStorage */
    const payment = localStorage.getItem(LOCAL_STORAGE.SELECTED_PAYMENT);
    this.paymentDetails =  payment ? JSON.parse(payment) : null;
  },

  methods: {
    // Return class for payment status
    statusClass(status) {
      return {
        success: status === "SUCCESS",
        pending: status === "PENDING",
        failed: status === "FAILED"
      }
    }
  }
}
</script>

<style scoped>
.payment-detail {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: Arial, Helvetica, sans-serif;
}

.payment-detail h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.6rem;
  color: #333;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #555;
}

.value {
  color: #333;
}

.success {
  color: #22c55e;
  font-weight: bold;
}

.pending {
  color: #f59e0b;
  font-weight: bold;
}

.failed {
  color: #ef4444;
  font-weight: bold;
}

.no-data {
  text-align: center;
  margin-top: 2rem;
  color: #777;
  font-size: 1.1rem;
}
</style>
