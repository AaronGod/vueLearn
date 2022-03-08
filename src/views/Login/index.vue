<template>
  <div class="login-page">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-title" title="登录" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile" type="number" maxlength="11">
        <template v-slot:left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field class="verify-code" :rules="userFormRules.code" v-model="user.code" name="code" placeholder="请输入验证码" type="number" maxlength="6">
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down v-if="isShowCountDown" :time="1000 * 60" format="ss s" @finish="isShowCountDown = false" />
          <van-button v-else class="btn-send-msg" round size="small" type="default" native-type="button" @click="onSendCode">获取验证码</van-button>
        </template>
      </van-field>
      <div class="btn-login-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="footer">隐私条款</div>
  </div>
</template>

<script>
import { loginApi, getCodeApi } from '@/api'
export default {
  name: 'login-page',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            require: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            require: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      isShowCountDown: false
    }
  },
  methods: {
    // 发送验证码
    async onSendCode () {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log(error) // 出错就return 不执行后面的代码了
      }

      // 验证码倒计时
      this.isShowCountDown = true
      // 获取验证码接口
      try {
        const { mobile } = this.user
        await getCodeApi(mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.isShowCountDown = false
        if (error.response.status === 404) {
          this.$toast('手机号码有问题')
        } else if (error.response.status === 429) {
          this.$toast('发送太频繁， 稍后重试')
        } else {
          this.$toast('发送失败')
        }
      }
    },
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 背景不能点击
        duration: 0 // 持续展示-默认为2000毫秒
      })

      // 发送请求
      try {
        const res = await loginApi(this.user)
        this.$toast.success('登录成功')
        console.log('登录成功', res)
        // 存入token
        const { data } = res
        this.$store.commit('setUser', data.data)
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.success('手机号或者验证码不正确')
        } else {
          this.$totast.fail('登录失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  .toutiao {
    font-size: 37px;
    color: #666;
    position: relative;
    top: 2px;
    &.toutiao-yanzhengma {
      top: 6px;
    }
  }
  .verify-code {
    .van-field__control {
      border-right: 1px solid #eee;
    }
  }
  .van-field__button {
    border-left: 1px solid #666;
  }
  .btn-send-msg {
    width: 152px;
    height: 46px;
    padding: 0;
    background-color: #ededed;
    color: #666;
    position: relative;
    &::before {
      position: absolute;
      left: -20px;
      content: "";
      opacity: 1;
      width: 2px;
      height: 46px;
      background-color: #eeeeee;
      border: none;
    }
    .van-button__text {
      font-size: 22px;
      line-height: 46px;
    }
  }
  .btn-login-wrap {
    margin: 58px 28px 0;
    .van-button--info {
      background-color: #6db4fb;
      border-radius: 10px;
      border: none;
      font-size: 30px;
    }
  }
  .footer {
    position: fixed;
    bottom: 54px;
    left: 0;
    width: 100%;
    font-size: 25px;
    color: #666;
    text-align: center;
  }
}
</style>>
