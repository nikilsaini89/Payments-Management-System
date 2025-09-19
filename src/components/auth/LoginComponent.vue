<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="email">Enter Email</label>
            <input type="text" id="email" v-model="email" placeholder="abhi@xyz.com" required/>
            
            <label for="password">Enter Password</label>
            <input type="text" id="password" v-model="password" required/>

            <span v-if="errorMessage">{{ errorMessage }}</span>
            <button>Login</button>
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

<style>
</style>