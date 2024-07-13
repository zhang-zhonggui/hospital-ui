import request from "@/utils/request";



export function getInfo() {
  return request({
    url: "/staff/loginInfo",
    method: "get",
  });
}
