<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-title" fixed>
      <template #title>
        <van-button round class="btn-search" type="info" size="small">
          <template #icon>
            <van-icon class="search-icon" name="search" />
          </template>
          <span class="text">搜索</span>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 标签页 tab -->
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab v-for="obj in channels" :key="obj.id" :title="obj.name">
        <ArticleList :channel="obj" />
      </van-tab>
      <!-- 因为固定定位  导致内容被遮挡了 所以增加一个占位符使其大小等于右侧按钮大小 -->
      <div slot="nav-left" class="placeholder"></div>
      <template #nav-right>
        <div class="btn-hamburger">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsApi } from '@/api'
import ArticleList from '@/components/home/ArticleList.vue'
export default {
  name: 'home-page',
  data () {
    return {
      active: 0,
      channels: [] // 用户所有频道
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () { // 获取频道数据
      try {
        const { data: { data: { channels } } } = await getUserChannelsApi()
        // console.log(channels)
        this.channels = channels
      } catch (error) {
        console.log('请求失败', error)
        this.$toast('获取用户频道失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  /deep/.page-nav-title {
    .van-nav-bar__title {
      max-width: unset;
    }
    .btn-search {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      .search-icon {
        color: #fff;
        font-size: 32px;
        position: relative;
        top: 3px;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 2;
      .van-tab {
        width: 190px;
        border-right: 1px solid #edeff3;
        .van-tab__text {
          font-size: 28px;
          color: #777;
        }
      }
      .van-tab--active {
        .van-tab__text {
          // font-size: 30px;
          color: #333;
        }
      }
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 39px;
      }
      .placeholder {
        width: 66px;
        height: 82px;
        order: 100; // 排在最后
        flex-shrink: 0; // 不参与剩余空间计算  即使空间不够也不缩小
      }
      .btn-hamburger {
        position: fixed;
        right: 0;
        width: 66px;
        height: 82px;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        opacity: 0.9;
        i.toutiao {
          font-size: 33px;
        }
        &::before {
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 82px;
          background-image: url("~@/assets/gradient-gray-line.png");
          background-repeat: no-repeat;
          background-size: contain; // 长边填充
          background-position: center;
        }
      }
    }
  }
}
</style>
