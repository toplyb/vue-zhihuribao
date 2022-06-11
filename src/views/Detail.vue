<template>

  <van-skeleton v-if="newsDetail === null" title :row="5"/>
  <div class="content" v-else v-html="newsDetail.body">

  </div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="back"></van-icon>
    <van-icon name="comment-o" :badge="comments" color="#ccc"/>
    <van-icon name="good-job-o" :badge="like" color="#ccc"></van-icon>
    <van-icon @click="collect" name="star-o" :color="isCollect ? '#1989fa' : '#000'"></van-icon>
    <van-icon name="share-o" color="#ccc"></van-icon>
  </div>
</template>

<script>
import { computed, onBeforeMount, onBeforeUnmount, onUpdated, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '../api/index'
import { Toast } from 'vant'

export default {
  name: 'Detail',
  setup () {
    const state = reactive({
      comments: 0,
      like: 0,
      newsDetail: null
    })

    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const isCollect = computed(() => {
      let {
        isLogin,
        collectList
      } = store.state
      if (isLogin) {
        if (!Array.isArray(collectList)) {
          collectList = []
        }
        return collectList.some(item => {
          return +item.news.id === +route.params.id
        })
      } else {
        return false
      }
    })

    const collect = async () => {
      if (!store.state.isLogin) {
        Toast('请先登录账号')
        router.push({
          path: '/login',
          query: {
            from: `detail/${route.params.id}`
          }
        })
        return
      }

      if (isCollect.value) {
        return false
      }

      const { code } = await api.collect(route.params.id)
      if (+code !== 0) {
        Toast('收藏失败, 请稍后重试')
        return
      }
      Toast('收藏成功')
      store.dispatch('changeCollectListAsync')
    }

    onBeforeMount(async () => {
      const {
        userInfo,
        collectList
      } = store.state
      if (store.state.isLogin === null) {
        await store.dispatch('changeIsLoginAsync')
      }

      if (store.state.isLogin) {
        if (userInfo === null) {
          store.dispatch('changeUserInfoAsync')
        }
        if (collectList === null) {
          store.dispatch('changeCollectListAsync')
        }
      }
    })

    const back = () => {
      router.back()
    }

    onBeforeMount(async () => {
      const id = route.params.id
      state.newsDetail = await api.getNewsDetail(id)

      // 动态创建 css
      const link = document.createElement('link')
      link.id = 'link'
      link.rel = 'stylesheet'
      link.href = state.newsDetail.css[0]
      document.head.appendChild(link)

      const {
        popularity,
        comments
      } = await api.getNewsCommentCount(id)
      state.comments = comments
      state.like = popularity
    })

    onBeforeUnmount(() => {
      const link = document.getElementById('link')
      if (!link) {
        return false
      }
      document.head.removeChild(link)
    })

    onUpdated(() => {
      const imgDom = document.querySelector('.img-place-holder')
      const headline = document.querySelector('.headline')
      if (headline) {
        const image = state.newsDetail.image
        if (imgDom && imgDom.innerHTML.trim() === '' && image) {
          imgDom.innerHTML += `<img src="${image}">`
        }
        headline.innerHTML += `<h3>${state.newsDetail.title}</h3>`
      }
    })

    return {
      back,
      ...toRefs(state),
      isCollect,
      collect
    }
  }
}
</script>

<style lang="less" scoped>

  .van-skeleton {
    padding: 30px 15px;
  }

  .content {
    background-color: #fff;
    padding-bottom: 50px;
    margin: 0;

    /deep/ .headline {
      position: relative;

      h3 {
        width: 100%;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.4);
        background: -webkit-linear-gradient(top,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.6));
        padding: 10px 20px;
        font-size: 20px;
        box-sizing: border-box;

      }
    }

    /deep/ .img-place-holder {
      height: 375px;
      overflow: hidden;

      img {
        width: 100%;
        min-height: 100%;
        margin: 0;
      }
    }
  }

  .nav-box {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    position: fixed;
    bottom: 0;
    left: 0;

    .van-icon-arrow-left {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        right: -15px;
        width: 1px;
        height: 100%;
        background-color: #d5d5d5;
      }
    }

    /deep/ .van-badge {
      background-color: transparent;
      color: #000000;
      border: none;
    }

    .van-icon-comment-o {
      /deep/ .van-badge {
        right: -10px;
      }
    }

    .van-icon-good-job-o {
      /deep/ .van-badge {
        right: -7px;
      }
    }
  }
</style>
