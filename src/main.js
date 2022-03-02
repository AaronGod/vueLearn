import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://www.escook.cn'
Vue.prototype.$axios = axios


new Vue({
    render: h => h(App),
}).$mount('#app')