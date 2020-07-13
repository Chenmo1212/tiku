export default {
  // 设置主题颜色
  SET_THEME_COLOR(state, string) {
    state.themeColor = string;
  },

  // 设置科目基础信息
  SET_PROJECT_BASIC_DATA(state, obj) {
    state.projectBasicData = obj;
  },

  // 设置已选择的科目
  SET_SELECTED_PROJECT(state, obj) {
    state.selectedProject = obj;
  },

  // 设置已选择的章节
  SET_SELECTED_CHAPTER(state, obj) {
    // console.log(obj.index);
    state.selectedChapter = state.projectQuestionData[obj.id][obj.index];
    state.selectedChapter['index'] = obj.index;
    state.selectedChapter['id'] = obj.id;
  },

  // 设置已选择的章节
  SET_PROJECT_QUESTION_DATA(state, obj) {
    state.projectQuestionData = obj;
  },

  // 定义已选择过的答案
  DEFINE_SELECTED_ANSWER(state, obj) {
    state.selectedAnswer = obj;
  },

  // 设置已选择过的答案
  SET_SELECTED_ANSWER(state, obj) {
    if (obj.isReplace) {
      if (obj.quesType === 0) state.selectedAnswer[obj.projectId][obj.chapterIndex].sigArr[obj.replaceIndex].userAns = obj.quesObj.userAns;
      if (obj.quesType === 1) state.selectedAnswer[obj.projectId][obj.chapterIndex].mulArr[obj.replaceIndex].userAns = obj.quesObj.userAns;
      if (obj.quesType === 2) state.selectedAnswer[obj.projectId][obj.chapterIndex].blaArr[obj.replaceIndex].userAns = obj.quesObj.userAns;
      if (obj.quesType === 3) state.selectedAnswer[obj.projectId][obj.chapterIndex].judArr[obj.replaceIndex].userAns = obj.quesObj.userAns;
    } else {
      console.log(obj.quesObj);
      if (obj.quesType === 0) state.selectedAnswer[obj.projectId][obj.chapterIndex].sigArr.push(obj.quesObj);
      if (obj.quesType === 1) state.selectedAnswer[obj.projectId][obj.chapterIndex].mulArr.push(obj.quesObj);
      if (obj.quesType === 2) state.selectedAnswer[obj.projectId][obj.chapterIndex].blaArr.push(obj.quesObj);
      if (obj.quesType === 3) state.selectedAnswer[obj.projectId][obj.chapterIndex].judArr.push(obj.quesObj);

      state.selectedProject.content[obj.chapterIndex].chapter_fill += 1;
      // console.log(state.projectBasicData)
      state.projectBasicData[obj.projectId].total_fill_num += 1;
    }
    console.log(state.selectedAnswer)
  },

  // 设置答案填充数目
  SET_FILL_NUM(state, obj) {
    // console.log(state.selectedProject.content[obj.chapterIndex])
    // console.log(state.selectedProject.content[obj.chapterIndex].chapter_fill)
  },


  // 设置提示
  setAttention(msg, obj) {
    this.$store.commit('SET_ATTENTION', {
      ifAlert: true,  // 提示窗口
      at_warning: msg, // 提示语
      EndSign: obj.EndSign,
      noLogin: obj.noLogin,
      To_Data: obj.To_Data,
    });
  }
  ,

// 前往数据管理
// TO_DATA(state, boolean){
//   state.To_Data = obj.To_Data;  // 是在想去data的路上触发登录框
// }

// 当前考勤结束时考勤状态信息
  SET_ATTENDED(state, obj) {
    state.attended = obj;
  }
}
