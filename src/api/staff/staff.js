import request from "@/utils/request";

export function login(data) {
    return request({
        url: '/staff/login',
        method: 'post',
        data: data
    })
}
