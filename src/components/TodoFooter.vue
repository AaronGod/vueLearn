<template>
  <footer class="footer">
    <span class="todo-count">剩余<strong>{{list.length}}</strong></span>
    <ul class="filters">
      <li>
      
        <a :class="{'selected': selected === 'all'}" href="javascript:;" @click="selecFn('all')">全部</a>
      </li>
      <li>
        <a :class="{'selected': selected === 'fail'}" href="javascript:;" @click="selecFn('fail')">未完成</a>
      </li>
      <li>
        <a :class="{'selected': selected === 'done'}" href="javascript:;" @click="selecFn('done')">已完成</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearTask">清除已完成</button>
  </footer>
</template>

<script>

export default {
 props: ['list'],
 data(){
   return {
     selected: 'all' // all fail done
   }
 },
 methods:{
  selecFn(val){
    if(this.selected === val)return
    this.selected = val
    this.$emit('selected',val)
  },
  clearTask(){
    this.$emit('clear')
  }
 }
}
</script>

<style scoped>
.footer{
  height: 50px;
}
button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>