import { createStore } from "vuex";

import user from "./modules/user";
import comment from "./modules/comment";
import skin from "./modules/skin";

export default createStore({
  modules: {
    user,
    comment,
    skin
  },
  strict: process.env.NODE_ENV !== "production" // 严格模式
});
