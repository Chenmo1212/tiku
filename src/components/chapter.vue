<template>
  <div class="chapter">
    <div class="header">
      <div class="return">
        <i class="fa fa-angle-left" aria-hidden="true" @click="backHome"></i>
        <div>{{pageType}}</div>
        |
        <div>{{pageName}}</div>
      </div>
    </div>

    <!--chapter select-->
    <div class="chapter-select" v-if="pageMode === 'selectChapter'">
      <div class="card-container" v-for="(item, index) in projectData">
        <div class="card">
          <div class="left">
            <div class="title">{{item.chapterIndex}}</div>
            <div class="card-progress">
              <div class="card-progress__back"></div>
              <div class="card-progress__line"
                   :style="{width:item.chapterProgress, backgroundColor:chapterColor}">
              </div>
            </div>
            <div class="type">单选：{{item.chapterRadioNum}}道 &nbsp;&nbsp;多选:{{item.chapterMultiNum}}道&nbsp;&nbsp;判断：{{item.chapterJudgeNum}}道</div>
          </div>
          <div class="right">
            <div class="detail-icon" @click="clickCardBtn(index, $event)">
              <i class="fa fa-angle-right" aria-hidden="true" :style="{color: chapterColor}"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--chapter-detail-->
    <div class="chapter-detail" v-if="pageMode === 'chapterDetail'">
      <detail-vue></detail-vue>
    </div>
  </div>
</template>

<script>
  import detailVue from './Detail'
  export default {
    name: "chapter",
    components: {
      detailVue,
    },
    data() {
      return {
        pageName: "近代史",
        pageType: "选择章节",                // 选择章节 / 章节刷题
        chapterColor: "#536dfe",

        projectData: [{
          chapterIndex: "第一章",
          chapterProgress: "20%",           // 当前进度
          chapterRadioNum: 65,              // 章节单选题数
          chapterMultiNum: 35,              // 章节多选题数
          chapterJudgeNum: 0,               // 章节判断题数
        }, {
          chapterIndex: "第二章",
          chapterProgress: "20%",           // 当前进度
          chapterRadioNum: 65,              // 章节单选题数
          chapterMultiNum: 35,              // 章节多选题数
          chapterJudgeNum: 0,               // 章节判断题数
        }, {
          chapterIndex: "第三章",
          chapterProgress: "20%",           // 当前进度
          chapterRadioNum: 65,              // 章节单选题数
          chapterMultiNum: 35,              // 章节多选题数
          chapterJudgeNum: 0,               // 章节判断题数
        },],

        pageMode: 'selectChapter',          // 页面模式，分为选择章节页面和章节答题页（selectChapter/chapterDetail）
      }
    },
    methods: {
      backHome() {
        if (this.pageMode === "selectChapter")  this.$router.push({name: 'home'})
        if (this.pageMode === "chapterDetail")   this.pageMode = 'selectChapter'
      },
      clickCardBtn(index, ev) {
        ev.srcElement.classList.add("active");
        this.pageName = this.projectData[index].chapterIndex;
        this.pageType = '章节刷题';
        this.pageMode = 'chapterDetail'
      }
    }
  }
</script>

<style scoped lang="scss">
  .chapter {
    background-color: #f4f6f8;
    min-height: 100vh;
  }

  .header {
    height: 60px;
    line-height: 60px;
    background-color: #f4f6f8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      margin-left: 20px;
      display: flex;
      align-items: center;

      i {
        font-size: 30px;
        margin-right: 10px;
        margin-bottom: 5px;
      }

      div {
        margin: 0 10px;
        font-size: 16px;
      }
    }
  }

  .chapter-select {
    .card-container {
      .card {
        margin: 15px 15px 0;
        border-radius: 11px;
        background: #f4f6f8;
        border: 1px solid #fff;
        box-shadow: 5px 5px 8px #ebebeb,
        -5px -5px 8px #ffffff;
        padding: 10px;
        overflow: hidden;
        display: flex;

        .left {
          width: 80%;
          text-align: left;
          font-size: 14px;

          .title {
            font-weight: 700;
          }

          .card-progress {
            width: 100%;
            margin: 3% auto;

            .card-progress__back {
              height: 11px;
              background-color: #6c63ff;
              border-radius: 13px;
              border: 4px solid #fff;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12),
              inset 0 0 4px rgba(255, 255, 255, 0), inset 2px 2px 2px rgba(55, 84, 170, 0.15),
              inset 35px 28px 64px #fff !important;
            }

            .card-progress__line {
              height: 10px;
              /*background-color: #6c63ff;*/
              margin-top: -14px;
              margin-left: 4px;
              border-radius: 8px;
              opacity: 1;
              animation: sliding 3s ease infinite;
            }
          }

          .type {
            font-size: 13px;
            margin-top: 10px;
          }
        }

        .right {
          width: 15%;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: flex-end;

          .detail-icon {
            width: 30px;
            height: 30px;
            /*margin-top: 50%;*/
            vertical-align: center;
            background-color: #f4f6f8;
            box-shadow: 5px 5px 8px #ebebeb,
            -5px -5px 8px #ffffff;
            border: 1px solid #fff;
            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            i {
              font-size: 30px;
              display: block;
              margin-bottom: 3px;
              margin-left: 2px;
            }

            &:active {
              box-shadow: inset 5px 5px 10px #edeff1,
              inset -5px -5px 10px #fbfdff;
            }

            &:active:after {
              box-shadow: inset 0px -2px 5px white, inset 0px 2px 5px rgba(0, 0, 0, 0.15);
            }
          }
        }
      }
    }
  }
</style>
