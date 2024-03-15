// 使用axios进行接口调用
import request from "@/utils/request";

//定义注册方法，传入用户密码对象

export function LoginApiTest(data) {
  return request({
    url: "/userlogin",
    method: "post",
    data,
  });
}
