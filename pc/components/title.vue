<template>
  <div class="title-box layout">
    <div class="squ">
      <span class="subtitle">{{subtitle}}</span>
      <span class="name">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle'],
  mounted() {},
}
</script>

<style lang="scss">
.title-box {
  margin: 100px auto 50px auto;
  width: 820px;
  height: 1px;
  background: #7fd8bb;
  position: relative;
  .squ {
    position: absolute;
    padding: 5px 10px;
    background: #fff;
    color: #00b177;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -70%);
    display: flex;
    flex-direction: column;
    text-align: center;
    span {
      display: inline-block;
      &.subtitle {
        color: #c9c9c9;
        font-size: 14px;
        margin-bottom: 5px;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
