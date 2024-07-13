import request from "@/utils/request";

export function backData() {
    return request({
        url: '/journalism/index',
        method: 'post',
    })
}
