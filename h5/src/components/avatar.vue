<style lang="scss" scoped>
.avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #f5f5ff;
  position: absolute;
  right: 0rem;
  top: 50%;
  transform: translateY(-50%);
  .my-icon {
    color: #fff;
    font-size: 1rem;
  }
  span {
    font-size: 0.6rem;
  }
}
</style>
<template>
  <div class="avatar dc" :style="{'width': `${width}rem`, height: `${height}`}">
    <span v-if=" key">{{key}}</span>
    <i v-if="!key" class="iconfont icon-my my-icon"></i>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "avatar",
  props: {
    name: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 1.2,
    },
    height: {
      type: Number,
      default: 1.2,
    },
  },

  setup({ name }) {
    const key = ref("");
    if (name) {
      key.value = name.slice(0, 1);
    }

    return {
      key,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
