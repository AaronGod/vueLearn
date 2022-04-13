<template>
  <div class="search-suggestion">
    <van-cell title="联想建议" />
    <van-cell v-for="(item,index) in suggestsList" :key="index" icon="search" @click="$emit('search',item)">
      <template #title>
        <div v-html="highlight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestApi } from '@/api'
import { debounce } from 'loadsh'

export default {
  name: 'search-suggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestsList: [] // 联想建议列表
    }
  },
  watch: {
    searchText: {
      // 加上防抖
      handler: debounce(function (val) {
        // console.log(val)
        this.getSearchSuggest(val)
      }, 500),
      // handler (val) {
      //   this.getSearchSuggest(val)
      // },
      // 该回调函数会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    async getSearchSuggest (q) {
      try {
        q = q.slice(0, 1) // 联想只取首字符请求
        const { data: { data: { options } } } = await getSearchSuggestApi({ q })
        this.suggestsList = options
      } catch (error) {
        this.$toast('数据请求失败，请稍后再试')
      }
    },
    // 高亮字符串
    highlight (text) {
      // 动态创建正则表达式，需要通过构造函数来
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="highlight">${this.searchText}</span>`)
    },
    // 自定义防抖函数
    debounce_time (fn, delay) {
      let timer = null
      return function () {
        if (timer) clearTimeout(timer) // 单位时间内再次触发就清除计时器 重新计时
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, delay)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/.highlight {
    // 需要在这里加deep
    color: red;
  }
}
</style>
