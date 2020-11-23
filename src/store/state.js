
export default {

  // 科目主题颜色
  themeColor: "",

  // 科目svg名字
  projectSvgName: ['sixiu', 'jindaishi', 'makesi', 'maogai', 'C', 'C', 'junli', 'junli'],

  // 科目名字
  projectName: ['si_xiu', 'jin_dai_shi', 'ma_ke_si', 'mao_gai', 'lang_c_1', 'lang_c_2', 'jun_li_1', 'jun_li_2'],

  // 当前在背
  currentMemory: {
    svgName: "maogai",         // 封面图名字
    id: "mao_gai",         // 科目id
    title: "毛概",              // 名称
    currentChapter: "第一章",   // 当前章节
    chapterProgress: "2%",    // 当前进度
    radioNum: 65,              // 章节单选题数
    multiNum: 35,              // 章节多选题数
    judgeNum: 33,               // 章节判断题数
    fillNum: 23,                // 章节填空题数
    color: "#536DFE"
  },

  isFullScreen: false,

  quesDistribution: {             // 模拟考试题型分布
    sig_mul_jud_bla: {sig: 50, mul:30, jud: 10, bla: 10},
    sig_mul_jud: {sig: 50, mul:30, jud: 20, bla: 0},
    sig_mul_bla: {sig: 50, mul:30, jud: 0, bla: 20},
    sig_mul: {sig: 70, mul: 30, jud: 0, bla: 0},
    sig_jud: {sig: 70, mul: 0, jud: 30, bla: 0},
    sig_bla: {sig: 70, mul: 0, jud: 0, bla: 30},
  },
  examDoneStatus: false,
  submitExamStatus: false,   // false/true  false为初始状态，true为确定

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

  isStick: false,         // 显示答案
  isCheckIn: true,         // 核对答案
  closeCheckOfMul: false,   // 因为多选题而关闭的自动核对答案

  cardMode: false,         // 卡片模式
  themeMode: 'light',     // 主题模式

  musicStatus: false,

  // 音乐清单
  musicList: null,
  songListId: '2111679838',

  currentMusicBasicMsg: [],

  // 警告框
  isAlert: false,
  warning: '',

  // 模态框
  isModel: false,
  modelType: '',

  totalData: {},

  todoData: null,

}
