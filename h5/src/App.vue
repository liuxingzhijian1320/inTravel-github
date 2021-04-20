<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import { rem } from "./assets/scripts/rem";
export default {
  name: "App",
  components: {},
  setup(props) {
    rem();
    return {};
  },
};
</script>
<style lang="scss">
body {
  font-size: 0.28rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
