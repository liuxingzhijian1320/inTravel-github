import { createApp } from "vue";

import router from "./router";
import store from "./store";
import App from "./App.vue";

import "./assets/styles/index.scss";

import loading from "./components/loading";
import loadingtext from "./components/loadingtext";
import empty from "./components/empty";
import avatar from "./components/avatar";
import noauth from "./components/noauth";
import { friendlyFormatTime } from "./assets/scripts/utils";

export const app = createApp(App);

// 自定义注册plugins
import usePluginsEffect from "./assets/plugins";
usePluginsEffect(app);
// 自定义directive
import useDirectiveEffect from "./directive";
useDirectiveEffect(app);

// 注册全局过滤器
app.config.globalProperties.$filters = {
  // 友好时间
  friendlyDate(value) {
    return friendlyFormatTime(value);
  }
};

// 全局注册组件
app.component("loading", loading);
app.component("empty", empty);
app.component("avatar", avatar);
app.component("loadingtext", loadingtext);
app.component("noauth", noauth);

app.use(store);
app.use(router);
app.mount("#app", { username: "10个肉包子" });
