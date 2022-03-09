<template>
  <div class="article-item">
    <van-cell border>
      <!-- 插槽自定义内容 -->
      <div class="art-title van-multi-ellipsis--l2" slot="title">{{article.title}}</div>
      <!-- 一张图 -->
      <div slot="value" class="cover-right" v-if="article.cover.type === 1">
        <van-image :src="article.cover.images[0]" fit="cover" />
      </div>
      <div slot="label" class="art-label">
        <div class="art-cover" v-if="article.cover.type === 3">
          <!-- 三张图 -->
          <van-image v-for="(img, index) in article.cover.images" :key="index" class="cover-item" fit="cover" :src="img" />
        </div>
        <div class="art-info">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'article-item',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  border-bottom: 1px solid #edeff3;
  .art-title {
    font-size: 32px;
    color: #3a3a3a;
    margin-bottom: 29px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .cover-right {
    width: 232px;
    height: 146px;
  }
  .art-cover {
    display: flex;
    .cover-item {
      // flex-basis: 33.33%;
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
    margin-bottom: 30px;
  }
  .art-info {
    display: flex;
    span {
      font-size: 22px;
      margin-right: 25px;
    }
  }
}
</style>
