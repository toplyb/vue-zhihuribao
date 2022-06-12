<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onBack"
    class="my-nav-bar"
  />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Nav',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    const router = useRouter()
    const onBack = () => {
      router.back()
    }
    return {
      onBack
    }
  }
}
</script>

<style scoped lang="less">
  .my-nav-bar {
    margin-bottom: 30px;
    /deep/ .van-icon, /deep/.van-nav-bar__text {
      color: #666;
    }
  }
</style>
