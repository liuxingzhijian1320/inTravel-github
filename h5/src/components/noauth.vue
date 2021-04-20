<style lang="scss" scoped>
.no-auth {
  padding-top: 3rem;
  position: relative;
}
.icon-empty {
  font-size: 1.5rem;
  // color: $theme_default;
  position: absolute;
  top: 1.3rem;
  left: 50%;
  transform: translateX(-50%);
}
.title {
  text-align: center;
  font-size: 0.28rem;
  margin: 0.3rem 0;
}
.btn {
  width: 3rem;
  height: 0.8rem;
  // background: $theme_default;
  border-radius: 0.4rem;
  color: #fff;
  font-size: 0.3rem;
  margin: 0 auto;
}
</style>
<template>
  <div class="no-auth">
    <i class="iconfont icon-empty" v-theme></i>
    <div class="title">登录查看更多</div>
    <div class="btn dc" v-theme-bg @click="login">登录</div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";

export default {
  name: "avatar",
  setup({ name }) {
    const router = useRouter();
    const login = () => {
      router.push("/auth");
    };
    return {
      login,
    };
  },
};
</script>

