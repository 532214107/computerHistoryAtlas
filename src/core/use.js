import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/base.less'

Vue.use(ElementUI)

Vue.use(VueStorage, config.storageOptions)
