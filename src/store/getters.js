const getters = {
  isLogin: state => state.admin.isLogin,
  // 管理员
  admin_info: state => state.admin.admin_info,
  admins: state => state.admin.admins,
  admin_log: state => state.admin.admin_log,
  admin_log_count: state => state.admin.admin_log_count,
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
  user_count: state => state.user.user_count,
  // 交易类型
  trade_types: state => state.trade.trade_types,
  trade_cards: state => state.trade.trade_cards,
  trade_card_count: state => state.trade.trade_card_count,
}

export default getters
