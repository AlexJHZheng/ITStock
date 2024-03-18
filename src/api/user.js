// 使用axios进行接口调用
import request from "@/utils/request";
import { getCookie } from "@/utils/cookie";

// cookie中取出token
// const token = getCookie("token");
// console.log(token, "token");
// const headers = {
//   Authorization: `Bearer ${token}`,
// };

//定义注册方法，传入用户密码对象
//登陆接口
export function LoginApi(data) {
  return request({
    url: "/userlogin",
    method: "post",
    data,
  });
}
//验证token接口
export function VerifyToken() {
  return request({
    url: "/verifyToken",
    method: "post",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
}
