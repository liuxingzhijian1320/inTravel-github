<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.login {
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
  <div class="login">
    <h3 class="title">登录</h3>
    <div class="input-div">
      <input class="input cbtn" v-model.trim="formData.email"
        placeholder="邮箱" />
    </div>
    <div class="input-div">
      <input class="input cbtn" :type="isShow ? 'text': 'password'"
        v-model.trim="formData.password" placeholder="密码" />
      <div class="eye-info dc" @click="showHandler">
        <i class="iconfont eye icon-eye" v-theme="isShow"></i>
      </div>
    </div>
    <div class="forget" @click="forgetPassHandler">忘记密码？</div>
    <div class="btn dc" v-theme-bg @click="loginHandler">登录</div>
  </div>
</template>

<script>
import md5 from "md5";
import { showToast } from "../../assets/scripts/tools";
import { reactive, ref, toRefs } from "vue";
import { validateMail } from "../../assets/scripts/utils";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { userLogin } from "../../assets/api/user";
export default {
  name: "blank",
  components: {},
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const isShow = ref(false);
    const obj = reactive({
      formData: {
        email: "",
        password: "",
      },
    });

    const showHandler = () => {
      isShow.value = !isShow.value;
    };
    const forgetPassHandler = () => {
      router.push("/auth/forget");
    };

    const loginHandler = async () => {
      const { email, password } = obj.formData;
      if (!email) {
        showToast({ title: "请填写邮箱" });
      } else if (!validateMail(email)) {
        showToast({ title: "邮箱格式不正确" });
      } else if (!password) {
        showToast({ title: "请填写密码" });
      } else {
        await userLogin({ ...obj.formData, password: md5(password) }).then(
          (res) => {
            showToast({ title: "登录成功", position: "center" });
            router.replace("/my");
            store.commit("saveUserInfo", res);
          }
        );
      }
    };

    return {
      ...toRefs(obj),
      isShow,
      loginHandler,
      showHandler,
      forgetPassHandler,
    };
  },
};
</script>
