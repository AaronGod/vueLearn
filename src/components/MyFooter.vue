<template>
  <footer>
    <div>
      <input type="checkbox" id="all" v-model="allchecked" />
      <label for="all">全选</label>
    </div>
    <div>合计：<span class="text-danger">￥ {{allPrice}}</span></div>
    <div class="bg-primary total">结算 (<span>{{allCount}}</span>)</div>
  </footer>
</template>

<script>
export default {
  props:{
    arr: Array
  },
  computed: {
    allchecked:{
      set(val){
        // this.arr.forEach(element => {
        //   element.goods_state = val
        // });
        this.$emit('changeAll',val)

      },
      get(){
        // 小选框
        return this.arr.every(obj => obj.goods_state === true)
      }
    },
    allCount(){
      return this.arr.reduce((sum,obj)=>{
        if(obj.goods_state){
          sum += obj.goods_count
        }
        return sum
      },0)
    },
    allPrice(){
      return this.arr.reduce((sum,obj)=>{
        if(obj.goods_state){
          sum  += obj.goods_count * obj.goods_price
        }
        return sum
      },0)
    }
  }
};
</script>

<style lang="less" scoped>
footer {
  position: fixed;
  z-index: 5;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
   label{
      vertical-align: bottom;
      margin-left: 5px;
    }
  .total{
    color: white;
    height: 30px;
    padding: 0 10px;
    border-radius: 15px;
    font-size: 13px;
    line-height:30px;
    text-align: center;
   
  }
}
</style>