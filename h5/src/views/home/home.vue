<template>
  <div class="home">
    <div class="home-content">
      <router-view></router-view>
    </div>
    <tabs></tabs>
  </div>
</template>

<script>
import tabs from "../../components/tabs";
export default {
  name: "Home",
  components: {
    tabs,
  },
};
</script>
<style lang="scss">
.home-content {
  padding-bottom: 1.2rem;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
