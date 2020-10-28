import Vue from 'vue'
import { login, loginByCode, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, LOGIN_STATUS } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    loginStatus: 0,
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGIN_STATUS: (state, loginStatus) => {
      if ([0, 1, 2].indexOf(loginStatus) === -1) {
        loginStatus = 0
      }
      state.loginStatus = loginStatus
      Vue.ls.set(LOGIN_STATUS, loginStatus, 7 * 24 * 60 * 60 * 1000)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.status === 'success') {
            const result = response.data
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          commit('SET_INFO', result)
          commit('SET_NAME', { name: result.name })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登录相关，通过code获取token和用户信息
    loginWechatAuth ({ commit }, code) {
      const data = {
        code: code
      }
      return new Promise((resolve, reject) => {
        loginByCode(data)
          .then(res => {
            const { token } = res.data
            // 存用户信息，token
            // commit('SET_INFO', saveUserInfo(res.data.user))
            Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', token)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 设置状态
    setLoginStatus ({ commit }, query) {
      if (query === 0 || query === 1) {
        // 上线打开注释，本地调试注释掉，保持信息最新
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_INFO', '')
      }
      // 设置不同的登录状态
      commit('SET_LOGIN_STATUS', query)
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
