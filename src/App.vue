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
    <p>{{ msg }}</p>
    <button @click="reverse">翻转</button>
    <hr />
    <!-- 表单数据关联  v-model -->
    <form class="form">
      <div class="mb-20">
        <span>来自</span>
        <select name="from" v-model="from">
          <option value="北京市">北京</option>
          <option value="南京市">南京</option>
          <option value="天津市">天津</option>
        </select>
      </div>
      <div class="mb-20">
        <span>爱好</span>
        <input type="checkbox" v-model="habit" value="抽烟" />抽烟
        <input type="checkbox" v-model="habit" value="喝酒" />喝酒
        <input type="checkbox" v-model="habit" value="唱歌" />唱歌
      </div>
      <div class="mb-20">
        <span>性别</span>
        <input type="radio" v-model="grender" name="sex" value="男" id="" />男
        <input type="radio" v-model="grender" name="sex" id="" value="女" />女
      </div>
      <div class="mb-20">
        <span>自我介绍</span>
        <textarea
          name="info"
          v-model="info"
          placeholder="一句简单的自我介绍"
        ></textarea>
      </div>
    </form>

    <!-- v-modle的修饰符 .number .trim .lazy-->
    <div class="mb-20">
      <span>年龄</span>
      <input type="number" name="age" v-model.number="age" />
    </div>
    <div class="mb-20">
      <span>人生格言</span>
      <input type="text" v-model.trim="motto" />
    </div>
    <div class="mb-20">
      <span>自我介绍</span>
      <input type="text" v-model.lazy="intro" />
    </div>

    <!-- v-text v-html 会覆盖插值表达式{{}} -->
    <div v-text="str">没有被v-text覆盖</div>
    <div v-html="htm">{{ msg }}</div>

    <!-- v-show v-if -->
    <div v-show="isShow">显示</div>
    <div v-if="isShow">请让我隐藏</div>
    <div v-else>我还在吗</div>
    <hr class="mb-20" />
    <!-- 面板折叠 -->
    <div class="panel-box">
      <h3>案例： 折叠面板</h3>
      <div class="wrapper">
        <div class="title">
          芙蓉楼送辛渐<span @click="toggleContent">{{
            textIsShow ? "收起" : "折叠"
          }}</span>
        </div>
        <div class="content" v-show="textIsShow">
          <p>寒雨连江夜入吴,</p>
          <p>平明送客楚山孤。</p>
          <p>洛阳亲友如相问，</p>
          <p>一片冰心在玉壶。</p>
        </div>
      </div>
    </div>
    <!-- v-for -->
    <p>学生姓名</p>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{ index }} - {{ item }}</li>
    </ul>
    <p>学生详细信息</p>
    <ul>
      <li v-for="obj in stuArr" :key="obj.id">
        <span>{{ obj.name }}</span>
        <span>{{ obj.sex }}</span>
        <span>{{ obj.hobby }}</span>
      </li>
    </ul>
    <p>老师信息</p>
    <div v-for="(value, key) in tObj" :key="value">
      {{ key }} -- {{ value }}
    </div>
    <p>序号</p>
    <div v-for="i in count" :key="i">{{ i }}</div>
    <Gohead />
    <hr>
    <ListDel />
<hr>
    <BuyCard />
  </div>
</template>

<script>
import Gohead from './components/Gohead.vue'
import ListDel from './components/ListDel.vue'
import BuyCard from './components/BuyCard.vue'
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
      from: "北京市",
      habit: [],
      grender: "女",
      info: "",
      age: 18,
      motto: "",
      intro: "",
      str: "覆盖了标签写的内容",
      htm: "<i>这是一个图标元素</i><span>覆盖了插值表达式中的内容</span>",
      isShow: true,
      textIsShow: true,
      arr: ["小明", "小欢欢", "大黄"],
      stuArr: [
        {
          id: 1001,
          name: "孙悟空",
          sex: "男",
          hobby: "吃桃子",
        },
        {
          id: 1002,
          name: "猪八戒",
          sex: "男",
          hobby: "背媳妇",
        },
      ],
      tObj: {
        name: "小黑",
        age: 18,
        class: "1期",
      },
      count: 10,
    };
  },
  components:{Gohead,ListDel, BuyCard},
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
    reverse() {
      this.msg = this.msg.split("").reverse().join("");
    },
    toggleContent() {
      this.textIsShow = !this.textIsShow;
    },
  },
};
</script>

<style lang="less" scoped>
form {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
  margin: 50px auto;
  box-shadow: 0 1px 5px #010;
}
.mb-20 {
  margin-bottom: 20px;
}
.panel-box {
  background-color: #fff;
  width: 400px;
  margin: 50px auto 100px;
  padding: 20px 0;
  border: 5px solid blueviolet;
  border-radius: 10px;
  box-shadow: 0 0 5px #333;
  h3 {
    text-align: center;
    margin-top: 0;
  }

  .wrapper {
    margin: 20px auto 0;
    width: 300px;

    .title {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      border: 1px solid #ccc;
      padding: 0 15px;
      font-size: 20px;
      font-weight: bold;
      line-height: 40px;
      span {
        font-size: 14px;
        font-weight: normal;
        padding: 0 8px;
        margin-right: -8px;
        cursor: pointer;
      }
    }

    .content {
      border: 1px solid #ccc;
      padding: 10px 15px;
      border-top-width: 0;
      p {
        font-size: 14px;
        margin: 2px 0;
      }
    }
  }
}
</style>>
