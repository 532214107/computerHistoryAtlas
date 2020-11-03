// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// import { VueAxios } from './utils/request'

import bootstrap from './core/bootstrap'
import './core/use'
// import './permission' // permission control

Vue.config.productionTip = false
// 动态title
router.beforeEach((to, from, next)=>{
    if(to.meta.title){
        document.title = to.meta.title
    }
    next()
})
// mount axios Vue.$http and this.$http
// Vue.use(VueAxios)
import echart from 'echarts'
Vue.prototype.$echart = echart
new Vue({
    router,
    store,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app')