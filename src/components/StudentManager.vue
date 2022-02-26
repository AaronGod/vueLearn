<template>
  <div class="mx-auto mb-5" style="width:800px;">
    <div>
      <span>姓名:</span>
      <input type="text" v-model.trim="inptName" />
    </div>
    <div class="my-3">
      <span>年龄:</span>
      <input type="number" v-model.number="inptAge" />
    </div>
    <div>
      <span>性别:</span>
      <select v-model="selSex">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </div>
    <div class="my-3">
      <button class="btn btn-info" @click="addModi">添加/修改</button>
    </div>
    <div>
      <table
        border="1"
        cellpadding="10"
        cellspacing="0"
      >
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
        <tr v-for="(obj,index) in arr" :key="index">
          <td>{{index +1}}</td>
          <td>{{obj.name}}</td>
          <td>{{obj.age}}</td>
          <td>{{obj.sex}}</td>
          <td>
            <button class="btn btn-danger mx-2" @click="del(index)">删除</button>
            <button class="btn btn-success" @click="edit(obj.name,obj.age,obj.sex)">编辑</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentManager',
  data(){
    return{
      arr: [],
      selSex: '男',
      inptAge: 0,
      inptName: ''
    }
  },
  methods:{
    addModi(){
      if( !this.inptName || !this.inptAge){
        alert('填入的数据不能为空数据')
        return
      }
     const index =  this.arr.findIndex(obj=>{
       return this.inptName === obj.name
      })
      if(index=== -1){ // 添加
        this.arr.push({
          name: this.inptName,
          age: this.inptAge,
          sex: this.selSex
        })
      }else{ // 修改
        this.arr[index].age =this.inptAge
        this.arr[index].sex = this.selSex
      }
      
    },
    del(index){
      this.arr.splice(index,1)
    },
    edit(name,age,sex){
      this.inptName = name
      this.inptAge = age
      this.selSex = sex
    }
  }
}
</script>