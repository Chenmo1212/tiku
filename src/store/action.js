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
  setCurrentMemory({commit}, obj) {
    commit('SET_CURRENT_MEMORY', obj)
  },

  // 设置音乐播放状态
  setMusicStatus({commit}) {
    commit('SET_MUSIC_STATUS')
  },

  // 设置音乐歌单id
  setSongListId({commit}, str) {
    commit('SET_SONG_LIST_ID', str)
  },

  // 设置音乐信息
  setMusicMsg({commit}, obj) {
    commit('SET_MUSIC_MSG', obj)
  },

  // 设置当前播放歌曲信息
  setCurrentBasicMsg({commit}, obj) {
    commit('CURRENT_MUSIC_BASIC_MSG', obj)
  },

  // 设置题库答题模式
  setTikuMode({commit}) {
    commit('SET_TIKU_MODE')
  },

  // 设置自动显示答案
  setAutoStick({commit}) {
    commit('SET_AUTO_STICK')
  },

  // 设置自动检查答案
  setAutoCheck({commit}) {
    commit('SET_AUTO_CHECK')
  },

  // 设置题库答题模式
  setThemeMode({commit}, obj) {
    commit('SET_THEME_MODE', obj)
  },

  // 设置提示
  setWarning({commit}, msg) {
    commit('SET_WARNING', msg)
  },

  // 设置模态框
  setModel({commit}, type) {
    commit('SET_MODEL', type)
  },

  // 设置全屏
  setFullScreen({commit}, bool) {
    commit('SET_FULL_SCREEN', bool)
  },

  // 导出数据
  setExportTotalData({commit}) {
    commit('SET_EXPORT_TOTAL_DATA')
  },

  // 导入数据
  setImportTotalData({commit}, obj) {
    commit('SET_IMPORT_TOTAL_DATA', obj)
  },

}
