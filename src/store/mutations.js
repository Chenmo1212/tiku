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
  SET_SELECTED_PROJECT(state, obj){
    state.selectedProject = obj;
  },

  // 设置提示
    setAttention(msg, obj)
{
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
SET_ATTENDED(state, obj)
{
  state.attended = obj;
}
}
