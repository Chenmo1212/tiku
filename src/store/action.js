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
  setMusicStatus({commit}, bool) {
    commit('SET_MUSIC_STATUS', bool)
  },

  // 设置音乐歌单id
  setSongListId({commit}, str) {
    commit('SET_SONG_LIST_ID', str)
  },

  // 设置音乐信息
  setMusicMsg({commit}, obj) {
    commit('SET_MUSIC_MSG', obj)
  },

  // 激活音乐控件
  setAudioActive({commit}, bool) {
    commit('SET_AUDIO_ACTIVE', bool)
  },

  // 设置当前播放歌曲信息
  setCurrentBasicData({commit}, obj) {
    commit('CURRENT_MUSIC_BASIC_DATA', obj)
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
  setAutoCheck({commit}, bool) {
    commit('SET_AUTO_CHECK', bool)
  },

  // 设置自动检查答案关闭的原因是不是因为是多选题
  setCloseCheckOfMul({commit}, bool) {
    commit('SET_CLOSE_CHECK_OF_MUL', bool)
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
  setModal({commit}, type) {
    commit('SET_MODAL', type)
  },

  // 设置模态框隐藏
  setModalHide({commit}) {
    commit('SET_MODAL_HIDE')
  },

  // 显示app模态框
  setAppModal({commit}, bool) {
    commit('SET_APP_MODAL', bool)
  },

  // 显示app Loading
  setAppLoading({commit}, bool) {
    commit('SET_APP_LOADING', bool)
  },

  // // 显示app alert
  // setAlertMsg({commit}, Msg) {
  //   commit('SET_APP_ALERT', Msg)
  // },

  // 设置Alert隐藏
  // setAlertHide({commit}) {
  //   commit('SET_ALERT_HIDE')
  // },

  // 设置全屏
  setFullScreen({commit}, bool) {
    commit('SET_FULL_SCREEN', bool)
  },

  // 设置显示音乐悬浮窗
  setFloatBall({commit}, bool) {
    commit('SET_FLOAT_BALL', bool)
  },

  // 设置期末考试状态
  setExamStatus({commit}, bool) {
    commit('SET_EXAM_STATUS', bool)
  },

  // 设置提交试卷状态
  setSubmitExamStatus({commit}, bool) {
    commit('SET_SUBMIT_EXAM_STATUS', bool)
  },

  // 设置todo
  setTodoData({commit}, obj) {
    commit('SET_TODO_DATA', obj)
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
