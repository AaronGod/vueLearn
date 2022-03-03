<template>
  <footer class="footer">
    <div :class="{'active': activeId===obj.id}" v-for="obj in arr" :key="obj.id" @click="changeFn(obj.id)">
      <i class="bi" :class="`bi-${obj.icon}`"></i>
      <div>{{obj.name}}</div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    arr: {
      type: Array,
      required: true,
      validator(value){
        if(value.length >=2 && value.length <=5){
          return true
        }else{
          console.error('数据源必须大于2小于5')
          return false
        }
      }
    }
  },
  data(){
    return {
      activeId: 1
    }
  },
  methods:{
    changeFn(id){
      this.activeId = id
      this.$emit('change',id)
    }
  }
}
</script>

<style lang="less" scoped>
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    z-index: 5;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    text-align: center;
    align-items: center;
    padding: 0 15px;
    i{
      font-size: 14px;
    }
    .active{
      color: blue;
    }
  }
</style>