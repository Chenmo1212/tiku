<template>
  <div class="Detail" :class="{dark: this.themeMode === 'dark'}">
    <div class="header">
      <div class="return">
        <div class="circle" :style="{color: chapterColor}">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backChapter"></i>
        </div>
        <div class="page-title" @click="exitFull()">章节背题 | <span :style="{color: chapterColor}" class="pageName">{{projectName}} - {{chapterName}}</span>
        </div>
      </div>
      <div class="full-screen" :style="{color: chapterColor}">
        <span @click="setFullScreen" v-if="!ifFullscreen"><i class="fa fa-expand"></i></span>
        <span @click="exitFull" v-if="ifFullscreen"><i class="fa fa-compress"></i></span>
      </div>
    </div>
    <div id="board">
      <div class="card" v-for="(item, index) in cardArr">
        <div class="card-head">
          <div class="question-type" :style="{color: chapterColor}">
            <span v-if="item.type === 0">单选题</span>
            <span v-if="item.type === 1">多选题</span>
            <span v-if="item.type === 2">填空题</span>
            <span v-if="item.type === 3">判断题</span>
          </div>
          <div class="question-num">
            <span class="question-index" :style="{color: chapterColor}"
                  v-if="item.type === 0">{{index + 1 + gapIndex}}</span>
            <span class="question-index" :style="{color: chapterColor}"
                  v-if="item.type === 1">{{index + 1 + gapIndex- selectedChapter.radio}}</span>
            <span class="question-index" :style="{color: chapterColor}" v-if="item.type === 2">{{index + 1 + gapIndex- selectedChapter.radio -selectedChapter.multiple}}</span>
            <span class="question-index" :style="{color: chapterColor}" v-if="item.type === 3">{{index + 1 + gapIndex- selectedChapter.radio -selectedChapter.multiple - selectedChapter.fill}}</span>
            /
            <span class="question-item" v-if="item.type === 0">{{selectedChapter.radio}}</span>
            <span class="question-item" v-if="item.type === 1">{{selectedChapter.multiple}}</span>
            <span class="question-item" v-if="item.type === 2">{{selectedChapter.fill}}</span>
            <span class="question-item" v-if="item.type === 3">{{selectedChapter.decide}}</span>
            /
            <span class="question-item">{{selectedChapter.radio + selectedChapter.decide + selectedChapter.multiple + selectedChapter.fill}}</span>
          </div>
        </div>
        <div class="card-content">
          <div class="card-question">
            {{item.question}}
          </div>
          <div class="card-answer-list">

            <!--单选多选题-->
            <div class="btn c-button answer-item"
                 :class="getActiveStyle(answerIndex, item.type)"
                 :style="getColor(answerIndex)"
                 @click.stop.prevent="submitAns(item, answerIndex, index)"
                 v-for="(answerItem, answerIndex) in cardArr[index].options">
            <span class="icon-item">
              <span v-if="answerIndex === 0">A.</span>
              <span v-if="answerIndex === 1">B.</span>
              <span v-if="answerIndex === 2">C.</span>
              <span v-if="answerIndex === 3">D.</span>
            </span>
              <span class="c-button__label">{{answerItem}}</span>
            </div>

            <!--判断题-->
            <div class="btn c-button answer-item"
                 v-if="item.type === 3"
                 :class="getActiveStyle(answerIndex, item.type)"
                 :style="getColor(answerIndex)"
                 @click.stop.prevent="submitAns(item, answerIndex, index)"
                 v-for="(answerItem, answerIndex) in ['对','错']">
              <span class="icon-item">
                <span v-if="answerIndex === 0">A</span>
                <span v-if="answerIndex === 1">B</span>
              </span>
              <span class="c-button__label">{{answerItem}}</span>
            </div>

            <!--填空题-->
            <div class="btn c-button answer-item"
                 v-if="item.type === 2"
                 :class="getActiveStyle(answerIndex, item.type)"
                 :style="getColor(answerIndex)"
                 @click.stop.prevent="submitAns(item, answerIndex, index)">
            </div>


          </div>

          <div class="answer" v-if="showAnswer"
               :style="getAnsStyle(isError)"
          >
            <span>正确答案：</span>
            <span>{{answerList[index + gapIndex]}}</span>
            <span class="stick-box">
                <i class="fa fa-check-circle check" aria-hidden="true"
                   v-if="item.type === 0 || item.type === 3"
                   @click="handleCheck"
                   :class="{active: isCheck}"></i>
                <i class="fa fa-thumb-tack stick" @click="handleStick" :class="{active: isStick}"></i>
            </span>
          </div>
        </div>

        <div class="menu-card" :style="{color: chapterColor}">
          <div class="all-question" @click="toOverview">
            <i class="fa fa-th" aria-hidden="true"></i>
          </div>
          <div class="show-answer" @click="showAnswer = !showAnswer">
            <i class="fa fa-eye" aria-hidden="true" v-if="showAnswer"></i>
            <i class="fa fa-eye-slash" aria-hidden="true" v-if="!showAnswer"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import hammer from "../js/hammer.js"
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Detail',
    data() {
      return {
        projectName: '马克思',
        chapterName: '导论',
        chapterColor: "#536dfe",
        checkIndex: -1,
        showAnswer: false,

        userAns: null,

        cardArr: [],                    // 显示的数组
        totalCardArr: [],               // 总的数组
        slice_count: 10,

        answerList: [],

        isError: true,

        ifFullscreen: false,
        ifExitScreen: false,

        gapIndex: 0,
        itemIndex: null,               // 题目序号
        currentType: null,             // 题目类型

        selectedChapter: '',
        isStick: false,                // 固定显示答案
        isCheck: false,                // 自动检查答案
      }
    },
    created() {
      let isOverview = false;
      let newIndex = null;

      // console.log(JSON.parse(localStorage.selectedProject))
      // 获取全部题目数据

      this.setSelectedProject(JSON.parse(localStorage.selectedProject));
      this.defineSelectedAnswer(JSON.parse(localStorage.selectedAnswer));
      this.setProjectBasicData(JSON.parse(localStorage.projectBasicData));

      let selectedChapter = JSON.parse(localStorage.selectedChapter);
      this.selectedChapter = selectedChapter;

      this.totalCardArr = selectedChapter.data;

      if (typeof (this.$route.params.id) !== 'undefined') {
        this.itemIndex = this.$route.params.id;
        this.currentType = this.$route.params.type.slice(0, 3) + 'Arr';
        newIndex = this.$route.params.id - 1;
        // console.log(this.selectedAnswer);
        // console.log(this.selectedChapter);

        let projectId = this.selectedChapter.id;
        let chapterIndex = this.selectedChapter.index;
        // console.log(this.$route.params.type);
        let type = this.$route.params.type.slice(0, 3) + 'Arr';
        let ansArr = this.selectedAnswer[projectId][chapterIndex][type];

        // 匹配用户答案
        for (let i = 0; i < ansArr.length; i++) {
          if (ansArr[i].index === newIndex + 1) {
            this.checkIndex = ansArr[i].userAns;
          }
        }
        isOverview = true;
      }

      // 处理主题色
      this.chapterColor = JSON.parse(localStorage.themeColor);

      if (isOverview) {
        if (this.totalCardArr.length - newIndex > 10) {
          this.cardArr = this.totalCardArr.slice(newIndex, newIndex + 10);
        } else {
          this.cardArr = this.totalCardArr.slice(newIndex);
        }
      } else {

        let projectId = selectedChapter.id;
        let chapterIndex = selectedChapter.index;
        let localIndex = JSON.parse(localStorage.projectBasicData)[projectId].content[chapterIndex].currentIndex;
        // console.log("localIndex", JSON.parse(localStorage.projectBasicData)[projectId].content[chapterIndex]);
        // console.log("localIndex", localIndex);

        // 懒加载，先加载10个
        if (this.totalCardArr.length > 10) {
          this.cardArr = this.totalCardArr.slice(localIndex, localIndex + 10);
        } else {
          this.cardArr = this.totalCardArr;
        }

        this.gapIndex = localIndex;
      }
      // 处理标题信息
      this.chapterName = selectedChapter.title;
      this.projectName = JSON.parse(localStorage.selectedProject).chinese;

      // 处理选项数据
      let dataList = selectedChapter.data;
      // console.log(dataList);
      for (let i = 0; i < dataList.length; i++) {
        // console.log(dataList[i].answer);
        this.answerList.push(this.shiftAns(dataList[i].answer, dataList[i].type));
        // console.log(this.answerList[this.answerList.length - 1]);
      }
    },
    mounted() {
      this.cardInit();
      // console.log("mounted:", this.$route.params.id);
      if (typeof (this.$route.params.id) !== 'undefined') {
        this.slice_count = this.$route.params.id - 1;
        this.gapIndex = this.$route.params.id - 1;
      }
    },
    computed: {
      ...mapState([
        'themeColor',
        'themeMode',
        // 'selectedChapter',
        'selectedProject',
        'selectedAnswer',
        'currentMemory',
        'projectBasicData',
      ]),
    },
    methods: {
      ...mapActions([
        'setSelectedChapter',
        'setSelectedAnswer',
        'setCurrentMemory',
        'setSelectedProject',
        'defineSelectedAnswer',
        'setProjectBasicData',
        'setWarning',
      ]),

      /**
       * 更改选项颜色
       * @param answerIndex 选项下标
       * @returns {*} 返回颜色
       */
      getColor(answerIndex) {
        if (this.checkIndex === answerIndex) {
          return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
        }
        return {}
      },
      getActiveStyle(answerIndex, type) {
        if (this.currentType === null) {
          if (type === 0) this.currentType = 'sigArr';
          if (type === 1) this.currentType = 'mulArr';
          if (type === 2) this.currentType = 'blaArr';
          if (type === 3) this.currentType = 'judArr';
        }
        if (this.currentType !== type) {
          if (type === 0) this.currentType = 'sigArr';
          if (type === 1) this.currentType = 'mulArr';
          if (type === 2) this.currentType = 'blaArr';
          if (type === 3) this.currentType = 'judArr';
        }

        // console.log(this.checkIndex);
        if (this.checkIndex === answerIndex) {
          // console.log("getActiveStyle:", this.checkIndex);
          return 'c-button--active'
        }
        return ""
      },
      backChapter() {
        this.$router.push({name: 'chapter'});
      },

      toOverview() {
        this.$router.push({name: 'overview'})
      },

      setFullScreen() {
        let ele = document.body;
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen();
        } else if (ele.msRequestFullscreen) {
          ele.msRequestFullscreen();
        }
        this.ifFullscreen = true;
      },
      exitFull() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else {
          window.parent.showTopBottom();
        }
        this.ifFullscreen = false;
      },
      isFinished() {
        // 重新渲染v-for
        // this.$forceUpdate();

        // console.log("isFinished");
        // console.log("checkIndex", this.checkIndex)
        // console.log("题目下标", this.itemIndex);
        // console.log(this.selectedChapter);
        let projectId = this.selectedChapter.id;         // 科目id
        let chapterIndex = this.selectedChapter.index;   // 章节下标
        let quesIndex = this.itemIndex;                  // 题目下标

        let flag = true;

        // console.log(projectId)
        // console.log(chapterIndex)
        // console.log(this.currentType)
        // console.log(JSON.parse(localStorage.selectedAnswer))
        let answerList = JSON.parse(localStorage.selectedAnswer)[projectId][chapterIndex][this.currentType];
        // console.log(answerList)
        for (let i = 0; i < answerList.length; i++) {
          if (answerList[i].index === quesIndex) {
            // console.log(answerList[i].index);
            // console.log(quesIndex)
            this.checkIndex = answerList[i].userAns;
            flag = false;
            break;
          }
        }

        if (flag) this.checkIndex = -1;
        // console.log("checkIndex", this.checkIndex)
      },

      /**
       * 选择选项并记录用户答案
       * @param item 题目信息
       * @param answerIndex 选项下标（用户答案）
       * @param index 题目下标
       * @returns {*} 返回颜色
       */
      submitAns(item, answerIndex, index) {

        // 自动校对答案
        if (this.isCheck) this.showAnswer = true;

        // 判断是否是跳转过来的，是跳转的，则需要加上间隔index
        if (this.gapIndex) {
          index += this.gapIndex;
          // console.log("newIndex", index)
        }
        // console.log("index", index);
        this.itemIndex = index;

        // console.log(index);
        // 默认答案为错
        this.isError = true;
        item.answer === answerIndex ? this.isError = false : this.isError = true;

        // 更改选项样式
        this.checkIndex = answerIndex;

        // 记录答题情况
        let projectId = this.selectedProject.id;         // 科目id
        let chapterIndex = this.selectedChapter.index;   // 章节下标
        let quesIndex = index;                           // 题目下标
        let userAns = answerIndex;                       // 用户答案

        let tempObj = {};
        tempObj['index'] = quesIndex;
        tempObj['userAns'] = userAns;

        // console.log(this.selectedAnswer[projectId][chapterIndex]);
        if (item.type === 0) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'sigArr');
        if (item.type === 1) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'mulArr');
        if (item.type === 2) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'blaArr');
        if (item.type === 3) this.judgeReplace(projectId, chapterIndex, tempObj, item.type, quesIndex, 'judArr');

        this.setCurrentMemory({
          projectId: projectId,
          chapterIndex: chapterIndex,
          itemIndex: quesIndex,
        });

        // console.log(this.currentMemory);
        localStorage.setItem('currentMemory', JSON.stringify(this.currentMemory));
        localStorage.setItem('projectBasicData', JSON.stringify(this.projectBasicData));
        localStorage.setItem('selectedAnswer', JSON.stringify(this.selectedAnswer));
        localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject));
      },


      // 判断是否需要替换已选择的答案
      judgeReplace(projectId, chapterIndex, tempObj, type, quesIndex, typeArr) {
        let tempArr = null;
        // console.log(projectId);
        // console.log(JSON.parse(localStorage.selectedAnswer));
        // console.log(JSON.parse(localStorage.selectedAnswer)[projectId]);
        if (typeof (localStorage.selectedAnswer) === 'undefined') {
          tempArr = this.selectedAnswer[projectId][chapterIndex][typeArr];
        } else {
          tempArr = JSON.parse(localStorage.selectedAnswer)[projectId][chapterIndex][typeArr];
        }
        let obj = this.isHasObj(tempArr, quesIndex);
        // console.log(obj.flag);
        if (obj.flag) {
          // 科目id-章节下标-题目下标-用户答案
          this.setSelectedAnswer({
            projectId: projectId,
            chapterIndex: chapterIndex,
            quesObj: tempObj,
            quesType: type,
            isReplace: true,
            replaceIndex: obj.index
          });
        } else {
          // 科目id-章节下标-题目下标-用户答案
          this.setSelectedAnswer({
            projectId: projectId,
            chapterIndex: chapterIndex,
            quesObj: tempObj,
            quesType: type,
            isReplace: false,
          });
        }
      },
      // 判断是否已经选择过该题
      isHasObj(arr, val) {
        let flag = false; // true为有 false为没有
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].index === val) {
            flag = true;
            console.log("重复值下标为：", i);
            return {flag: true, index: i};
          }
        }
        return {flag: false, index: -1};
      },

      getAnsStyle(bool) {
        if (!bool) return {color: this.chapterColor, border: '1px solid' + this.chapterColor};
        return {color: '#F56C6C', border: '1px solid' + '#F56C6C'}
      },

      /**
       * 将答案序号改成文字
       * @param ans 题目答案序号
       * @param type 题目类型
       * @returns {String} 返回答案字符串
       */
      shiftAns(ans, type) {
        if (type === 0) { // 单选题
          if (ans === 0) return "A";
          if (ans === 1) return "B";
          if (ans === 2) return "C";
          if (ans === 3) return "D";
        } else if (type === 1) { // 多选题
          let tempAns = '';
          for (let i = 0; i < ans.length; i++) {
            if (ans[i] === 0) tempAns += "A";
            if (ans[i] === 1) tempAns += "B";
            if (ans[i] === 2) tempAns += "C";
            if (ans[i] === 3) tempAns += "D";
            if (ans.length - i > 1) tempAns += '、';
          }
          return tempAns;
        } else if (type === 2) { // 填空题
          let tempAns = '';
          for (let i = 0; i < ans.length; i++) {
            tempAns += ans[i];
            if (ans.length - i > 1) tempAns += '、';
          }
          return tempAns;
        } else if (type === 3) { // 判断题
          if (ans === 0) return "对";
          if (ans === 1) return "错";
        }
      },

      /**
       * 懒加载加入数据
       * @param len 剩余卡片数目
       */
      pushCardData(len) {
        if (len > 3) return;
        if (len <= 3) {
          console.log("少于三个了");
          // console.log("刚开始：", this.cardArr);
          let newTempCard = null;

          if (this.totalCardArr.length - this.slice_count > 10) {
            // 新截取的数组
            newTempCard = this.totalCardArr.slice(this.slice_count, this.slice_count + 10);
            // console.log("刚开始2：", newTempCard);
            this.slice_count += 10;
            this.cardArr = this.cardArr.concat(newTempCard);
          } else {
            // 新截取的数组
            newTempCard = this.totalCardArr.slice(this.slice_count, this.totalCardArr.length);
            // console.log("刚开始2：", newTempCard);

            // this.slice_count +=1 ;

            this.cardArr = newTempCard;
          }
          // console.log("合并后：", this.cardArr);

          // 重新渲染v-for
          this.$forceUpdate();
        }
      },
      // 固定答案
      handleStick() {
        this.isStick = !this.isStick;
        this.isStick ? this.setWarning("答案固定显示") : this.setWarning("答案取消固定");
      },

      // 自动检测答案
      handleCheck() {
        this.isCheck = !this.isCheck;
        this.isCheck ? this.setWarning("答案自动检查功能开启") : this.setWarning("答案自动检查功能开启");
      },

      // 卡片布局
      cardInit() {

        const that = this;

        /* LikeCarousel (c) 2019 Simone P.M. github.com/simonepm - Licensed MIT */

        class Carousel {

          constructor(element) {

            this.board = element;

            // add first two cards programmatically
            // this.push();
            // this.push();

            // handle gestures
            this.handle()

          }

          handle() {
            // list all cards
            this.cards = this.board.querySelectorAll('.card');

            // console.log(this.cards.length);
            // console.log("滑动了");
            that.pushCardData(this.cards.length);

            // get top card
            // this.topCard = this.cards[this.cards.length - 1];
            this.topCard = this.cards[0];
            // console.log("top:",this.topCard);
            this.topCard.style.zIndex = "99";

            // get next card
            // this.nextCard = this.cards[this.cards.length - 2];
            this.nextCard = this.cards[1];
            // console.log("next:", this.nextCard);
            if (this.cards.length > 1) this.nextCard.style.zIndex = "98";

            // if at least one card is present
            if (this.cards.length > 0) {

              // set default top card position and scale
              this.topCard.style.transform = 'translateX(0%) translateY(0%) rotate(0deg) rotateY(0deg) scale(1)';

              // destroy previous Hammer instance, if present
              if (this.hammer) this.hammer.destroy();

              // listen for tap and pan gestures on top card
              this.hammer = new Hammer(this.topCard);
              this.hammer.add(new Hammer.Tap());
              this.hammer.add(new Hammer.Pan({position: Hammer.position_ALL, threshold: 0}));

              // pass events data to custom callbacks
              this.hammer.on('tap', (e) => {
                this.onTap(e)
              });
              this.hammer.on('pan', (e) => {
                this.onPan(e)
              })

            }

          }

          onTap(e) {

            console.log("tap");

            // get finger position on top card
            // let propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth;

            // get degree of Y rotation (+/-15 degrees)
            // let rotateY = 15 * (propX < 0.05 ? -1 : 1);
            let rotateY = 0;

            // change the transition property
            this.topCard.style.transition = 'transform 100ms ease-out';

            // rotate
            this.topCard.style.transform = 'translateX(0%) translateY(0%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)';

            // wait transition end
            setTimeout(() => {
              // reset transform properties
              this.topCard.style.transform = 'translateX(0%) translateY(0%) rotate(0deg) rotateY(0deg) scale(1)'
            }, 100)

          }

          onPan(e) {

            if (!this.isPanning) {

              this.isPanning = true;

              // remove transition properties
              this.topCard.style.transition = null;
              if (this.nextCard) this.nextCard.style.transition = null;

              // get top card coordinates in pixels
              let style = window.getComputedStyle(this.topCard);
              let mx = style.transform.match(/^matrix\((.+)\)$/);
              this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
              this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

              // get top card bounds
              let bounds = this.topCard.getBoundingClientRect();

              // get finger position on top card, top (1) or bottom (-1)
              this.isDraggingFrom = (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

            }

            // calculate new coordinates
            let posX = e.deltaX + this.startPosX;
            let posY = e.deltaY + this.startPosY;

            // get ratio between swiped pixels and the axes
            let propX = e.deltaX / this.board.clientWidth;
            let propY = e.deltaY / this.board.clientHeight;

            // get swipe direction, left (-1) or right (1)
            let dirX = e.deltaX < 0 ? -1 : 1;

            // calculate rotation, between 0 and +/- 45 deg
            let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

            // calculate scale ratio, between 95 and 100 %
            let scale = (95 + (5 * Math.abs(propX))) / 100;

            // move top card
            this.topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)';

            // scale next card
            if (this.nextCard) {
              this.nextCard.style.transform = 'translateX(0%) translateY(0%) rotate(0deg) rotateY(0deg) scale(' + scale + ')';
              this.nextCard.style.backgroundColor = '#f4f6f8';
            }

            if (e.isFinal) {

              this.isPanning = false;

              let successful = false;

              // set back transition properties
              this.topCard.style.transition = 'transform 200ms ease-out';
              if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear';

              // check threshold
              if (propX > 0.25 && e.direction === Hammer.DIRECTION_RIGHT) {

                successful = true;
                // get right border position
                posX = this.board.clientWidth

              } else if (propX < -0.25 && e.direction === Hammer.DIRECTION_LEFT) {

                successful = true;
                // get left border position
                posX = -(this.board.clientWidth + this.topCard.clientWidth)

              } else if (propY < -0.25 && e.direction === Hammer.DIRECTION_UP) {

                successful = true;
                // get top border position
                posY = -(this.board.clientHeight + this.topCard.clientHeight)

              }

              // if (false) {
              if (successful) {

                // throw card in the chosen direction
                this.topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)';

                // console.log(this.cards.length)

                // 根据card的长度来判断是否留下
                if (this.cards.length > 1) {
                  // wait transition end
                  setTimeout(() => {
                    that.isError = true;
                    // 如果固定显示答案，则显示答案，如果不固定，则隐藏答案
                    that.showAnswer = that.isStick;
                    that.itemIndex += 1;

                    that.isFinished();

                    // that.checkIndex = -1;

                    // remove swiped card
                    this.board.removeChild(this.topCard);
                    // console.log("remove:",that.cardArr.length);
                    // console.log("remove:",that.cardArr);
                    // add new card
                    // this.push()
                    // handle gestures on new top card
                    this.handle();
                  }, 200)
                } else {
                  // 只剩下最后一张了
                  setTimeout(() => {

                    that.setWarning("这是最后一道题了哦~");

                    // handle gestures on new top card
                    this.handle()
                  }, 200)
                }

              } else {

                // reset cards position
                this.topCard.style.transform = 'translateX(0%) translateY(0%) rotate(0deg) rotateY(0deg) scale(1)';
                if (this.nextCard) this.nextCard.style.transform = 'translateX(0%) translateY(0%) rotate(0deg) rotateY(0deg) scale(0.95)'
              }
            }
          }

          // push() {
          //
          //   let card = document.createElement('div');
          //   // var card = document.getElementById('card');
          //   // console.log(card);
          //   card.style.height = '85%';
          //   card.style.width = '90%';
          //   card.style.position = 'absolute';
          //   card.style.top = '5%';
          //   card.style.left = '5%';
          //   card.style.borderRadius = "11px";
          //   card.style.background = '#f4f6f8';
          //   card.style.border = "1px solid #fff";
          //   card.style.boxShadow = "5px 5px 8px #ebebeb, -5px -5px 8px #ffffff";
          //   card.classList.add('card');
          //   //(parseInt(3*Math.random())+1)为随机1-3随机数，需要几的随机数改前面的数字3即可，这里images文件夹图片就放了三张，可以多放几张，这样重复率会降低
          //   // card.style.backgroundImage = "url('../images/" + (parseInt(6 * Math.random()) + 1) + ".jpg"
          //
          //
          //   if (this.board.firstChild) {
          //     this.board.insertBefore(card, this.board.firstChild)
          //   } else {
          //     this.board.append(card)
          //   }
          // }

        }

        let board = document.querySelector('#board');

        let carousel = new Carousel(board)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/_handle.scss";

  .Detail {
    /*background-color: #f4f6f8;*/
    @include background("detail_bg_color1");
  }

  .dark {
    .card,
    .circle,
    .question-num,
    .card-question,
    .menu-card {
      box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black !important;
    }

    .question-num,
    .pageName {
      color: #A7A9AA !important;
    }

    .card .card-answer-list .c-button {
      border: none !important;
      color: #A7A9AA !important;
      box-shadow: 1px 1px 5px 0 black, -2px -2px 5px 0 #636363 !important;
    }

    .answer {
      color: #BF8A10 !important;
      border: none !important;
      box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363 !important;
    }

    .full-screen,
    .question-index,
    .question-type,
    .circle,
    .menu-card {
      color: #BF8A10 !important;
    }

    .question-type,
    .card .card-answer-list .c-button--active {
      background: #2d3135 !important;
      box-shadow: inset 1px 1px 5px 0 black, inset -2px -2px 5px 0 #636363 !important;
    }
  }

  /*box-shadow: -1px -1px 3px 0 #636363,1px 1px 3px 0 black !important;*/

  .header {
    height: 60px;
    line-height: 60px;
    @include background("detail_bg_color1");
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      display: flex;
      align-items: center;
      padding-left: 20px;
      width: 80vw;
      overflow: hidden;

      .circle {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        @include background("detail_bg_color1");
        margin: 0;
        box-shadow: 3px 3px 5px #ebebeb, -3px -3px 5px #ffffff;
        border: 1px solid;
        @include border_color("detail_border_color1");
      }

      i {
        font-size: 30px;
        margin-right: 4px;
        display: block;
      }

      .page-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80%;
        margin-left: 2%;
        text-align: left;
      }
    }

    .full-screen {
      float: right;
      width: 10vw;
    }
  }

  #board {
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    overflow: hidden;
  }

  .card {
    width: calc(90% - 40px);
    height: calc(90% - 40px);
    position: absolute;
    top: 5%;
    left: 5%;
    border-radius: 11px;
    @include border_color("detail_border_color1");
    box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
    @include background("detail_bg_color2");
    transform: translateX(0%) translateY(0%) scale(0.95);
    padding: 20px;

    .card-head {
      font-size: 14px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;

      .question-type {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        @include background("detail_bg_color2");
        box-shadow: inset 5px 5px 10px #eaecee,
        inset -5px -5px 10px #feffff;
      }

      .question-num {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        @include background("detail_bg_color");
        box-shadow: 5px 5px 10px #eaecee,
        -5px -5px 10px #feffff;
      }
    }

    .card-question {
      @include font_color("detail_font_color1");
      margin: 10% 0;
      width: calc(100% - 20px);
      padding: 10px;
      @include background("detail_bg_color2");
      border-radius: 5px;
      text-align: left;
      border: 1px solid;
      @include border_color("detail_border_color1");
      box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
    }

    .card-answer-list {

      .c-button {
        font-size: 14px;
        text-align: left;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        color: #2c3e50;
        background: transparent;
        border: 1px solid #fff;
        position: relative;
        box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
        transition: all 200ms ease-out 0s;
      }

      div {
        cursor: pointer;
        /*color: inherit;*/
        font-family: inherit;
        margin-bottom: 5%;
        box-sizing: border-box;
      }

      /*.btn:active, .btn:focus {*/
      /*outline: 0;*/
      /*}*/

      .c-button:before {
        content: '';
        position: absolute;
        border-radius: 5px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 2px solid transparent;
        -webkit-filter: blur(2px);
        filter: blur(2px);
        -webkit-transition: all 120ms ease-out 0s;
        transition: all 200ms ease-out 0s;
      }

      .c-button:after {
        content: '';
        position: absolute;
        border-radius: 5px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-transition: all 120ms ease-out 0s;
        transition: all 200ms ease-out 0s;
      }

      .c-button--active {
        background: -webkit-gradient(linear, left bottom, left top, from(#f4f6f8), to(#fafcfd));
        background: linear-gradient(to top, #f4f6f8, #fafcfd);
        box-shadow: inset 0.4px 0.4px 1.5px #f4f6f8, inset 1.5px 1.5px 3px #aec5e4, inset -0.8px -0.8px 1.5px white;
      }

      /*.c-button--active:before {*/
      /*border-color: white;*/
      /*box-shadow: 0 0.8px 3px white;*/
      /*}*/

      /*.c-button--active:after {*/
      /*box-shadow: inset 0 0 3px white;*/
      /*}*/
    }

    .answer {
      padding: 10px;
      font-size: 14px;
      text-align: left;
      width: calc(100% - 20px);
      border-radius: 5px;
      @include background("detail_bg_color2");
      box-shadow: inset 5px 5px 10px #eaecee, inset -5px -5px 10px #feffff;

      .stick-box {
        float: right;
        margin-top: -7px;

        .stick, .check {
          padding: 8px;
          margin: 0 5px;
        }
      }

      .active {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
    }

    .menu-card {
      position: absolute;
      bottom: 0;
      left: 10%;
      height: 40px;
      width: 80%;
      border-radius: 5px;
      @include background("detail_bg_color2");
      box-shadow: 2px 2px 5px #c1d3ea, -2px -2px 5px white, -0.4px -0.4px 0.4px white;
      display: flex;
      line-height: 40px;
      justify-content: center;

      .all-question {
        flex: 1;
        border-right: 1px solid;
        @include border_color("detail_border_color2");
      }

      .show-answer {
        border-left: 1px solid;
        @include border_color("detail_border_color2");
        flex: 1;
      }
    }
  }
</style>
