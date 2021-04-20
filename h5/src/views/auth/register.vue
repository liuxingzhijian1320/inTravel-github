<style lang="scss" scoped>
@import "../../assets/styles/mixins.scss";

.register {
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
          color: #36cfc9;
        }
      }
    }
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
  .rule {
    margin-top: 0.6rem;
    .checkbox {
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.02rem;
      border: 0.01rem solid #d9d9d9;
      transition: all 0.2s ease;
      // &.active {
      //   background: #36cfc9;
      //   border-color: #36cfc9;
      //   i {
      //     color: #fff;
      //   }
      // }
      i {
        color: #fff;
      }
    }
    .rule-name {
      display: block;
      color: #d9d9d9;
    }
  }
}
</style>

<template>
  <div class="register">
    <h3 class="title">注册</h3>
    <div class="input-div">
      <input class="input cbtn" v-model.trim="formData.nickname"
        placeholder="昵称" />
    </div>
    <div class="input-div">
      <input class="input cbtn" v-model.trim="formData.email"
        placeholder="邮箱(登录账号)" />
    </div>
    <div class="input-div">
      <input class="input cbtn" :type="isShow ? 'text': 'password'"
        v-model.trim="formData.password" placeholder="密码" />
      <div class="eye-info dc" @click="showHandler">
        <i class="iconfont eye icon-eye" v-theme="isShow"></i>
      </div>
    </div>
    <div class="btn dc" v-theme-bg @click="loginHandler">注册</div>

    <!-- <div class="rule dc">
      <div class="checkbox dc" v-theme-bg="isChecked" @click="checkedHandler">
        <i class="iconfont icon-check" v-if="isChecked"></i>
      </div>
      <span class="rule-name">《注册协议》</span>
    </div> -->
  </div>
</template>

<script>
import md5 from "md5";

import { showToast } from "../../assets/scripts/tools";
import { reactive, ref, toRefs } from "vue";
import { validateMail } from "../../assets/scripts/utils";
import { userRegister } from "../../assets/api/user";
import { useRouter } from "vue-router";

export default {
  name: "blank",
  components: {},
  setup(props) {
    const router = useRouter();
    const isShow = ref(false);
    const isChecked = ref(true);
    const obj = reactive({
      formData: {
        nickname: "",
        email: "",
        password: "",
      },
    });

    const showHandler = () => {
      isShow.value = !isShow.value;
    };

    const checkedHandler = () => {
      isChecked.value = !isChecked.value;
    };

    const loginHandler = async () => {
      const { nickname, email, password } = obj.formData;
      if (!nickname) {
        showToast({ title: "请填写昵称" });
      } else if (!email) {
        showToast({ title: "请填写邮箱" });
      } else if (!validateMail(email)) {
        showToast({ title: "邮箱格式不正确" });
      } else if (!password) {
        showToast({ title: "请填写密码" });
      } else if (!isChecked.value) {
        showToast({ title: "请勾选《注册协议》" });
      } else {
        await userRegister({
          ...obj.formData,
          password: md5(password),
        }).then(() => {
          showToast({ title: "注册成功", position: "center" });
          router.replace("/auth/login");
        });
      }
    };

    return {
      ...toRefs(obj),
      isShow,
      isChecked,
      loginHandler,
      showHandler,
      checkedHandler,
    };
  },
};
</script>
