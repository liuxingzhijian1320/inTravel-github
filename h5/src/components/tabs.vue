<style lang="scss" scoped>
.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  height: 1.2rem;
  display: flex;
  border-top: 1px solid #b4b4b4;
  .tabs-item {
    flex: 1;
    .tabs-title {
      text-align: center;
      font-size: 0.28rem;
      color: #333;
      font-weight: bold;
      // margin-top: 0.1rem;
    }
    // &.router-link-active {
    //   color: $theme_default;
    //   .tabs-title {
    //     color: $theme_default;
    //   }
    // }
  }
  .icon {
    font-size: 0.56rem;
  }
}
</style>

<template>
  <div class="tabs">
    <router-link :to="item.path" class="tabs-item dc" v-for="item in list"
      :key="item.id">
      <div :id="item.id">
        <i class="iconfont icon" :class="item.icon"></i>
        <div class="tabs-title">{{item.title}}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { reactive, toRefs, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "tabs",
  setup(props) {
    const route = useRoute();
    const activeRoute = ref(route.path);
    const vDirc = ref("");
    const obj = reactive({
      list: [
        {
          id: "router-index",
          title: "发现",
          path: "/index",
          icon: "icon-search",
        },
        {
          id: "router-travel",
          title: "旅游",
          path: "/travel",
          icon: "icon-heart",
        },
        {
          id: "router-my",
          title: "我的",
          path: "/my",
          icon: "icon-my",
        },
      ],
    });

    watch(
      () => route.path,
      (n, o) => {
        // console.info(234, n, o);
        activeRoute.value = n;
        eventChange();
      }
    );

    function eventChange() {
      for (let val of obj.list) {
        // console.log(123, val);
        if (val.path === activeRoute.value) {
          let dom = document.getElementById(val.id);
          const currentColor = document.body.getAttribute("data-theme");
          dom.firstChild.style["color"] = currentColor;
          dom.lastChild.style["color"] = currentColor;
          dom = null;
        } else {
          let dom = document.getElementById(val.id);
          dom.firstChild.style["color"] = "";
          dom.lastChild.style["color"] = "";
          dom = null;
        }
      }
    }

    onMounted(() => {
      // 更改主题颜色
      activeRoute.value = route.path;
      // console.log(11, activeRoute.value);
      eventChange(activeRoute.value);
    });

    return {
      ...toRefs(obj),
    };
  },
};
</script>


