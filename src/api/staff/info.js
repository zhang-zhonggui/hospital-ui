import request from "@/utils/request";


export function getStaffInfo(){
    return request({
        url: '/staffData/getStaff',
        method: 'get'
    })
}
