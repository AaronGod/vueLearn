<template>
  <div id="app">
    <h3>{{ msg }}</h3>
    <h4>{{ obj.name }} , {{ obj.age > 18 ? "成年" : "未成年" }}</h4>
    <a :href="url" @click="goto(10, $event)">去百度</a>
    <button @click="clickT">按钮</button>
    <p>购买商品的数量是： {{ num }}</p>
    <button @click="num += 1">+1</button>
    <button @click="jianfa">-1</button>
    <div @click="fatherFn">
      <!-- 事件修饰符 -->
      <p @click.stop="two">阻止冒泡</p>
      <a href="baidu.com" @click.prevent.stop>阻止默认行为和冒泡</a>
      <p @click.once="once">事件函数只调用一次，但事件可多次被触发</p>
    </div>
    <!-- 按键修饰符 -->
    <input type="text" @keydown.enter="fn1" placeholder="请按enter键" />
    <input type="text" @keydown.esc="fn2" placeholder="请按返回键" />
    <!-- 翻转 -->
    <p>{{msg}}</p>
    <button @click="reverse">翻转</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hellow vue",
      num: 0,
      obj: {
        name: "vue",
        age: 3,
      },
      url: "https://www.baidu.com",
    };
  },
  methods: {
    clickT(e) {
      console.log(e.target);
    },
    jianfa() {
      console.log(this);
      // this 为VueComponent
      this.num === 0 ? (this.num = 0) : this.num--;
    },
    goto(x, e) {
      this.num = x;
      e.preventDefault();
    },
    fatherFn() {
      console.log("父元素被点击了");
    },
    two() {
      console.log("阻止冒泡");
    },
    once() {
      console.log("只执行一次");
    },
    fn1(e) {
      e.target.value = "你按下了enter键";
    },
    fn2(e) {
      e.target.value = "你按下了esc键";
    },
    reverse(){
      this.msg = this.msg.split('').reverse().join('')
    }
  },
};
</script>

<style>
</style>