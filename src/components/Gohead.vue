<template>
  <div id="gohead">
    <h3>帅哥走一走</h3>
    <ul>
      <li v-for="(item, index) in data" :key="index" :class="item.b">{{item.a}}</li>
    </ul>
    <button @click="go">走一走</button>
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      data: [{a:'帅哥',b: 'active'}, {a:'美女',b:''}, {a:'程序员',b:''}]
    }
  },
  methods: {
    go(){
      this.data.unshift(this.data.pop())
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