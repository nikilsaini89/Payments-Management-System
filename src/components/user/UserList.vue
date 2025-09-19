<template>
  <div class="user-list">
    <header class="header">
      <h1>User Management</h1>
      <button class="add-btn" @click="$router.push('/users/new')">+ Add User</button>
    </header>

    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>UPI Id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.upiId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUsers } from '@/services/dataService'

export default {
  name: "UserList",
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    this.users = await getUsers()
  }
}
</script>

<style scoped>
.user-list {
  padding: 1rem 2rem 2rem 2rem;
  
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

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

.add-btn:hover {
  background-color: #2563eb;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 0.8rem;
  text-align: left;
}

.user-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.user-table tr:nth-child(even) {
  background-color: #fafafa;
}

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

.edit-btn:hover {
  background-color: #16a34a;
}
</style>
