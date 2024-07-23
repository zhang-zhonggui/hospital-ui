import request from "@/utils/request";

export function query(data) {
    return request({
        url: '/DealPatient/query',
        method: 'post',
        data: data
    })
}


export function update(data) {
    return request({
        url: '/DealPatient/update',
        method: 'post',
        data: data
    })
}

export function getDeptById(id) {
    return request({
        url: '/DealPatient/get/' + id,
        method: 'get',
    })
}
