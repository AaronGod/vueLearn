<template>
  <div class="search-page">
    <!-- 搜索框 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#3296fa" @focus="isResultShow = false" />
    </form>
    <!-- 触发搜索按钮显示reslut ，不输入时显示历史记录，输入时显示联想建议 -->
    <!-- 搜索结果 -->
    <search-results v-if="isResultShow" :search-text="searchText"></search-results>
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history :search-histories="searchHistories" v-else></search-history>

  </div>
</template>

<script>
import SearchHistory from '@/components/search/SearchHistory.vue'
import SearchResults from '@/components/search/SearchResults.vue'
import SearchSuggestion from '@/components/search/SearchSuggestion.vue'
export default {
  name: 'search-page',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: [] // 搜索的历史记录
    }
  },
  components: { SearchHistory, SearchResults, SearchSuggestion },
  methods: {
    onSearch (val) {
      console.log(val)
      this.searchText = val // 更改搜索框里的值

      // 存储搜索历史记录
      // 不要有重复历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      this.isResultShow = true // 展示搜索结果
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
