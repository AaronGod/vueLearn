<template>
  <div class="search-results">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="加载失败，点击重新加载">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'search-results',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      params: { // 请求参数
        page: 1, // 第几页
        per_page: 20 // 每页数据条数
      }
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 1. 请求获取数据
      // 2. 将数据添加到数组列表中
      // 3. 将本次加载中的loading关闭
      // 4. 判断是否还有数据
      // 有，则更新获取下一个数据的页面
      // 没有 则加载状态finished 设置为结束

      try {
        const { data } = await getSearchResultApi({
          ...this.params,
          q: this.searchText
        })
        if (!data) return

        const { results } = data.data

        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }

      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style>
</style>
