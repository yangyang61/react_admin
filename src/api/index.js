import jsonp from 'jsonp'
import ajax from './ajax'

import { message } from 'antd'

const BASE = ''
// 登陆
export const reqLogin = (data) => ajax(BASE + '/login', data, 'POST')

// 添加用户
export const reqAddUser = (data) => ajax(BASE + '/mamge/user/add', data, 'POST')

// 获取一级/二级分类列表
export const reqCategories = (parentId) => ajax(BASE + '/manage/category/list', { parentId })

// 添加分类
export const reqAddCategory = (data) => ajax(BASE + '/manage/category/add', data, 'POST')

// 修改分类
export const reqUpdateCategory = (data) => ajax(BASE + '/manage/category/update', data, 'POST')

// jsonp请求的接口请求函数
// export const reqWeather = (city) => {
//     return new Promise((resolve, reject) => {
//         const url = `http://apis.juhe.cn/simpleWeather/query?city=深圳`
//         jsonp(url, {}, (err, data) => {
//             console.log("result  ======", err, data)
//             // if (!err && data.error_code === 0) {
//             resolve(data)
//             // } else {
//             // message.error(err.reason)
//             // }
//         })
//     })
// }
