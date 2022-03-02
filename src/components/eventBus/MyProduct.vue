<template>
<div class="clearfix my-3">
  <ul class="product">
    <!-- 父向子传递 -->
    <Product v-for="(obj, index) in list" :key="index" :index="index" @onePrice="jiage">
       <h3>标题：{{obj.title}}</h3>
      <div>价格：{{obj.price}}元</div>
      <div>{{obj.info}}</div>
      
    </Product>
  </ul>
  <ul class="list">
    <List />
  </ul>
</div>

</template>

<script>
import eventBus from '../../EventBus/index'

import Product from './Product.vue'
import List from './Lsist.vue'
export default {
  data(){
    return {
      list: [
        {
          title: '超级好吃的棒棒糖',
          price: 18.8,
          info: '开业大酬宾，全场8折'
        },
         {
          title: '超级好吃的大鸡腿',
          price: 34.8,
          info: '好吃不腻，快来，买哦'
        },
         {
          title: '超级无敌的冰激凌',
          price: 14.6,
          info: '这么热的天，来块冰激凌'
        }
      ]
    }
  },
  components: {
    Product,List
  },
  methods:{
    jiage(index){
      this.list[index].price = this.list[index].price>1 ? (this.list[index].price-1).toFixed(2) : this.list[index].price
      // 使用eventbus传值， 传出的组件触发事件， 传入的组件监听事件 
      eventBus.$emit('pushdata',this.list)
    }
  },
  mounted(){
    eventBus.$emit('pushdata',this.list)
  }
}
</script>

<style scoped>
  .product{
    width: 500px;
    float: left;
  }
  .list{
    width: 300px;
    float: left;
  }
</style>