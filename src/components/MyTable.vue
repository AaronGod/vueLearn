<template>
  <table class="table table-bordered table-stripped">
    <!-- 表格标题区域 -->
    <thead>
      <tr>
     
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格主体区域 -->
    <tbody>
      <tr v-for="(obj, index) in arr"
      :key="obj.id">
        <slot name="body" :row="obj" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
   props: {
      arr: Array
  },
  name: 'MyTable'
}
</script>


<style scoped lang="less">

</style>