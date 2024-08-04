import request from "@/utils/request";


export function getStaffInfo() {
    return request({
        url: '/staffData/getStaff',
        method: 'get'
    })
}

export function uploadAvatar(data) {
    return request({
        url: '/staffData/chengImg',
        method: 'post',
        data: data
    })
}
