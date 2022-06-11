import axios from '@/api/http'

export default {
  // 获取今日新闻
  getNewsLatest () {
    return axios.get('/api/news_latest')
  },

  // 获取往日新闻
  getNewsBefore (time) {
    return axios.get('/api/news_before', {
      params: {
        time
      }
    })
  },

  // 获取详情
  getNewsDetail (id) {
    return axios.get('/api/news_info', {
      params: {
        id
      }
    })
  },

  // 获取评论数
  getNewsCommentCount (id) {
    return axios.get('/api/story_extra', {
      params: {
        id
      }
    })
  },

  // 登录
  login (phone, code) {
    return axios.post('/api/login', {
      phone,
      code
    })
  },

  // 获取手机验证码
  phoneCode (phone) {
    return axios.post('/api/phone_code', {
      phone
    })
  },

  // 检测是否登录
  checkLogin () {
    return axios.get('/api/check_login')
  },

  // 获取用户信息
  getUserInfo () {
    return axios.get('/api/user_info')
  },

  // 修改用户信息
  editUserInfo (username, file) {
    const fm = new FormData()
    fm.append('username', username)
    fm.append('file', file)
    return axios.post('/api/user_update', fm)
  },

  // 收藏
  collect (newsId) {
    return axios.post('/api/store', {
      newsId
    })
  },

  // 移除收藏
  removeCollect (id) {
    return axios.get('/api/store_remove', {
      params: {
        id
      }
    })
  },

  // 收藏列表
  collectList () {
    return axios.get('/api/store_list')
  }
}
