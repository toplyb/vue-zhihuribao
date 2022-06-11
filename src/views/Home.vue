<template>
  <Head :time="today"></Head>
  <section class="banner-box">
    <van-swipe v-if="bannerList.length > 0" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link class="goto-detail" :to="`/detail/${item.id}`">
          <img :src="item.image" alt="">
          <div class="mark">
            <h3 class="title">{{ item.title }}</h3>
            <span class="tip">{{ item.hint }}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>

  <van-skeleton v-if="newsList.length <= 0" title :row="5"/>

  <div v-else>
    <section class="news-box" v-for="(item,index) in newsList" :key="index">
      <van-divider v-if="index !== 0" content-position="left">{{ formatTime(item.date, '{1}月{2}日') }}</van-divider>
      <div class="news-content">
        <NewsItem v-for="news in item.stories" :key="news.id" :data="news"></NewsItem>
      </div>
    </section>
  </div>

  <div ref="loadMore" class="more" v-show="newsList.length >= 0">
    <van-loading type="spinner"/>
  </div>
</template>

<script>
import Head from '@/components/Head'
import NewsItem from '@/components/NewsItem'
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
import api from '../api/index'
import { formatTime } from '@/assets/utils'

export default {
  name: 'Home',
  components: {
    Head,
    NewsItem
  },
  setup () {
    const state = reactive({
      today: '',
      newsList: [],
      bannerList: []
    })

    const loadMore = ref(null)

    onBeforeMount(async () => {
      const {
        date,
        stories,
        top_stories: topStories
      } = await api.getNewsLatest()

      state.today = date
      state.newsList.push(Object.freeze({
        date,
        stories
      }))

      state.bannerList = Object.freeze(topStories)
    })

    onMounted(() => {
      const ob = new IntersectionObserver(async changes => {
        const item = changes[0]
        const newsList = state.newsList

        if (item.isIntersecting && newsList.length) {
          const result = await api.getNewsBefore(newsList[newsList.length - 1].date)
          newsList.push(Object.freeze(result))
        }
      })
      ob.observe(loadMore.value)
    })

    return {
      ...toRefs(state),
      formatTime,
      loadMore
    }
  }
}
</script>

<style lang="less" scoped>
  .banner-box {
    box-sizing: border-box;
    height: 375px;
    background-color: #d5d5d5;

    .van-swipe {
      height: 100%;
      background-color: #fff;

      .goto-detail {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #ffffff;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        .mark {
          position: absolute;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          padding: 10px 20px;
          width: 100%;
          height: 100px;
          background: rgba(0, 0, 0, 0.3);
          background: -webkit-linear-gradient(top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5));

          .title {
            font-size: 20px;
            line-height: 25px;
            height: 50px;
            max-height: 50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .tip {
            font-size: 12px;
          }
        }
      }

      /deep/ .van-swipe__indicators {
        left: auto;
        right: 15px;
        transform: none;

        .van-swipe__indicator--active {
          width: 15px;
          border-radius: 3px;
          background-color: #fff;
        }
      }
    }
  }

  .news-box {
    padding: 0 15px;

    .van-divider {
      margin: 5px 0;
      font-size: 12px;

      &:before {
        display: none;
      }
    }
  }

  .van-skeleton {
    padding: 20px 15px;
  }

  .more {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    background-color: #f4f4f4;
  }
</style>
