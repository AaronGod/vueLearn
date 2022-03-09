import request from '@/utils/request'

// 获取用户频道
export const getUserChannels = () => request({
  method: 'GET',
  url: '/v1_0/user/channels'
})

// 获取频道的文章列表
export const getChannelArticle = params => request({
  method: 'GET',
  url: '/v1_0/articles',
  params
})
