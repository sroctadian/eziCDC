import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { api } from './plugins/api.js'
import VJsoneditor from 'v-jsoneditor'

Vue.use(VJsoneditor)
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
