import request from "@/utils/request";


export function uploadSta(data) {
    return request({
        url: "/staffSource/upload",
        method: "post",
        data: data
    })
}

export function saveStaff(data) {
    return request({
        url: "/sta/add",
        method: "post",
        data: data
    })
}


export function update(data) {
    return request({
        url: "/sta/update",
        method: "post",
        data: data
    })
}

export function del(id) {
    return request({
        url: "/sta/delete/" + id,
        method: "get",
    })
}

export function getStaffList(data) {
    return request({
        url: "/sta/query",
        method: "post",
        data: data
    })
}

export function updateDialog(id) {
    return request({
        url: "/sta/get/" + id,
        method: "get",
    })
}

export function getBranchList() {
    return request({
        url: "/branch/list",
        method: "get",
    })
}

export function getKeshiList() {
    return request({
        url: "/keshi/list",
        method: "get",
    })
}
export function getTitleList(){
    return request({
        url: "/title/list",
        method: "get",
    })
}
