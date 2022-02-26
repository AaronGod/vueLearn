<template>
  <div id="app">
   
   <BrandManage />
   <hr>
  <CheckBox />
  <BuyBooks />
  </div>
</template>

<script>
import BrandManage from './components/BrandManage.vue'
import CheckBox from './components/CheckBox.vue'
import BuyBooks from './components/BuyBooks.vue'

export default {
  name: 'App',
  components: {
   BrandManage, CheckBox, BuyBooks
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
