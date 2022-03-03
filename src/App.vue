<template>
  <div>
    <div class="item">
      <h5 class="text-center">项目列表</h5>
      <ul class="item-list">
        <li v-for="obj in caseList" :key="obj.id">
          <router-link :to="obj.url">{{ obj.name }}</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caseList: [
        {
          id: 1,
          name: "购物车",
          url: "/buycar",
        },
        {
          id: 2,
          name: "Tabbar",
          url: "/tabbar",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.item {
  position: fixed;
  bottom: 50px;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  h5 {
    font-size: 14px;
    margin-top: 5px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 8px;
    li {
      // display: inline-block;
      border: 1px solid #fff;
      margin-right: 8px;
      margin-bottom: 5px;
      padding: 0 5px;
      border-radius: 20px;
      height: 24px;
      line-height: 20px;
      a {
        font-size: 12px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>