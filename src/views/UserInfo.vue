<template>
  <Nav/>
  <div class="base-info" v-if="userInfo">
    <img :src="userInfo.pic" alt="" @click="$router.push('/updateUser')"/>
    <p>{{ userInfo.name }}</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link url="#/collect"/>
    <van-cell title="退出登录" @click="logout"/>
  </van-cell-group>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { computed, onBeforeMount } from 'vue'

export default {
  components: { Nav },
  name: 'UserInfo',
  setup () {
    const router = useRouter()
    const store = useStore()

    const userInfo = computed(() => {
      const {
        isLogin,
        userInfo
      } = store.state
      if (isLogin && userInfo) {
        return userInfo
      }
      return null
    })
    onBeforeMount(() => {
      const { isLogin, userInfo } = store.state
      if (isLogin === null) store.dispatch('changeIsLoginAsync')
      if (userInfo === null) store.dispatch('changeUserInfo')
    })

    const logout = () => {
      Toast('您已经安全退出~')
      localStorage.removeItem('token')
      store.commit('changeLoginStatus', null)
      store.commit('changeUserInfo', null)
      store.commit('changeCollectList', null)
      router.replace('/login')
    }

    return {
      userInfo,
      logout
    }
  }
}
</script>

<style lang="less" scoped>
  .base-info {
    box-sizing: border-box;
    margin: 20px 0;

    img {
      display: block;
      margin: 0 auto;
      width: 86px;
      height: 86px;
      border-radius: 50%;
    }

    p {
      line-height: 50px;
      font-size: 18px;
      text-align: center;
    }
  }
</style>
