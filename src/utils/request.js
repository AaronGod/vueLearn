import axios from 'axios'
// 引入store
import store from '@/store'
axios.defaults.baseURL = 'http://toutiao.itheima.net'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('拦截器配置', config)
  // 用户是否登录， 只有在用户登录后才能加上token，不然就报错
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default axios
