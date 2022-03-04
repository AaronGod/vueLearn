// api 文件夹下的各个请求模块js 都统一来到index.js再向外导出
import {
    recommendMusic,
    requestNewList
} from "./Home";

import {
    reqHotList,
    resultHotList
} from './Search'

import {
    getLyric,
    getSong
} from './Play'

// 请求推荐歌单的方法导出
export const recommendMusicApi = recommendMusic
    // 新歌
export const requestNewListApi = requestNewList
    // 热搜关键词
export const requestHotListApi = reqHotList
export const resultHotListApi = resultHotList

// 歌曲
export const getLyricApi = getLyric
export const getSongApi = getSong