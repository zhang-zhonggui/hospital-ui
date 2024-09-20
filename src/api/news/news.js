import requset from "@/utils/request";

export function journalism(data) {
  return requset({
    url: "/journalism/journalismPassCheck",
    method: "post",
    data: data,
  });
}

export function showPassById(id){
    return requset({
        url: "/journalism/showPassId/" + id,
        method: "get",
    });
}
export function zhiDing(id){
    return requset({
        url: "/journalism/getZhi/" + id,
        method: "get",
    });
}
export function shang(id){
    return requset({
        url: "/journalism/getShang/" + id,
        method: "get",
    });

}
export function xia(id){
    return requset({
        url: "/journalism/getXia/" + id,
        method: "get",
    });
}
export function searchRoleType(){
    return requset({
        url: "/roleNews/searchRole",
        method: "get",
    });
}