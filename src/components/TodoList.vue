<template>
  <div class="todoapp">
    <TodoHeader :list="filterList" @add="addList" @all="checkAll" />
    <TodoMain :list="filterList" @del="removeList" />
    <TodoFooter :list="filterList" @selected="filterSel" @clear="clearDone" />
  </div>
</template>

<script>
import TodoHeader from "./TodoHeader.vue";
import TodoMain from "./TodoMain.vue";
import TodoFooter from "./TodoFooter.vue";
export default {
  name: "TodoList",
  data() {
    return {
      list: JSON.parse(localStorage.getItem('todo_list')) || [],
      selectedVal: "all",
      // filterList: [] 应该用计算属性
    };
  },
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
  methods: {
    addList(task) {
      this.list.push({
        id: this.list.length ? this.list.length + 1 : 100,
        name: task,
        isDone: false,
      });
    },
    removeList(id) {
      // console.log(id)
      const index = this.list.findIndex((obj) => {
        return obj.id === id;
      });
      this.list.splice(index, 1);
    },
    filterSel(val) {
      // console.log(val)
      this.selectedVal = val;
    },
    clearDone(){
     this.list = this.list.filter(obj=>{
        return obj.isDone !== true
      })
    },
    checkAll(all){
      // 所有任务 完成 或者 未完成
      this.list.forEach(obj=>{
        obj.isDone = all
      })
    }
  },
  computed: {
    filterList() {
      if (this.selectedVal === "all") {
        return this.list;
      } else if (this.selectedVal === "fail") {
        return this.list.filter((obj) => {
          return obj.isDone === false;
        });
      } else if (this.selectedVal === "done") {
        return this.list.filter((obj) => {
          return obj.isDone === true;
        });
      }
    },
  },
  watch:{
    list:{ // 本地缓存数据
      deep:true,
      handler(){
        localStorage.setItem('todo_list',JSON.stringify(this.list))
      }
    }
  }
};
</script>

<style scoped>
@import "../styles/base.css";
@import "../styles/index.css";
.todoapp {
  max-width: 500px;
  margin: 200px auto;
}
</style>