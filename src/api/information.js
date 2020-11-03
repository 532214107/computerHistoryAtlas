import {axios} from "@/utils/request"
export const getExtraction = (params) => {
    return axios({
        url: '/api/extraction',
        method: 'get',
        params
    })
}

export const postExtraction = (data) => {
    return axios({
        url: '/extraction_export/',
        method: 'post',
        data
    })
}