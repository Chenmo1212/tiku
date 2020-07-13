export default {

  // 科目主题颜色
  themeColor: "",

  // 科目svg名字
  projectSvgName: ['sixiu', 'jindaishi', 'makesi', 'maogai', 'C', 'C', 'junli', 'junli'],

  // 科目名字
  projectName: ['si_xiu', 'jin_dai_shi', 'ma_ke_si', 'mao_gai', 'lang_c_1', 'lang_c_2', 'jun_li_1', 'jun_li_2'],

  // 当前在背
  currentMemory: {},
  // svgName: "maogai",         // 封面图名字
  // title: "毛概",              // 名称
  // currentChapter: "第一章",   // 当前章节
  // projectProgress: "20%",    // 当前进度
  // chapterRadioNum: 65,              // 章节单选题数
  // chapterMultiNum: 35,              // 章节多选题数
  // chapterJudgeNum: 0,               // 章节判断题数
  // chapterBlankNum: 0,               // 章节判断题数
  // color: "#536DFE"
  // itemIndex: null,
  // chapterIndex: null,
  // projectId: null,

  projectBasicData: {},     // 科目基本信息

  selectedProject: {},      // 选择的科目

  selectedChapter: {},      // 已选择的章节

  projectQuestionData: {},  // 科目题目

  selectedAnswer: {         // 已经选择过的答案
    mao_gai: [
      {                     // 第一章
        chapterIndex: null, // 章节下标
        sigArr: [{
          index: null,
          userAns: null,
        }],
        mulArr: [{
          index: null,
          userAns: null,
        }]
      },
    ],
    jin_dai_shi: [],
    si_xiu: [],
    ma_ke_si: [],
    jun_li_1: [],
    jun_li_2: [],
    lang_c_1: [],
    lang_c_2: [],
  },

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
