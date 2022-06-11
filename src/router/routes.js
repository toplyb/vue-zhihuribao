import Home from '@/views/Home'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/Detail')
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/user',
    component: () => import('@/views/UserInfo')
  },
  {
    path: '/collect',
    component: () => import('@/views/Collect')
  },
  {
    path: '/updateUser',
    component: () => import('@/views/UpdateUserInfo')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default routes
