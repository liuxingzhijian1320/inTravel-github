import Home from "../views/home/home.vue";

export default [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: {
      path: "/index"
    },
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/index/index"),
        meta: {
          title: "自游"
        }
      },

      {
        path: "/travel",
        name: "travel",
        component: () => import("../views/travel/index"),
        meta: {
          title: "旅游"
        }
      },
      {
        path: "/my",
        name: "my",
        component: () => import("../views/my/index"),
        meta: {
          title: "个人中心"
        }
      }
    ]
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/auth/index"),
    meta: {
      title: "欢迎您"
    }
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/auth/login"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("../views/auth/register"),
    meta: {
      title: "注册"
    }
  },
  {
    path: "/auth/forget",
    name: "forget",
    component: () => import("../views/auth/forget"),
    meta: {
      title: "忘记密码"
    }
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/index/search"),
    meta: {
      title: "搜索"
    }
  },
  {
    path: "/my/help",
    name: "help",
    component: () => import("../views/my/help"),
    meta: {
      title: "帮助"
    }
  },
  {
    path: "/my/setting",
    name: "setting",
    component: () => import("../views/my/setting"),
    meta: {
      title: "换肤"
    }
  },
  {
    path: "/my/info",
    name: "info",
    component: () => import("../views/my/info"),
    meta: {
      title: "个人信息"
    }
  },
  {
    path: "/my/declare",
    name: "declare",
    component: () => import("../views/my/declare"),
    meta: {
      title: "免责申明"
    }
  },
  {
    path: "/auth/updatepass",
    name: "pass",
    component: () => import("../views/auth/updatepass"),
    meta: {
      title: "更改密码"
    }
  },
  {
    path: "/hotel/roomlist",
    name: "roomlist",
    component: () => import("../views/hotel/roomlist"),
    meta: {
      title: "正在加载..."
    }
  },
  {
    path: "/hotel/detail",
    name: "detail",
    component: () => import("../views/hotel/detail"),
    meta: {
      title: "正在加载..."
    }
  },
  {
    path: "/hotel/set",
    name: "setroom",
    component: () => import("../views/hotel/set"),
    meta: {
      title: "预定"
    }
  },
  {
    path: "/hotel/comment",
    name: "comment",
    component: () => import("../views/hotel/comment"),
    meta: {
      title: "评论"
    }
  },
  {
    path: "/travel/detail",
    name: "traveldetail",
    component: () => import("../views/travel/detail"),
    meta: {
      title: "详情"
    }
  },
  {
    path: "/order/detail",
    name: "orderdetail",
    component: () => import("../views/order/detail"),
    meta: {
      title: "订单详情"
    }
  }
];
