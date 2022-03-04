import Vue from 'vue'
import App from './App.vue'


// 样式
import '@/mobile/flexible' // 适配
import '@/styles/reset.css'

import router from '@/router'

import {
    Tabbar,
    TabbarItem,
    NavBar,
    Col,
    Image as VanImage,
    Cell,
    Row,
    Icon,
    Search,
    List,
    Toast,
} from 'vant'

Vue.use(Toast)
Vue.use(List)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(VanImage)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.config.productionTip = false

// webpack 配合postcss postcss-pxtorem@5.1.1 要和当前脚手架兼容插件 
// 下载包
// postcss.config.js 配置
// vant组件库自动适配
// 自动将所有px转成rem

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')