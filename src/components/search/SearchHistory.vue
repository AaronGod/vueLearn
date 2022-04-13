<template>
  <div class="search-history">
    <van-cell title="搜索历史记录">
      <div v-if="isDeleteShow">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else slot="right-icon" name="delete-o" @click="isDeleteShow = true" />
      <!-- <template v-else #right-icon>
        <van-icon name="delete-o" @click="isDeleteShow = true" />
      </template> -->
    </van-cell>
    <van-cell v-for="(item ,index) in searchHistories" :key="index" :title="item">
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    searchHistories: {
      type: Array,
      requied: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除的显示状态
    }
  }
}
</script>

<style lang="less" scoped>
</style>
