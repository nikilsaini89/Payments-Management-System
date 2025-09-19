import DashboardComponent from '../components/DashboardComponent.vue'
import UserList from '../components/user/UserList.vue'
import UserForm from '../components/user/UserForm.vue'
import PaymentList from '../components/payment/PaymentList.vue'
import PaymentDetail from '../components/payment/PaymentDetail.vue'
import PaymentForm from '../components/payment/PaymentForm.vue'
import LoginComponent from '../components/auth/LoginComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { LOCAL_STORAGE } from '@/constants/constants'

const routes = [

  { path: '/', component: LoginComponent },
  { path: '/dashboard', component: DashboardComponent },
  
  { path: '/users', component: UserList },
  { path: '/users/new', component: UserForm },            
  { path: '/users/:id/edit', component: UserForm },       

  { path: '/payments', component: PaymentList },
  { path: '/payments/new', component: PaymentForm },
  { path: '/payments/:id/edit', component: PaymentForm },    
  { path: '/payments/:id', component: PaymentDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem(LOCAL_STORAGE.IS_LOGGED_IN);

  if (authRequired && !loggedIn) {
    next('/');
  }
  else {
    next();
  }
});

export default router
