import request from "@/utils/request";

export function query(data) {
    return request({
        url: '/arrange/query',
        method: 'post',
        data: data
    })
}

export function AddF(data) {
    return request({
        url: '/arrange/UpdateFour',
        method: 'post',
        data: data
    })
}

export function AddFour(id) {
    return request({
        url: '/arrange/getFour/' + id,
        method: 'get',
    })
}

export function AddTH(data) {
    return request({
        url: '/arrange/UpdateThree',
        method: 'post',
        data: data
    })
}
export function AddThree(id) {
    return request({
        url: '/arrange/getThree/' + id,
        method: 'get',
    })
}

export function AddT(data) {
    return request({
        url: '/arrange/UpdateTwo',
        method: 'post',
        data: data
    })
}
export  function  AddTwo(id){
    return request({
        url: '/arrange/getTwo/' + id,
        method: 'get',
    })
}

export function AddO(data) {
    return request({
        url: '/arrange/UpdateOne',
        method: 'post',
        data: data
    })
}
export function AddOne(id) {
    return request({
        url: '/arrange/getOne/' + id,
        method: 'get',
    })
}
export function getFour(id) {
    return request({
        url: '/arrange/getFour/' + id,
        method: 'get',
    })
}
export function UpdateFour(data){
    return request({
        url: '/arrange/UpdateFour',
        method: 'post',
        data: data
    })
}
export function getThree(id) {
    return request({
        url: '/arrange/getThree/' + id,
        method: 'get',
    })
}
export function UpdateThree(data){
    return request({
        url: '/arrange/UpdateThree',
        method: 'post',
        data: data
    })
}
export function getTwo(id) {
    return request({
        url: '/arrange/getTwo/' + id,
        method: 'get',
    })
}
export function UpdateTwo(data){
    return request({
        url: '/arrange/UpdateTwo',
        method: 'post',
        data: data
    })
}

export function getOne(id) {
    return request({
        url: '/arrange/getOne/' + id,
        method: 'get',
    })
}
export function UpdateOne(data){
    return request({
        url: '/arrange/UpdateOne',
        method: 'post',
        data: data
    })
}
