<template>
  <div class="user-form">
    <h1>{{ isEditMode ? 'Edit User' : 'Add New User' }}</h1>

    <form @submit.prevent="handleSubmit">
      <!-- Name -->
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="Enter user name"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="Enter email"
        />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <!-- Role -->
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option disabled value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <span class="error" v-if="errors.role">{{ errors.role }}</span>
      </div>

      <!-- Buttons -->
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
import { getUsers, getUserById, createUser, updateUser } from '../../services/dataService'

export default {
  name: 'UserForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        role: ''
      },
      errors: {
        name: '',
        email: '',
        role: ''
      },
      isLoading: false
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
    isEditMode() {
      return !!this.userId
    }
  },
  async mounted() {
    if (this.isEditMode) {
      try {
        const user = await getUserById(this.userId)
        if (user) {
          this.form.name = user.name
          this.form.email = user.email
          this.form.role = user.role
        }
      } catch (err) {
        console.error(err)
        alert('Failed to load user data')
      }
    }
  },
  methods: {
    validate() {
      let valid = true
      this.errors.name = this.form.name ? '' : 'Name is required'
      this.errors.email = /\S+@\S+\.\S+/.test(this.form.email) ? '' : 'Invalid email'
      this.errors.role = this.form.role ? '' : 'Role is required'
      if (this.errors.name || this.errors.email || this.errors.role) valid = false
      return valid
    },
    
    async handleSubmit() {
    if (!this.validate()) return

    this.isLoading = true
    try {
        if (this.isEditMode) {
        await updateUser(this.userId, this.form)
        } else {
        // Fetch all users to calculate max ID
        const allUsers = await getUsers()
        const maxId = allUsers.length ? Math.max(...allUsers.map(u => u.id)) : 0
        const newUser = { id: maxId + 1, ...this.form }
        await createUser(newUser)
        }
        this.$router.push('/users')
    } catch (err) {
        console.error(err)
    } finally {
        this.isLoading = false
    }
    },

    cancel() {
      this.$router.push('/users')
    }
  }
}
</script>

<style scoped>
.user-form {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
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
  transition: background 0.3s;
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
  transition: background 0.3s;
}
.cancel-btn:hover { background-color: #dc2626; }
</style>
