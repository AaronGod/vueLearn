<template>
  <li>
   <slot></slot>
   <button @click="oneFn">砍一元</button>
  </li>
</template>

<script>

export default {
  props: ['index'],
  methods:{
    oneFn(){
      // console.log(this.index)
      this.$emit('onePrice',this.index)
    }
  }
}
</script>

<style scoped>
  li {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>