<template>
  <div class="count">
      <button class="btn btn-outline-secondary" @click="title.goods_count>1 && title.goods_count--" :disabled="title.goods_count===1">
          <i class="bi bi-dash"></i>
        </button>
        <!-- eslint eslint不建议子元素通过v-model修改父元素传的props值 -->
        <input type="text"  v-model.number="title.goods_count" />
        <button class="btn btn-outline-secondary" @click="title.goods_count++">
          <i class="bi bi-plus"></i>
      </button>
  </div>
</template>

<script>
export default {
  props: {
    title: Object
  },
  created(){
    // console.log(this.obje.goods_count)
  },
  methods: {
  
  },
  watch: {
    // 侦听数量改变, 小于1, 直接强制覆盖1
    title:{
      deep:true,
      handler(){
        if(this.title.goods_count <1){
           this.title.goods_count = 1
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .count{
    display: flex;
    button{
      border-radius:0 ;
      height: 34px;
      width: 36px;
      padding: 0;
    }
    input{
      width: 40px;
      height: 34px;
      border-width: 1px 0 1px 0;
      text-align: center;
      margin: 0;
    }
  }
</style>