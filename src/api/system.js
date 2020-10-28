import { axios } from '@/utils/request'
export const systemhData = (params) => {
    return axios({
        url: '/searchSchema',
        method: 'get',
        params
    })
}