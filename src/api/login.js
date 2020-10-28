import { axios } from '@/utils/request'

export const login = (data) => {
  return axios({
    url: '/v1/oauth/login',
    method: 'post',
    data
  })
}

export const loginByCode = (data) => {
  return axios({
    url: '/v1/oauth/WeChatLogin',
    method: 'post',
    data
  })
}

export const getInfo = (params) => {
  return axios({
    url: '/v1/user/info',
    method: 'get',
    params
  })
}

export const logout = (params) => {
  return axios({
    url: '/products',
    method: 'get',
    params
  })
}
