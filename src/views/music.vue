<template>
  <div id="music" :class="{dark: this.themeMode === 'dark'}">
    <div class="themed-block">
      <div class="neumorphic-card d-flex flex-column mx-auto">
        <div class="d-flex">
          <button type="button" class="btn neumorphic-btn neumorphic-btn_fab" @click="back">
            <i class="fa fa-arrow-left header-icon" aria-hidden="true"/>
          </button>
          <div class="neumorphic-text flex-grow-1 my-auto text-center" @click="setWarning('这是一个音乐播放器~')">Music Player
          </div>
          <button type="button" class="btn neumorphic-btn neumorphic-btn_fab" @click="setModal('music')">
            <i class="fa fa-user header-icon" aria-hidden="true"/>
          </button>
        </div>
        <div class="neumorphic-card__body">
          <div class="neumorphic-image-wrapper turn"
               :class="musicStatus ? '' : 'paused'"
               @click="setWarning('这里什么都没有哦~')">
            <img :src="currentMusicMsg.cover ? currentMusicMsg.cover : 'https://p1.music.126.net/qokD0Oll2Yh17c1GwJFK1w==/109951167152480861.jpg' "
                 style="max-height: 100%; transform: translateX(-50%); margin-left: 50%;" alt="封面"/>
          </div>
          <div class="neumorphic-text neumorphic-text_title text-center mt-5"><a :href="url" target="_blank">{{currentMusicMsg.name}}</a>
          </div>
          <div class="neumorphic-text neumorphic-text_author text-center mt-1 mb-5">{{currentMusicMsg.artists}}</div>
          <div class="neumorphic-slider slider mx-auto">
            <div class="neumorphic-slider__text neumorphic-slider__text_left">{{currentMusicMsg.currentTime ?
              currentMusicMsg.currentTime : '00:00'}}
            </div>
            <div class="neumorphic-slider__back"></div>
            <div class="neumorphic-slider__line"
                 :style="{width: currentMusicMsg.progress ? currentMusicMsg.progress : 0}"></div>
            <!--<div class="neumorphic-slider__thumb"></div>-->
            <div class="neumorphic-slider__text neumorphic-slider__text_right">{{currentMusicMsg.duration ?
              currentMusicMsg.duration : '00:00'}}
            </div>
          </div>
          <div class="player-controls">
            <div class="btn-group">
              <button type="button" class="btn neumorphic-btn neumorphic-btn_fab mx-auto" @click="handlePre()">
                <i class="fa fa-backward"/>
              </button>
              <button type="button" class="btn neumorphic-btn neumorphic-btn_fab neumorphic-btn_primary mx-auto"
                      @click="handleMusicStatus">
                <i class="fa fa-pause" v-if="musicStatus"/>
                <i class="fa fa-play" v-if="!musicStatus"/>
              </button>
              <button type="button" class="btn neumorphic-btn neumorphic-btn_fab mx-auto" @click="handleNext">
                <i class="fa fa-forward"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import debug from "debug";

  export default {
    name: "music",
    computed: {
      ...mapState([
        'musicStatus',
        'themeMode',
        'songListId',
        'currentMusicBasicData',
      ]),
    },
    data() {
      return {
        ifPlayMusic: false,
        duration: '',
        currentTime: '0',
        songName: '',
        artists: '',
        cover: 'https://p3.music.126.net/QGb9Vtyw7qHS00uEvPfM6g==/843325418547559.jpg?param=300y300',
        url: '',
        currentMusicMsg: {cover: "https://p3.music.126.net/QGb9Vtyw7qHS00uEvPfM6g==/843325418547559.jpg?param=300y300"},

        fromRouterName: "home",

        isLocal: false,   // 是否存储在本地
      }
    },
    created() {
      if (typeof (localStorage.currentMusicBasicData) === 'undefined') {
        console.log("第一次不从首页进，直接修改网址的吧")
        // this.currentMusicMsg = this.currentMusicBasicData;
        // localStorage.setItem("currentMusicBasicData", JSON.stringify(this.currentMusicBasicData));
      } else {
        this.currentMusicMsg = JSON.parse(localStorage.currentMusicBasicData);
        this.isLocal = true;
      }

      // // 获取仓库的当前播放歌曲数据
      // this.currentMusicMsg = this.currentMusicBasicData;

      // 加载歌单歌曲信息，等待控件触发
      this.getSongListsData(this.songListId);

    },
    mounted() {
    },
    watch: {
      currentMusicBasicData() {
        this.setCurrentMusicMsg();
      }
    },
    beforeRouteEnter(to, from, next) {
      // console.log(to, from); // 可以拿到 from， 知道上一个路由是什么，从而进行判断
      //在next中写处理函数
      next(vm => {
        vm.setFromRouter(from.name)
      });
    },
    methods: {
      ...mapActions([
        'setMusicStatus',
        'setWarning',
        'setModal',
        'setCurrentBasicData',
        'setMusicMsg',
      ]),
      // beforeRouteEnter的处理函数，用来获取来源路由的名字
      setFromRouter(name) {
        this.fromRouterName = name;
      },
      back() {// 返回
        this.$router.push({name: this.fromRouterName})
      },

      // 更新当前播放歌曲的数据
      setCurrentMusicMsg() {
        this.currentMusicMsg = this.currentMusicBasicData;
        this.currentMusicMsg.duration = this.formatSeconds(this.currentMusicBasicData.duration);
        this.currentMusicMsg.currentTime = this.formatSeconds(this.currentMusicBasicData.currentTime);
        this.$forceUpdate();

        // 将当前播放歌曲数据存入本地
        localStorage.setItem('currentMusicBasicData', JSON.stringify(this.currentMusicBasicData))
      },
      // 点击暂停和播放按钮
      handleMusicStatus() {
        this.musicStatus ? this.setMusicStatus(false) : this.setMusicStatus(true);
        const turn = document.querySelector('.turn');
        // 如果classList中存在给定的值，删除它，否则，添加它；
        turn.classList.toggle('paused');
      },
      // 根据网易云歌单id获取歌单信息
      getSongListsData(id) {
        const that = this;
        this.fetch163Playlist(this.songListId)
          .then(res => {  // 获取歌单内歌曲信息
            console.log(res);
            that.songLists = res;
            that.setMusicMsg(res);  // 把歌单信息放进仓库

            let tempIndex = 0;
            if (that.isLocal) {
              let temp = JSON.parse(localStorage.currentMusicBasicData);
              tempIndex = temp.index || 0;
            } else {
              tempIndex = 0;
            }
            res[tempIndex].index = tempIndex; // 添加歌曲下
            that.currentMusicMsg = res[tempIndex];  // 把第一首歌信息存为当前播放音乐 给音乐组件使用
            that.setCurrentBasicData(res[tempIndex]);  // 把第一首歌信息存为当前播放音乐 存到仓库里供全局使用
          })
          .catch(err => {
            console.error("歌单信息获取失败：", err);
          });
      },

      /**
       * 获取一言的网易云接口（本示例需要浏览器支持 Promise，fetch 以及 ES6 语法。）
       * @param playlistId 歌单id
       */
      fetch163Playlist(playlistId) {
        return new Promise((ok) => {
          fetch(`http://1.117.97.239:5000/playlist/track/all?id=${playlistId}`)
            .then(response => response.json())
            .then(data => {
              const arr = [];
              data.songs.map(function (value) {
                arr.push(value.id);
              });
              return arr;
            })
            .then(this.fetch163SongDetail)
            .then(ok)
            .catch(err => {
              // that.isWelcome = false;
              alert("出错了1" + err)
            });
        });
      },
      fetch163SongDetail(Ids) {
        const that = this
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
          fetch(`http://1.117.97.239:5000/song/detail?ids=${ids.join(',')}`)
            .then(response => response.json())
            .then(data => {
              let songs = [];
              data.songs.map(function (song) {
                songs.push({
                  name: song.name,
                  artists: song.ar.map(e=>e.name).join(","),
                  album: song.al.name,
                  cover: song.al.picUrl,
                  lrc: "",
                  id: song.id,
                });
              });
              return songs;
            })
            .then(that.fetch163SongUrl)
            .then(ok)
            .catch(err => {
              alert("出错了3" + err)
            });
        });
      },
      fetch163SongUrl(songs) {
        return new Promise(function (ok, err) {
          let ids;
          switch (typeof songs) {
            case 'number':
              ids = [songs];
              break;
            case 'object':
              if (!Array.isArray(songs)) {
                err(new Error('Please enter array or number'));
                return;
              }
              ids = songs.map(e => e.id);
              break;
            default:
              err(new Error('Please enter array or number'));
              return;
          }
          fetch(`http://1.117.97.239:5000/song/url/v1?id=${ids.join(',')}&level=exhigh`)
            .then(response => response.json())
            .then(data => {
              data.data.forEach((val, i) => {
                songs[i].url = val.url
                songs[i].index = 0
              });
              console.log(songs[0])
              return songs;
            })
            .then(ok)
            .catch(err => {
              alert("出错了3" + err)
            });
        });
      },

      // 暂停封面
      pausedWrapper() {
        const turn = document.querySelector('.neumorphic-image-wrapper');
        // 如果classList中存在给定的值，删除它，否则，添加它；
        turn.classList.remove('turn');
        setTimeout(() => {
          turn.classList.add('turn');
        }, 500);
        turn.classList.remove('paused');
      },

      // 下一首
      handleNext() {
        window.nextSong();
        this.setMusicStatus(true);
        this.pausedWrapper()
      },
      // 上一首
      handlePre() {
        window.preSong();
        this.setMusicStatus(true);
        this.pausedWrapper()
      },

      //将秒数转换为时分秒格式
      formatSeconds(value) {

        let theTime = parseInt(value);// 秒
        let middle = 0;// 分
        let hour = 0;// 小时

        if (theTime > 60) {
          middle = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (middle > 60) {
            hour = parseInt(middle / 60);
            middle = parseInt(middle % 60);
          }
        }
        let result = "";
        if (hour > 0) {
          if (middle < 10) {
            if (theTime < 10) {
              result = "" + parseInt(hour) + ":0" + parseInt(middle) + ":0" + parseInt(theTime);
            } else {
              result = "" + parseInt(hour) + ":0" + parseInt(middle) + ":" + parseInt(theTime);
            }
          } else {
            if (theTime < 10) {
              result = "" + parseInt(hour) + ":" + parseInt(middle) + ":0" + parseInt(theTime);
            } else {
              result = "" + parseInt(hour) + ":" + parseInt(middle) + ":" + parseInt(theTime);
            }
          }
          result = "" + parseInt(hour) + ":" + parseInt(middle) + ":" + parseInt(theTime);
        } else if (middle > 0) {
          if (middle < 10) {
            if (theTime < 10) {
              result = "0" + parseInt(middle) + ":0" + parseInt(theTime);
            } else {
              result = "0" + parseInt(middle) + ":" + parseInt(theTime);
            }
          } else {
            if (theTime < 10) {
              result = parseInt(middle) + ":0" + parseInt(theTime);
            } else {
              result = parseInt(middle) + ":" + parseInt(theTime);
            }
          }
        } else if (theTime > 0) {
          if (theTime < 10) {
            result = "00:0" + parseInt(theTime);
          } else {
            result = "00:" + parseInt(theTime);
          }
        }
        return result;
      },

      // 提示信息
      handleAlertMsg() {
        this.setWarning("该功能正在开发ing~");
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/handle";

  a {
    color: #6C7A92;
    text-decoration: none;
  }

  #music {
    height: 100vh;
  }

  body {
    /*background-color: #f4f6f8;*/
    @include background("music_bg_color1");
    /*background-color: #EBECF0px;*/
    font-size: 12px;
  }

  .themed-block {
    background: #f4f6f8;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    padding: 0;
    z-index: 1;
  }

  .dark {
    .themed-block {
      --back-color: #26282b !important;
      --text-color: #707174 !important;
      --title-color: #A7A9AA !important;
      --shadow-color: 0, 0, 0 !important;
      --light-color: 80, 80, 80px !important;
      --border-active-color: #444 !important;
      --main-action-left: #D43C0B !important;
      --main-action-right: #BF8A10px !important;
      background-color: #26282B !important;
    }

    .neumorphic-image-wrapper {
      /*box-shadow: 7px 7px 15px 5px rgba(0,0,0, .3), -4px -4px 5px 7px rgba(80,80,80, 1);*/
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65);
    }

    .player-controls .btn {
      /*box-shadow: 7px 7px 15px 0 rgba(0, 0, 0, .3), -7px -7px 15px 0px rgba(80, 80, 80, 1), inset -1px -1px 2px 0px rgba(0,0,0, .3), inset 1px 1px 2px 0px rgba(80, 80, 80, 1);*/
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65);
    }

    .neumorphic-btn {
      /*box-shadow: 7px 7px 15px 0 rgba(0,0,0, 0.3),-7px -7px 15px 0px rgba(80,80,80, 1),inset 0px 0px 0px 0px rgba(0,0,0, 0),inset 0px 0px 0px 0px rgba(80,80,80, 0);*/
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 5px 5px 5px rgba(0, 0, 0, 0.65);
    }

    .neumorphic-btn:active {
      border: 2px solid #26282b;
      box-shadow: inset -5px -5px 5px rgba(255, 255, 255, 0.05), inset 5px 5px 5px rgba(0, 0, 0, 0.65) !important;
    }

    .neumorphic-btn_primary {
      background: linear-gradient(90deg, #D43C0B, #BF8A10);
    }

    .neumorphic-slider__line {
      background: linear-gradient(90deg, #D43C0B, #BF8A10);
    }

    .neumorphic-slider__back {
      box-shadow: inset 2px 2px 3px -2px rgba(0, 0, 0, .3), inset -2px -2px 3px 0px rgba(80, 80, 80, .5);
    }
  }

  .themed-block {
    --back-color: #f4f6f8;
    --text-color: #A2B1CA;
    --title-color: #6C7A92;
    --shadow-color: 0, 0, 0;
    --light-color: 255, 255, 255;
    --border-active-color: #EEE;
    --main-action-left: #779DFF;
    --main-action-right: #9EB8FF;
    background-color: #ddd;
  }

  /*.themed-block:nth-of-type(2) {*/
  /*--back-color: #2E3237;*/
  /*--text-color: #707174;*/
  /*--title-color: #A7A9AA;*/
  /*--shadow-color: 0, 0, 0;*/
  /*--light-color: 80, 80, 80px;*/
  /*--border-active-color: #444;*/
  /*--main-action-left: #D43C0B;*/
  /*--main-action-right: #BF8A10px;*/
  /*background-color: #26282B;*/
  /*}*/

  .btn:focus {
    outline: none;
  }

  .neumorphic-btn {
    padding: 10px 15px;
    border-radius: 25px;
    background-color: var(--back-color);
    border: 2px solid var(--back-color);
    box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);
    transition: all .25s ease;
    color: var(--text-color);
    font-size: 12px;
    text-shadow: 0 0 2px rgba(var(--text-color), 0);

    &:focus {
      box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0px rgba(var(--light-color), 1), inset 0 0 0 0 rgba(var(--shadow-color), 0), inset 0 0 0 0 rgba(var(--light-color), 0);
      text-shadow: 0 0 2px rgba(var(--text-color), 0);
    }

    &:active {
      /*box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0px rgba(var(--light-color), 1), inset 4px 4px 8px 0px rgba(var(--shadow-color), .3), inset -4px -4px 8px 0px rgba(var(--light-color), 1) !important;*/
      /*box-shadow: -1px -3px 5px 0px rgba(var(--light-color), 1),inset 3px 4px 5px 0px rgba(var(--shadow-color), 0.3),inset 3px 4px 5px 0px rgba(var(--light-color), 1) !important;*/
      box-shadow: inset -5px -5px 5px white, inset 5px 5px 5px rgba(0, 0, 0, 0.1) !important;
      border: 2px solid var(--border-active-color);
      text-shadow: 0 0 2px rgba(var(--text-color), .3);
    }

    .header-icon {
      color: #A2B1CA !important;
    }
  }

  .neumorphic-btn_primary {
    background: linear-gradient(135deg, var(--main-action-left), var(--main-action-right));
    color: #E0E0E0;

    &:active {
      /*box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset 4px 4px 20px 0px rgba(0, 0, 0, .3) !important;*/
      box-shadow: 2px 2px 6px 0 rgba(var(--shadow-color), 0.3), -2px -1px 7px 0 rgba(var(--light-color), 1), inset 4px 4px 20px 0px rgba(0, 0, 0, 0.3) !important;
    }
  }

  .neumorphic-btn_fab {
    width: 40px;
    height: 40px;
    padding: 0;
  }


  .neumorphic-card {
    height: 100%;
    /*background-color: #f4f6f8;*/
    @include background('music_bg_color1');
    /*background-color: var(--back-color);*/
    /*width: max-content;*/
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    padding: 5% 20px;

    .d-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .neumorphic-card-black {
    background-color: #26282B;
    box-shadow: 0 0 6px 6px #26282B, 12px 12px 16px 8px rgba(2, 2, 2, 0.7), -12px -12px 16px 8px rgba(27, 27, 27, 0.7);
    padding: 25px;
    border-radius: 35px;
    width: max-content;

  }

  .neumorphic-text {
    color: var(--text-color);
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    padding: 2% 0;
  }

  .neumorphic-text_title {
    font-size: 20px;
    color: var(--title-color);
  }

  .neumorphic-card__body {
    padding: 10% 0 0;
    position: relative;
    height: calc(81vh - 60px);
  }

  .neumorphic-image-wrapper {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 10px;
    border: 5px solid var(--back-color);
    box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);
  }


  .neumorphic-slider {
    max-width: 100%;
    height: 30px;
    position: relative;
  }

  .neumorphic-slider__back {
    height: 6px;
    width: 100%;
    border-radius: 3px;
    border: none;
    position: absolute;
    bottom: 10px;
    cursor: pointer;
    box-shadow: inset 2px 2px 3px -2px rgba(var(--shadow-color), .3), inset -2px -2px 3px 0 rgba(var(--light-color), .5);
  }

  .neumorphic-slider__line {
    height: 6px;
    width: 40%;
    border-radius: 3px;
    left: 0;
    position: absolute;
    bottom: 9px;
    background: linear-gradient(90deg, var(--main-action-left), var(--main-action-right));
    cursor: pointer;
  }

  .neumorphic-slider__thumb {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-left: -15px;
    background-color: var(--back-color);
    position: absolute;
    bottom: -2.4px;
    left: 40%;
    z-index: 1;
    cursor: pointer;
    box-shadow: 4px 4px 5px -2px rgba(var(--shadow-color), .5), -4px -4px 5px 0 rgba(var(--light-color), .4);
    /*box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);*/

    &::after {
      content: '';
      display: block;
      background-color: var(--main-action-right);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      /*box-shadow: inset 2px 2px 6px 0 rgba(var(--shadow-color), .3);*/
      box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);
    }
  }

  .neumorphic-slider_moving {
    cursor: pointer;
  }

  .neumorphic-slider__text {
    color: var(--text-color);
    font-family: 'Rubik', sans-serif;
    font-size: 10px;
    font-weight: 600;
  }

  .neumorphic-slider__text_left {
    position: absolute;
    bottom: 30px;
    left: 0;
  }

  .neumorphic-slider__text_right {
    position: absolute;
    bottom: 30px;
    right: 0;
  }

  .player-controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 3;

    .btn-group {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }

  .player-controls .btn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 20px;
    /*box-shadow: 7px 7px 15px 0 rgba(var(--shadow-color), .3), -7px -7px 15px 0 rgba(var(--light-color), 1), inset -1px -1px 2px 0 rgba(var(--shadow-color), .3), inset 1px 1px 2px 0 rgba(var(--light-color), 1);*/
    box-shadow: -5px -5px 5px white, 5px 5px 5px rgba(0, 0, 0, 0.1);
  }


  /*  RANGE-SLIDER  */
  .slider {
    position: absolute;
    bottom: 15%;
    width: 100%;
    z-index: 3;
    align-self: center;
    display: flex;
    flex-direction: column;
  }

  .slider__box {
    width: 100%;
    height: 1rem;
    cursor: pointer;
    border-radius: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
  }

  .slider__btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #000;
    position: absolute;
    box-shadow: 0 0.1rem 0.3rem 0 #bec8e4;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slider__btn:hover ~ .slider__tooltip {
    opacity: 1;
  }

  .slider__btn::after {
    content: '';
    position: absolute;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    /*box-shadow: var(--inner-shadow);*/
  }

  .slider__color {
    height: 100%;
    width: 50%;
    position: absolute;
    left: 0;
    z-index: 100;
    border-radius: inherit;
    background: #6d5dfc;
    background: linear-gradient(-1deg, var(--primary-dark) 0%, #5b0eeb 50%, #8abdff 100%);
  }

  .slider__tooltip {
    position: absolute;
    top: 2.6rem;
    height: 2.5rem;
    width: 3rem;
    border-radius: .6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: #6d5dfc;
    /*box-shadow: var(--shadow);*/
    opacity: 0;
    transition: opacity .3s ease;
  }

  @media screen and (min-width: 1175px) {
    .neumorphic-card {
      .d-flex {
        margin-top: 5%;
      }

      .neumorphic-image-wrapper {
        margin: 10% auto;
        width: 300px;
        height: 300px;
      }

      .neumorphic-text_title {
        margin: 15% auto 3%;
      }

      .neumorphic-text_author {
        margin: 0 auto 15%;
      }
    }
  }

  /*
  turn : 定义的动画名称
  1s : 动画时间
  linear : 动画以何种运行轨迹完成一个周期
  infinite :规定动画应该无限次播放
 */
  .turn {
    animation: turn 30s linear infinite;
  }

  .turn.paused {
    animation-play-state: paused;
  }

  @keyframes turn {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    75% {
      -webkit-transform: rotate(270deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
