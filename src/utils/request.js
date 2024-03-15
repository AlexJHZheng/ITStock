import axios from "axios";
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

// request interceptor 从cookie中获取token,然后添加到请求头中，用bearer token的形式
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  (response) => {
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: response.data.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      return Promise.reject(new Error(response.data.message || "Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
