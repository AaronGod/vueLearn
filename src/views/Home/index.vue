<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="8">
      <van-col span="8" v-for="obj in recList" :key="obj.id">
        <van-image
          width="100%"
          height="3.28rem"
          fit="cover"
          :src="obj.picUrl"
        />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <SongItem v-for="obj in newList" :name="obj.name" :author="obj.song.artists[0].name" :id="obj.id" :key="obj.id" />
  </div>
</template>

<script>
import { recommendMusicApi, requestNewListApi } from "@/api";
import SongItem from '@/components/SongItem'
export default {
  data() {
    return {
      recList: [],
      newList:[]
    };
  },
  async created() {
    const res = await recommendMusicApi({ limit: 6 });
    this.recList = res.data.result;
    const res2 = await requestNewListApi({limit:20})
    this.newList = res2.data.result
    console.log(this.newList);
  },
  components:{
    SongItem
  }
};
</script>

<style scoped>
.title {
  font-size: 15px;
  background-color: #eee;
  color: #333;
  padding: 0.3rem 0.24rem;
  margin: 0 0 0.24rem 0;
  /* padding: auto; */
}
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

</style>