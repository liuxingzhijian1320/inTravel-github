<style lang="scss" scoped>
.blank {
  .bg {
    width: 6rem;
    display: block;
    margin: 1rem auto;
  }
  .title {
    color: #404040;
    font-weight: bold;
    font-size: 0.36rem;
    text-align: center;
    letter-spacing: 2px;
  }
  .subtitle {
    color: #d9d9d9;
    font-size: 0.28rem;
    margin-top: 0.2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .btn {
    height: 0.98rem;
    width: 5.8rem;
    border-radius: 0.49rem;
    margin: 0 auto;
    font-size: 0.32rem;
    &.login {
      // background: #36cfc9;
      color: #fff;
      margin-bottom: 0.2rem;
    }
    &.register {
      background: #f5f5f5;
      color: #404040;
    }
  }
}
</style>
<template>
  <div class="blank">
    <img class="bg" src="../../assets/images/1.png" alt="">
    <h3 class="title">你的旅行计划</h3>
    <h5 class="subtitle">预订一间我们独一无二的酒店来逃离平凡</h5>
    <div class="login btn dc" v-theme-bg @click="loginHander">登录</div>
    <div class="register btn dc" @click="registerHander">注册</div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "blank",
  components: {},
  setup(props) {
    const router = useRouter();

    const loginHander = () => {
      router.push("/auth/login");
    };

    const registerHander = () => {
      router.push("/auth/register");
    };

    return {
      loginHander,
      registerHander,
    };
  },
};
</script>
