<template>
  <div class="banner">
    <div class="title">下一站，你会在哪？</div>
    <div class="subtitle">Where will you go next?</div>
  </div>
</template>

<script>
export default {
  mounted() {},
}
</script>

<style lang="scss">
.banner {
  background-image: url('../assets/images/bg.png');
  background-size: 100% 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  padding-top: 180px;
  box-sizing: border-box;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  .title {
    font-size: 36px;
    opacity: 0.95;
  }
  .subtitle {
    font-size: 32px;
    margin-top: 10px;
    opacity: 0.8;
  }
}
</style>
