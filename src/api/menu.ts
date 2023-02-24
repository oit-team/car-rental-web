import { post } from './index'

/**
 * 获取当前页面菜单 JSON
 * @param params
 */
export function getJsonData(params: any) {
  return post('/system/menu/getJsonData', params)
}

/**
 * 获取菜单列表
 * @param params
 */
export function getTreeMenuList(params: any) {
  return post('/system/menu/getTreeMenuList', params)
}
