import { axios } from '@/utils/request'

// https://pchistory.demo.actkg.com/searchFrameCondition?node=晶体管
export const searchFrameCondition = (params) => {
    return axios({
        url: '/searchFrameCondition',
        method: 'get',
        params
    })
}

// https://search.demo.actkg.com/api/robot/talk/?q=%E6%B0%A7%E4%BC%A0%E6%84%9F%E5%99%A8%E6%8D%9F%E5%9D%8F%E5%A6%82%E4%BD%95%E7%BB%B4%E4%BF%AE&username=test&KGname=YQ_Demo
export const searchData = (params) => {
    return axios({
        url: '/api/robot/talk',
        method: 'get',
        params
    })
}