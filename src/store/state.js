export default {

  // 科目主题颜色
  themeColor: "",

  // 当前在背
  currentMemory: {
    svgName: "maogai",         // 封面图名字
    title: "毛概",              // 名称
    currentChapter: "第一章",   // 当前章节
    projectProgress: "20%",    // 当前进度
    chapterRadioNum: 65,              // 章节单选题数
    chapterMultiNum: 35,              // 章节多选题数
    chapterJudgeNum: 0,               // 章节判断题数
    color: "#536DFE"
  },

  projectBasicData: {},     // 科目基本信息

  selectedProject: {},      // 选择的科目

  // 警告框
  isWarning: false,
  warning: '',

  // 加载
  isLoading: false,

  // 登录状态
  isLogin: false,

  // 提醒登录
  ifAlert: false,
  noLogin: false,
  newSign: false,
  EndSign: false,

  // 结束考勤
  ShowBlock: false,

  // 想去data
  To_Data: false,


  // attendance的警告语
  at_warning: '',

  // 账号密码
  account: '',
  password: '',

  ifShow_reg_alert: false,
  ifShow_login_alert: false,

  // 当前考勤结束时考勤状态信息
  attended: [],
}
