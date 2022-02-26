<template>
  <div class="table-container">
    <h2 class="text-center pt-3 mb-3">品牌管理</h2>
    <table class="table table-bordered table-hover">
      <tbody>
        <tr>
          <th>编号</th>
          <th>资产变更</th>
          <th>价格</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="obj in list" :key="obj.id">
          <td>{{ obj.id }}</td>
          <td>{{ obj.name }}</td>
          <td :class="{ 'text-danger': obj.price > 100 }">{{ obj.price }}</td>
          <td>{{ obj.time | getFormatTime }}</td>
          <td class="del" @click="del(obj.id)">删除</td>
        </tr>
        <tr style="text-align:center;background:#ccc;" v-show="list.length">
          <td colspan="2">总价：{{totalPrice}}</td>
          <td colspan="3">均价：{{avaPrice}}</td>
        </tr>
      </tbody>
      <tfoot v-show="!list.length">
        <tr>
           <td colspan="5" style="text-align: center">暂无数据</td>
        </tr>
      </tfoot>
    </table>
    <form action="" class="form-inline d-flex">
        <div>
          <input
            type="text"
            name="goodsname"
            v-model="name"
            placeholder="资产名称"
            class="form-contorl"
          />
        </div>
        <div class="mx-3">
          <input
            type="number"
            name="goodsprice"
            v-model.number="price"
            placeholder="价格"
            class="form-contorl"
          />
        </div>

      <button @click.prevent="addGoods" class="btn btn-primary">
        添加资产
      </button>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "BrandManage",
  data() {
    return {
      list: JSON.parse(localStorage.getItem('goodsList')) || [],
      name: "",
      price: 0,
    };
  },
  methods: {
    addGoods(){
      if(!this.price || !this.name.trim()){
        alert('输入的数据为空，重新输入')
        return
      }
      this.list.push({
        id: this.list.length? this.list[this.list.length-1].id + 1:100,
        name: this.name,
        price:this.price,
        time: new Date()
      })
      this.name=''
      this.price=0
    },
    del(id){
      const index = this.list.findIndex(item=>item.id===id)
      this.list.splice(index,1)
    }
  },
  watch:{
    list:{
      deep:true,
      handler:function(){
        localStorage.setItem('goodsList',JSON.stringify(this.list))  // 本地存数据
      }
    }
  },
  filters:{
    // 格式化事件
    getFormatTime(timestr){
      return moment(timestr).format('YYYY-MM-DD')
    }
  },
  computed: {
    // 计算总价
    totalPrice(){
     return (this.list.reduce(function(sum,item){ return sum += item.price},0)).toFixed(2)
    },
    // 计算均价
    avaPrice(){
      return this.list.length===0?0:(this.totalPrice /this.list.length).toFixed(2)
    }
  }
};
</script>

<style lang="less" scoped>
.table-container {
  width: 900px;
  padding: 0 50px 20px;
  margin: 50px auto;
  box-shadow: 0 1px 8px blueviolet;
  .del {
    cursor: pointer;
  }
}
</style>>
