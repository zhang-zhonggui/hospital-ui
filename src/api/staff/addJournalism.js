import request from "@/utils/request";

export function addJournalismApi(data) {
    return request({
        url: "/journalism/addJournalism",
        method: "post",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export function searchTypeApi() {
    return request({
        url: "/journalismType/searchType",
        method: "get",
    });
}
