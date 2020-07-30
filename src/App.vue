<template>
  <div id="app" class="max-control" :class="{dark: this.themeMode === 'dark'}">
    <!--<img src="./assets/logo.png">-->
    <router-view/>

    <audio id="media" autoplay :src="musicUrl" @timeupdate="timeupdate"></audio>

    <div class="alert a-fadeinB" v-if="showAlert">
      <div class="chip">
        <div class="chip__icon">
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </div>
        <p>{{alertMsg}}</p>
        <div class="chip__close" @click="showAlert = false">
          <i class="fa fa-close"></i>
        </div>
      </div>
    </div>

    <!--模态框-->
    <div class="modal" v-if="showModel">
      <div class="bg" @click="hiddenModel"></div>
      <div class="content a-fadeinB">
        <div class="close-icon" @click="hiddenModel"><i class="fa fa-times" aria-hidden="true"></i></div>
        <div class="title"><span>{{modelTit}}</span></div>

        <!--音乐模态框-->
        <div class="music-model" v-if="musicModel">
          <div class="text">{{modelMsg}}</div>
          <div class="input">
            <input type="number" class="form__input" placeholder="网易云歌单ID，例如：2111679838" v-model="songListInput">
          </div>
          <div class="submit-btn" @click="handleSongListId">
            <i class="fa fa-send-o"></i>
            <span>提交</span>
          </div>
        </div>

        <!--导入数据模态框-->
        <div class="import-model" v-if="dataModel">
          <div class="input">
            <input type="text" class="form__input" placeholder="在此处导入您的数据" v-model="dataInput">
          </div>
          <div class="btn-group">
            <div class="import-btn" @click="importData">
              <i class="fa fa-sign-in"></i>
              <span>导入</span>
            </div>
            <div class="cancel-btn" @click="exportData">
              <i class="fa fa-sign-out"></i>
              <span>导出</span>
            </div>
          </div>
        </div>

        <!--清空数据模态框-->
        <div class="clear-model" v-if="clearModel">
          <div class="text">{{modelMsg}}</div>
          <div class="btn-group">
            <div class="btn submit" @click="deleteLocalStorage">
              <span>确定</span>
            </div>
            <div class="btn" @click="hiddenModel">
              <span>取消</span>
            </div>
          </div>
        </div>

        <!--刷新网页模态框-->
        <div class="fresh-model" v-if="freshModel">
          <div class="text">{{modelMsg}}</div>
          <div class="submit-btn" @click="freshPage">
            <i class="fa fa-send-o"></i>
            <span>刷新</span>
          </div>
        </div>
      </div>
    </div>

    <!--loading-->
    <div class="loading-box" v-if="showLoading">
      <div class="bg"></div>
      <div class="loading-content a-fadeinB">
        <div class="svg">
          <svg class="tea" width="37" height="48" viewbox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
              stroke="var(--secondary)" stroke-width="2"></path>
            <path
              d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
              stroke="var(--secondary)" stroke-width="2"></path>
            <path id="teabag" fill="var(--secondary)" fill-rule="evenodd" clip-rule="evenodd"
                  d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"></path>
            <path id="steamL" d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" stroke="var(--secondary)"></path>
            <path id="steamR" d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13" stroke="var(--secondary)"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
        <div class='text'>loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        index: 0,
        musicUrl: '',
        musicList: null,
        // musicList: [
        //   'http://music.163.com/song/media/outer/url?id=28828076.mp3',
        //   'http://music.163.com/song/media/outer/url?id=31654455.mp3',
        //   'http://music.163.com/song/media/outer/url?id=509313150.mp3',
        //   'http://music.163.com/song/media/outer/url?id=448596416.mp3',
        //   'http://music.163.com/song/media/outer/url?id=857896.mp3',
        //   'http://music.163.com/song/media/outer/url?id=453843751.mp3',
        //   'http://music.163.com/song/media/outer/url?id=440353010.mp3',
        // ],
        progressBegin: 0,

        showAlert: false,
        showLoading: false,

        dataInput: null,

        showModel: false,
        musicModel: false,
        dataModel: false,
        clearModel: false,
        freshModel: false,
        modelTit: "提示",
        modelMsg: "您可以在此处替换成您的歌单",

        // 音乐歌单id
        // songListId: '2111679838',
        songListInput: '',

        alertMsg: "卡片答题模式已开启",
      }
    },
    computed: {
      ...mapState([
        'musicStatus',
        'themeMode',
        'warning',
        'isAlert',
        'isModel',
        'isLoading',
        'modelType',
        'totalData',
        'songListId',
        'currentMemory',
      ]),
    },
    mounted() {
      // 获取本地歌单
      if (typeof (localStorage.songListId) !== 'undefined') {
        this.setSongListId(JSON.parse(localStorage.songListId));
      }

      // 将方法挂载到全局, 子组件通过访问window.nextSong() 即可调用
      window.nextSong = this.nextSong;
      window.preSong = this.preSong;

      const that = this;
      let flag = false;
      if (typeof (localStorage.currentMusicBasicMsg) !== 'undefined') {
        flag = true
      }
      this.fetch163Playlist(this.songListId)
        .then(res => {
          // console.log(res);
          that.musicList = res;
          that.setMusicMsg(res);
          if (flag) {
            that.musicUrl = JSON.parse(localStorage.currentMusicBasicMsg).url;
            that.index = JSON.parse(localStorage.currentMusicBasicMsg).index;
          } else {
            that.musicUrl = res[0].url;
          }
          console.log("音乐数据加载完成")
        })
        .catch(err => {
          console.error(err)
        });
    },
    methods: {
      ...mapActions([
        'setCurrentBasicMsg',
        'setMusicMsg',
        'setExportTotalData',
        'setImportTotalData',
        'setSongListId',
        'setWarning',
      ]),

      /**
       * 隐藏模态框
       */
      hiddenModel() {
        this.showModel = false;
        this.musicModel = false;
        this.dataModel = false;
        this.clearModel = false;
        this.dataInput = "";
      },

      /**
       * 清空本地存储
       */
      deleteLocalStorage() {
        this.hiddenModel();
        this.handleShowLoading();
        clearTimeout(timeId);
        let timeId = setTimeout(function () {
          localStorage.clear();
          location.reload();
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
        this.hiddenModel();
        this.handleShowLoading();
        clearTimeout(timeId);
        let timeId = setTimeout(function () {
          that.handleShowAlert("数据已导出到剪切板");
          that.hiddenModel();
          // console.log(that.totalData);
          that.setClipboard(JSON.stringify(that.totalData));
          clearTimeout(timeId);
        }, 3000);
      },

      /**
       * 导入数据
       */
      importData() {
        const that = this;
        console.log(that.themeMode);
        console.log(that.dataInput.indexOf('currentMemory') < 0);
        console.log(that.dataInput.indexOf("selectedProject") < 0);

        if (that.dataInput.indexOf('currentMemory') > 0 && that.dataInput.indexOf("selectedProject") > 0 && that.dataInput.indexOf("selectedChapter") > 0){
          this.handleShowLoading();
          this.setImportTotalData(JSON.parse(that.dataInput));
          let data = that.dataInput;
          this.hiddenModel();
          console.log(JSON.parse(data));

          // 切换主题
          if (JSON.parse(data).themeMode === 'light') {
            window.document.documentElement.setAttribute("data-theme", "light");
          } else if(JSON.parse(data).themeMode === 'dark'){
            window.document.documentElement.setAttribute("data-theme", 'dark');
          }

          // 所有数据存入本地
          localStorage.setItem("cardMode", JSON.stringify(JSON.parse(data).cardMode));
          localStorage.setItem("currentMemory", JSON.stringify(JSON.parse(data).currentMemory));
          localStorage.setItem("currentMusicBasicMsg", JSON.stringify(JSON.parse(data).currentMusicBasicMsg));
          localStorage.setItem("isCheck", JSON.stringify(JSON.parse(data).isCheck));
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
            that.hiddenModel();
            that.dataInput = "";
            clearTimeout(timeId);
          }, 3000);

        } else {
          this.handleShowAlert("您的数据输入有误");
          console.log("假数据");
          this.hiddenModel();
        }
      },

      /**
       * 更改音乐歌单
       */
      handleSongListId() {
        const that = this;

        if (!this.songListInput) {
          this.setWarning("歌单id不得为空");
          return
        }

        this.hiddenModel();
        this.setSongListId(this.songListInput);
        localStorage.setItem('songListId', JSON.stringify(this.songListId));

        this.handleShowLoading();
        clearTimeout(timeId);
        let timeId = setTimeout(function () {
          that.handleShowAlert("歌单更改成功, 请刷新页面");
          that.handleShowModel('fresh');
          clearTimeout(timeId)
        }, 3000)
      },

      /**
       * 刷新网页
       */
      freshPage() {
        location.reload();
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

      checkAudio(){
        let audio = document.getElementById('media');
        if (audio) {
          console.log("有用");
        } else {
          console.log("坏了");
          this.handleShowAlert("音乐加载失败，请刷新后重试");
        }
        // console.log(audio)
      },

      // 下一首
      nextSong() {
        this.checkAudio();
        console.log("next");
        if (this.index < this.musicList.length - 1) {
          this.index += 1;
        } else {
          this.index = 0;
        }
        this.musicUrl = this.musicList[this.index].url;
      },

      // 上一首
      preSong() {
        this.checkAudio();
        console.log("pre");
        if (this.index > 0) {
          this.index -= 1;
        } else {
          this.index = this.musicList.length + 1;
        }
        this.musicUrl = this.musicList[this.index].url;
      },

      timeupdate() {
        let audio = document.getElementById('media');

        if (audio.ended) {
          this.nextSong();
        }
        // console.log(audio.currentTime);
        // console.log(audio.duration);
        // console.log(this.musicList[this.index]);
        const musicData = this.musicList[this.index];
        let progress = 100 * (audio.currentTime / audio.duration) + "%";
        // console.log(progress)
        let singer = musicData.artist;
        let name = musicData.name;
        let cover = musicData.pic;
        let duration = audio.duration;
        this.setCurrentBasicMsg({
          progress: progress,
          singer: singer,
          name: name,
          cover: cover,
          duration: duration,
          currentTime: audio.currentTime,
          url: musicData.url,
          index: this.index,
        });
      },

      // 本示例需要浏览器支持 Promise，fetch 以及 ES6 语法。
      fetch163Playlist(playlistId) {
        return new Promise((ok, err) => {
          fetch(`https://v1.hitokoto.cn/nm/playlist/${playlistId}`)
            .then(response => response.json())
            .then(data => {
              const arr = [];
              data.playlist.tracks.map(function (value) {
                arr.push(value.id);
              });
              return arr;
            })
            .then(this.fetch163Songs)
            .then(ok)
            .catch(err => {
              alert("出错了1" + err)
            });
        });
      },
      fetch163Songs(Ids) {
        return new Promise(function (ok, err) {
          let ids;
          switch (typeof Ids) {
            case 'number':
              ids = [Ids];
              break;
            case 'object':
              if (!Array.isArray(Ids)) {
                err(new Error('Please enter array or number'));
                return;
              }
              ids = Ids;
              break;
            default:
              err(new Error('Please enter array or number'));
              return;
          }
          fetch(`https://v1.hitokoto.cn/nm/summary/${ids.join(',')}?lyric=true&common=true`)
            .then(response => response.json())
            .then(data => {
              let songs = [];
              data.songs.map(function (song) {
                songs.push({
                  name: song.name,
                  url: song.url,
                  artist: song.artists.join('/'),
                  album: song.album.name,
                  pic: song.album.picture,
                  lrc: song.lyric
                });
              });
              return songs;
            })
            .then(ok)
            .catch(err => {
              alert("出错了3" + err)
            });
        });
      },

      // 显示提示
      handleShowAlert(warning) {
        const that = this;
        this.showAlert = true;
        this.alertMsg = warning;
        clearTimeout(timeId);
        let timeId = setTimeout(function () {
          that.showAlert = false;
          clearTimeout(timeId)
        }, 4000)
      },

      // 显示通知
      handleShowModel(type) {
        if (type === 'music') {
          this.musicModel = true;
          this.modelTit = "更换歌单";
        } else if (type === 'data') {
          this.dataModel = true;
          this.modelTit = "导入 / 导出数据";
        } else if (type === 'clear') {
          this.clearModel = true;
          this.modelTit = "清空所有数据";
          this.modelMsg = '要清空所有信息吗？操作不可恢复！';
        } else if (type === 'fresh') {
          this.freshModel = true;
          this.modelTit = "请刷新页面";
          this.modelMsg = '歌单更换成功，请刷新页面';
        }
        this.showModel = true;
      },

      // 显示加载条
      handleShowLoading() {
        const that = this;
        this.showLoading = true;
        clearTimeout(timeId);
        let timeId = setTimeout(function () {
          that.showLoading = false;
          clearTimeout(timeId);
        }, 3000)
      },
    },

    watch: {
      musicStatus() {
        this.checkAudio();
        let audio = document.getElementById('media');
        // console.log(audio)
        if (this.musicStatus) {
          if (typeof (localStorage.currentMusicBasicMsg) !== 'undefined') {
            audio.currentTime = JSON.parse(localStorage.currentMusicBasicMsg).currentTime;
          }
          audio.play();
        } else {
          audio.pause();// 暂停
        }
      },

      isAlert() {
        // console.log("有变化");
        if (this.showAlert) {
          this.alertMsg = this.warning;
          return;
        }
        this.handleShowAlert(this.warning);
      },

      isModel() {
        // console.log("app");
        this.handleShowModel(this.modelType);
      },

      isLoading() {
        this.handleShowLoading();
      },

    },
  }
</script>

<style lang="scss">
  @import "./font/css/font-awesome.min.css";
  @import "./scss/_handle";

  .dark {
    .loading-box {
      color: #A7A9AA !important;
    }
    svg.tea {
      --secondary: #A7A9AA;
    }

    .modal {
      color: #BF8A10!important;

      .form__input,
      .title span {
        box-shadow: inset 2px 2px 3px -2px rgba(0,0,0,0.3),inset -2px -2px 3px 0px rgba(80,80,80,0.5) !important;
      }
      .submit-btn {
        box-shadow: -5px -5px 5px rgba(255,255,255,0.05),2px 2px 5px rgba(0,0,0,0.65) !important;
        color: #BF8A10!important;
      }
      .clear-model .submit {
        background-color: #26282b!important;
        color: #fff;
      }
    }
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    margin: 0;
    padding: 0;
  }

  html, body {
    margin: 0;
    padding: 0;
    border: 0;
  }

  .max-control {
    /*max-width: 750px;*/
    /*margin: 0 auto;*/
    /*background-color: #fff;*/
    /*min-height: 100vh;*/
    /*position: relative;*/
  }

  #media[autoplay]:not([muted]) {
      display: none;
  }

  /*  CHIP  */
  .alert {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 999;

    .chip {
      width: 100%;
      /*background-color: #fff;*/
      @include background("app_bg_color1");
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*<!--box-shadow: 5px 5px 6px #d1d3db, -5px -5px 6px #f4f4f6;-->*/
      @include app_box_shadow(app_shadow_color1, app_shadow_color2)
    }

    .chip__icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 1rem;
      margin: 0 0 0 .2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      @include font_color("app_font_color1");
    }

    .chip p {
      font-size: .9rem;
      color: #9baacf;
    }

    .chip__close {
      width: 40px;
      height: 40px;
      line-height: 40px;
      /*margin: 0 .5rem;*/
      /*display: flex;*/
      color: #bec8e4;
      cursor: pointer;
    }
  }

  /*loading*/
  .loading-box {
    position: absolute;
    width: 100vw;
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
    }

    .loading-content {
      position: absolute;
      width: 100px;
      height: 100px;
      @include background("app_bg_color1");
      left: calc(45% - 50px);
      top: 30%;
      border-radius: 2%;
      padding: 3% 5%;
      z-index: 1000;

      .svg {
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text {
        height: 20%;
      }
    }
  }

  /* MODAL */
  .modal {
    position: absolute;
    width: 100vw;
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
    }

    .content {
      position: absolute;
      width: calc(80% - 10%);
      /*background-color: #f4f6f8;*/
      @include background("detail_bg_color1");
      left: 10%;
      top: 25%;
      border-radius: 2%;
      padding: 3% 5%;

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

      .clear-model {
        .btn {
          @extend .submit-btn;
          width: 40%;
        }

        .submit {
          background-color: #9ee3fb;
          color: #fff;
        }
      }
    }
  }

  .a-fadeinB {
    -webkit-animation: 0.6s ease-out backwards;
    -moz-animation: 0.6s ease-out backwards;
    -ms-animation: 0.6s ease-out backwards;
    animation: 0.6s ease-out backwards;
    -webkit-animation-name: fadeinB;
    -moz-animation-name: fadeinB;
    -ms-animation-name: fadeinB;
    animation-name: fadeinB;
  }


  /* 淡入-从下 */
  @-webkit-keyframes fadeinB {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes fadeinB {
    0% {
      opacity: 0;
      -moz-transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      -moz-transform: translateY(0);
    }
  }

  @-ms-keyframes fadeinB {
    0% {
      opacity: 0;
      -ms-transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      -ms-transform: translateY(0);
    }
  }

  @keyframes fadeinB {
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /*
  ** loading
  **/
  svg.tea {
    --secondary: #33406f;
  }

  svg.tea #teabag {
    transform-origin: top center;
    transform: rotate(3deg);
    animation: swing 2s infinite;
  }

  svg.tea #steamL {
    stroke-dasharray: 13;
    stroke-dashoffset: 13;
    animation: steamLarge 2s infinite;
  }

  svg.tea #steamR {
    stroke-dasharray: 9;
    stroke-dashoffset: 9;
    animation: steamSmall 2s infinite;
  }

  @-moz-keyframes swing {
    50% {
      transform: rotate(-3deg);
    }
  }

  @-webkit-keyframes swing {
    50% {
      transform: rotate(-3deg);
    }
  }

  @-o-keyframes swing {
    50% {
      transform: rotate(-3deg);
    }
  }

  @keyframes swing {
    50% {
      transform: rotate(-3deg);
    }
  }

  @-moz-keyframes steamLarge {
    0% {
      stroke-dashoffset: 13;
      opacity: 0.6;
    }
    100% {
      stroke-dashoffset: 39;
      opacity: 0;
    }
  }

  @-webkit-keyframes steamLarge {
    0% {
      stroke-dashoffset: 13;
      opacity: 0.6;
    }
    100% {
      stroke-dashoffset: 39;
      opacity: 0;
    }
  }

  @-o-keyframes steamLarge {
    0% {
      stroke-dashoffset: 13;
      opacity: 0.6;
    }
    100% {
      stroke-dashoffset: 39;
      opacity: 0;
    }
  }

  @keyframes steamLarge {
    0% {
      stroke-dashoffset: 13;
      opacity: 0.6;
    }
    100% {
      stroke-dashoffset: 39;
      opacity: 0;
    }
  }

  @-moz-keyframes steamSmall {
    10% {
      stroke-dashoffset: 9;
      opacity: 0.6;
    }
    80% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
  }

  @-webkit-keyframes steamSmall {
    10% {
      stroke-dashoffset: 9;
      opacity: 0.6;
    }
    80% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
  }

  @-o-keyframes steamSmall {
    10% {
      stroke-dashoffset: 9;
      opacity: 0.6;
    }
    80% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
  }

  @keyframes steamSmall {
    10% {
      stroke-dashoffset: 9;
      opacity: 0.6;
    }
    80% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 27;
      opacity: 0;
    }
  }

</style>
