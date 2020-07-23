<template>
  <div id="app" class="max-control">
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

    <div class="modal" v-if="showModel">
      <div class="bg" @click="hiddenModel"></div>
      <div class="content a-fadeinB">
        <div class="close-icon" @click="hiddenModel"><i class="fa fa-times" aria-hidden="true"></i></div>
        <div class="title"><span>{{modelTit}}</span></div>

        <!--音乐模态框-->
        <div class="music-model" v-if="musicModel">
          <div class="text">{{modelMsg}}</div>
          <div class="input">
            <input type="text" class="form__input" placeholder="网易云歌单ID，例如：2111679838" v-model="songListInput">
          </div>
          <div class="submit-btn" @click="setSongListId">
            <i class="fa fa-send-o"></i>
            <span>提交</span>
          </div>
        </div>

        <!--导入数据模态框-->
        <div class="import-model" v-if="dataModel">
          <div class="input">
            <input type="text" class="form__input" placeholder="在此处导入您的数据">
          </div>
          <div class="btn-group">
            <div class="import-btn">
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
        showModel: false,
        musicModel: false,
        dataModel: false,
        clearModel: false,
        freshModel: false,
        modelTit: "提示",
        modelMsg: "您可以在此处替换成您的歌单",

        // 音乐歌单id
        songListId: '2111679838',
        songListInput: '',

        alertMsg: "卡片答题模式已开启",
      }
    },
    computed: {
      ...mapState([
        'musicStatus',
        'warning',
        'isAlert',
        'isModel',
        'modelType',
      ]),
    },
    mounted() {
      // 获取本地歌单
      if (typeof (localStorage.songListId) !== 'undefined') {
        this.songListId = JSON.parse(localStorage.songListId);
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
      ]),

      /**
       * 隐藏模态框
       */
      hiddenModel() {
        this.showModel = false;
        this.musicModel = false;
        this.dataModel = false;
        this.clearModel = false;
      },

      /**
       * 清空本地存储
       */
      deleteLocalStorage(){
        localStorage.clear();
        location.reload();
      },

      /**
       * 导出数据
       */
      exportData(){
        this.handleShowAlert("数据导出成功");
        this.hiddenModel()
      },

      /**
       * 更改音乐歌单
       */
      setSongListId(){
        this.hiddenModel();
        this.songListId = this.songListInput;
        localStorage.setItem('songListId', JSON.stringify(this.songListId));
        this.handleShowAlert("歌单更改成功, 请刷新页面");
        this.handleShowModel('fresh');
      },

      /**
       * 刷新网页
       */
      freshPage(){
        location.reload();
      },

      // 下一首
      nextSong() {
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
      }
    },

    watch: {
      musicStatus() {
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
      }
    },
  }
</script>

<style lang="scss">
  @import "./font/css/font-awesome.min.css";
  @import "./scss/_handle";

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
      background-color: #f4f6f8;
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
        background-color: #f4f6f8;
        transition: .25s ease;
        border-radius: 8px;
        border: 1px solid #fff;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
      }

      i {
        padding-right: 5px;
      }

      .submit-btn {
        border: 1px solid #fff;
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
        color: #536dfe;

        &:active {
          box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        }
      }

      .btn-group {
        display: flex;
        color: #536dfe;

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
          background-color: #536dfe;
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
</style>
