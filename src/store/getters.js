const getters = {
  isLogin: state => state.admin.isLogin,
  admin_info: state => state.admin.admin_info,
  admins: state => state.admin.admins,
  groups: state => state.groups.groups
}

export default getters
