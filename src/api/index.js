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
// 获取单个管理员数据;
export const getAdminInfo = (id) => ajax.get(`/api/user/get_admins/?id=${id}`)
// 修改单条管理员数据
export const postUpdateAdmin = (data) => ajax.post('/api/user/update_admin/', data)
// 添加管理员
export const postAddAdmin = (data) => ajax.post('/api/user/add_admin/', data)
// 根据条件查询数据
export const getQuery = (k1, k2) => ajax.get(`/api/user/query_admin/?login_name=${k1}&user_name=${k2}`)
// 管理员登陆日志 获取数据
export const getAdminLoginLogData = (p, n = 10) => ajax.get(`/api/operation/get_admin_log_data/?p=${p}&n=${n}`)
// 管理员登陆日志总数
export const getAdminLoginLogCount = () => ajax.get(`/api/operation/get_admin_log_count/`)

// ===================用户====================
// 获取用户与用户列表
export const getUsers = (p, n = 10) => ajax.get(`/api/user/get_users/?p=${p}&n=${n}`)
// 获取所有用户条数
export const getUserCount = () => ajax.get(`/api/user/get_user_count/`)
// 获取用户详情
export const getUserInfo = (id) => ajax.get(`/api/user/get_users/?id=${id}`)
// 更新用户
export const postUpdateUser = (data) => ajax.post(`/api/user/update/`, data)
// 后台添加用户
export const postAddUser = (data) => ajax.post(`/api/user/add_back_user/`, data)
// 条件查询用户
export const getQueryUser = (group_id, login_name, user_name, email) => ajax.get(`/api/user/query_user/?group_id=${group_id}&login_name=${login_name}&user_name=${user_name}&email=${email}`)
// ===================会员分组=================
// 获取会员分组列表
export const getGroupsApi = (name = null) => ajax.get(name ? `/api/user/get_to_name_info/?name=${name}` : '/api/user/get_to_name_info/')
//获取会员分组详情
export const getGroupsInfoApi = (id) => ajax.get(`/api/user/get_group_info/?id=${id}`)
//修改会员分组
export const putGroupApi = (params) => ajax.post(`/api/user/update_group/`, params)
//添加会员分组
export const postGroupApi = (params) => ajax.post(`/api/user/add_group/`, params)
// ===================资源=====================
// // 一级资源
// export const getOneSrc = () => ajax.get(`/api/src/get_one_src_info/`)
// 获取一级资源分页数据
export const getOneSrcPage = (p, n = 10) => ajax.get(`/api/src/get_one_src_page_data/?p=${p}&n=${n}`)
// 获取一级资源的数据总数
export const getOneSrcCount = () => ajax.get(`/api/src/get_one_src_page_count/`)
// 获取一级资源的详情
export const getOneSrcInfo = (id) => ajax.get(`/api/src/get_one_src_info/?id=${id}`)
// 修改一级分类资源
export const postUpdateOneSrc = (data) => ajax.post(`/api/src/update_one_src/`, data)
// 查询一级资源
export const queryOneSrc = (name) => ajax.get(`/api/src/get_to_name_one_src/?name=${name}`)
// // 二级资源
// export const getTwoSrc = () => ajax.get(`/api/src/get_two_src_info/`)
// 获取二级资源的所有条数
export const getTwoSrcCount = () => ajax.get(`/api/src/get_two_src_page_count/`)
// 获取二级资源分页
export const getTwoSrcPage = (p, n = 10) => ajax.get(`/api/src/get_two_src_page_data/?p=${p}&n=${n}`)
// 根据二级资源id获取数据详情
export const getTwoSrcDetail = (id) => ajax.get(`/api/src/get_two_src_info/?id=${id}`)
// 修改二级分类
export const postUpdateTwoSrc = (data) => ajax.post(`/api/src/update_two_src/`, data)
// 添加二级分类
export const postAddTwoSrc = (data) => ajax.post(`/api/src/add_two_src/`, data)
// 查询二级资源
export const queryTwoSrc = (name, one_src_id) => ajax.get(`/api/src/query_two_src/?name=${name}&one_src_id=${one_src_id}`)

//三级资源入口
// 获取分页数据
export const getThreeSrcPage = (p, n = 10) => ajax.get(`/api/src/get_three_src_page_data/?p=${p}&n=${n}`)
// 获取分页总数
export const getThreeSrcCount = () => ajax.get(`/api/src/get_three_src_page_count/`)
// 获取三级资源详情
export const getThreeSrcInfo = (id) => ajax.get(`/api/src/get_three_src_info/?id=${id}`)
// 添加三级资源
export const postAddThreeSrc = (data) => ajax.post(`/api/src/add_three_src/`, data)
// 更新三级资源
export const postUpdateThreeSrc = (data) => ajax.post(`/api/src/update_three_src/`, data)

// 获取账号资源分页
export const getFourSrcPage = (p, n = 10) => ajax.get(`/api/src/get_four_src_page_data/?p=${p}&n=${n}`)
// 获取账号资源的所有条数
export const getFourSrcCount = () => ajax.get(`/api/src/get_four_src_page_count/`)
// 查看账号资源详情
export const getFourSrcInfo = (id) => ajax.get(`/api/src/get_four_src_info/?id=${id}`)
// 查询账号资源所有数据
export const getFourSrcAllInfo = () => ajax.get(`/api/src/get_four_src_info/`)
// 添加账号资源
export const postAddFourSrc = (data) => ajax.post(`/api/src/add_four_src/`, data)
// 修改账号资源
export const postUpdateFourSrc = (data) => ajax.post(`/api/src/update_four_src/`, data)
// 查询账号资源
export const queryFourSrc = (name, code) => ajax.get(`/api/src/query_four_src/?name=${name}&code=${code}`)

// ==================== 交易类型展示
// 获取所有交易类型
export const getTradeType = (id = null) => ajax.get(id ? `/api/trade/get_trade_type_info/?id=${id}` : `/api/trade/get_trade_type_info/`)
// 修改交易类型
export const postUpdateTradeType = (data) => ajax.post(`/api/trade/update_trade_type/`, data)
// 查询数据
export const queryTradeType = (name) => ajax.get(`/api/trade/query_trade_type/?name=${name}`)
// 添加
export const postAddTradeType = (data) => ajax.post(`/api/trade/add_trade_type/`, data)

// ==================== 卡密数据展示
export const getCardTradeData = (p, n = 10) => ajax.get(`/api/trade/get_card_page_data/?p=${p}&n=${n}`)
export const getCardTradeCount = () => ajax.get(`/api/trade/get_card_page_count/`)
