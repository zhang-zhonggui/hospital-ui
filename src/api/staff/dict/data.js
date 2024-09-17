import request from "@/utils/request";

export function listData(data) {
  return request({
    url: "/dictData/list",
    method: "post",
    data: data,
  });
}

export function addData(data) {
  return request({
    url: "/dictData/save",
    method: "post",
    data: data,
  });
}
export function updateData(data) {
  return request({
    url: "/dictData/update",
    method: "post",
    data: data,
  });
}
export function deleteData(dataCode) {
  return request({
    url: "/dictData/delete/" + dataCode,
    method: "delete",
  });
}
