// 文件名尽量和模块页面文件名统一  方便查找
import request from '@/utils/request'

// 封装请求推荐歌单函数
export const recommendMusic = params => request({
    // method 服务器会自动处理
    url: '/personalized',
    params // 传入的参数 { limit:20 }
    // 将来外面可能传入的params的值  简写  params:params
})

// 请求最新歌单
export const requestNewList = params => request({
    url: '/personalized/newsong',
    params
})