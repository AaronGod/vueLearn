<template>
  <div class="layout-page">
    <!-- 头部导航 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 底部导航 tabbar-->
    <van-tabbar route class="layout-tabbar">
      <van-tabbar-item to='/'>
        <!-- 具名插槽的三种写法 v-slot:name slot='name' #name -->
        <i class="toutiao toutiao-shouye" slot="icon"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to='/qa'>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to='/video'>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span v-if="$store.state.user" class="text">我的</span>
        <span v-else class="text">未登录</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-page {
  .main {
    padding-bottom: 98px;
  }
  .layout-tabbar {
    // box-sizing: border-box;
    height: 98px;
    i.toutiao {
      font-size: 38px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
