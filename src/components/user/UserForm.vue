<template>
  <!-- User creation form container -->
  <div class="user-form">
    <!-- Page title -->
    <h1>Add New User</h1>

    <!-- Form for entering user details -->
    <form @submit.prevent="handleSubmit">
      <!-- Input for Name -->
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="Enter user name"
        />
        <!-- Display error for name -->
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <!-- Input for Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="Enter email"
        />
        <!-- Display error for email -->
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <!-- Input for UPI ID -->
      <div class="form-group">
        <label for="upiId">UPI Id</label>
        <input
          id="upiId"
          type="text"
          v-model="form.upiId"
          placeholder="Enter UPI Id"
        />
        <!-- Display error for UPI ID -->
        <span class="error" v-if="errors.upiId">{{ errors.upiId }}</span>
      </div>

      <!-- Input for Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="text"
          v-model="form.password"
          placeholder="Enter Password"
        />
        <!-- Display error for password -->
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <!-- Form action buttons -->
      <div class="form-actions">
        <!-- Submit button -->
        <button type="submit" class="save-btn" :disabled="isLoading">
          Create
        </button>
        <!-- Cancel button -->
        <button type="button" class="cancel-btn" @click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/** Component for adding a new user */
import { getUsers, createUser } from '../../services/user-service'

export default {
  name: 'UserForm',
  data() {
    return {
      /** Form data for user inputs */
      form: {
        name: '',
        email: '',
        upiId: '',
        password: '',
      },
      /** Validation errors for form fields */
      errors: {
        name: '',
        email: '',
        upiId: '',
        password: '',  
      },
      /** Loading state during form submission */
      isLoading: false
    }
  },
  computed: {
    /** Extract userId from route if needed later */
    userId() {
      return this.$route.params.id
    },  
  },
  methods: {
    /** Validate user input fields */
    validate() {
      let valid = true
      this.errors.name = this.form.name ? '' : 'Name is required'
      this.errors.email = /\S+@\S+\.\S+/.test(this.form.email) ? '' : 'Invalid email'
      this.errors.upiId = this.form.upiId ? '' : 'UPI Id is required'
      this.errors.password = this.form.password ? '' : 'Invalid password'
      if (this.errors.name || this.errors.email || this.errors.upiId || this.errors.password) valid = false
      return valid
    },
    
    /** Handle form submission */
    async handleSubmit() {
      if (!this.validate()) return;

      /** Set loading state */
      this.isLoading = true
      try {
        /** Fetch existing users to calculate new user ID */
        const allUsers = await getUsers()
        const maxId = allUsers.length ? Math.max(...allUsers.map(user => user.id)) : 0
        /** Create new user object */
        const newUser = { id: maxId + 1, ...this.form }
        /** Call API to create user */
        await createUser(newUser)
        /** Navigate back to users list */
        this.$router.push('/users')
      } catch (err) {
        /** Log errors */
        console.error(err)
      } finally {
        /** Reset loading state */
        this.isLoading = false
      }
    },

    /** Cancel form and go back */
    cancel() {
      this.$router.push('/users')
    }
  }
}
</script>

<style scoped>
/** Container styling for user form */
.user-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/** Page title styling */
h1 { 
  margin-bottom: 1.5rem; 
  text-align: center; 
  color: #333; 
}

/** Form group layout */
.form-group { 
  display: flex; 
  flex-direction: column; 
  margin-bottom: 1rem; 
}

/** Label styling */
label { 
  margin-bottom: 0.3rem; 
  font-weight: 600; 
}

/** Input and select styling */
input, select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

/** Focus state for inputs */
input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/** Error message styling */
.error { 
  color: #ef4444; 
  font-size: 0.85rem; 
  margin-top: 0.2rem; 
}

/** Form action buttons layout */
.form-actions { 
  display: flex; 
  justify-content: space-between; 
  margin-top: 1.5rem; 
}

/** Submit button styling */
.save-btn {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/** Hover state for submit button */
.save-btn:hover { 
  background-color: #16a34a; 
}

/** Cancel button styling */
.cancel-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/** Hover state for cancel button */
.cancel-btn:hover { 
  background-color: #dc2626; 
}
</style>
