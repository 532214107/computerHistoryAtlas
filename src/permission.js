import Vue from 'vue'
import router from './router'
import store from './store'
import wechatAuth from './utils/wechatAuth' // 微信登录插件
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, LOGIN_STATUS } from '@/store/mutation-types'
import { isWeiXin } from '@/utils/util'
import { Notify } from 'vant'
const qs = require('qs')

Vue.use(wechatAuth, {
  appid: process.env.VUE_APP_WECHAT_APPID
})

router.beforeEach((to, from, next) => {
  // 页面标题
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  store.commit('SET_LOGIN_STATUS', Number(Vue.ls.get(LOGIN_STATUS)))
  const loginStatus = Number(store.getters.loginStatus)

  if (isWeiXin()) {
    // 微信授权和用户登陆验证
    switch (loginStatus) {
      case 0:
        wechatAuthRedirect()
        break

      case 1:
        wechatAuthReturnFromWechat(to)
        break

      default:
        checkUserAuth(to, from, next)
        break
    }
  } else {
    checkUserAuth(to, from, next)
  }
})

/**
 * 跳转到微信授权
 */
function wechatAuthRedirect () {
  // 设置微信授权回调地址
  wechatAuth.redirect_uri = processUrl()
  // 无论拒绝还是授权都设置成1
  store.dispatch('setLoginStatus', 1)
  // 跳转到微信授权页面
  window.location.href = wechatAuth.authUrl
}

/**
 * 微信授权返回
 */
function wechatAuthReturnFromWechat (to) {
  // 用户已授权，获取code
  try {
    // 通过回调链接设置code status
    wechatAuth.returnFromWechat(to.fullPath)
  } catch (err) {
    // 失败，设置状态未登录，刷新页面
    store.dispatch('setLoginStatus', 0)
    // location.reload()
  }
  // 同意授权 to.fullPath 携带code参数，拒绝授权没有code参数
  const code = wechatAuth.code
  if (code) {
    // 拿到code 访问服务端的登录接口
    store
      .dispatch('loginWechatAuth', code)
      .then(res => {
        // 成功设置已登录状态
        store.dispatch('setLoginStatus', 2)
        location.reload()
        // next()
      })
      .catch(() => {
        // 失败，设置状态未登录，刷新页面
        store.dispatch('setLoginStatus', 0)
        Notify('服务器微信授权错误')
      })
  } else {
    store.dispatch('setLoginStatus', 0)
  }
}

/**
 * 用户授权验证
 */
function checkUserAuth (to, from, next) {
  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.nickname) {
        store
          .dispatch('GetInfo')
          .then(() => {
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
          .catch(() => {
            Notify('登陆发生错误，请重新登陆。')
            store.dispatch('Logout').then(() => {
              if (!isWeiXin()) {
                next({ path: '/login', query: { redirect: to.fullPath } })
              } else {
                store.dispatch('setLoginStatus', 0)
                location.reload()
              }
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (!isWeiXin()) {
      if (to.path !== '/login') {
        next({ path: '/login', query: { redirect: to.fullPath } })
      } else {
        next()
      }
    } else {
      store.dispatch('setLoginStatus', 0)
      location.reload()
    }
  }
}

/**
 * 处理url链接
 * @returns {string}
 */
function processUrl () {
  const url = window.location.href
  // 解决多次登录url添加重复的code与state问题
  const urlParams = qs.parse(url.split('?')[1])
  let redirectUrl = url
  if (urlParams.code && urlParams.state) {
    delete urlParams.code
    delete urlParams.state
    const query = qs.stringify(urlParams)
    if (query.length) {
      redirectUrl = `${url.split('?')[0]}?${query}`
    } else {
      redirectUrl = `${url.split('?')[0]}`
    }
  }
  return redirectUrl
}
