<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h1 class="title">Payment Management System</h1>

      <label for="email">Enter Email</label>
      <input type="text" id="email" v-model="email" placeholder="abhi@xyz.com" required/>

      <label for="password">Enter Password</label>
      <input type="text" id="password" v-model="password" required/>

      <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
      <button class="login-btn">Login</button>
    </form>
  </div>
</template>


<script>
import { LOCAL_STORAGE, ROLE_TYPE } from '@/constants/constants';
import { getUsers } from '@/services/dataService';
import { authStore } from '@/store/auth';

export default {
  name: "LoginComponent",
  data() {
    return {
      users: [],
      email: '',
      password: '',
      errorMessage: ''
    };
  },

  setup() {
    const store = authStore()
    return { store }
  },

  methods: {
    handleSubmit(){
      if(this.email === '' || this.password === ''){
        this.errorMessage = "All fields are required";
        return;
      }
        const user = this.users.find(user => user.email === this.email && user.password === this.password);

        if(!user){
        this.errorMessage = "Invalid Credentials";
        return;
      }

        if(user.role === ROLE_TYPE.ADMIN){
        this.store.setUserRole(ROLE_TYPE.ADMIN);
            localStorage.setItem(LOCAL_STORAGE.USER_ROLE,ROLE_TYPE.ADMIN);
      } else {
        this.store.setUserRole(ROLE_TYPE.USER);
            localStorage.setItem(LOCAL_STORAGE.USER_ROLE,ROLE_TYPE.USER);
      }

      localStorage.setItem(LOCAL_STORAGE.IS_LOGGED_IN, 'true');
      localStorage.setItem(LOCAL_STORAGE.LOGGED_IN_USER, JSON.stringify(user));
      this.$router.push('/dashboard');
    },

    checkUserLogin(){
      const isLoggedIn = localStorage.getItem(LOCAL_STORAGE.IS_LOGGED_IN);
        if(isLoggedIn === 'true'){
        this.$router.push('/dashboard');
      }
    },
  },

  async mounted() {
    this.checkUserLogin();
    this.users = await getUsers();
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a7c7e7, #d6e2f3);
  padding: 1rem;
}

.login-form {
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.6s ease;
}

.title {
  margin: 0px;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #4b5563;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  background: #f9fafb;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
  background: #ffffff;
}

.error {
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
  margin-top: -0.5rem;
}

.login-btn {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.3s ease;
  margin-top: 0.5rem;
}

.login-btn:hover {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  transform: translateY(-2px);
}

.login-btn:active {
  transform: scale(0.98);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .login-form {
    padding: 2rem 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }
}

</style>
