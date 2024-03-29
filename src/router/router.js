import Vue from "vue";
import VueRouter from "vue-router";

// 导入你的组件
import LoginVue from "../components/login.vue";
import MainHome from "../components/searchProduto/index.vue";

// 使用 VueRouter 插件
Vue.use(VueRouter);

// 配置路由
const routes = [
  { path: "/", component: MainHome }, // 默认登录页
  { path: "/searchProd", component: MainHome }, // 定义路径为 '/'，对应 Home 组件
  { path: "/login", component: LoginVue }, // 定义路径为 '/about'，对应 About 组件
];

// 创建路由实例
const router = new VueRouter({
  routes,
});

// 导出路由实例
export default router;
