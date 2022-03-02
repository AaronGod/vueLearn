<template>
  <div>
    <div class="product-item" v-for="obj in list" :key="obj.id">
      <input type="checkbox" v-model="obj.goods_state" :id="'ipt'+obj.id" />
      <label :for="'ipt'+obj.id">
        <img :src="obj.goods_img" alt="" />
      </label>
      <div class="product-info">
        <div class="product-title">
          {{obj.goods_name}}
        </div>
        <div class="d-flex justify-content-between mt-2 align-items-end">
          <div class="price">￥ {{obj.goods_price}}</div>
          <MyCount :title="obj" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyCount from './MyCount2.vue'

export default {
  props: {
    list:{
      type: Array,
      require: true
    }
  },
  components: {
    MyCount
  }
};
</script>

<style lang="less" scoped>
.product-item {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  input{
    align-self: center;
    margin-right: 8px;
    margin-left: 8px;
  }
  img {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-right: 8px;
  }
  .product-info{
    padding-right: 8px;
  .product-title{
    font-size: 14px;
    font-weight: 600;
  }
  .price{
    color: red;
  }

  }
}
</style>