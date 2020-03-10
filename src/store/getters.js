const getters = {
  isLogin: state => state.admin.isLogin,
  // 管理员
  admin_info: state => state.admin.admin_info,
  admins: state => state.admin.admins,
  // 资源
  one_src: state => state.src.one_src,
  two_src: state => state.src.two_src,
  three_src: state => state.src.three_src,
  four_src: state => state.src.four_src,
  one_src_count: state => state.src.one_src_count,
  two_src_count: state => state.src.two_src_count,
  three_src_count: state => state.src.three_src_count,
  four_src_count: state => state.src.four_src_count,
  // 分组
  groups: state => state.group.groups,
  // 用户
  users: state => state.user.users,
  user_count: state => state.user.user_count
}

export default getters
