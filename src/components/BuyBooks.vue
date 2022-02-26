<template>
  <div class="my-3 mx-auto" style="width:800px;">
    <h3>请选择你要购买的书籍</h3>
    <ul>
      <li v-for="(item,idex) in arr" :key="idex" class="mb-2">{{item.name}} <button class="btn btn-info" @click="buy(idex)">买书</button></li>
    </ul>
    <table class="table table-bordered table-hover">
      <tr>
        <th>序号</th>
        <th>书名</th>
        <th>单价</th>
        <th>数量</th>
        <th>合计</th>
      </tr>
      <tr v-for="(item,idex) in arr" :key="idex">
        <td>{{idex+1}}</td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>{{item.count}}</td>
        <td>{{item.price * item.count}}</td>
      </tr>
    </table>
    <p>总价格为: {{allPrice}}</p>
  </div>
</template>

<script>
export default {
  name: 'BuyBooks',
  data() {
    return {
      arr: [
        {
          name: "水浒传",
          price: 107,
          count: 0,
        },
        {
          name: "西游记",
          price: 192,
          count: 0,
        },
        {
          name: "三国演义",
          price: 219,
          count: 0,
        },
        {
          name: "红楼梦",
          price: 178,
          count: 0,
        },
      ],
    };
  },
  computed: {
    allPrice(){
      return this.arr.reduce((sum,item)=>{
        return sum += item.price * item.count
      },0)
    }
  },
  methods: {
    buy(index){
      this.arr[index].count++
    }
  }
};
</script>