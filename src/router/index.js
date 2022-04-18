import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import localizeFilter from '../filters/localize.filter'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Route_Home',
    },
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'auth', title: 'Route_Login'},
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'auth', title: 'Route_Register'},
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main', auth: true, title: 'Route_Categories'},
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {layout: 'main', auth: true, title: 'Route_Detail'},
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main', auth: true, title: 'Route_History'},
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main', auth: true, title: 'Route_Planning'},
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: {layout: 'main', auth: true, title: 'Route_NewRecord'},
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main', auth: true, title: 'Route_Profile'},
    component: () => import('../views/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${localizeFilter(to.meta.title)}`

  const currentUser = localStorage.getItem('userUid')
  const requireAuth = to.matched.some((route) => route.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
