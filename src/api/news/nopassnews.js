import request from "@/utils/request.js";

export function getPages(data) {
  return request({
    url: "/JournalismNoPass/noPassInfo",
    method: "post",
    data: data,
  });
}
export function getShowNoPassById(id) {
  return request({
    url: "/JournalismNoPass/showNoPass?id=" + id,
    method: "get",
  });
}
