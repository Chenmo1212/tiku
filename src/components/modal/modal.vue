<template>
  <div class="Modal" v-if="isModal">
    <div class="bg" @click="hiddenModal"></div>
    <div class="content a-fadeinB" v-if="!updateModal">
      <div class="close-icon" @click="hiddenModal"><i class="fa fa-times" aria-hidden="true"/></div>
      <div class="title"><span>{{ modalTit }}</span></div>

      <!--音乐模态框-->
      <div class="music-modal" v-if="musicModal">
        <div class="text" v-html="modalMsg"></div>
        <div class="input">
          <label>
            <input type="text" class="form__input" placeholder="网易云歌单ID，例如：2111679838" v-model="songListInput"/>
          </label>
        </div>
        <div class="submit-btn" @click="handleSongListId">
          <i class="fa fa-send-o"/>
          <span>提交</span>
        </div>
      </div>

      <!--导入数据模态框-->
      <div class="import-modal" v-if="dataModal">
        <div class="input">
          <label>
            <input type="text" class="form__input" placeholder="在此处导入您的数据" v-model="dataInput">
          </label>
        </div>
        <div class="btn-group">
          <div class="import-btn" @click="importData">
            <i class="fa fa-sign-in"/>
            <span>导入</span>
          </div>
          <div class="cancel-btn" @click="exportData">
            <i class="fa fa-sign-out"/>
            <span>导出</span>
          </div>
        </div>
      </div>

      <!--清空数据模态框-->
      <div class="clear-modal" v-if="clearModal">
        <div class="text">{{ modalMsg }}</div>
        <div class="btn-group">
          <div class="btn submit" @click="deleteLocalStorage">
            <span>确定</span>
          </div>
          <div class="btn">
            <span>取消</span>
          </div>
        </div>
      </div>

      <!--刷新网页模态框-->
      <div class="fresh-modal" v-if="freshModal">
        <div class="text">{{ modalMsg }}</div>
        <div class="submit-btn" @click="freshPage">
          <i class="fa fa-send-o"/>
          <span>刷新</span>
        </div>
      </div>

      <!--提交试卷模态框-->
      <div class="clear-modal submitExam-modal" v-if="submitExamModal">
        <div class="text">{{ modalMsg }}</div>
        <div class="btn-group">
          <div class="btn submit" @click="clickSubmitExamBtn">
            <span>确定</span>
          </div>
          <div class="btn cancel-btn" @click="hiddenModal()">
            <span>取消</span>
          </div>
        </div>
      </div>

      <!--返回主页模态框-->
      <div class="clear-modal submitExam-modal" v-if="backHomeModal">
        <div class="text">{{ modalMsg }}</div>
        <div class="btn-group">
          <div class="btn submit" @click="backHome()">
            <span>确定</span>
          </div>
          <div class="btn cancel-btn" @click="hiddenModal()">
            <span>取消</span>
          </div>
        </div>
      </div>

    </div>
    <div class="content a-fadeinB" v-if="updateModal">
      <div class="title">
        <svg-icon iconClass="having_fun"/>
        <h3>Little Cookie <br>更新说明({{ version }})</h3>
        <!--          <h3>Little Cookie <br>维护ing</h3>-->
      </div>
      <div class="msg-modal">
        <div class="text">
          <p v-for="item in updateLogsList[0].content" v-html="item"/>
        </div>
        <div class="submit-btn" @click="hiddenUpdateModal"><i class="fa fa-send-o"/> <span>朕知道了</span></div>
        <div class="text show-log" style="text-align: center;">
          <router-link to="/timeline" style="color:#a9ceff;">查看更新日志</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "modal",
  data() {
    return {
      showModal: false,
      musicModal: false,
      dataModal: false,
      clearModal: false,
      freshModal: false,
      submitExamModal: false,
      backHomeModal: false,
      updateModal: false,
      modalTit: "提示",
      modalMsg: "您可以在此处替换成您的歌单",
      dataInput: null,

      songListInput: this.songListId,
      version: '1.2.5',
    }
  },
  created() {
    this.version = this.updateLogsList[0].version.slice(9)
  },
  computed: {
    ...mapState([
      'warning',
      'isModal',
      'modalType',
      'totalData',
      'updateLogsList',
      'songListId'
    ]),
  },
  methods: {
    ...mapActions([
      'setCurrentBasicData',
      'setMusicMsg',
      'setExportTotalData',
      'setImportTotalData',
      'setSongListId',
      'setWarning',
      'setMusicStatus',
      'setSubmitExamStatus',
      'setExamStatus',
      'setAppModal',
      'setModalHide',
      'setAppLoading',
      'setAlertMsg',
    ]),
    /**
     * 隐藏模态框
     */
    hiddenModal() {
      this.setAppModal(false);
      this.setModalHide();
      this.musicModal = false;
      this.dataModal = false;
      this.clearModal = false;
      this.dataInput = "";
    },
    backHome() {
      // console.log("remove")
      this.$router.push({name: 'home', replace: true});
      this.setExamStatus(false)
      this.hiddenModal()
      localStorage.removeItem('tiku_examData');
      if (typeof (localStorage.examTimeObj) !== 'undefined') {
        clearInterval(JSON.parse(localStorage.examTimeObj).timer)
      }
      localStorage.removeItem('examTimeObj');
      localStorage.removeItem('totalScore');
      localStorage.removeItem('typeScore');
    },
    hiddenUpdateModal() {
      localStorage.setItem('isShowUpdateModal', JSON.stringify({res: false}));
      localStorage.setItem('tiku_version', this.version);
      this.updateModal = false;
      this.setModalHide()
    },
    /**
     * 刷新网页
     */
    freshPage() {
      location.reload();
    },

    // 显示加载条
    handleShowLoading() {
      const that = this;
      this.setAppLoading(true);
      clearTimeout(timeId);
      let timeId = setTimeout(function () {
        that.setAppLoading(false);
        clearTimeout(timeId);
      }, 3000)
    },

    /**
     * 导入数据
     */
    importData() {
      const that = this;
      console.log(that.themeMode);
      console.log(that.dataInput.indexOf('currentMemory') < 0);
      console.log(that.dataInput.indexOf("selectedProject") < 0);

      if (that.dataInput.indexOf('currentMemory') > 0 && that.dataInput.indexOf("selectedProject") > 0 && that.dataInput.indexOf("selectedChapter") > 0) {
        this.handleShowLoading();
        this.setImportTotalData(JSON.parse(that.dataInput));
        let data = that.dataInput;
        this.hiddenModal();
        console.log(JSON.parse(data));

        // 切换主题
        if (JSON.parse(data).themeMode === 'light') {
          window.document.documentElement.setAttribute("data-theme", "light");
        } else if (JSON.parse(data).themeMode === 'dark') {
          window.document.documentElement.setAttribute("data-theme", 'dark');
        }

        // 所有数据存入本地
        localStorage.setItem("cardMode", JSON.stringify(JSON.parse(data).cardMode));
        localStorage.setItem("currentMemory", JSON.stringify(JSON.parse(data).currentMemory));
        localStorage.setItem("currentMusicBasicData", JSON.stringify(JSON.parse(data).currentMusicBasicData));
        localStorage.setItem("isCheckIn", JSON.stringify(JSON.parse(data).isCheckIn));
        localStorage.setItem("isFullScreen", JSON.stringify(JSON.parse(data).isFullScreen));
        localStorage.setItem("isStick", JSON.stringify(JSON.parse(data).isStick));
        localStorage.setItem("selectedAnswer", JSON.stringify(JSON.parse(data).selectedAnswer));
        localStorage.setItem("selectedChapter", JSON.stringify(JSON.parse(data).selectedChapter));
        localStorage.setItem("selectedProject", JSON.stringify(JSON.parse(data).selectedProject));
        localStorage.setItem("songListId", JSON.stringify(JSON.parse(data).songListId));
        localStorage.setItem("themeColor", JSON.stringify(JSON.parse(data).themeColor));
        localStorage.setItem("themeMode", JSON.stringify(JSON.parse(data).themeMode));

        clearTimeout(timeId);
        let timeId = setTimeout(function () {
          that.handleShowAlert("数据已导入");
          that.hiddenModal();
          that.dataInput = "";
          clearTimeout(timeId);
        }, 3000);

      } else {
        this.handleShowAlert("您的数据输入有误");
        console.log("假数据");
        this.hiddenModal();
      }
    },
    /**
     * 更改音乐歌单
     */
    handleSongListId(searchString) {
      const that = this;
      let reg = /[1-9][0-9]*/g;
      let songIdList = this.songListInput.match(reg);
      // console.log(songIdList)
      let id = null;
      // http://music.163.com/playlist/899755273/579065427/?userid=579065427
      if (this.songListInput.indexOf('?userid=') >= 0) {
        id = songIdList[1]
      } else if (this.songListInput.indexOf('playlist?id=') >= 0) {
        id = songIdList[1]
      } else if (this.songListId === null) {
        id = songIdList[0]
      } else {
        id = this.songListInput
      }
      if (!this.songListInput) {
        this.setWarning("歌单id不得为空");
        return
      }
      if (id === null) {
        this.setWarning("格式错误，请重试！");
        this.songListInput = '';
        return
      }
      this.hiddenModal();
      this.setSongListId(id);
      localStorage.setItem('songListId', JSON.stringify(this.songListId));

      this.handleShowLoading();
      clearTimeout(timeId);
      let timeId = setTimeout(function () {
        that.handleShowAlert("歌单更改成功, 请刷新页面");
        that.handleShowModal('fresh');
        clearTimeout(timeId)
      }, 3000)
    },

    clickSubmitExamBtn() {
      this.setSubmitExamStatus(true);
      this.hiddenModal();
    },
    /**
     * 显示提示
     * @param warning： 提示内容
     */
    handleShowAlert(warning) {
      const that = this;
      this.setWarning(warning);
      clearTimeout(timeId);
      let timeId = setTimeout(function () {
        that.isAlert = false;
        clearTimeout(timeId)
      }, 4000)
    },

    /**
     * 清空本地存储
     */
    deleteLocalStorage() {
      this.hiddenModal();
      this.handleShowLoading();
      clearTimeout(timeId);
      let timeId = setTimeout(function () {
        localStorage.clear();
        location.href = 'https://tiku.chenmo1212.cn?f=clear';
        clearTimeout(timeId);
      }, 4000);
    },

    /**
     * 导出数据
     */
    exportData() {
      const that = this;
      this.setExportTotalData();
      this.handleShowLoading();
      this.hiddenModal();
      clearTimeout(timeId);
      let timeId = setTimeout(function () {
        that.handleShowAlert("数据已导出到剪切板");
        that.hiddenModal();
        // console.log(that.totalData);
        that.setClipboard(JSON.stringify(that.totalData));
        clearTimeout(timeId);
      }, 3000);
    },
    /**
     * 复制到剪切板
     */
    setClipboard(value) {
      let transfer = document.createElement('input');
      document.body.appendChild(transfer);
      transfer.value = value;  // 这里表示想要复制的内容
      transfer.focus();
      transfer.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      transfer.blur();
      console.log('复制成功');
      document.body.removeChild(transfer);
    },

    // 显示通知
    handleShowModal(type) {
      // 初始化
      this.musicModal = false;
      this.dataModal = false;
      this.clearModal = false;
      this.freshModal = false;
      this.submitExamModal = false;
      this.backHomeModal = false;

      if (type === 'music') {
        this.musicModal = true;
        this.modalTit = "更换歌单";
        this.modalMsg = '您可以在此处替换成您的歌单 <br> <span style="text-align: left; display: block; margin-top: 5px;">1. 网易云歌单ID，例如：2111679838 <br> 2. 歌单分享链接，例如：http://music...</span>';
      } else if (type === 'data') {
        this.dataModal = true;
        this.modalTit = "导入 / 导出数据";
      } else if (type === 'clear') {
        this.clearModal = true;
        this.modalTit = "清空所有数据";
        this.modalMsg = '要清空所有信息吗？操作不可恢复！';
      } else if (type === 'fresh') {
        this.freshModal = true;
        this.modalTit = "请刷新页面";
        this.modalMsg = '歌单更换成功，请刷新页面';
      } else if (type === 'submitExam') {
        this.submitExamModal = true;
        this.modalTit = "提交试卷";
        this.modalMsg = '确定要提交试卷吗？提交之后不可更改！';
      } else if (type === 'backHome') {
        this.backHomeModal = true;
        this.modalTit = "返回主页";
        this.modalMsg = '考试结果不会保存，确定要返回主页吗？';
      } else if (type === 'update') {
        this.updateModal = true;
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/_handle";
/* MODAL */
.modal {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 999;
  overflow: hidden;

  .bg {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 10;
  }

  .content {
    position: absolute;
    width: calc(80% - 10%);
    /*background-color: #f4f6f8;*/
    @include background("detail_bg_color1");
    left: 10%;
    top: 10vh;
    border-radius: 2%;
    padding: 3% 5%;
    z-index: 11;

    .close-icon {
      position: absolute;
      right: 5%;
    }

    .title {
      margin: 5% 0 10%;
      font-weight: 700;

      span {
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: inset 5px 5px 10px #eaecee, inset -5px -5px 10px #feffff;
      }
    }

    .text {
      font-size: 14px;
      margin-bottom: 20px;
    }

    .input {
      margin: 20px 0;
    }

    .form__input {
      width: calc(100% - 10px);
      height: 40px;
      margin: 4px 0;
      padding-left: 10px;
      font-size: 13px;
      letter-spacing: .15px;
      outline: none;
      font-family: 'Montserrat', sans-serif;
      @include background("detail_bg_color1");
      transition: .25s ease;
      border-radius: 8px;
      border: 1px solid;
      @include border_color('border_color1');
      box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }

    i {
      padding-right: 5px;
    }

    .submit-btn {
      border: 1px solid;
      @include border_color('border_color1');
      width: 60%;
      height: 36px;
      margin: 0 auto;
      border-radius: 5px;
      box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: .3s ease;
      color: #599efb;

      &:active {
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
      }
    }

    .btn-group {
      display: flex;
      color: #599efb;

      .import-btn {
        @extend .submit-btn;
        width: 40%;
      }

      .cancel-btn {
        @extend .submit-btn;
        width: 40%;
      }
    }

    .clear-modal {
      .btn {
        @extend .submit-btn;
        width: 40%;
      }

      .submit {
        background-color: #9ee3fb;
        color: #fff;
      }
    }

    .submitExam-modal .submit {
      background: linear-gradient(-90deg, #38d1bf, #00b0ff);
      color: #fff;
    }
  }
}

.update_modal {
  .content {
    top: 15%;

    .title {
      position: relative;
      width: 80%;
      left: 10%;

      .svg-icon {
        width: 100%;
      }
    }

    .msg-modal {
      text-align: left;
    }

    .show-log {
      margin: 10px 0 0 0;
    }
  }
}
</style>
