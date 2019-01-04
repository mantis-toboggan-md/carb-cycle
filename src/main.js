// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Store from './store.js'
const store = new Store()

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.use(VueMaterial)
Vue.use(Vuex)

// const store = new Vuex.Store({
//   modules: {
//     activityStore
//   }
// })


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
