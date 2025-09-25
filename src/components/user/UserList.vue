<template>
  <!-- Container for the user management page -->
  <div class="user-list">
    <!-- Header section with title and add user button -->
    <header class="header">
      <!-- Page title -->
      <h1>User Management</h1>
      <!-- Button to navigate to create new user -->
      <button class="add-btn" @click="$router.push('/users/new')">+ Add User</button>
    </header>

    <!-- Table displaying list of users -->
    <table class="user-table">
      <!-- Table header -->
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>UPI Id</th>
          <!-- Actions column visible only to admin -->
          <th v-if="isAdmin">Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <!-- Loop through users to display each row -->
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.upiId }}</td>
          <!-- Delete button only visible to admin -->
          <td v-if="isAdmin">
            <button class="edit-btn" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/** Import required services for users */
import { getUsers, deleteUserById } from '@/services/user-service'
/** Import constants for role checking */
import { LOCAL_STORAGE, ROLE_TYPE } from '@/constants/constants'

export default {
  /** Component name */
  name: "UserList",
  data() {
    return {
      /** Array to hold fetched users */
      users: []
    }
  },
  computed: {
    /** Check if current user is admin */
    isAdmin() {
      const role = localStorage.getItem(LOCAL_STORAGE.USER_ROLE)
      return role === ROLE_TYPE.ADMIN
    }
  },
  async mounted() {
    /** Fetch users when component mounts */
    this.users = await getUsers()
  },
  methods: {
    /** Delete a user by ID */
    async deleteUser(id) {
      if (!confirm('Are you sure you want to delete this user?')) return;
      try {
        /** Call API to delete user */
        await deleteUserById(id);
        /** Refresh the users list after deletion */
        this.users = await getUsers();
        alert('User deleted successfully');
      } catch (err) {
        /** Log any errors during deletion */
        console.error('Failed to delete user', err)
      }
    }
  }
}
</script>

<style scoped>
/** Container padding */
.user-list {
  padding: 1rem 2rem 2rem 2rem;
}

/** Header layout */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/** Header title style */
.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

/** Add user button styling */
.add-btn {
  background-color: #3b82f6;
  border: none;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s;
}

/** Hover effect for add button */
.add-btn:hover {
  background-color: #2563eb;
}

/** Table styling */
.user-table {
  width: 100%;
  border-collapse: collapse;
}

/** Table cell styling */
.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

/** Table header background */
.user-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

/** Zebra striping for table rows */
.user-table tr:nth-child(even) {
  background-color: #fafafa;
}

/** Delete button styling */
.edit-btn {
  background-color: #22c55e;
  border: none;
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.3s;
}

/** Hover effect for delete button */
.edit-btn:hover {
  background-color: #16a34a;
}
</style>
