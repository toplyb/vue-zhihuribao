import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant, { Lazyload } from 'vant'

import './assets/css/reset.min.css'
import 'amfe-flexible'
import 'vant/lib/index.css'
import { handleMaxWidth } from '@/assets/utils'

// 处理最大宽度
handleMaxWidth()

window.addEventListener('resize', handleMaxWidth)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(Lazyload)
app.use(Vant)
app.mount('#app')
