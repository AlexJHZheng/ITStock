<template>
  <div class="hello">
    <div>photo itbleu</div>
    

    <el-row style="margin-top: 50px;">
  <el-col :span="24">
    <el-input v-model="username" placeholder="Usario"></el-input>
  </el-col>
  <el-col :span="24" style="margin-top: 20px;" >
    <el-input placeholder="senha" v-model="password" show-password></el-input>
  </el-col>
  <el-col :span="24" style="margin-top: 20px;" >
    <!-- 显示错误信息 -->
    <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
  </el-col>
  <el-col :span="24" style="margin-top: 20px;" >
    <el-button @click="login()" type="primary">login</el-button>
    <el-button @click="test()" type="primary">测试</el-button>
  </el-col>
</el-row>
  </div>
</template>

<script>
import { LoginApiTest} from '@/api/user';


export default {
  name: 'LoginVue',
  props: {
    msg: String
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  watch: {
    errorMessage(newVal, oldVal) {
      // 当错误消息更新时，启动定时器
      if (newVal !== oldVal) {
        setTimeout(() => {
          this.errorMessage = ''; // 清空错误消息
        }, 3000); // 3秒后清空错误消息
      }
    }
  },
  methods: {
    async login() {
      this.errorMessage = '';

      const postData = {
        username: this.username,
        password: this.password
      };
      this.password=``;
      // const res = loginApi(postData);
      const res =await LoginApiTest(postData);
      if(res.code===200){
        this.$router.push('/home');
      }else{
        this.errorMessage = res.msg;
      }
  },
  test(){
    //将用户名存入vuex
    this.$store.commit('updateUsername', this.username);
    //使用弹出框弹出vuex中 存入的用户名
    this.$alert(this.$store.state.username, '提示', {
      confirmButtonText: '确定',
      callback: action => {
        this.$message({
          type: 'info',
          message: `action: ${ action }`
        });
      }
    });
    }
   } 
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
