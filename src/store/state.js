export default {

  // 科目主题颜色
  themeColor: "",

  // 科目svg名字
  projectSvgName: ['sixiu', 'jindaishi', 'makesi', 'maogai', 'C', 'C', 'junli', 'junli'],

  // 科目名字
  projectName: ['si_xiu', 'jin_dai_shi', 'ma_ke_si', 'mao_gai', 'lang_c_1', 'lang_c_2', 'jun_li_1', 'jun_li_2'],

  // 当前在背
  currentMemory: {},

  isFullScreen: false,

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
  isCheck: false,         // 核对答案

  cardMode: true,         // 卡片模式
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

}
