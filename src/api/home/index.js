import request from '@/utils/request'

// 获取用户频道
export const getUserChannels = () => request({
  method: 'GET',
  url: '/v1_0/user/channels'
})

// 获取所有频道
export const getAllChannels = () => request({
  method: 'GET',
  url: '/v1_0/channels'
})

// 获取频道的文章列表
export const getChannelArticle = params => request({
  method: 'GET',
  url: '/v1_0/articles',
  params
})

// 增加用户频道
export const addUserChannels = (channel) => request({
  method: 'PATCH',
  url: '/v1_0/user/channels',
  data: {
    channels: [channel]
  }
})

// 删除用户频道
export const delateUserChannels = (channelId) => request({
  method: 'DELETE',
  url: `/v1_0/user/channels/${channelId}`
})
