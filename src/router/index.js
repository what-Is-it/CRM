import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main'},
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'auth'},
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main'},
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {layout: 'main'},
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main'},
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main'},
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main'},
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main'},
    component: () => import('../views/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
