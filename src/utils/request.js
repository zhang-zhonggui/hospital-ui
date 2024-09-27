import axios from 'axios';
import {Notification, MessageBox} from 'element-ui';
import {getToken} from "@/utils/auth";
// 基本配置
const instance = axios.create({
    baseURL: '/api', // 根据实际情况修改API地址
    timeout: 500000 // 设置超时时间，单位为ms
});

/**
 *  请求拦截器
 */
instance.interceptors.request.use(config => {
    // 设置请求头部分，这里举例使用了localStorage存储的token作为身份标识
    config.headers['Authorization'] = getToken();
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

/**
 *  响应拦截器
 */instance.interceptors.response.use(
    (response) => {  // 使用箭头函数
        const data = response.data;
        if (data && data.code !== 200) {
            console.log(data);
            MessageBox({
                message: data.message,
                type: 'error'
            })
            return data;
        } else {
            return data;
        }
    },
    (error) => {  // 使用箭头函数
        // 在这里可以添加错误处理的逻辑，例如使用 $message.error 显示错误信息
        Notification({
            message: error.message,
            type: 'error'
        });
        return Promise.reject(error);
    }
);
export default instance;
