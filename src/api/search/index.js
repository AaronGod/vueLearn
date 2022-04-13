import request from '@/utils/request'

export const searchSuggest = params => request({
  method: 'GET',
  url: '/v1_0/suggestion',
  params
})

// 获取搜索结果
export const searchResult = params => request({
  method: 'GET',
  url: ' /v1_0/search',
  params
})
