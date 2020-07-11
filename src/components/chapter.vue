<template>
  <div class="chapter">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backHome"></i>
        </div>
        <div>选择章节</div>
        |
        <div>{{pageName}}</div>
      </div>
    </div>

    <!--chapter select-->
    <div class="chapter-select">
      <div class="card-container" v-for="(item, index) in projectData">
        <div class="card" @click="clickCardBtn(index, 1, $event)">
          <div class="left">
            <div class="title">{{item.title}}</div>
            <div class="card-progress">
              <div class="card-progress__back"></div>
              <div class="card-progress__line"
                   :style="{width:item.chapter_fill/(item.jud + item.mul + item.sig), backgroundColor:chapterColor}">
              </div>
            </div>
            <div class="type">
              单选：{{item.sig}}道 &nbsp;多选:{{item.mul}}道
              判断：{{item.jud}}道&nbsp;填空：{{item.bla}}道</div>
          </div>
          <div class="right">
            <div class="detail-icon" @click.stop="clickCardBtn(index, 2, $event)">
              <i class="fa fa-angle-right" aria-hidden="true" :style="{color: chapterColor}"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import detailVue from './Detail'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "chapter",
    components: {
      detailVue,
    },
    data() {
      return {
        pageName: '',
        chapterColor: '',

        projectData: null,
      }
    },
    computed: {
      ...mapState([
        'themeColor',
        'selectedProject',
      ]),
    },
    created(){
      this.pageName = this.selectedProject.chinese;
      this.chapterColor = this.selectedProject.color;
      this.projectData = this.selectedProject.content;
    },
    mounted(){
      console.log(this.selectedProject);
      console.log(this.selectedProject.chinese);
    },
    methods: {
      ...mapActions([
        'setSelectedChapter',
      ]),

      backHome() {
        this.$router.push({name: 'home'});
      },
      /**
       * 开始背题
       * @param index 章节下标
       * @param type 点击类型（1：整个卡片，2：点击icon)
       * @param ev 事件函数
       */
      clickCardBtn(index, type, ev) {
        if (type === 2){
          ev.srcElement.classList.add("active");
          // console.log(index);
        }
        this.setSelectedChapter({id: this.selectedProject.id, index: index})  // 科目id，章节序号
        this.$router.push({name: 'detail'})
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

      .circle {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: #f4f6f8;
        margin: 0;
        box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
        border: 1px solid #fff;
      }

      i {
        font-size: 30px;
        margin-right: 4px;
        display: block;
      }

      div {
        margin: 0 10px;
        font-size: 16px;
      }
    }
  }

  .chapter-select {
    margin: 5% 0 10%;
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
            font-size: 12px;
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
