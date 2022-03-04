import request from '@/utils/request'

export const reqHotList = params => request({
    url: '/search/hot',
    params
})

export const resultHotList = params => request({
    url: '/cloudsearch',
    params
})