<template>
  <div class="hello">
    <div>photo itbleu</div>
    <el-row style="margin-top: 50px">
      <el-col :span="24">
        <div style="width: 200px; margin: 0 auto">
          <el-input v-model="username" placeholder="Usario"></el-input>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 20px">
        <div style="width: 200px; margin: 0 auto">
          <el-input
            placeholder="senha"
            v-model="password"
            show-password
          ></el-input>
        </div>
      </el-col>

      <!-- 登陆按钮 -->
      <el-col :span="24" style="margin-top: 20px">
        <div style="width: 40px; margin: 0 auto">
          <el-button @click="login()" type="primary">login</el-button>
        </div>
      </el-col>
      <!-- 显示错误信息 -->
      <el-col :span="24" style="margin-top: 20px">
        <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
      </el-col>

      <!-- 测试区域开始 -->
      <!-- <el-col v-if="true" style>
        <el-button @click="addCookie()">addCookie</el-button>
        <el-button @click="getCookie()">getCookie</el-button>
        <el-button @click="deleteCookie()">deleteCookie</el-button>
        <el-button @click="addVuex()">addVuex</el-button>
        <el-button @click="getVuex()">getVuex</el-button>
        <el-button @click="deleteVuex()">deleteVuex</el-button>
      </el-col> -->
      <!-- 测试区域结束 -->
    </el-row>
  </div>
</template>

<script>
import { LoginApi } from "@/api/user";
import { setCookie } from "@/utils/cookie";

export default {
  name: "LoginVue",
  props: {
    msg: String,
  },
  data() {
    return {
      username: "eberson",
      password: "itblue390",
      errorMessage: "",
    };
  },
  watch: {
    errorMessage(newVal, oldVal) {
      // 当错误消息更新时，启动定时器
      if (newVal !== oldVal) {
        setTimeout(() => {
          this.errorMessage = ""; // 清空错误消息
        }, 3000); // 3秒后清空错误消息
      }
    },
  },
  methods: {
    async login() {
      this.errorMessage = "";
      const postData = {
        username: this.username,
        password: this.password,
      };
      this.password = ``;
      const res = await LoginApi(postData);
      if (res.code === 200) {
        //将token和用户名存入vuex和cookie中
        this.$store.commit("updateState", { key: "token", value: res.token });
        this.$store.commit("updateState", {
          key: "username",
          value: res.username,
        });
        setCookie("token", res.token, 30);
        this.$router.push("/searchProd");
      } else {
        this.errorMessage = res.msg;
      }
    },
    // addCookie() {
    //   setCookie("token", "123456", 1);
    // },
    // getCookie() {
    //   const cookie = getCookie("token");
    //   console.log(cookie);
    // },
    // deleteCookie() {
    //   deleteCookie("token");
    //   const cookie = getCookie("token");
    //   console.log(cookie);
    // },
    // addVuex() {
    //   this.$store.commit("updateState", { key: "token", value: "ddf" });
    // },
    // getVuex() {
    //   const token = this.$store.state.token;
    //   console.log(token);
    // },
    // deleteVuex() {
    //   this.$store.commit("deleteState", "token");
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
