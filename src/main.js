import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
// 使用版本4不是这样写的

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// 引入页面组件
import TabBar from '@/views/tabbar/index'
import BuyCar from '@/views/BuyCard'



Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.escook.cn'
Vue.prototype.$axios = axios

// 使用vue-router
Vue.use(VueRouter)

// 定义路由映射规则
const routes = [{
        path: '/buycar',
        component: BuyCar
    },
    {
        path: '/tabbar',
        component: TabBar
    }
]

// 创建vue-router实例 传入routes
const router = new VueRouter({
    routes
})




new Vue({
    router, // 关联到vue实例上
    render: h => h(App),
}).$mount('#app')