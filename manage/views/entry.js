import 'babel-polyfill'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import Vuex from 'vuex'

import 'modules/bus'
import 'modules/to'

/**
 *全局注册常用组件
 */
require('modules/register-global-comps')

import App from './App.vue'

//注册过滤器
import filter from 'modules/filter'

//注册自定义指令
require('directives/imgerr')

/**
 *引入页面store
 */
import indexStore from 'pages/index/store'
import contentStore from 'pages/content/store'
import contentInputStore from 'pages/content_input/store'
/**
 *注册路由
 */
import router from 'modules/router'

Vue.use(Vuex)

var allStore = {
  modules: {
    index: indexStore,
    content:contentStore,
    content_input:contentInputStore
  }
}

const store = new Vuex.Store(allStore)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})