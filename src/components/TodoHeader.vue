<template>
  <header class="header">
    <h1>todos</h1>
   
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="all" />
    <label for="toggle-all"></label>
    <input
      class="new-todo"
      placeholder="输入任务名称-回车确认"
      autofocus
      @keyup.enter="addTask"
      v-model="task"
    />
  </header>
</template>

<script>
export default {
  props:['list'],
  data() {
    return {
      task: ''
    };
  },
  methods: {
    addTask(){
      // 
      this.$emit('add',this.task)
      // console.log(this.task)
      this.task = ''
    }
  },
  computed: {
    all: {
      set(newval){
        // console.log(all)
        this.$emit('all',newval)
      },
      get(){
        // console.log('get val')
        // every 有个bug 当数组长度为0是会返回 true
      return this.list.length && this.list.every(obj=>{
          return obj.isDone === true
        })
      }
    }
  },
};
</script>