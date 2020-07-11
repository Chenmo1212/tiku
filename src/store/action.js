export default {
  // 更改主题颜色
  setThemeColor({commit}, string) {
    commit('SET_THEME_COLOR', string)
  },

  // 设置科目基本信息
  setProjectBasicData({commit}, obj) {
    commit('SET_PROJECT_BASIC_DATA', obj)
  },

  // 显示登录
  showLogin({commit}, obj) {
    commit('SHOW_LOGIN', obj)
  },

  // 显示注册
  showRegister({commit}, obj) {
    commit('SET_ACCOUNT', obj)
  },

  // 给仓库赋值
  setClassLists({commit}, lists) {
    commit('change', lists)
  },


  // 关闭loading
  closeWarning({commit}, bool) {
    commit('CLOSE_WARNING', bool)
  },

  // 设置提示
  setAttention({commit}, obj) {
    commit('SET_ATTENTION', obj)
  },

  // 遮挡二维码
  toShowBlock({commit}, bool) {
    commit('SHOW_BLOCK', bool)
  },

  // 设置警告
  setWarn({commit}, msg) {
    commit('SET_WARNING', msg)
  },


  // 显示Loading
  setLoading({commit}, bool) {
    commit('SET_LOADING', bool)
  },

  // 设置警告
  setAttended({commit}, obj) {
    commit('SET_ATTENDED', obj)
  },
}
