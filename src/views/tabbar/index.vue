<template>
  <div>
    <MyHeader title="TabBar Test" />
    <div class="main">
        <component :is="activeComponent"></component>
    </div>
    <my-footer :arr="tablist" @change="getActiveC">

    </my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/TabbarFooter'
import List from './GoodsList.vue'
import Search from './GoodsSearch.vue'
import Person from './UserInfo.vue'
export default {
  data(){
    return {
      tablist: [
        {
          name: '商品列表',
          id: 1,
          icon: 'list'
        },
        {
          name: '商品搜索',
          id: 2,
          icon: 'search'
        },
         {
          name: '我的信息',
          id: 3,
          icon: 'person'
        }
      ],
      activeComponent: 'List'
    }
  },
  components:{
    MyHeader,MyFooter,Person,List,Search
  },
  methods:{
    getActiveC(id){
      this.activeComponent  =  this.tablist.filter(obj=>{
        return obj.id === id
      })[0].icon.split('').map((item,index)=>{
         return (index === 0 && item.toUpperCase()) || item
      }).join('')
    }
  }
}
</script>

<style lang="less" scoped>
  .main{
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>