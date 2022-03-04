import request from '@/utils/request'

export const getLyric = id => request({
    url: `/lyric?id=${id}`,
    method: 'GET'
})

export const getSong = params => request({
    url: '/song/detail',
    params
})