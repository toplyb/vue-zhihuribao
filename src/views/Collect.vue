<template>
  <Nav title="收藏列表"/>
  <van-empty description="暂无收藏" v-if="storeList.length === 0"/>
  <div v-else>
    <van-swipe-cell v-for="item in storeList" :key="item.id">
      <div class="con">
        <CollectItem :data="{ ...item.news, images: [item.news.image], hint: '' }" ></CollectItem>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="removeHandle(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import api from '@/api/index'
import { Toast } from 'vant'
import CollectItem from '@/components/CollectItem'

export default {
  components: { CollectItem, Nav },
  name: 'Collect',
  setup () {
    const store = useStore()
    const storeList = computed(() => {
      return store.state.collectList || []
    })
    onBeforeMount(() => {
      if (store.state.collectList === null) {
        store.dispatch('changeCollectListAsync')
      }
    })

    const removeHandle = async (id) => {
      const { code } = await api.removeCollect(id)
      if (+code !== 0) {
        Toast('删除失败~')
        return
      }
      Toast('删除成功~')
      store.commit('removeCollectList', id)
    }

    return {
      storeList,
      removeHandle
    }
  }
}
</script>

<style lang="less" scoped>
  .van-swipe-cell {
    .con {
      padding: 0 15px;
    }

    /deep/ .van-swipe-cell__right {
      .van-button {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
