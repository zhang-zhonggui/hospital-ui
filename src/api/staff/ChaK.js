import request from "@/utils/request";

export function addK(data) {
  return request({
    url: "/section/addK",
    method: "post",
    data: data,
  });
}

export function query(data) {
  return request({
    url: "/section/query",
    method: "post",
    data: data,
  });
}

export function deleted(id) {
  return request({
    url: "/section/delete/" + id,
    method: "get",
  });
}

export function showUpdateDialog(id) {
  return request({
    url: "/section/getK/" + id,
    method: "get",
  });
}

export function update(data) {
  return request({
    url: "/section/updtaeK",
    method: "post",
    data: data,
  });
}

export function closeState(id) {
  return request({
    url: "keshi/closestate?id=" + id,
    method: "get",
  });
}
export function openState(id) {
  return request({
    url: "keshi/openstate?id=" + id,
    method: "get",
  });
}
// 科室列表
export function list() {
  return request({
    url: "/section/list",
    method: "get",
  });
}
