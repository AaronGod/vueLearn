<template>
  <ul class="todo-list">
    <li :class="{'completed': obj.isDone}" v-for="obj in list" :key="obj.id">
      <div class="view">
        <input class="toggle" type="checkbox" v-model="obj.isDone" />
        <label>{{obj.name}}</label>
        <button class="destroy" @click="delTask(obj.id)"></button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props:['list'],
  data(){
    return {
  
    }
  },
  methods: {
    delTask(id){
      this.$emit('del', id)
    }
  }
}
</script>
<style scoped>
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