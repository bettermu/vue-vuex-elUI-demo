// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui组件和css样式
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vuex
import Vuex from 'vuex'
import store from './vuex/store'

//引入mock并初始化
//import Mock from './data/mock'
//Mock.init()

// use
Vue.use(ElementUi)
Vue.use(Vuex)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//路由导航判断
router.beforeEach((to, from, next) => {
  //如果是去登录或者去注册，就移除user
  if (to.path === '/login' || to.path === '/regin') {
    sessionStorage.removeItem('user')
    store.dispatch('logout')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))

  if (!user && (to.path === '/manager/my' || to.path === '/manager/send' || to.path === '/manager/history')) {

    next({ path: '/login' })
  } else {
    next()
  }
})
