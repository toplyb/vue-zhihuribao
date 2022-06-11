<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onBack"
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

</style>
