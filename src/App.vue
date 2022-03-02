<template>
  <div id="app">
   
   <BrandManage />
   <hr>
  <CheckBox />
  <BuyBooks />
  <LoveSum />
  <MobileNav />
  <StudentManager />
  <hr>
  <TodoList />
  <hr>
  <my-product />
  </div>
</template>

<script>
import BrandManage from './components/BrandManage.vue'
import CheckBox from './components/CheckBox.vue'
import BuyBooks from './components/BuyBooks.vue'
import LoveSum from './components/LoveSum.vue'
import MobileNav from './components/MobileNav.vue'
import StudentManager from './components/StudentManager.vue'
import TodoList from './components/TodoList.vue'
import MyProduct from './components/eventBus/MyProduct.vue'
export default {
  name: 'App',
  components: {
   BrandManage, CheckBox, BuyBooks,LoveSum,MobileNav, StudentManager,TodoList, MyProduct
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
