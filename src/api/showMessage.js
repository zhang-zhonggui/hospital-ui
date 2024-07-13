import request from "@/utils/request";

export function getData(id) {
    return request({
        url: '/journalism/showHtml/' + id,
        method: 'get'
    })
}
