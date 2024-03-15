import router from "./router/router";

// 这个是路由守卫
router.beforeEach((to, from, next) => {
  console.log(to, from, "before");
  console.log("verficar token");
  // ...
  next();
});

router.afterEach((to, from) => {
  console.log(to, from, "after");
  // ...
});
