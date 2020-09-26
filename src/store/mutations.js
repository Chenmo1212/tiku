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
      // console.log(obj.quesObj);
      if (obj.quesType === 0) state.selectedAnswer[obj.projectId][obj.chapterIndex].sigArr.push(obj.quesObj);
      if (obj.quesType === 1) state.selectedAnswer[obj.projectId][obj.chapterIndex].mulArr.push(obj.quesObj);
      if (obj.quesType === 2) state.selectedAnswer[obj.projectId][obj.chapterIndex].blaArr.push(obj.quesObj);
      if (obj.quesType === 3) state.selectedAnswer[obj.projectId][obj.chapterIndex].judArr.push(obj.quesObj);

      state.selectedProject.content[obj.chapterIndex].chapter_fill += 1;
      // console.log(state.projectBasicData)
      state.projectBasicData[obj.projectId].total_fill_num += 1;
    }
    // console.log(state.selectedAnswer)
  },

  // 设置当前在背
  SET_CURRENT_MEMORY(state, obj) {
    // console.log(state.projectBasicData);
    // console.log(state.projectBasicData[obj.projectId]);

    let tempObj = {};
    tempObj["title"] = state.projectBasicData[obj.projectId]['chinese'];
    tempObj["radioNum"] = state.projectBasicData[obj.projectId]['total_sig_num'];
    tempObj["multiNum"] = state.projectBasicData[obj.projectId]['total_mul_num'];
    tempObj["judgeNum"] = state.projectBasicData[obj.projectId]['total_jud_num'];
    tempObj["fillNum"] = state.projectBasicData[obj.projectId]['total_bla_num'];
    tempObj["color"] = state.projectBasicData[obj.projectId]['color'];
    tempObj["itemIndex"] = obj.itemIndex;
    tempObj["projectId"] = obj.projectId;
    tempObj["chapterIndex"] = obj.chapterIndex;

    let chaObj = state.projectBasicData[obj.projectId].content[obj.chapterIndex];

    // 进度条
    let result = 100 * chaObj.chapter_fill / (chaObj.bla + chaObj.jud + chaObj.sig + chaObj.mul);
    tempObj["chapterProgress"] = result < 1 ? '2%' : result + '%';
    tempObj["currentChapter"] = chaObj.title.slice(0, 3);
    for (let i = 0; i < state.projectName.length; i++) {
      // console.log(state.projectName[i])
      if (state.projectName[i] === obj.projectId) {
        tempObj["svgName"] = state.projectSvgName[i];
        break;
      }
    }

    state.currentMemory = tempObj;

    state.projectBasicData[obj.projectId].content[obj.chapterIndex].currentIndex = obj.itemIndex;
    // console.log("currentINdex", state.projectBasicData[obj.projectId].content[obj.chapterIndex]);
    // console.log("currentINdex", state.projectBasicData[obj.projectId].content[obj.chapterIndex].currentIndex)
  },

  // 设置音乐状态
  SET_MUSIC_STATUS(state, bool) {
    state.musicStatus = bool;
  },

  // 设置音乐歌单id
  SET_SONG_LIST_ID(state, str) {
    state.songListId = str;
  },

  // 设置音乐信息
  SET_MUSIC_MSG(state, obj) {
    state.musicList = obj;
  },

  // 设置当前播放音乐状态
  CURRENT_MUSIC_BASIC_MSG(state, obj) {
    state.currentMusicBasicMsg = obj;
  },

  // 设置答题模式
  SET_TIKU_MODE(state) {
    state.cardMode = !state.cardMode;
  },

  // 设置主题模式
  SET_THEME_MODE(state, obj) {
    state.themeMode = obj.type;
  },

  // 设置提示
  SET_WARNING(state, msg) {
    state.isAlert = !state.isAlert;
    state.warning = msg;
  },

  // 设置模态框
  SET_MODEL(state, type) {
    // console.log("模式框")
    state.isModel = !state.isModel;
    state.modelType = type;
  },

  // 设置全屏
  SET_FULL_SCREEN(state, bool) {
    state.isFullScreen = bool;
  },

  // 设置自动显示答案
  SET_AUTO_STICK(state) {
    state.isStick = !state.isStick;
  },

  // 设置自动检查答案
  SET_AUTO_CHECK(state, bool) {
    state.isCheckIn = bool;
  },

  // 设置自动检查答案关闭的原因是不是因为是多选题
  SET_CLOSE_CHECK_OF_MUL(state, bool) {
    state.closeCheckOfMul = bool;
  },

  // 存储ToDo
  SET_TODO_DATA(state, obj) {
    state.todoData = obj;
  },

  // 导出数据
  SET_EXPORT_TOTAL_DATA(state) {
    state.totalData["themeColor"] = state.themeColor;
    // state.totalData["projectSvgName"] = state.projectSvgName;
    // state.totalData["projectName"] = state.projectName;
    state.totalData["currentMemory"] = state.currentMemory;
    state.totalData["isFullScreen"] = state.isFullScreen;
    // state.totalData["projectBasicData"] = state.projectBasicData;
    state.totalData["selectedProject"] = state.selectedProject;
    state.totalData["selectedChapter"] = state.selectedChapter;
    // state.totalData["projectQuestionData"] = state.projectQuestionData;
    state.totalData["selectedAnswer"] = state.selectedAnswer;
    state.totalData["cardMode"] = state.cardMode;
    state.totalData["themeMode"] = state.themeMode;
    state.totalData["isStick"] = state.isStick;
    state.totalData["isCheckIn"] = state.isCheckIn;
    state.totalData["closeCheckOfMul"] = state.closeCheckOfMul;
    // state.totalData["musicStatus"] = state.musicStatus;
    // state.totalData["musicList"] = state.musicList;
    state.totalData["songListId"] = state.songListId;
    state.totalData["todoData"] = state.todoData;
    state.totalData["currentMusicBasicMsg"] = state.currentMusicBasicMsg;
    // state.totalData["isAlert"] = state.isAlert;
    // state.totalData["warning"] = state.warning;
    // state.totalData["isModel"] = state.isModel;
    // state.totalData["modelType"] = state.modelType;
  },

  // 导入数据
  SET_IMPORT_TOTAL_DATA(state, obj) {
    state.themeColor = obj["themeColor"];
    // state.projectSvgName = obj["projectSvgName"];
    // state.projectName = obj["projectName"];

    // if ((JSON.stringify(obj["currentMemory"]) == "{}"))
    state.currentMemory = obj["currentMemory"];
    state.isFullScreen = obj["isFullScreen"];
    // state.projectBasicData = obj["projectBasicData"];
    state.selectedProject = obj["selectedProject"];
    state.selectedChapter = obj["selectedChapter"];
    // state.projectQuestionData = obj["projectQuestionData"];
    state.selectedAnswer = obj["selectedAnswer"];
    state.cardMode = obj["cardMode"];
    state.themeMode = obj["themeMode"];
    state.isStick = obj["isStick"];
    state.isCheckIn = obj["isCheckIn"];
    state.closeCheckOfMul = obj["closeCheckOfMul"];
    // state.musicStatus = obj["musicStatus"];
    // state.musicList = obj["musicList"];
    state.songListId = obj["songListId"];
    state.todoData = obj["todoData"];
    state.currentMusicBasicMsg = obj["currentMusicBasicMsg"];
    // state.isAlert = obj["isAlert"];
    // state.warning = obj["warning"];
    // state.isModel = obj["isModel"];
    // state.modelType = obj["modelType"];
  },


}
