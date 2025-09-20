


<template>
  <div class="payment-form">
    <h1>{{ isEditMode ? 'Edit Payment' : 'Add New Payment' }}</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group" v-if="!isUser">
        <label for="user">From UPI ID</label>
        <input type="text" :value="userUpiMap[form.fromUserId]" disabled/>
      </div>
      <div class="form-group">
        <label for="user">To UPI ID</label>
        <input type="text" :value="userUpiMap[form.toUserId]" :disabled="!isUser" v-if="!isUser"/>
        <select id="user" v-model="form.toUserId" v-if="isUser">
          <option disabled value="">-- Select User --</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.upiId }}
          </option>
        </select>
        <span class="error" v-if="errors.toUserId">{{ errors.toUserId }}</span>
      </div>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          id="amount"
          type="number"
          v-model="form.amount"
          placeholder="Enter amount"
          :disabled="!isUser"
        />
        <span class="error" v-if="errors.amount">{{ errors.amount }}</span>
      </div>

      <div class="form-group" v-if="!isUser">
        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
        <span class="error" v-if="errors.status">{{ errors.status }}</span>
      </div>


      <div class="form-actions">
        <button type="submit" class="save-btn" :disabled="isLoading">
          {{ isEditMode ? 'Update' : 'Create' }}
        </button>
        <button type="button" class="cancel-btn" @click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { LOCAL_STORAGE, PAYMENT_STATUS, ROLE_TYPE } from '@/constants/constants'
import { getUsers } from '@/services/data-service'
import { getPayments, getPaymentById, createPayment, updatePayment } from '@/services/data-service'

export default {
  name: 'PaymentForm',
  data() {
    return {
      form: {
        fromUserId: '',
        toUserId: '',
        amount: '',
        status: 'PENDING',
      },
      users: [],
      errors: {
        toUserId: '',
        amount: '',
        status: '',
      },
      isLoading: false,
    }
  },

  computed: {
    paymentId() {
      return this.$route.params.id
    },
    isEditMode() {
      return !!this.paymentId
    },
    isUser() {
      const userRole = localStorage.getItem(LOCAL_STORAGE.USER_ROLE);
      return userRole && userRole === ROLE_TYPE.USER
    },

    loggedInUser(){
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE.LOGGED_IN_USER));
    },

    userUpiMap() {
      const map = {}
      this.users.forEach(user => {
        map[user.id] = user.upiId
      })
      return map
    }
  },

  async mounted() {
    this.users = await getUsers()

    if (this.isEditMode) {
      try {
        const payment = await getPaymentById(this.paymentId)
        if (payment) {
          this.form.fromUserId = payment.fromUserId
          this.form.toUserId = payment.toUserId
          this.form.amount = payment.amount
          this.form.status = payment.status
        }
      } catch (err) {
        console.error(err)
        alert('Failed to load payment data')
      }
    }
  },
  methods: {
    validate() {
      let valid = true
      this.errors.toUserId = this.form.toUserId ? '' : 'User is required'
      this.errors.amount = this.form.amount > 0 ? '' : 'Amount must be greater than 0'
      if (this.errors.toUserId || this.errors.amount) valid = false
      return valid
    },

    async handleSubmit() {
      if (!this.validate()) return

      this.isLoading = true
      try {
        if (this.isEditMode) {
          await updatePayment(this.paymentId, this.form)
        } else {
          const allPayments = await getPayments()
          const maxId = allPayments.length ? Math.max(...allPayments.map(p => parseInt(p.id))) : 0
          const newPayment = { id: String(maxId + 1), ...this.form, fromUserId: this.loggedInUser.id, method: 'UPI', referenceId: this.generateTxnId(), timestamp: new Date().toISOString(), status: PAYMENT_STATUS.PENDING }
          await createPayment(newPayment)
        }
        this.$router.push('/payments')
      } catch (err) {
        console.error(err)
        alert('Failed to save payment')
      } finally {
        this.isLoading = false
      }
    },

    cancel() {
      this.$router.push('/payments')
    },

    generateTxnId() {
      const prefix = "TXN";
      const randomNum = Math.floor(100000 + Math.random() * 900000); 
      return `${prefix}${randomNum}`;
    }
  }
}
</script>

<style scoped>
.payment-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}
h1 { margin-bottom: 1.5rem; text-align: center; color: #333; }
.form-group { display: flex; flex-direction: column; margin-bottom: 1rem; }
label { margin-bottom: 0.3rem; font-weight: 600; }
input, select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}
input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.error { color: #ef4444; font-size: 0.85rem; margin-top: 0.2rem; }
.form-actions { display: flex; justify-content: space-between; margin-top: 1.5rem; }
.save-btn {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.save-btn:hover { background-color: #16a34a; }
.cancel-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.cancel-btn:hover { background-color: #dc2626; }
</style>