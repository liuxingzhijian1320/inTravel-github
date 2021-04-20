<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.forget {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 1rem 0.3rem;
  box-sizing: border-box;
  .title {
    font-size: 0.36rem;
    color: #404040;
    text-align: center;
    margin-bottom: 1rem;
  }
  .input-div {
    position: relative;
    margin-bottom: 0.3rem;
    .input {
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      outline: none;
      -webkit-appearance: none;
      border: 0;
      padding: 0 0.5rem;
      color: #404040;
      font-size: 0.3rem;
      @include hbPlaceholder {
        color: #d9d9d9;
      }
    }
    .send {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: 100%;
      // background: rgab(#36cfc9, 0.7);
      border-radius: 0 0.5rem 0.5rem 0;
      color: #999;
    }
    .eye-info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 0.8rem;
      height: 100%;
      .eye {
        font-size: 30px;
        color: #d9d9d9;
        transition: all 0.2s ease-in-out;
        &.active {
          // color: #36cfc9;
        }
      }
    }
  }

  .forget {
    color: #d9d9d9;
    font-size: 0.24rem;
    padding-left: auto;
    margin-top: 0.1rem;
    margin-bottom: 0.9rem;
    text-align: right;
  }
  .btn {
    margin-top: 1rem;
    height: 1.2rem;
    width: 100%;
    border-radius: 0.6rem;
    letter-spacing: 0.06rem;
    // background: #36cfc9;
    color: #fff;
    font-size: 0.32rem;
  }
}
</style>

<template>
  <div class="forget">
    <h3 class="title">重置密码</h3>
    <div class="input-div">
      <input class="input cbtn" v-model.trim="formData.email"
        placeholder="邮箱" />
      <div class="send dc" v-theme-bg @click="sendCodeHandler">
        {{countDown ? count + 's' : '验证码'}}
      </div>
    </div>
    <div class="input-div">
      <input class="input cbtn" type="text" v-model.trim="formData.code"
        placeholder="邮箱验证码" />
    </div>
    <div class="input-div">
      <input class="input cbtn" :type="isShow ? 'text': 'password'"
        v-model.trim="formData.password" placeholder="新密码" />
      <div class="eye-info dc" @click="showHandler">
        <i class="iconfont eye icon-eye" v-theme="isShow"></i>
      </div>
    </div>
    <div class="btn dc" v-theme-bg @click="loginHandler">发送</div>
  </div>
</template>

<script>
import md5 from "md5";

import { showToast } from "../../assets/scripts/tools";
import { reactive, ref, toRefs } from "vue";
import { validateMail } from "../../assets/scripts/utils";
import { useRouter } from "vue-router";
import { sendEmail, resetPass } from "../../assets/api/user";

const COUNT = 10;
export default {
  name: "forget",
  components: {},
  setup(props) {
    const router = useRouter();
    const isShow = ref(false);
    const countDown = ref(false);
    const count = ref(COUNT);
    const obj = reactive({
      formData: {
        email: "",
        code: "",
        password: "",
      },
    });

    const showHandler = () => {
      isShow.value = !isShow.value;
    };

    const sendCodeHandler = async () => {
      const { email } = obj.formData;
      if (!email) {
        showToast({ title: "请填写邮箱" });
      } else if (!validateMail(email)) {
        showToast({ title: "邮箱格式不正确" });
      } else if (email && !countDown.value) {
        await sendEmail({ email })
          .then((res) => {
            count.value = COUNT;
            countDown.value = true;
            countDownTime();
            showToast({ title: "邮箱发送成功" });
          })
          .catch(() => {});
      }
    };

    const countDownTime = () => {
      let timer = setInterval(() => {
        if (count.value <= 0) {
          countDown.value = false;
          clearInterval(timer);
          timer = null;
        } else {
          count.value--;
        }
      }, 1000);
    };

    const loginHandler = async () => {
      const { email, password, code } = obj.formData;
      if (!email) {
        showToast({ title: "请填写邮箱" });
      } else if (!validateMail(email)) {
        showToast({ title: "邮箱格式不正确" });
      } else if (!code) {
        showToast({ title: "请填写邮箱验证码" });
      } else if (!password) {
        showToast({ title: "请填写新密码" });
      } else {
        await resetPass({ ...obj.formData, password: md5(password) }).then(
          () => {
            showToast({ title: "找回密码成功" });
            router.push("/auth/login");
          }
        );
      }
    };

    return {
      ...toRefs(obj),
      isShow,
      loginHandler,
      showHandler,
      sendCodeHandler,
      countDown,
      count,
    };
  },
};
</script>
