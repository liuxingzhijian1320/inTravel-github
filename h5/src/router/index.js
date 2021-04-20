import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import store from "../store";
import routes from "./routes";

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
  // linkActiveClass: "router-select-active",
  scrollBehavior(to, from, savedPosition) {
    // console.info(to);
    // 后退页面时, 保留滚动位置
    // if (savedPosition) {
    //   return savedPosition;
    // }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  store.commit("checkUserInfo");
  store.commit("getSkinColor");
  document.title = to.meta.title;
  next();
});

export default router;
