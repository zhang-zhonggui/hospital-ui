import request from "@/utils/request";


export function query(data) {
    return request({
        url: '/dept/query',
        method: 'post',
        data: data
    })

}

export function update(data) {
    return request({
        url: '/dept/update',
        method: 'post',
        data: data
    })
}

export function getDeptById(id) {
    return request({
        url: '/dept/get/' + id,
        method: 'get',
    })
}

export function deleteDept(id) {
    return request({
        url: '/dept/delete/' + id,
        method: 'get',
    })
}

export function sava(data) {
    return request({
        url: '/dept/add',
        method: 'post',
        data: data
    })
}
export function closeState(id){
    return request({
        url: '/dept/closeState?id='+id,
        method: 'get',
    })
}
export function  openState(id){
    return request({
        url: '/dept/openState?id='+id,
        method: 'get',
    })
}
