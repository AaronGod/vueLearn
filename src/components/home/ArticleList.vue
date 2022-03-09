<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh" :success-text="successTestxt" :success-duration="1500">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <ArticleItem v-for="(item,index) in list" :key="index" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelArticleApi } from '@/api'
import ArticleItem from '@/components/home/ArticleItem.vue'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: { ArticleItem },
  data () {
    return {
      list: [],
      loading: false, // 加载更多的 loading 状态
      finished: false, // 是否加载结束
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 加载是否失败
      refreshLoading: false, // 下拉刷新加载中
      successTestxt: ''
    }
  },
  name: 'article-list',
  created () {
    // this.loadArticles()
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data: { data } } = await getChannelArticleApi({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data
        this.list.push(...results)
        // console.log(results)
        // 加载中状态结束
        this.loading = false
        // this.finished = true
        // 判断是否加载结束
        if (results.length) {
          // 更新获取下一页的时间戳
          this.timestamp = data.pre_timestamp
        } else {
          // 没有数据了 设置加载状态结束，不再触发加载
          this.finished = true
        }
      } catch (error) {
        this.loading = false // 关闭loading
        this.error = true // 开启错误提示
        console.log('获取文章列表失败')
      }
    },
    async onRefresh () {
      try {
        const { data: { data } } = await getChannelArticleApi({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data
        // if(results[0].id)
        // 这里应该剔除id重复的数据在追加
        this.list.unshift(...results)
        this.successTestxt = `刷新成功，更新了${results.length}条数据`
        this.refreshLoading = false // 关闭loading 状态
      } catch (error) {
        console.log(error)
        this.refreshLoading = false // 关闭loading 状态
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  padding-top: 174px;
  // height: 1062px; 必须使用vh
  height: 84vh;
  overflow-y: scroll;
}
</style>
