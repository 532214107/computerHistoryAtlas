// eslint-disable-next-line
import { BasicLayout, RouteView, PageView } from '@/layouts'

export const asyncRouterMap = [

]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: '_home',
    component: PageView,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search')
      },
      {
        path: '/system',
        name: 'system',
        component: () => import('@/views/system')
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/views/statistics')
      }
    ]
  }
]
