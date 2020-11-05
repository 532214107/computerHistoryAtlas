import {axios} from "@/utils/request"
// 获取下拉框内容  == 待定
export const getUserSchema = (params) => {
    return axios({
        url: '/getUserSchema/',
        method: 'get',
        params
    })
}
// 获取表格内容 == 
/**
 * 
 * @param {
 * entityName: ""
   label: "组织"} data 
 */
export const getSingleCategory = (data) => {
    return axios({
        url: '/getSingleCategory/',
        method: 'post',
        data
    })
}


// 获取表格内容 =
/**
 * 
 * @data {deleteNeoIds: 'id' , label: '组织'} data 
 */
export const deleteEntities = (data) => {
    return axios({
        url: '/deleteEntities/',
        method: 'post',
        data
    })
}
// 属性修改 =
/**
 * 修改
 * @data {
 * label: "组织"
 * updateNode: '属性字拼接的符串'
 * } data 
 */
export const modifyEntities = (data) => {
    return axios({
        url: '/modifyEntities/',
        method: 'post',
        data
    })
}
// 导出 =
/**
 * 修改
 * @data {
 * entityName: ""
   label: "组织"
 * } data 
 */
export const csvDownload = (data) => {
    return axios({
        url: '/csvDownload/',
        method: 'post',
        data
    })
}

