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
        url: '/filterSearch/',
        method: 'post',
        data
    })
}


/**
 * 删除属性
 * @data {deleteNeoIds: 'id' , label: '组织'} data 
 */
export const deleteEntities = (data) => {
    return axios({
        url: '/deleteEntities/',
        method: 'post',
        data
    })
}

/**
 * 属性修改
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

/**
 * 导出
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

/**
 * 入库
 * 
 */
export const batchUpload = (data) => {
    return axios({
        url: '/batchUpload/',
        method: 'post',
        data
    })
}

