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
    <div class="title">免责声明</div>
    <div class="subtitle">
      《自游》项目即将作为开源项目，项目中的图片，音频等知识产权元素如若发生侵权行为，请联系博主，将永久性下架项目
    </div>
    <div class="info">
      <img src="../../assets/images/qrcode.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "declare",
  components: {},
};
</script>
