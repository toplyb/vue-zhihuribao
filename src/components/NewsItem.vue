<template>
  <div class="news-item">
    <router-link :to='`/detail/${data.id}`'>
      <div class="text">
        <h4 class="title">{{ data.title }}</h4>
        <p class="desc">{{ data.hint }}</p>
      </div>
      <div class="img-box">
        <img v-if="data.images && data.images.length > 0" alt="" v-lazy="data.images[0]">
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'NewsItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.news-item {
  position: relative;
  padding: 15px 0;
  height: 95px;
  overflow: hidden;
  box-sizing: border-box;

  a {
    display: flex;
    justify-content: space-between;

    .text {
      margin-right: 40px;

      .title {
        font-size: 16px;
        color: #000000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .desc {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
    }

    .img-box {
      width: 65px;
      height: 65px;
      background-color: #d5d5d5;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
