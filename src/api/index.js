import ajax from './ajax'

const BASE = ''
// 登陆
export const reqLogin = (data) => ajax(BASE + '/login', data, 'POST')

// 添加用户
export const reqAddUser = (data) => ajax(BASE + '/mamge/user/add', data, 'POST')