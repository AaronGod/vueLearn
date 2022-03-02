<template>
  <div>
    <MyHeader title="购物车案例" bg="red" />
    <div class="main">
      <MyGoods :list="list" />
    </div>
    <MyFooter :arr="list" @changeAll="allFn" />
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyGoods from './components/MyGoods.vue'
import MyFooter from './components/MyFooter.vue'
export default {
  data(){
    return {
      list: []
    }
  },
  components:{
    MyHeader, MyGoods, MyFooter
  },
  created(){
    // console.log(this.$axios)
    this.$axios({
      url: '/api/cart'
    }).then(res=>{
      //  console.log(res.data.list)
      this.list = res.data.list
    }).catch(e=>{
      console.err(e)
    })
  },
  methods:{
    allFn(bool){
      this.list.forEach(obj => obj.goods_state = bool)
    }
  }
}
</script>

<style scoped>
body,html{
  font-family: Arial, Helvetica, sans-serif;
}
  .main{
    margin: 50px auto 50px;
  }
</style>