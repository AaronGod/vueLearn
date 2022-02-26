<template>
  <div class="my-3" style="width:500px;margin-left:auto;margin-right:auto;">
    <hr>
    <span v-for="(item, index) in arr" :key="index">
      <input type="checkbox" v-model="ckArr" name="" id="" :value="item">
      {{item}}
    </span>
    <p>你选中的元素，累加值的和为: {{allPrice}}</p>
  </div>
</template>

<script>
export default {
  name: 'LoveSum',
  data(){
    return {
      arr: [9, 15, 19, 25, 29, 31, 48, 57, 62, 79, 87],
      ckArr: []  // v-model绑定的变量是数组, 可以收集checkbox的value属性
    }
  },
  computed: {
    allPrice(){
      return this.ckArr.reduce((sum, item)=>{return sum+=item},0)
    }
  }
}
</script>

<style>

</style>