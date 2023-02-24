import { post } from './index'

/**
 * 获取角色管理列表
 * */
export function getRoleList(params: any) {
  return post('/system/role/getRoleList', params)
}

/**
 * 新增角色
 * */
export function insertRole(params: any) {
  return post('/system/role/insertRole', params)
}

/**
 * 修改角色信息
 * */
export function updateRoleById(params: any) {
  return post('/system/role/updateRoleById', params)
}

/**
 * 删除角色
 * */
export function delRoleById(params: any) {
  return post('/system/role/delRoleById', params)
}

/**
 * 区域列表
 * */
export function getTreeOrgList(params: any) {
  return post('/system/org/getTreeOrgList', params)
}

/**
 * 新增区域
 * */
export function addOrgInfo(params: any) {
  return post('/system/org/addOrgInfo', params)
}

/**
 * 修改区域信息
 * */
export function updateOrgById(params: any) {
  return post('/system/org/updateOrgById', params)
}

/**
 * 删除区域
 * */
export function delOrgInfo(params: any) {
  return post('/system/org/delOrgInfo', params)
}

/**
 * 查询部门列表
 * */
export function getDeptList(params: any) {
  return post('/system/dept/getDeptList', params)
}

/**
 * 新增部门
 * */
export function addDeptInfo(params: any) {
  return post('/system/dept/addDeptInfo', params)
}

/**
 * 修改部门
 * */
export function updateDeptInfo(params: any) {
  return post('/system/dept/updateDeptInfo', params)
}

/**
 * 删除部门
 * */
export function delDeptInfo(params: any) {
  return post('/system/dept/delDeptInfo', params)
}
