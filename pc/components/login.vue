<template>
  <div class="showModal">
    <!-- 登录 -->
    <div v-if="type===1" class="modal-container login">
      <div class="close dc pointer" @click="close">
        <i class="iconfont close-icon">&#xe61a;</i>
      </div>
      <header class="header">
        欢迎登录
      </header>
      <div class="content">
        <div class="input-div">
          <div class="label">邮箱：</div>
          <div class="input">
            <el-input v-model.trim="formData.email" placeholder="请输入邮箱">
            </el-input>
          </div>
        </div>
        <div class="input-div">
          <div class="label">密码：</div>
          <div class="input">
            <el-input v-model.trim="formData.password" type="password"
              placeholder="请输入密码"></el-input>
          </div>
        </div>
        <div class="inner">
          <el-button type="primary" @click="loginHandler" class="button">
            立即登录
          </el-button>
          <div class="bottom">
            <div class="register" @click="goRegister">注册账号</div>
            <div class="password" @click="goForget">忘记密码</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 注册  -->
    <div v-if="type===2" class="modal-container reg">
      <div class="close dc pointer" @click="close">
        <i class="iconfont close-icon">&#xe61a;</i>
      </div>
      <header class="header">
        欢迎注册
      </header>
      <div class="content">
        <div class="input-div">
          <div class="label">昵称：</div>
          <div class="input">
            <el-input v-model.trim="formData.nickname" placeholder="请输入昵称">
            </el-input>
          </div>
        </div>
        <div class="input-div">
          <div class="label">邮箱：</div>
          <div class="input">
            <el-input v-model.trim="formData.email" placeholder="请输入邮箱">
            </el-input>
          </div>
        </div>
        <div class="input-div">
          <div class="label">密码：</div>
          <div class="input">
            <el-input v-model.trim="formData.password" type="password"
              placeholder="请输入密码"></el-input>
          </div>
        </div>
        <div class="inner">
          <el-button type="primary" @click="registerHandler" class="button">
            立即注册
          </el-button>
        </div>
      </div>
    </div>

    <!-- 找回密码  -->
    <div v-if="type===3" class="modal-container reg">
      <div class="close dc pointer" @click="close">
        <i class="iconfont close-icon">&#xe61a;</i>
      </div>
      <header class="header">
        找回密码
      </header>
      <div class="content">
        <div class="input-div">
          <div class="label">邮箱：</div>
          <div class="input">
            <el-input v-model.trim="formData.email" placeholder="请输入邮箱">
              <el-button :disabled="countDown" slot="append"
                @click="sendCodeHandler">
                {{countDown ? count + 's' : '验证码'}}</el-button>
            </el-input>
          </div>
        </div>

        <div class="input-div">
          <div class="label">验证码：</div>
          <div class="input">
            <el-input v-model.trim="formData.code" placeholder="请输入验证码">
            </el-input>
          </div>
        </div>

        <div class="input-div">
          <div class="label">密码：</div>
          <div class="input">
            <el-input v-model.trim="formData.password" type="password"
              placeholder="请输入密码"></el-input>
          </div>
        </div>
        <div class="inner">
          <el-button type="primary" @click="callbackHandler" class="button">
            立即找回
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import md5 from 'md5'
import { validateMail } from '../assets/scripts/utils'
import {
  userLogin,
  userRegister,
  sendEmail,
  resetPass,
} from '../assets/api/user'
const COUNT = 10
export default {
  data() {
    return {
      type: 1,
      count: 0,
      countDown: false,
      formData: {
        email: '',
        password: '',
        code: '',
      },
    }
  },

  methods: {
    async callbackHandler() {
      const { email, password, code } = this.formData
      if (!email || !password || !code || !validateMail(email)) {
      } else if (!validateMail(email)) {
        Message.error('请核查信息准确性！')
      } else {
        await resetPass({ email, code, password: md5(password) }).then(() => {
          Message.success('密码重置成功')
          this.clearParams()
        })
      }
    },
    async sendCodeHandler() {
      const { email } = this.formData
      if (!email) {
        Message.error('请填写邮箱')
      } else if (!validateMail(email)) {
        Message.error('邮箱格式不正确')
      } else if (email && !this.countDown) {
        await sendEmail({ email })
          .then((res) => {
            this.count = COUNT
            this.countDown = true
            this.countDownTime()
            Message.success('邮箱发送成功')
          })
          .catch(() => {})
      }
    },
    countDownTime() {
      let timer = setInterval(() => {
        if (this.count <= 0) {
          this.countDown = false
          clearInterval(timer)
          timer = null
        } else {
          this.count--
        }
      }, 1000)
    },

    registerHandler() {
      const { email, password, nickname } = this.formData
      if (!nickname || !email || !password || !validateMail(email)) {
        Message.error('请核查信息准确性！')
      } else {
        userRegister({ email, nickname, password: md5(password) }).then(
          (res) => {
            this.type = 1
            this.formData.password = ''
          }
        )
      }
    },
    loginHandler() {
      const { email, password } = this.formData
      if (!email || !password || !validateMail(email)) {
        Message.error('请核查邮箱和密码准确性！')
      } else {
        userLogin({ email, password: md5(password) }).then((res) => {
          this.$store.commit('user/saveUserInfo', res)
          this.close()
          Message.success('登录成功')
        })
      }
    },
    close() {
      this.clearParams()
      this.$store.commit('user/setLoginStatus', false)
    },
    goRegister() {
      this.type = 2
    },
    goForget() {
      this.type = 3
    },
    clearParams() {
      Object.assign(this.$data, this.$options.data())
    },
  },
}
</script>

<style lang="scss" scoped>
.showModal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-container {
  position: relative;
  overflow: hidden;
  width: 860px;
  height: 480px;
  border-radius: 4px;
  background: #ffffff;
  background-color: rgb(255, 255, 255);
  &.login {
    animation: fade 0.3s ease;
  }
  &.reg {
    animation: rotate 0.3s ease-out;
    transform-style: preserve-3d;
  }
}
@keyframes fade {
  0% {
    transform: translateY(-10px);
    opacify: 0;
  }
  100% {
    transform: translateY(0px);
    opacify: 1;
  }
}

@keyframes rotate {
  0% {
    transform: rotateY(0px);
    opacify: 0;
  }
  100% {
    transform: rotateY(180deg);
    opacify: 1;
  }
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  .close-icon {
    display: block;
    color: #fff;
    font-size: 25px;
  }
}

.header {
  height: 80px;
  background: #0377f3;
  color: #fff;
  text-align: center;
  font-size: 22px;
  line-height: 80px;
  .text {
    color: #fff004;
    font-style: normal;
  }
}
.content {
  padding: 15px 140px 0 140px;
  .input-div {
    display: flex;
    margin-top: 45px;
    .input {
      flex: 1;
    }
    .label {
      width: 100px;
      color: rgb(102, 102, 102);
      font-size: 22px;
      line-height: 40px;
    }
  }
  .inner {
    padding-left: 100px;

    .tips {
      color: rgb(102, 102, 102);
      font-size: 16px;
    }
    .button {
      margin-top: 40px;
      margin-bottom: 10px;
      width: 100%;
      height: 48px;
      color: rgb(255, 255, 255);
      font-weight: normal;
      font-size: 20px;
    }
    .bottom {
      display: flex;
      margin-top: 10px;
    }
    .register {
      flex: 1;
      color: rgb(3, 119, 243);
      font-size: 14px;
      cursor: pointer;
    }
    .password {
      flex: 1;
      color: rgb(102, 102, 102);
      text-align: right;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>

