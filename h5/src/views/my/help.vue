<style lang="scss">
.help {
  min-height: 100vh;
  padding: 0.3rem;
  box-sizing: border-box;
}
.title {
  font-size: 0.32rem;
  font-weight: 500;
  text-align: center;
  padding: 0.1rem 0 0.3rem 0;
}
.subtitle {
  font-size: 0.28rem;
  line-height: 1.6;
}
.info {
  padding-top: 1rem;
  text-align: center;
  img {
    width: 4rem;
  }
}
</style>
<template>
  <div class="help">
    <div class="title">《自游》项目介绍</div>
    <div class="subtitle">
      h5端: vue3 + vuex + vue-router 来开发<br>
      server端: egg <br>
      admin端: react17+hook<br>
      pc端: nuxtjs
    </div>
    <div class="info">正在开源阶段 loading...</div>

    <div class="info">
      <img src="../../assets/images/qrcode.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "blank",
  components: {},
};
</script>
