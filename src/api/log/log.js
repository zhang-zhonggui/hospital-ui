import request from "@/utils/request";


export function getLogData(data) {
    return request({
        url: '/log/getLogDate',
        method: 'post',
        data: data
    })
}
