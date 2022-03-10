<template>
  <div class="channel-pannel">
    <van-cell center class="pannel-cell" :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button class="btn-edit" round size="mini" type="danger" plain @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :border="false" class="channel-item-wrap my-wrap" :gutter="10">
      <van-grid-item :class="{'channel-active': activeIndex === index}" class="channel-item" v-for="(channelItem,index) in channels" :key="channelItem.id" :text="channelItem.name" @click="myClickChannel(channelItem,index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !lockChannles.includes(channelItem.id)"></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center class="pannel-cell" :border="false">
      <div class="title" slot="title">频道推荐</div>
    </van-cell>
    <van-grid :border="false" class="channel-item-wrap recom-wrap" :gutter="10">
      <van-grid-item icon="plus" class="channel-item" v-for="channel in recomChannels" :key="channel.id" :text="channel.name" @click="addChannel(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsApi } from '@/api'
export default {
  name: 'channel-edit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeIndex: Number
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 编辑状态
      lockChannles: [0, 1] // 不允许被删除的频道id
    }
  },
  async created () {
    try {
      const { data: { data: { channels } } } = await getAllChannelsApi()
      this.allChannels = channels
    } catch (error) {
      console.log(error)
      this.$toast('获取全部频道失败')
    }
  },
  computed: {
    recomChannels () {
      const myChannels = this.channels
      return this.allChannels.filter(all => {
        return !myChannels.find(my => my.id === all.id)
      })
    }
  },
  methods: {
    addChannel (channel) { // 添加频道
      // this.channels.push(channel)
      this.$emit('addItem', channel)

      // 数据持久化处理
      // 未登录 把数据存到本地
      // 已登录 把数据通过请求接口存到数据库
    },
    myClickChannel (channel, index) {
      if (this.isEdit) { // 处于编辑状态就移除频道
        if (!this.lockChannles.includes(channel.id)) {
          if (index <= this.activeIndex) {
            // 删除高亮以前的频道时需要 让激活频道索引减1
            this.$emit('switchActive', this.activeIndex - 1, true)
          }
          this.$emit('removeItem', channel)
        } else { // 锁定频道不能删除
          this.$toast('该频道不允许被删除')
        }
        return
      }
      // 改变当前高亮频道，并关闭
      this.$emit('switchActive', index, false)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-pannel {
  padding-top: 80px;
  .pannel-cell {
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    // margin-bottom: 48px;
    .title {
      font-size: 32px;
      color: #333;
    }
    .btn-edit {
      width: 102px;
      height: 44px;
      font-size: 22px;
    }
  }
  .channel-item-wrap {
    padding: 0 22px;
    /deep/.channel-item {
      width: 160px;
      height: 86px;

      .van-grid-item__content {
        white-space: nowrap; // 强制不换行
        background-color: #f4f5f6;
        border-radius: 6px;
        font-size: 28px;
        color: #222;
      }
    }
  }
  /deep/.my-wrap {
    .channel-active {
      .van-grid-item__text {
        color: #ee0a24;
      }
    }
    .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon {
        position: absolute;
        right: 6px;
        top: -6px;
        // font-size: 16px;
        color: #b1b1b1;
      }
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
  .recom-wrap {
    /deep/.channel-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon {
          margin-right: 6px;
          font-size: 24px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
