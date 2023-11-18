import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/pages/auth/Login.vue'
import Register from '../views/pages/auth/Register.vue'
import Deposit from '../views/pages/deposit/Deposit.vue'
import Withdraw from '../views/pages/withdraw/Withdraw.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/withdrawal',
      name: 'withdraw',
      component: Withdraw
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !localStorage.getItem('token')) next({ name: 'login' })
  else next()
})

export default router
