<template>
      <van-cell center  :title="name"  :label="author + ' - ' + name" size="large" :key="id">
       <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" size="24" @click="play('/play',id)" />
      </template>
    </van-cell>
</template>

<script>
export default {
  props:{
    name: String, // 歌曲名称
    author: String,  // 歌手名称
    id: Number  // 歌曲id
  },
  methods:{
    play(path, songId){  // 跳转到pay页面并传入歌曲id
      this.$router.push({
        path,
        query: {
         songId
        }
      })
    }
  }
}
</script>

<style scoped>
/* .van-cell{
  border-bottom: 1px solid lightgray;
} */
</style>