<template>
  <div class="checkbox-box">
    <p>
      全选：
      <input type="checkbox" name="all" v-model="allchecked" class="mx-3" />
      <button class="btn btn-success" @click="reverseCheckFn">反选</button>
    </p>
    <ul>
      <li v-for="(obj, index) in personArr" :key="index">
        <input type="checkbox" v-model="obj.ck" name="z" id="" />{{ obj.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  data() {
    return {
      personArr: [
        {
          name: "猪八戒",
          ck: false,
        },
        {
          name: "孙悟空",
          ck: false,
        },
        {
          name: "唐僧",
          ck: false,
        },
        {
          name: "白龙马",
          ck: false,
        },
      ],
    };
  },
  computed: {
    allchecked: {
      set(checked) {
        // console.log('set value')
        // 全选影响小选
        this.personArr.forEach((element) => {
          element.ck = checked;
        });
      },
      get() {
        console.log('get value')
        // 刚进入时也会读取数据，obj.ck变化时也会改变
        // 小选影响全选
        return this.personArr.every((obj) => {
          return obj.ck === true;
        });
      },
    },
  },
  methods: {
    // 反选
    reverseCheckFn(){
      this.personArr.forEach(obj=>{
        obj.ck = !obj.ck
      })
    }
  }
};
</script>

<style lang='less' scoped>
.checkbox-box {
  width: 500px;
  margin: 50px auto;
}
</style>