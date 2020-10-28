import { axios } from '@/utils/request'

export const searchDisplayData = (params) => {
    return axios({
        url: '/searchDisplay',
        method: 'get',
        params
    })
}