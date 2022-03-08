<template>
  <div class="my-page">
    <!-- 登录状态header -->
    <div v-if="user" class="login-header header">
      <div class="user-info">
        <div class="left">
          <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button class="btn-edit" round type="default" size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="user-count">
        <div class="count-item">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="count-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="count-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="count-item">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 未登录状态header -->
    <div v-else class="not-login-header header">
      <div class="login-box" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="">
        <span>登录 / 注册</span>
      </div>
    </div>
    <!-- main -->
    <div class="my-main">
      <!-- 历史和收藏 -->
      <van-grid class="grid" :column-num="2" clickable>
        <van-grid-item>
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
          <template #text>
            <span class="text">收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
          <template #text>
            <span class="text">历史</span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- cell -->
      <van-cell-group class="login-cell-group">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
      <van-cell-group v-if="user" class="login-cell-group btn-logout">
        <van-cell clickable @click="logout">
          <template #title>退出登录</template>
        </van-cell>
      </van-cell-group>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserApi } from '@/api'

export default {
  name: 'my-page',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // ...mapMutations(['setUser']),
    logout () {
      // console.log('退出登录')
      // 提示是否退出
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
    // login () {
    //   this.$router.push('/login')
    // }
  },
  async created () {
    if (this.user) { // 当用户登录后才去获取
      const { data: { data } } = await getUserApi()
      // console.log(data)
      this.userInfo = data
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.my-page {
  .header {
    height: 361px;
    background-image: url("~@/assets/banner.png");
    background-size: cover;
  }
  .login-header {
    .user-info {
      padding: 66px 32px 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .text {
          font-size: 30px;
          color: #fff;
        }
        .avatar {
          width: 132px;
          height: 132px;
          box-sizing: border-box;
          border: 3px solid #fff;
          margin-right: 22px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 20px;
        .btn-edit {
          width: 116px;
          height: 33px;
        }
      }
    }
    .user-count {
      display: flex;
      color: #fff;
      align-items: center;
      // height: 66px;  子元素要竖排 就把height设置在子元素身上
      .count-item {
        display: flex;
        flex: 1;
        height: 66px;
        flex-direction: column;
        align-items: center;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .not-login-header {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 28px;
      color: #fff;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
    }
  }
  .my-main {
    .grid {
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
    .login-cell-group {
      margin-top: 9px;
    }
    .btn-logout {
      text-align: center;
      // height: 92px;
      font-size: 30px;
      .van-cell__title {
        color: #d86262;
      }
    }
  }
}
</style>
