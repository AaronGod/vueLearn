import request from '@/utils/request'
// 引入store
// import store from '@/store'

export const user = () => request({
  method: 'GET',
  url: '/v1_0/user'
  // headers: {
  //   // token 验证很多接口都会用 所以应该配置在请求拦截器中
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})
