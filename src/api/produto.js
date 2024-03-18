// 使用axios进行接口调用
import request from "@/utils/request";
import { getCookie } from "@/utils/cookie";

//获取产品列表
export function searchProdutos(type) {
  return request({
    url: "/searchProdutos",
    method: "post",
    data: { pfullname: type },
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
}
