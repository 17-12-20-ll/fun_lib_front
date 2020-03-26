import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import store from './store'
import * as ajax from '@/api' // 引入axios的 ajax方法
import './assets/scss/element-variables.scss'  // 修改主题

// 把ajax挂载到全局
Vue.prototype.$http = ajax
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(codemirror)
const whiteList = ['/login']
// 配置全局导航守卫
router.beforeEach(async (to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const token = localStorage.getItem('token')
  if (token) {
    // 还保存有上次的token
    // 解析token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const login_flag = store.getters.isLogin
      if (!login_flag) {
        await store.dispatch('get_login_info')
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
