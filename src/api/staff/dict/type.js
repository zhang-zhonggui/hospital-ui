import request from "@/utils/request";

export function listType() {
  return request({
    url: "/dictType/type/list",
    method: "get",
  });
}
export function addType(data) {
  return request({
    url: "/dictType/save",
    method: "post",
    data: data,
  });
}

export function deleteType(id) {
  return request({
    url: "/dictType/delete/" + id,
    method: "delete",
  });
}

export function updateType(data) {
  return request({
    url: "/dictType/update",
    method: "post",
    data: data,
  });
}
