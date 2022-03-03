
<template>
  <div>
    <MyTable  :arr="list">
        <template v-slot:header>
          <th>#</th>
          <th>商品名称</th>
          <th>价格</th>
          <th>标签</th>
          <th>操作</th>
        </template>
        <template #body="scope">
          <td>{{scope.row.id}}</td>
          <td>{{scope.row.goods_name}}</td>
          <td>{{scope.row.goods_price}}</td>
          <td>
            <div>
              <input type="text" v-focus v-model="scope.row.inputValue" v-if="scope.row.inputVisible" style="width:100px" @keyup.enter="enterFn(scope.row)" @keyup.esc="scope.row.inputValue=''" @blur="scope.row.inputVisible = false">
              <button class="btn btn-primary btn-sm" v-else @click="addTags(scope.index)">+ Tags</button>
            </div>
            <span v-for="(str,ind) in scope.row.tags" :key="ind" class="badge bg-warning text-dark">{{str}}</span>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" @click="removeItem(scope.row.id)">删除</button>
          </td>
        </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from '@/components/MyTable'
export default {
  data(){
    return {
      list: []
    }
  },
  components: {
    MyTable
  },
  async created(){
    const { data } = await this.$axios({
      url: '/api/goods'
    })
    this.list = data.data

  },
  methods:{
    removeItem(id){
      const index = this.list.findIndex(obj=>{
        return obj.id === id
      })
      this.list.splice(index,1)
    },
    addTags(index){
      // console.log(index)
      this.list[index].inputVisible = true
    },
    enterFn(obj){
      // console.log(obj)
      if(obj.inputValue.trim().length){
        obj.tags.push(obj.inputValue.trim())
      }else{
        alert('填入数据不能为空')
      }
      obj.inputValue = ''
    }
  }
}
</script>

<style scoped>
 .badge {
    margin-right: 5px;
  }
</style>