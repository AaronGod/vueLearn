import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn' // import locale
// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用中文语言包
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 定义全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
