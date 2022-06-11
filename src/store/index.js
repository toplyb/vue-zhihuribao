import { createLogger, createStore } from 'vuex'
import api from '@/api'

const env = process.env.NODE_ENV

export default createStore({
  state: {
    isLogin: null,
    userInfo: null,
    collectList: null
  },
  mutations: {
    changeLoginStatus (state, status) {
      state.isLogin = status
    },

    changeUserInfo (state, user) {
      state.userInfo = user
    },

    changeCollectList (state, payload) {
      state.collectList = payload
    },

    removeCollectList (state, id) {
      if (state.collectList === null) {
        return false
      } else {
        state.collectList = state.collectList.filter(item => {
          return +item.id !== +id
        })
      }
    }
  },
  actions: {
    async changeIsLoginAsync ({ commit }) {
      let status = false
      const { code } = await api.checkLogin()
      if (+code === 0) {
        status = true
      }

      commit('changeLoginStatus', status)
    },

    async changeUserInfoAsync ({ commit }) {
      const {
        code,
        data
      } = await api.getUserInfo()
      if (+code === 0) {
        commit('changeUserInfo', data)
      }
    },

    async changeCollectListAsync ({ commit }) {
      let {
        code,
        data
      } = await api.collectList()
      if (+code !== 0) {
        data = []
      }

      commit('changeCollectList', data)
    }
  },
  modules: {},
  plugins: env === 'production' ? [] : [createLogger()]
})
