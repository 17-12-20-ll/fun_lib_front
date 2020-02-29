import axios from 'axios'

const ajax = axios.create()

// 设置拦截器
ajax.interceptors.request.use(config => {
  // 将token存放在请求头中
  config.headers.common['AUTHENTICATION'] = localStorage.getItem('token')
  return config
})

ajax.interceptors.response.use(resp => {
  if (resp.status === 200) {
    if (resp.data.code === 4001) {
      localStorage.removeItem('token')
    }
    return resp.data
  } else {
    return {
      status: 403,
      msg: '网络错误'
    }
  }
})
// ========管理员========
// 登录
export const postLogin = (param) => ajax.post('/api/user/login/', param)
// 根据token获取用户信息
export const getInfo = (back = 'back') => ajax.get(`/api/user/get_token_info/?back=${back}`)
// 获取验证码
export const getImgCode = () => ajax.get(`/api/user/captcha/?time=${new Date().getTime()}`)
// 获取管理员列表
export const getAdmins = () => ajax.get(`/api/user/get_admins/`)
// 获取单个管理员数据
export const getAdminInfo = (id) => ajax.get(`/api/user/get_admins/?id=${id}`)
// 修改单条管理员数据
export const postUpdateAdmin = (data) => ajax.post('/api/user/update_admin/', data)
// 添加管理员
export const postAddAdmin = (data) => ajax.post('/api/user/add_admin/', data)
// 根据条件查询数据
export const getQuery = (k1, k2) => ajax.get(`/api/user/query_admin/?login_name=${k1}&user_name=${k2}`)
