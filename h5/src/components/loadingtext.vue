<template>
  <div class="loadingtext dc">
    {{title}}
  </div>
</template>
<script>
export default {
  name: "loadingtext",
  props: {
    title: {
      type: String,
      default: "正在加载中...",
    },
  },

  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loadingtext {
  height: 1.2rem;
  color: #999;
}
</style>
