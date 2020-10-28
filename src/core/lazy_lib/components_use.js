/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue'
import {
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Lazyload,
  Sidebar,
  SidebarItem,
  Search,
  NavBar,
  SwipeCell,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Sku,
  Loading,
  List,
  Field,
  Dialog
} from 'vant';

Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Lazyload)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Search)
Vue.use(NavBar)
Vue.use(SwipeCell)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Stepper)
Vue.use(Sku)
Vue.use(Loading)
Vue.use(List)
Vue.use(Field)
Vue.use(Dialog)