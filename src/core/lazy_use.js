import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import 'amfe-flexible'
import '@/core/lazy_lib/components_use'
import '@/assets/style/base.less'

Vue.use(VueStorage, config.storageOptions)
