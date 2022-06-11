<template>
  <header class="header-box">
    <div class="left">
      <div class="time">
        <span>{{ showTime.day }}</span>
        <span>{{ showTime.month }}</span>
      </div>
      <h1 class="title">知乎日报</h1>
    </div>
    <router-link to="/user" class="link-btn">
      <img :src="userAvatar" alt="" />
    </router-link>
  </header>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import defaultAvatar from '@/assets/images/timg.jpg'
import { formatTime } from '@/assets/utils'
import { useStore } from 'vuex'

export default {
  name: 'Head',
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const userAvatar = computed(() => {
      const { isLogin, userInfo } = store.state
      if (isLogin && userInfo) {
        return userInfo.pic || defaultAvatar
      } else {
        return defaultAvatar
      }
    })

    const store = useStore()

    onBeforeMount(() => {
      const { isLogin, userInfo } = store.state
      if (isLogin === null) {
        store.dispatch('changeIsLoginAsync')
      }
      if (userInfo === null) {
        store.dispatch('changeUserInfoAsync')
      }
    })

    const showTime = computed(() => {
      const time = props.time || null
      const [month, day] = formatTime(time, '{1}-{2}').split('-')
      const area = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]

      return {
        month: area[month - 1],
        day
      }
    })

    return {
      userAvatar,
      showTime
    }
  }
}
</script>

<style scoped lang="less">
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  .left {
    display: flex;
    align-items: center;

    .time {
      padding-right: 15px;
      border-right: 1px solid #ddd;

      span {
        display: block;
        font-size: 20px;
        text-align: center;

        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }

    .title {
      padding-left: 10px;
      font-size: 22px;
    }
  }

  .link-btn {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
