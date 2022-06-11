import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '@/store'
import api from '@/api'
import { Toast } from 'vant'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const arr = ['/user', '/collect', '/updateUser']

  if (arr.includes(to.path)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
      return
    } else if (isLogin === false) {
      Toast('请先登录账号')
      next('/login')
      return
    } else if (isLogin === null) {
      try {
        const { code, data } = await api.checkLogin()
        if (+code !== 0) {
          Toast('请先登录账号')
          next('/login')
          return
        }
        store.commit('changeUserInfo', data)
        store.commit('changeLoginStatus', true)
        next()
      } catch (err) {
      }
    }
  }
  next()
})

export default router
