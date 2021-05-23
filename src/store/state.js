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
  isShowFloatBall: true,   // 是否显示音乐悬浮框

  quesDistribution: {             // 模拟考试题型分布
    sig_mul_jud_bla: {sig: 50, mul: 30, jud: 10, bla: 10},
    sig_mul_jud: {sig: 50, mul: 30, jud: 20, bla: 0},
    sig_mul_bla: {sig: 50, mul: 30, jud: 0, bla: 20},
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

  // 音乐歌单
  musicPlayActive: false,
  musicList: null,
  songListId: '2111679838',

  currentMusicBasicData: {url: ''},

  // 警告框
  isAlert: false,
  warning: '',

  // 模态框
  isModal: false,
  showAppModal: false,
  modalType: '',

  showAppLoading: false,
  showAlert: false,
  alertMsg: "卡片答题模式已开启",

  totalData: {},

  todoData: null,

  updateLogsList: [
    {
      date: '2021-05-22',
      version: 'version: 1.2.7',
      content: ['再次诈尸更新！！！',
        '更新了军理题库，近代史题库~',
        '增加了题目收藏功能，题目可以收藏啦~',
        '反馈功能这次真的可以用了！！！求反馈',]
    }, {
      date: '2021-05-21',
      version: 'version: 1.2.6',
      content: ['再次诈尸更新！！！',
        '更新了军理题库，近代史题库正在更新中~',
        '反馈功能这次真的可以用了！！！求反馈',]
    }, {
      date: '2021-03-31',
      version: 'version: 1.2.5',
      content: ['诈尸更新！！！',
        '去掉了原先的tabbar菜单（底部菜单），<span style="color:#599efb">音乐</span>和<span style="color:#599efb">待办事项</span>移动到抽屉里啦~~']
    }, {
      date: '2020-11-30',
      version: 'version: 1.2.4',
      content: ['圣诞节来袭！！祝大家平安喜乐，万事胜意！！',
        '给大家开发了一个可以给头像加上圣诞帽的网站：<a href="https://chenmo1212.cn/Christmas" style="color:#BF8A10">点此进入</a>']
    }, {
      date: '2020-11-30',
      version: 'version: 1.2.4',
      content: ['修复模拟考试多选题顺序不同导致判错bug~',
        '修复判断题答案错误~',
        '修复选项自动切换bug~',
        '优化部分细节~']
    }, {
      date: '2020-11-28',
      version: 'version: 1.2.2',
      content: ['修复考试结果页面分数不显示bug~ ',
        '支持电脑端键盘快速答题~',
        '优化部分细节~']
    }, {
      date: '2020-11-24',
      version: 'version: 1.2.0',
      content: ['题库内容已更新~',
        '新增模拟考试模式~',
        '音乐播放器支持传入歌单链接~',
        '优化部分细节~']
    }, {
      date: '2020-11-21',
      version: 'version: 1.1.0',
      content: ['网站使用CDN加速，打开速度更快了~',
        '题库内容已更新~',
        '音乐播放器支持传入歌单链接~',
        '优化部分细节~',
        '模拟期末考试功能正在开发（大四有点忙，会尽快完成的）']
    }, {
      date: '2020-9-28',
      version: 'version: 1.1.0',
      content: ['增加todo功能~']
    }, {
      date: '2020-9-25',
      version: 'version: 1.0.7',
      content: ['更换全局成抽屉样式~']
    }, {
      date: '2020-8-29',
      version: 'version: 1.0.6',
      content: ['支持键盘监听，可以用键盘切换题目~']
    }, {
      date: '2020-8-27',
      version: 'version: 1.0.5',
      content: ['增加反馈机制~',
        '题库网站的域名更换啦~',]
    }, {
      date: '2020-8-6',
      version: 'version: 1.0.4',
      content: ['增加音乐播放器~',
        '增加全局悬浮音乐控制按钮~',]
    }, {
      date: '2020-7-30',
      version: 'version: 1.0.3',
      content: ['页面懒加载~',
        '增加全屏功能~',]
    }, {
      date: '2020-7-23',
      version: 'version: 1.0.2',
      content: ['增加卡片模式~']
    }, {
      date: '2020-7-16',
      version: 'version: 1.0.1',
      content: ['增加黑夜模式~']
    }, {
      date: '2020-7-9',
      version: 'version: 1.0.0',
      content: ['长理web端新拟态题库来了~']
    }]
}
