import { axios } from '@/utils/request'
export const getGraph = (params) => {
    return axios({
        url: '/searchGraph/',
        method: 'get',
        params
    })
}