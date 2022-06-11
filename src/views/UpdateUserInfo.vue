<template>
  <Nav/>
  <div class="form-box">
    <van-cell-group inset>
      <van-field v-model="name" label="用户名" label-width="60px"/>

      <van-field label="用户头像" label-width="60px">
        <template #input>
          <van-uploader v-model="pic" max-count="1"/>
        </template>
      </van-field>
    </van-cell-group>

    <div style="margin: 20px 40px">
      <van-button
        :loading="loading"
        loading-text="处理中..."
        round
        block
        type="primary"
        @click="submit"
      >
        修改信息
      </van-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import api from '@/api/index'
import { useRouter } from 'vue-router'

export default {
  components: { Nav },
  name: 'UpdateUserInfo',
  setup () {
    const store = useStore()
    const router = useRouter()

    const { name } = store.state.userInfo
    const state = reactive({
      name,
      pic: [],
      loading: false
    })

    const submit = async () => {
      if (state.loading) return
      state.loading = true

      const { name, pic } = state
      const reg = /^[\w\u4e00-\u9fa5]+$/
      // 格式校验
      if (!reg.test(name)) {
        Toast('用户名输入错误~')
        return
      }
      if (pic.length === 0) {
        Toast('必须上传一张图片~')
        return
      }
      // 提交数据给服务器
      const { code, data } = await api.editUserInfo(name, pic[0].file)
      if (+code !== 0) {
        Toast('信息修改失败，请稍后再试~')
        return
      }
      Toast('信息修改成功~')
      store.commit('changeUserInfo', data)
      router.replace('/user')

      state.loading = false
    }

    return {
      ...toRefs(state),
      submit
    }
  }
}
</script>

<style lang="less" scoped>
  .form-box {
    margin-top: 30px;
  }
</style>
