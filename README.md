# test1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 导入数据字段说明
```$js
mao_gai: {
  length: null,          // 章节长度
  total_num: null,       // 全书题目数目
  total_fill_num: null,  // 全书已做数目
  chinese: null,         // 中文名
  color: null,           // 主题色
  svg: null,             // svg名字
  total_sig_num: null,   // sig总数
  total_mul_num: null,   // mul总数
  total_jud_num: null,   // jud总数
  total_bla_num: null,   // bla总数
  content: [{            // 章节详情
    title: null,         // 章节标题
    sig: null,           // 单选题数目
    nul: null,           // 多选题数目
    jud: null,           // 判断题数目
    chapter_fill: null,  // 章节已做数目
  }],
},
jin_dai_shi: {},
si_xiu: {},
ma_ke_si: {},
jun_li_1: {},
jun_li_2: {},
lang_c_1: {},
lang_c_2: {},
```
