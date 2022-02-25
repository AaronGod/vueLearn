<template>
  <div>
    <h3>随机生成列表并删除</h3>
    <ul>
      <li v-for="(item, index) in data" :key="index" >{{item}} <span @click="delLi(index)">删除</span></li>
    </ul>
    <button @click="getRandomArr">生成</button>
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      data: []
    }
  },
  methods: {
    getRandomArr(){
      this.data.push(Math.floor(Math.random()*10+10))
    },
    delLi(indx){
      this.data.splice(indx,1)
    }
  }
}
</script>

<style lang="less" scoped>
  ul{
    li.active{
      background-color: aquamarine;
    }
  }
</style>