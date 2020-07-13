export default {
  // 更改主题颜色
  setThemeColor({commit}, string) {
    commit('SET_THEME_COLOR', string)
  },

  // 设置科目基本信息
  setProjectBasicData({commit}, obj) {
    commit('SET_PROJECT_BASIC_DATA', obj)
  },

  // 设置已选择的科目
  setSelectedProject({commit}, obj) {
    commit('SET_SELECTED_PROJECT', obj)
  },

  // 设置已选择的章节
  setSelectedChapter({commit}, obj) {
    commit('SET_SELECTED_CHAPTER', obj)
  },

  // 设置已选择的科目问题数据
  setProjectQuestionData({commit}, obj) {
    commit('SET_PROJECT_QUESTION_DATA', obj)
  },
  // 定义已选择的答案
  defineSelectedAnswer({commit}, obj) {
    commit('DEFINE_SELECTED_ANSWER', obj)
  },

  // 设置已选择的答案
  setSelectedAnswer({commit}, obj) {
    commit('SET_SELECTED_ANSWER', obj)
  },

  // 设置答案填充数目
  setFillNum({commit}, obj) {
    commit('SET_FILL_NUM', obj)
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
