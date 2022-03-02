<template>
  <ul>
    <li v-for="(obj, index) in arr" :key="index">{{obj.title}}--{{obj.price}}元</li>
  </ul>
</template>

<script>
import eventBus from '../../EventBus'

export default {
  data(){
    return {
      arr: []
    }
  },
  created(){
    eventBus.$on('pushdata',(val)=>{
      this.arr = val
    })
  }
}
</script>

<style>

</style>