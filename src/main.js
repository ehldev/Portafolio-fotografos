import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/firebase/firebaseConfig.js'

import { BootstrapVue } from 'bootstrap-vue'

// Styles
import './assets/scss/app.scss'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// https://www.npmjs.com/package/vue2-smooth-scroll
import VueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(VueSmoothScroll)

// https://github.com/ankurk91/vue-toast-notification
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast)

// https://www.npmjs.com/package/vue-moment
const moment = require('moment')
require('moment/locale/es')
 
Vue.use(require('vue-moment'), {
    moment
})

// Primero se verifica si existe un usuario logueado para luego mostrar la app
store.dispatch('auth/authState')
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
