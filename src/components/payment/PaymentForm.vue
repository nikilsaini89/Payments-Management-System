


<template>
  <div class="payment-form">
    <h1>{{ isEditMode ? 'Edit Payment' : 'Add New Payment' }}</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="user">User</label>
        <select id="user" v-model="form.userId">
          <option disabled value="">-- Select User --</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <span class="error" v-if="errors.userId">{{ errors.userId }}</span>
      </div>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          id="amount"
          type="number"
          v-model="form.amount"
          placeholder="Enter amount"
        />
        <span class="error" v-if="errors.amount">{{ errors.amount }}</span>
      </div>

      <div class="form-group">
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
import { getUsers } from '@/services/dataService'
import { getPayments, getPaymentById, createPayment, updatePayment } from '@/services/dataService'

export default {
  name: 'PaymentForm',
  data() {
    return {
      form: {
        userId: '',
        amount: '',
        status: 'PENDING',
      },
      users: [],
      errors: {
        userId: '',
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
    }
  },
  async mounted() {
    this.users = await getUsers()

    if (this.isEditMode) {
      try {
        const payment = await getPaymentById(this.paymentId)
        if (payment) {
          this.form.userId = payment.userId
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
      this.errors.userId = this.form.userId ? '' : 'User is required'
      this.errors.amount = this.form.amount > 0 ? '' : 'Amount must be greater than 0'
      this.errors.status = this.form.status ? '' : 'Status is required'
      if (this.errors.userId || this.errors.amount || this.errors.status) valid = false
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
          const newPayment = { id: String(maxId + 1), ...this.form }
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