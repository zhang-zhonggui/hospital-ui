import request from "@/utils/request";


export function updatePassword(data) {
    return request({
        url: '/staffData/update',
        method: 'post',
        data: data
    })
}
