import router from "./router/router";
import { getCookie, deleteCookie } from "./utils/cookie";
import { VerifyToken } from "./api/user";
import store from "./store";

// 这个是路由守卫
router.beforeEach((to, from, next) => {
  // 判断是不是去登陆页面，如果是，直接放行
  if (to.path === "/login") {
    next();
    return;
  }

  // 从vuex中获取token
  const token = store.state.token;
  // 如果token存在则判断token是否过期
  if (token !== undefined && token !== "") {
    VerifyToken(token).then((res) => {
      if (res.code === 200) {
        next();
      } else {
        // 清空token
        store.commit("deleteState", "token");
        // 清空cookie中的token
        deleteCookie("token");
        next("/login");
      }
    });
  } else {
    // 看看cookie中是否有token
    const cookieToken = getCookie("token");
    if (cookieToken !== undefined && cookieToken !== "") {
      // 如果cookie中有token验证是否有效
      VerifyToken(cookieToken).then((res) => {
        if (res.code === 200) {
          store.commit("updateState", { key: "token", value: cookieToken });
          next();
        } else {
          // 清空cookie中的token
          deleteCookie("token");
          next("/login");
        }
      });
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  // console.log(to, from, "after");
  // ...
});
