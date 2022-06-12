<template>
  <div>
    <Nav></Nav>

    <van-form @submit="onSubmit" ref="formRef">
      <van-cell-group inset>
        <van-field
          v-model="mobile"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' },{pattern: regPhone, message: '手机号格式不对'}]"
        >
          <template #button>
            <van-button class="send-code-button" :disabled="!enable" type="primary" size="small" @click="sendCode">
              {{ enable ? '发送验证码' : `${time}s` }}
            </van-button>
          </template>
        </van-field>

        <van-field
          v-model="code"
          name="code"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请输入验证码' },{pattern: regCode, message: '验证码格式不对'}]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { ref } from 'vue'
import Nav from '@/components/Nav'
import api from '@/api'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Login',
  components: { Nav },
  setup () {
    const code = ref(null)
    const mobile = ref(null)
    const formRef = ref(null)
    const enable = ref(true)
    const time = ref(60)
    const regPhone = /^1\d{10}$/
    const regCode = /^\d{6}$/

    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const onSubmit = async () => {
      const {
        code: resultCode,
        token
      } = await api.login(mobile.value, code.value)

      if (+resultCode !== 0) {
        Toast('登录失败, 请稍后重试')
        formRef.value.resetValidation()
        code.value = ''
        return false
      }
      localStorage.setItem('token', token)
      store.commit('changeLoginStatus', true)
      store.dispatch('changeUserInfoAsync')
      store.commit('changeCollectList', null)
      Toast('登录成功')
      const from = route.query.from
      if (from) {
        router.replace(`/${from}`)
        return
      }
      router.replace('/user')
    }

    const sendCode = async () => {
      try {
        await formRef.value.validate('phone')
        const { code: statusCode, phoneCode } = await api.phoneCode(mobile.value)
        if (+statusCode !== 0) {
          Toast('当前网络繁忙, 请稍后再试')
          return false
        }

        code.value = phoneCode
        enable.value = false
        const timer = setInterval(() => {
          time.value--
          if (time.value === 0) {
            clearInterval(timer)
            time.value = 60
            enable.value = true
            return false
          }
        }, 1000)
      } catch (err) {
      }
    }

    return {
      onSubmit,
      code,
      mobile,
      regPhone,
      regCode,
      formRef,
      sendCode,
      enable,
      time
    }
  }
}
</script>

<style lang="less" scoped>
  .send-code-button {
    width: 78px;
  }
</style>
