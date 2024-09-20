import request from "@/utils/request";

export function journalismCheck(data) {
  return request({
    url: "/journalism/journalismCheck",
    method: "post",
    data: data,
  });
}
export function noPassNews(data) {
  return request({
    url: "/journalism/noPassNews",
    method: "post",
    data: data,
  });
}
export function showNews(id){
  return request({
    url: "/journalism/showJournalism/" + id,
    method: "get",
  });
}
export function passJournalism(id) {
  return request({
    url: "/NewsPassId/passAddJournalism/" + id,
    method: "get",
  });
}

