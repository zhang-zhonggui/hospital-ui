import request from "@/utils/request";


export function setstate(id) {
    return request({
        url: "/sta/setstate?id=" + id,
        method: "get",
    })
}

export function handleSetSuccess(id) {
    return request({
        url: "/sta/changeState?id=" + id,
        method: "get",
    })
}
