<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />
    <!-- 热搜单 -->
    <div class="search_wrap" v-if="searchResultList.length === 0">
      <div class="hot_title">热门搜索</div>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(obj, index) in hotlist"
          :key="index"
          @click="clickFn(obj.first)"
        >
          {{ obj.first }}
        </span>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <div class="hot_title">最佳匹配</div>
      <div class="hot_name_wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <SongItem v-for="obj in searchResultList" :name="obj.name" :key="obj.id" :id="obj.id" :author="obj.ar[0].name" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { requestHotListApi, resultHotListApi } from "@/api";
import SongItem from '@/components/SongItem'
export default {
  data() {
    return {
      value: "", // 关键词
      hotlist: [], // 热搜列表
      searchResultList: [], // 搜索结果
      loading: false, // 当loading为false 是，触底才会触发onload事件
      finished: false, // 更新加载数据是否完成
      page: 1, //当前的数据页面
      timer: null
    };
  },
  components: {SongItem},
  async created() {
    const res = await requestHotListApi();
    this.hotlist = res.data.result.hots;
    // console.log(this.hotlist)
  },
  methods: {
    async clickFn(name) {
      this.page = 1  // 每次切换歌曲搜索重新赋值
      this.finished = false; // 重新赋值 加载未完成状态
      this.value = name;
      const res = await this.getSearchList();
      this.searchResultList = res.data.result.songs;
      this.loading = false; // 重新赋值 等待下次触底触发onload事件
      
    },
    async getSearchList() {
      return await resultHotListApi({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    async inputFn() {
      // 防抖功能
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async ()=>{
        this.page = 1 // 歌曲搜索重新赋值
        this.finished = false; // 重新赋值 加载未完成状态
        if (this.value.trim() === "") {
          // 输入关键字为空时，不发送请求
          this.searchResultList = []; // 重置搜索结果
          return;
        }
        const res = await this.getSearchList();
        if (!res.data.result.songs) {
          this.searchResultList = [];
          this.$toast({
            type: "fail",
            message: "未查询到输入的歌曲",
            onClose: () => {
              console.log(123);
              this.value = "";
            },
          });
          return;
        }
        this.searchResultList = res.data.result.songs;
        this.loading = false; // 重新赋值 等待下次触底触发onload事件
      }, 900) 
    },
    async onLoad() {
      // 触底加载事件
      this.page++;
      const res = await this.getSearchList();
      this.loading = false; // 重新赋值 等待下次触底触发onload事件
      if (!res.data.result.songs) {
        // 没有更多数据了
        this.finished = true;
        // this.page = 1
        return;
      }
      this.searchResultList = [
        ...this.searchResultList,
        ...res.data.result.songs,
      ];
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>