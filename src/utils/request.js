import axios from "axios";
import {Notification} from "element-ui";
import {getToken} from "@/utils/auth";
// 基本配置
const instance = axios.create({
    baseURL: "/api", // 根据实际情况修改API地址
    timeout: 500000, // 设置超时时间，单位为ms
});

/**
 *  请求拦截器
 */
instance.interceptors.request.use(
    (config) => {
        // 设置请求头部分，这里举例使用了localStorage存储的token作为身份标识
        config.headers["Authorization"] = getToken();
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

/**
 *  响应拦截器
 */
// 全局响应拦截器，只处理通用逻辑
instance.interceptors.response.use(
    (response) => {
        return response.data; // 直接返回 data
    },
    (error) => {
        Notification({
            message: error.message,
            type: "error",
        });
        return Promise.reject(error);
    }
);
export default instance;
