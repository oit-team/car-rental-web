import { post } from './index'

export function userLogin(params: any) {
  return post('/system/login/userLogin', params)
}

export function getCodeImg(params: any, config: any) {
  return post('/system/login/checkCodeImg', params, config)
}
