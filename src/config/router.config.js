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
        component: () => import('@/views/home/Home'),
        meta: { title: '图谱展示 - 计算机历史图谱', keepAlive: false } // 动态title
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search'),
        meta: { title: '知识体系 - 计算机历史图谱', keepAlive: false } // 动态title
      },
      {
        path: '/system',
        name: 'system',
        component: () => import('@/views/system'),
        meta: { title: '数据统计 - 计算机历史图谱', keepAlive: false } // 动态title
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import('@/views/statistics'),
        meta: { title: '数据搜索 - 计算机历史图谱', keepAlive: false } // 动态title
      },
      {
        path: '/informationExtraction',
        name: 'informationExtraction',
        component: () => import('@/views/informationExtraction'),
        meta: { title: '信息抽取 - 计算机历史图谱', keepAlive: false } // 动态title
      },
      // {
      //   path: '/test',
      //   name: 'test',
      //   component: () => import('@/views/test'),
      //   meta: { title: '测试 - 计算机历史图谱', keepAlive: false } // 动态title
      // },
    ]
  }
]
