var fs = require('fs');

let nums_list = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四']

let xuty_menu = {
  mao_gai: {
    length: 14,
    content: [],
    chinese: '毛概',
  },
  marxism_principle: {
    length: 9,
    content: [],
    chinese: '马克思'
  },
  modern_history: {
    length: 11,
    content: [],
    chinese: '近代史'
  },
  morals_and_ethics: {
    length: 6,
    content: [],
    chinese: '思修'
  },
}

let old_menu = {
  jun_li_1: {
    length: 3,
    content: [],
    chinese: '军理上'
  },
  jun_li_2: {
    length: 5,
    content: [],
    chinese: '军理下'
  },
  lang_c_1: {
    length: 10,
    content: [],
    chinese: 'C语言上'
  },
  lang_c_2: {
    length: 10,
    content: [],
    chinese: 'C语言下'
  }
}

let title_list = {
  modern_history: ["第一章","第二章","第三章","第四章","第五章","第六章","第七章","第八章","第九章","第十章","第十一章"],
  mao_gai: ["第一章 毛泽东思想及其历史地位","第二章 新民主主义革命理论","第三章 社会主义改造理论","第四章 社会主义建设道路初步探索的理论成果","第五章 邓小平理论","第六章 “三个代表”重要思想","第七章 科学发展观","第八章习近平新时代中国特色社会主义思想","第九章 坚持和发展中国特色社会主义的总任务","第十章 “五位一体”总体布局","第十一章 “四个全面”战略布局","第十二章 全面推进国防和军队现代化","第十三章 中国特色大国外交","第十四章 坚持和加强党的领导"],
  marxism_principle: ["导论","第一章 世界的物质性及发展规律","第二章 实践与认识及其发展规律","第三章 人类社会及其发展规律","第四章 资本主义的形成及其本质","第五章 资本主义发展的历史进程","第六章 社会主义社会及其发展","第七章 共产主义是人类最崇高的社会理想","马克思主义宗教观专题"],
  morals_and_ethics: ["第一章 人生的青春之问","第二章 坚定理想信念","第三章 弘扬中国精神","第四章 践行社会主义核心价值观","第五章 明大德守公德严私德","第六章 尊法学法守法用法"],
  jun_li_1: ["第一章 军事思想", "第二章 军事战略环境", "第三章 周边安全环境"],
  jun_li_2: ["第一章 国防动员", "第二章 国防法规", "第三章 国防历史与国防建设", "第四章 军事高技术", "第五章 信息化战争"],
  lang_c_1: ["第一章 认识计算机", "第二章 计算机中的信息表示", "第三章 计算机硬件系统", "第四章 计算机软件系统", "第五章 计算机网络", "第六章 C语言程序设计基础知识", "第七章 格式化输入输出控制", "第八章 分支结构", "第九章 循环结构", "第十章 函数与预处理"],
  lang_c_2: ["第十一章 数组", "第十二章 指针", "第十三章 结构体", "第十四章 文件", "第十五章  基本概念和算法", "第十六章 线性表", "第十七章 栈与队列", "第十八章 树与二叉树", "第十九章 图", "第二十章 查找与排序"]
}

// function write(path, msg) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(path, msg, (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(console.log(`${path}写入完成`))
//     });
//   })
// }
//
// function read(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, 'utf-8', (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(JSON.parse(data))
//     });
//   })
// }
//
// // 处理天义给的数据
// function manageXutyData() {
//   return new Promise(async (resolve, reject) => {
//     // 最后要写在文件里边的数据
//     let import_data = ''
//     // 遍历目录取出书名
//     for (let key in xuty_menu) {
//       // 遍历该书的的章节
//       for (let chapter_index = 1; chapter_index <= xuty_menu[key].length; chapter_index++) {
//         let json_path = `d:\\Code\\tiku\\frontEnd\\src\\utils\\tikudb\\${key}\\unit${chapter_index}.json`
//         let js_path = `d:\\Code\\tiku\\frontEnd\\src\\utils\\tikudb\\${key}\\unit${chapter_index}.js`
//         import_data += `import {${key}_unit${chapter_index}} from './${key}/unit${chapter_index}.js';`
//         let data = await read(json_path)
//         let content = {
//           title: title_list[key][chapter_index-1],
//           radio: 0,
//           multiple: 0,
//           decide: 0,
//           fill: 0,
//           data: `${key}_unit${chapter_index}`
//         }
//         for (let index in data) {
//           switch (data[index].type) {
//             case 0:
//               content.radio += 1;
//               break;
//             case 1:
//               content.multiple += 1;
//               break;
//             case 3:
//               content.decide += 1;
//               break;
//           }
//           if (data[index].unit) {
//             delete data[index].unit
//           }
//         }
//         xuty_menu[key].content.push(content)
//         let msg = JSON.stringify(data)
//         msg = `export var ${key}_unit${chapter_index} = ` + msg
//         await write(js_path, msg)
//         console.log(`${content.title}处理完成`)
//       }
//     }
//     resolve(import_data)
//   })
// }
//
// // 处理老数据库的内容
// function manageOldData() {
//   return new Promise(async (resolve, reject) => {
//     // 引入文件用
//     let import_data = ''
//     // 遍历旧数据库
//     for (let key in old_menu) {
//       // 遍历章节
//       for (let chapter_index = 1; chapter_index <= old_menu[key].length; chapter_index++) {
//         let json_path = `d:\\Code\\tiku\\frontEnd\\src\\utils\\tikudb\\${key}\\unit${chapter_index}.json`
//         let js_path = `d:\\Code\\tiku\\frontEnd\\src\\utils\\tikudb\\${key}\\unit${chapter_index}.js`
//         import_data += `import {${key}_unit${chapter_index}} from './${key}/unit${chapter_index}.js';`
//         // 读取数据
//         let data = await read(json_path)
//         // 章节内容
//         let content = {
//           title: title_list[key][chapter_index-1],
//           radio: 0,
//           multiple: 0,
//           decide: 0,
//           fill: 0,
//           data: `${key}_unit${chapter_index}`
//         }
//         // 遍历老数据组织成新数据
//         let new_data = []
//         for (let issue of data) {
//           let new_issue
//           if (issue.type == 'sig' || issue.type == 'mul') {
//             // 是单选或者多选
//             new_issue = {
//               options: [issue.ChoosenA, issue.ChoosenB, issue.ChoosenC, issue.ChoosenD],
//               question: issue.question,
//               answer: translateAnswer(issue.answer),
//               type: issue.type == 'sig' ? 0 : 1
//             }
//             issue.type == 'sig' ? content.radio += 1 : content.multiple += 1;
//           } else {
//             // 老数据的详细分类处理
//             if (issue.answer == '是' || issue.answer == '否') {
//               // 是判断
//               new_issue = {
//                 question: issue.question,
//                 answer: issue.answer == '是' ? 0 : 1,
//                 type: 3
//               }
//               content.decide += 1
//             } else if (issue.answer == '') {
//               // 无答案, 全是判断题
//               new_issue = {
//                 question: issue.question,
//                 answer: -1,
//                 type: 3
//               }
//               content.decide += 1
//             } else {
//               // 剩下得全是填空
//               new_issue = {
//                 question: issue.question,
//                 answer: issue.answer.split("@"),
//                 type: 2,
//                 answer_num: issue.ChoosenA - 0,
//                 img_list: [issue.ChoosenB || null, issue.ChoosenC || null, issue.ChoosenD || null]
//               }
//               content.fill += 1
//             }
//             // else {
//             //   // 防止出现未知情况，在这打印出来
//             //   console.log('出现未知情况')
//             //   console.log(key, chapter_index, issue)
//             // }
//           }
//           // 放进new_data
//           new_data.push(new_issue)
//         }
//         old_menu[key].content.push(content)
//         let msg = JSON.stringify(new_data)
//         msg = `export var ${key}_unit${chapter_index} = ` + msg
//         await write(js_path, msg)
//         console.log(`${content.title}处理完成`)
//       }
//     }
//     resolve(import_data)
//   })
// }
//
// Promise.all([manageXutyData(), manageOldData()]).then(async val => {
//   let import_data = val[0] + val[1]
//   let menu = Object.assign(xuty_menu, old_menu)
//   import_data = import_data + 'export var tikudb =' + JSON.stringify(menu)
//   let config_path = 'd:\\Code\\tiku\\frontEnd\\src\\utils\\tikudb\\tikudb.js'
//   await write(config_path, import_data)
//   console.log('操作完成')
// })
//
//
// function translateAnswer(input) {
//   let letter_map = ['A', 'B', 'C', 'D']
//   let res = []
//   letter_map.map(function (letter, index) {
//     if (input.indexOf(letter) != -1) {
//       res.push(index)
//     }
//   })
//   return res.length == 1 ? res[0] : res
// }
