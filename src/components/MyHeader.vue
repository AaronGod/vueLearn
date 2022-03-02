<template>
  <header :style="'background:'+bg">
    {{title}}
  </header>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      require: true
    },
    bg:{
      type:String,
      default: 'blue'
    }
  }
}
</script>

<style scoped>
  header {
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: blue;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
  }
</style>