import type { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      /**
       * 综合管理
       * */
      {
        path: '/brand/brandInteManage',
        name: 'IntegratedManage',
        component: () => import('@/views/manage/Integrated/IntegratedManage.vue'),
      },
      /**
       * 角色管理
       * */
      {
        path: '/role/roleList',
        name: 'UserManage',
        component: () => import('@/views/manage/role/UserManage.vue'),
      },
      /**
       * 新增或修改角色
       */
      {
        path: '/role/roleUpdata/:item/:type',
        name: 'RoleUpdata',
        component: () => import('@/views/manage/role/RoleUpdata.vue'),
      },
      /**
       * 区域管理
       */
      {
        path: '/org/orgList',
        name: 'OrgList',
        component: () => import('@/views/manage/org/Orglist.vue'),
      },
      /**
       * 新增区域
       */
      {
        path: '/org/orgUpdata',
        name: 'OrgUpdata',
        component: () => import('@/views/manage/org/Updata.vue'),
      },
    ],
  },
]
