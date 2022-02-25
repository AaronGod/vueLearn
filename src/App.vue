<template>
  <div id="app">
   
   <BrandManage />
  </div>
</template>

<script>
import BrandManage from './components/BrandManage.vue'

export default {
  name: 'App',
  components: {
   BrandManage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
