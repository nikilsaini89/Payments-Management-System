import { createRouter, createWebHistory } from 'vue-router'
import DashboardComponent from '../components/DashboardComponent.vue'
import UserList from '../components/user/UserList.vue'
import UserForm from '../components/user/UserForm.vue'
import PaymentList from '../components/payment/PaymentList.vue'
import PaymentDetail from '../components/payment/PaymentDetail.vue'
import PaymentForm from '../components/payment/PaymentForm.vue'

const routes = [
  { path: '/', component: DashboardComponent },

  // Users
  { path: '/users', component: UserList },
  { path: '/users/new', component: UserForm },            
  { path: '/users/:id/edit', component: UserForm },       

  // Payments
  { path: '/payments', component: PaymentList },
  { path: '/payments/new', component: PaymentForm },
  { path: '/payments/:id', component: PaymentDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
