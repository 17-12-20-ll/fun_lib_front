const getters = {
  isLogin: state => state.admin.isLogin,
  admin_info: state => state.admin.admin_info,
  admins: state => state.admin.admins,
  // 资源
  one_src: state => state.src.one_src,
  groups: state => state.groups.groups
}

export default getters
