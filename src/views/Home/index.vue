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
        <div class="btn-hamburger" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup ref="channels_popup" v-model="isChannelShow" position="bottom" closeable close-icon-position="top-left" round :style="{ height: '100%' }">
      <!-- 频道编辑 -->
      <ChannelEdit :channels="channels" :activeIndex="active" @addItem="addMyChannel" @removeItem="removeChannel" @switchActive="changeHighlight" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsApi, addUserChannelsApi, delateUserChannelsApi } from '@/api'
import ArticleList from '@/components/home/ArticleList.vue'
import ChannelEdit from '@/components/home/ChannelEdit.vue'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'home-page',
  data () {
    return {
      active: 0,
      channels: [], // 用户所有频道
      isChannelShow: false // 弹出层显示状态
    }
  },
  components: {
    ArticleList, ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () { // 获取频道数据
      if (this.user) { // 登录状态
        try {
          const { data: { data: { channels } } } = await getUserChannelsApi()
          // console.log(channels)
          this.channels = channels
        } catch (error) {
          console.log('请求失败', error)
          this.$toast('获取用户频道失败')
        }
      } else { // 未登录状态
        let channel = getItem('TOUTIAO_CHANNELS')
        if (!channel) {
          // 请求获取默认频道
          try { // 该接口不强制用户登录
            const { data: { data: { channels } } } = await getUserChannelsApi()
            channel = channels
          } catch (error) {
            console.log('请求失败', error)
            this.$toast('获取用户频道失败')
          }
        }
        this.channels = channel
      }
    },
    // 增加频道
    addMyChannel (channel) {
      this.channels.push(channel)
      // 数据持久化处理
      // 未登录 把数据存到本地
      // 已登录 把数据通过请求接口存到数据库
      this.addChannelsData(channel) // 增加数据
    },
    removeChannel (channel) {
      const index = this.channels.findIndex(c => { return c.id === channel.id })
      this.channels.splice(index, 1)
      this.deleteChannelsData(channel) // 删除数据
    },
    changeHighlight (indx, isChannelShow) { // 改变高亮索引
      this.active = indx
      this.isChannelShow = isChannelShow
      // this.$refs.channels_popup.close()
    },
    async addChannelsData (channel) {
      if (this.user) { // 已登录
        try {
          await addUserChannelsApi({
            id: channel.id,
            seq: this.channels.length
          })
        } catch (error) {
          this.$toast('操作失败，请稍后再试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    async deleteChannelsData (channel) {
      if (this.user) {
        await delateUserChannelsApi(channel.id)
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
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
