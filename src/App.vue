<template>
  <div id="app" class="max-control" :class="{dark: this.themeMode === 'dark'}">
    <!--<img src="./assets/logo.png">-->
    <router-view/>

    <audio id="media" preload="auto" :src="currentMusicBasicData.url" @timeupdate="timeupdate"/>

    <div class="alert a-fadeinB" v-if="showAlert">
      <alert-vue></alert-vue>
    </div>

    <!--遮罩层-->
    <div class="mask" v-if="isWelcome">
      <div class="logo-container">
        <img src="./assets/logo.png" alt="">
      </div>
    </div>

    <!--模态框-->
    <div class="modal" v-show="showAppModal">
      <modal-vue ref="modal"/>
    </div>

    <FloatBall :text="'哈哈'"/>

    <div class="stars-box">
      <div id='stars' v-if="this.themeMode === 'dark'"></div>
      <div id='stars2' v-if="this.themeMode === 'dark'"></div>
      <div id='stars3' v-if="this.themeMode === 'dark'"></div>
    </div>

    <!--loading-->
    <div class="loading-box" v-if="showAppLoading">
      <div class="bg"></div>
      <div class="loading-content a-fadeinB">
        <div class="svg">
          <svg class="tea" width="37" height="48" viewbox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
              stroke="var(--secondary)" stroke-width="2"/>
            <path
              d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
              stroke="var(--secondary)" stroke-width="2"/>
            <path id="teabag" fill="var(--secondary)" fill-rule="evenodd" clip-rule="evenodd"
                  d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"/>
            <path id="steamL" d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" stroke="var(--secondary)"/>
            <path id="steamR" d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13" stroke="var(--secondary)"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class='text'>loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import FloatBall from '@/components/tool/ball';
import modalVue from '@/components/modal/modal';
import alertVue from '@/components/alert/alert';

export default {
  name: 'App',
  components: {
    FloatBall,
    modalVue,
    alertVue,
  },
  data() {
    return {
      index: 0,
      // musicUrl: '',
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

      // 音乐歌单id
      // songListId: '2111679838',
      songListInput: '',
      isPlay: false,

      isWelcome: false,

    }
  },
  computed: {
    ...mapState([
      'musicStatus',
      'themeMode',
      'warning',
      'isAlert',
      'isModal',
      'showAppLoading',
      'modalType',
      'totalData',
      'songListId',
      'currentMemory',
      'musicPlayActive',
      'currentMusicBasicData',
      'musicList',
      'showAppModal',
      'showAlert',
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

    // document.getElementById('app').style.display = 'block';
    // document.getElementById('appLoading').style.display = 'none';
  },
  watch: {
    musicStatus() {   // 音乐播放状态发生改变（暂停，播放）
      console.log("music status change");
      // console.log(this.musicStatus);
      let audio = document.getElementById('media');
      if (this.musicStatus) {
        setTimeout(() => {
          audio.play();
        }, 150);
      } else {
        setTimeout(() => {
          audio.pause();// 暂停
        }, 150);
      }
    },

    isAlert() {
      // console.log("有变化App");
      const that = this;
      if (this.showAlert) {
        this.setAlertMsg(this.warning);
        clearTimeout(timeId)
        return;
      }
      this.setAlertMsg(this.warning);
      let timeId = setTimeout(function () {
        that.setAlertHide();
        clearTimeout(timeId)
      }, 3000)
    },

    isModal() {
      this.handleShowModal(this.modalType);
    },

    isLoading() {
      this.$ref.modal.handleShowLoading();
    }
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
      'setAlertMsg',
      'setAlertHide',
    ]),

    // 下一首
    nextSong() {
      console.log("next");
      let audio = document.getElementById('media');
      if (this.index < this.musicList.length - 1) {
        this.index += 1;
      } else {
        this.index = 0;
      }
      this.setCurrentBasicData(this.musicList[this.index]);
      setTimeout(() => {
        audio.play();
      }, 150);
    },

    // 上一首
    preSong() {
      let audio = document.getElementById('media');

      if (this.index > 1) {
        this.index -= 1;
      } else {
        this.index = this.musicList.length - 1;
      }
      this.setCurrentBasicData(this.musicList[this.index]);
      setTimeout(() => {
        audio.play();
      }, 150);
    },

    // 歌曲进行，时间变化
    timeupdate() {
      let audio = document.getElementById('media');
      if (audio.ended) {
        this.nextSong();
      }
      const musicData = this.currentMusicBasicData;
      let progress = 100 * (audio.currentTime / audio.duration) + "%";
      let artists = musicData.artists;
      let name = musicData.name;
      let cover = musicData.cover;
      let duration = audio.duration;
      this.setCurrentBasicData({
        progress: progress,
        artists: artists,
        name: name,
        cover: cover,
        duration: duration,
        currentTime: audio.currentTime,
        url: musicData.url,
        index: this.index,
      });
    },

    // 显示通知
    handleShowModal(type) {
      this.$refs.modal.handleShowModal(type);
      this.setAppModal(true)
    },
    //   backHome() {
    //     // console.log("remove")
    //     this.$router.push({name: 'home', replace: true});
    //     this.setExamStatus(false)
    //     this.hiddenModal()
    //     localStorage.removeItem('tiku_examData');
    //     if(typeof(localStorage.examTimeObj) !== 'undefined'){
    //       clearInterval(JSON.parse(localStorage.examTimeObj).timer)
    //     }
    //     localStorage.removeItem('examTimeObj');
    //     localStorage.removeItem('totalScore');
    //     localStorage.removeItem('typeScore');
    //   },
    // },
  }
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

  .Modal {
    color: #BF8A10 !important;

    .form__input,
    .title span {
      box-shadow: inset 2px 2px 3px -2px rgba(0, 0, 0, 0.3), inset -2px -2px 3px 0px rgba(80, 80, 80, 0.5) !important;
    }

    .content .clear-modal.submitExam-modal {
      .submit {
        background: linear-gradient(90deg, #D43C0B, #BF8A10) !important;
      }

      .cancel-btn {
        color: #A7A9AA;
      }
    }

    .submit-btn {
      box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.05), 2px 2px 5px rgba(0, 0, 0, 0.65) !important;
    }

    .clear-modal .submit,
    .submitExam-modal .submit {
      background-color: #26282b !important;
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
  overflow: hidden;
  height: 100%;
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

/*loading*/
.loading-box {
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

  #teabag {
    transform-origin: top center;
    transform: rotate(3deg);
    animation: swing 2s infinite;
  }

  #steamL {
    stroke-dasharray: 13;
    stroke-dashoffset: 13;
    animation: steamLarge 2s infinite;
  }

  #steamR {
    stroke-dasharray: 9;
    stroke-dashoffset: 9;
    animation: steamSmall 2s infinite;
  }
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

/* 黑夜模式小星星 */
.stars-box {
  height: 1px;
  margin-bottom: -1px;

  #stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: 1119px 861px #FFF, 31px 337px #FFF, 332px 1141px #FFF, 16px 1154px #FFF, 1036px 537px #FFF, 1206px 1779px #FFF, 1232px 220px #FFF, 710px 961px #FFF, 1951px 93px #FFF, 1719px 1399px #FFF, 324px 1260px #FFF, 31px 1419px #FFF, 71px 1306px #FFF, 1567px 911px #FFF, 1000px 1824px #FFF, 728px 1295px #FFF, 1036px 28px #FFF, 173px 344px #FFF, 972px 1582px #FFF, 547px 1369px #FFF, 410px 1966px #FFF, 1491px 776px #FFF, 1875px 55px #FFF, 206px 192px #FFF, 1367px 1537px #FFF, 561px 109px #FFF, 1287px 879px #FFF, 603px 875px #FFF, 588px 256px #FFF, 419px 1027px #FFF, 935px 1836px #FFF, 1636px 1502px #FFF, 1718px 1027px #FFF, 1612px 1815px #FFF, 58px 1124px #FFF, 1767px 635px #FFF, 327px 21px #FFF, 1384px 440px #FFF, 230px 1089px #FFF, 707px 182px #FFF, 525px 239px #FFF, 79px 496px #FFF, 879px 908px #FFF, 540px 545px #FFF, 956px 77px #FFF, 1341px 1309px #FFF, 233px 751px #FFF, 1136px 208px #FFF, 1550px 1441px #FFF, 685px 1810px #FFF, 1553px 1105px #FFF, 1562px 290px #FFF, 1993px 1665px #FFF, 365px 1165px #FFF, 1056px 1912px #FFF, 1028px 1478px #FFF, 893px 994px #FFF, 1236px 750px #FFF, 1583px 1361px #FFF, 971px 805px #FFF, 731px 1288px #FFF, 1066px 1499px #FFF, 1177px 490px #FFF, 1390px 1662px #FFF, 1577px 1849px #FFF, 1945px 1222px #FFF, 218px 1431px #FFF, 618px 142px #FFF, 426px 637px #FFF, 1184px 75px #FFF, 530px 1400px #FFF, 670px 548px #FFF, 1609px 1108px #FFF, 1865px 1778px #FFF, 1786px 1988px #FFF, 1023px 993px #FFF, 711px 840px #FFF, 1641px 1505px #FFF, 1618px 591px #FFF, 42px 1443px #FFF, 951px 383px #FFF, 1818px 196px #FFF, 808px 1005px #FFF, 585px 271px #FFF, 918px 1529px #FFF, 991px 281px #FFF, 594px 1386px #FFF, 831px 468px #FFF, 1109px 745px #FFF, 1623px 1703px #FFF, 1857px 692px #FFF, 1671px 278px #FFF, 1536px 994px #FFF, 1083px 391px #FFF, 212px 1671px #FFF, 306px 422px #FFF, 521px 1265px #FFF, 1007px 750px #FFF, 1385px 1973px #FFF, 1146px 898px #FFF, 508px 1187px #FFF, 10px 1676px #FFF, 1701px 699px #FFF, 1630px 824px #FFF, 535px 1093px #FFF, 1216px 890px #FFF, 1747px 128px #FFF, 1007px 652px #FFF, 410px 200px #FFF, 232px 987px #FFF, 858px 211px #FFF, 53px 720px #FFF, 198px 1857px #FFF, 972px 1981px #FFF, 310px 1548px #FFF, 173px 1384px #FFF, 1490px 1056px #FFF, 464px 1167px #FFF, 1185px 193px #FFF, 1376px 1445px #FFF, 1957px 1055px #FFF, 303px 1941px #FFF, 1276px 1512px #FFF, 422px 1203px #FFF, 416px 651px #FFF, 1315px 1052px #FFF, 971px 1013px #FFF, 1960px 1029px #FFF, 833px 184px #FFF, 1434px 150px #FFF, 642px 1611px #FFF, 1730px 1889px #FFF, 1580px 692px #FFF, 388px 863px #FFF, 1767px 1012px #FFF, 1613px 822px #FFF, 703px 720px #FFF, 573px 241px #FFF, 988px 1466px #FFF, 293px 1394px #FFF, 1744px 1328px #FFF, 594px 1654px #FFF, 1806px 301px #FFF, 1288px 921px #FFF, 679px 430px #FFF, 849px 1568px #FFF, 595px 882px #FFF, 1711px 1015px #FFF, 1644px 679px #FFF, 1281px 1883px #FFF, 1273px 1984px #FFF, 1820px 1482px #FFF, 681px 221px #FFF, 1768px 1974px #FFF, 1360px 833px #FFF, 412px 1886px #FFF, 1240px 1433px #FFF, 1838px 1949px #FFF, 1884px 1571px #FFF, 869px 1102px #FFF, 249px 1521px #FFF, 600px 585px #FFF, 484px 1954px #FFF, 1590px 632px #FFF, 959px 599px #FFF, 308px 528px #FFF, 1401px 802px #FFF, 59px 1624px #FFF, 51px 1109px #FFF, 495px 334px #FFF, 1057px 157px #FFF, 932px 1858px #FFF, 1617px 1047px #FFF, 1197px 848px #FFF, 1608px 1017px #FFF, 1005px 587px #FFF, 1964px 1491px #FFF, 455px 288px #FFF, 159px 698px #FFF, 377px 1339px #FFF, 1837px 304px #FFF, 1215px 6px #FFF, 865px 1138px #FFF, 1218px 1452px #FFF, 1746px 1001px #FFF, 1530px 805px #FFF, 1594px 1980px #FFF, 1774px 646px #FFF, 307px 408px #FFF, 1885px 895px #FFF, 1869px 1305px #FFF, 1177px 1604px #FFF, 797px 1900px #FFF, 1128px 224px #FFF, 690px 490px #FFF, 959px 1283px #FFF, 226px 334px #FFF, 1495px 417px #FFF, 62px 1315px #FFF, 1648px 1383px #FFF, 1911px 414px #FFF, 145px 399px #FFF, 768px 1735px #FFF, 1479px 1807px #FFF, 652px 1950px #FFF, 341px 1283px #FFF, 1064px 1927px #FFF, 1654px 1276px #FFF, 272px 1887px #FFF, 1454px 1088px #FFF, 522px 762px #FFF, 719px 189px #FFF, 194px 1970px #FFF, 672px 5px #FFF, 743px 740px #FFF, 756px 440px #FFF, 669px 1188px #FFF, 1015px 771px #FFF, 1558px 1004px #FFF, 941px 284px #FFF, 568px 1527px #FFF, 168px 1621px #FFF, 1468px 704px #FFF, 420px 145px #FFF, 1223px 1150px #FFF, 1260px 1902px #FFF, 932px 1830px #FFF, 863px 1313px #FFF, 1131px 1735px #FFF, 212px 1261px #FFF, 1478px 925px #FFF, 844px 19px #FFF, 1947px 1704px #FFF, 1534px 1412px #FFF, 1537px 225px #FFF, 1868px 1491px #FFF, 318px 456px #FFF, 1704px 124px #FFF, 378px 1779px #FFF, 876px 251px #FFF, 1829px 1213px #FFF, 524px 1225px #FFF, 205px 1525px #FFF, 1767px 1876px #FFF, 148px 339px #FFF, 1866px 704px #FFF, 1268px 1926px #FFF, 1706px 826px #FFF, 1364px 1149px #FFF, 1630px 1948px #FFF, 564px 271px #FFF, 372px 1874px #FFF, 293px 1172px #FFF, 347px 1941px #FFF, 182px 780px #FFF, 1911px 530px #FFF, 1072px 596px #FFF, 426px 755px #FFF, 772px 851px #FFF, 842px 614px #FFF, 85px 409px #FFF, 1268px 158px #FFF, 1579px 719px #FFF, 1722px 439px #FFF, 172px 1065px #FFF, 1009px 1432px #FFF, 1790px 1377px #FFF, 1601px 367px #FFF, 992px 198px #FFF, 1046px 1155px #FFF, 1161px 473px #FFF, 1118px 729px #FFF, 41px 1926px #FFF, 1216px 1867px #FFF, 1407px 111px #FFF, 628px 649px #FFF, 1206px 408px #FFF, 1176px 1909px #FFF, 1549px 1731px #FFF, 1875px 338px #FFF, 208px 564px #FFF, 1189px 663px #FFF, 1009px 1747px #FFF, 36px 1602px #FFF, 1923px 1311px #FFF, 1093px 1353px #FFF, 977px 986px #FFF, 581px 1927px #FFF, 585px 1435px #FFF, 469px 1310px #FFF, 789px 1692px #FFF, 1416px 1848px #FFF, 151px 758px #FFF, 504px 1978px #FFF, 378px 850px #FFF, 1652px 1446px #FFF, 1485px 1363px #FFF, 1225px 894px #FFF, 250px 1624px #FFF, 1390px 553px #FFF, 1487px 1159px #FFF, 1161px 230px #FFF, 1549px 343px #FFF, 1818px 819px #FFF, 735px 1720px #FFF, 1907px 1938px #FFF, 743px 772px #FFF, 1631px 1749px #FFF, 1885px 1953px #FFF, 1629px 1709px #FFF, 1086px 21px #FFF, 282px 1797px #FFF, 546px 1779px #FFF, 99px 292px #FFF, 592px 1768px #FFF, 1130px 1443px #FFF, 1037px 221px #FFF, 245px 1887px #FFF, 1739px 122px #FFF, 1948px 1848px #FFF, 1087px 670px #FFF, 967px 1723px #FFF, 113px 1645px #FFF, 301px 113px #FFF, 1313px 581px #FFF, 1086px 1929px #FFF, 1989px 52px #FFF, 1421px 594px #FFF, 1357px 1788px #FFF, 637px 862px #FFF, 140px 1628px #FFF, 1406px 865px #FFF, 1594px 976px #FFF, 523px 1933px #FFF, 217px 1120px #FFF, 903px 1248px #FFF, 578px 52px #FFF, 735px 1993px #FFF, 720px 1214px #FFF, 1226px 108px #FFF, 460px 723px #FFF, 509px 344px #FFF, 1498px 1709px #FFF, 485px 1017px #FFF, 279px 1653px #FFF, 217px 1928px #FFF, 450px 752px #FFF, 767px 288px #FFF, 1086px 119px #FFF, 1303px 1656px #FFF, 945px 595px #FFF, 1183px 340px #FFF, 755px 326px #FFF, 1394px 1690px #FFF, 1286px 344px #FFF, 1313px 320px #FFF, 159px 953px #FFF, 502px 860px #FFF, 294px 1909px #FFF, 1595px 1828px #FFF, 1089px 1581px #FFF, 415px 595px #FFF, 1293px 805px #FFF, 605px 525px #FFF, 1679px 21px #FFF, 295px 1181px #FFF, 109px 1954px #FFF, 847px 1335px #FFF, 1338px 1851px #FFF, 228px 1331px #FFF, 1366px 1511px #FFF, 931px 413px #FFF, 1036px 147px #FFF, 475px 540px #FFF, 784px 225px #FFF, 1131px 1845px #FFF, 1339px 1553px #FFF, 1319px 588px #FFF, 665px 1236px #FFF, 1244px 407px #FFF, 609px 1209px #FFF, 1788px 1938px #FFF, 13px 346px #FFF, 781px 1860px #FFF, 877px 965px #FFF, 964px 1143px #FFF, 1307px 1041px #FFF, 1853px 1015px #FFF, 519px 1618px #FFF, 1905px 156px #FFF, 250px 1258px #FFF, 1824px 1199px #FFF, 493px 1780px #FFF, 1479px 9px #FFF, 1688px 500px #FFF, 850px 342px #FFF, 681px 557px #FFF, 8px 454px #FFF, 1653px 630px #FFF, 888px 672px #FFF, 481px 972px #FFF, 188px 1653px #FFF, 1112px 1878px #FFF, 294px 1966px #FFF, 832px 689px #FFF, 870px 1555px #FFF, 382px 724px #FFF, 874px 1561px #FFF, 42px 1041px #FFF, 845px 1169px #FFF, 1842px 1053px #FFF, 538px 1730px #FFF, 1704px 777px #FFF, 930px 290px #FFF, 657px 1715px #FFF, 1147px 1508px #FFF, 1559px 1183px #FFF, 1503px 1097px #FFF, 195px 1495px #FFF, 885px 1597px #FFF, 1494px 1334px #FFF, 1550px 556px #FFF, 399px 1056px #FFF, 883px 1876px #FFF, 592px 1332px #FFF, 624px 1352px #FFF, 923px 1455px #FFF, 1143px 310px #FFF, 1427px 1250px #FFF, 1235px 649px #FFF, 190px 1260px #FFF, 579px 421px #FFF, 508px 592px #FFF, 125px 1625px #FFF, 1915px 1591px #FFF, 1540px 1585px #FFF, 1948px 1819px #FFF, 217px 400px #FFF, 1947px 1516px #FFF, 439px 1553px #FFF, 567px 636px #FFF, 558px 1626px #FFF, 643px 950px #FFF, 646px 392px #FFF, 1389px 642px #FFF, 1739px 318px #FFF, 647px 783px #FFF, 510px 839px #FFF, 1296px 1015px #FFF, 969px 840px #FFF, 1021px 31px #FFF, 1650px 1359px #FFF, 187px 959px #FFF, 1553px 418px #FFF, 764px 1468px #FFF, 542px 23px #FFF, 1061px 1130px #FFF, 545px 1893px #FFF, 156px 381px #FFF, 1167px 1521px #FFF, 1544px 613px #FFF, 1249px 433px #FFF, 1530px 785px #FFF, 351px 736px #FFF, 918px 1076px #FFF, 670px 1826px #FFF, 24px 140px #FFF, 1099px 1967px #FFF, 438px 1566px #FFF, 1959px 1773px #FFF, 1789px 1990px #FFF, 1905px 241px #FFF, 810px 944px #FFF, 1698px 24px #FFF, 245px 616px #FFF, 309px 902px #FFF, 539px 1528px #FFF, 658px 147px #FFF, 344px 1762px #FFF, 921px 311px #FFF, 1591px 1061px #FFF, 1990px 1293px #FFF, 930px 897px #FFF, 642px 518px #FFF, 694px 1276px #FFF, 1530px 484px #FFF, 75px 512px #FFF, 524px 817px #FFF, 884px 697px #FFF, 557px 1052px #FFF, 1342px 660px #FFF, 383px 1596px #FFF, 196px 132px #FFF, 1081px 202px #FFF, 1762px 1322px #FFF, 649px 1037px #FFF, 1125px 1691px #FFF, 1946px 1987px #FFF, 1222px 928px #FFF, 1951px 730px #FFF, 1926px 1225px #FFF, 1038px 960px #FFF, 1895px 1336px #FFF, 1146px 1775px #FFF, 667px 1789px #FFF, 408px 759px #FFF, 1460px 1762px #FFF, 382px 1264px #FFF, 1634px 56px #FFF, 488px 756px #FFF, 1488px 763px #FFF, 1007px 142px #FFF, 86px 1613px #FFF, 708px 1262px #FFF, 563px 1714px #FFF, 1906px 1627px #FFF, 623px 321px #FFF, 561px 69px #FFF, 1193px 1455px #FFF, 2000px 445px #FFF, 555px 658px #FFF, 378px 48px #FFF, 1450px 235px #FFF, 318px 489px #FFF, 1300px 1021px #FFF, 435px 882px #FFF, 1995px 64px #FFF, 1595px 847px #FFF, 651px 313px #FFF, 127px 283px #FFF, 1283px 999px #FFF, 991px 126px #FFF, 1981px 1520px #FFF, 824px 881px #FFF, 1087px 1314px #FFF, 1407px 448px #FFF, 1185px 1604px #FFF, 1218px 1812px #FFF, 1644px 1080px #FFF, 681px 1791px #FFF, 208px 857px #FFF, 909px 984px #FFF, 281px 176px #FFF, 1024px 335px #FFF, 488px 683px #FFF, 1782px 1926px #FFF, 925px 1210px #FFF, 806px 842px #FFF, 323px 246px #FFF, 745px 149px #FFF, 1750px 72px #FFF, 1851px 1789px #FFF, 902px 1957px #FFF, 596px 1875px #FFF, 780px 1918px #FFF, 74px 1819px #FFF, 760px 1401px #FFF, 1575px 5px #FFF, 1523px 1455px #FFF, 1606px 723px #FFF, 355px 1175px #FFF, 496px 1639px #FFF, 309px 82px #FFF, 1904px 1985px #FFF, 464px 277px #FFF, 1770px 1059px #FFF, 207px 1388px #FFF, 204px 749px #FFF, 31px 552px #FFF, 343px 537px #FFF, 1332px 1743px #FFF, 1985px 1459px #FFF, 1531px 892px #FFF, 1464px 647px #FFF, 1456px 539px #FFF, 1311px 1399px #FFF, 1007px 1021px #FFF, 1237px 405px #FFF, 505px 1985px #FFF, 712px 1186px #FFF, 884px 1257px #FFF, 481px 1393px #FFF, 1338px 1530px #FFF, 549px 668px #FFF, 828px 1789px #FFF, 707px 1333px #FFF, 78px 1523px #FFF, 918px 910px #FFF, 1452px 805px #FFF, 1349px 363px #FFF, 324px 709px #FFF, 1473px 1568px #FFF, 543px 1361px #FFF, 1857px 1139px #FFF, 1067px 1229px #FFF, 1534px 1676px #FFF, 1426px 740px #FFF, 1038px 323px #FFF, 479px 1086px #FFF, 28px 667px #FFF, 1427px 262px #FFF, 1920px 242px #FFF, 1935px 1582px #FFF, 1028px 1406px #FFF, 870px 422px #FFF, 384px 90px #FFF, 1912px 1450px #FFF, 800px 1119px #FFF, 1710px 830px #FFF, 627px 8px #FFF, 251px 213px #FFF, 648px 42px #FFF, 1814px 1568px #FFF, 153px 1418px #FFF, 1743px 632px #FFF, 395px 917px #FFF, 1094px 839px #FFF, 1248px 1603px #FFF, 1685px 185px #FFF, 1373px 1170px #FFF, 199px 1891px #FFF, 882px 144px #FFF, 752px 191px #FFF, 878px 1674px #FFF, 1420px 1827px #FFF, 1431px 1025px #FFF, 1367px 1431px #FFF, 497px 1302px #FFF, 1536px 1827px #FFF, 238px 1271px #FFF, 1766px 1905px #FFF, 1075px 1755px #FFF, 1469px 394px #FFF, 1555px 649px #FFF, 551px 1881px #FFF, 1152px 915px #FFF, 904px 1806px #FFF, 1570px 516px #FFF, 714px 990px #FFF, 1594px 448px #FFF, 1072px 1315px #FFF, 1624px 881px #FFF, 848px 1748px #FFF, 538px 315px #FFF, 740px 1998px #FFF, 1317px 1250px #FFF, 133px 776px #FFF, 1549px 952px #FFF, 1368px 1276px #FFF, 270px 381px #FFF, 168px 915px #FFF, 137px 515px #FFF, 1365px 535px #FFF, 1417px 449px #FFF, 1221px 1618px #FFF, 751px 760px #FFF, 1190px 707px #FFF, 176px 1453px #FFF, 101px 1304px #FFF, 232px 486px #FFF, 939px 858px #FFF, 1389px 103px #FFF, 1409px 1242px #FFF, 1821px 1654px #FFF, 387px 605px #FFF, 265px 434px #FFF, 1485px 1527px #FFF, 1599px 980px #FFF, 1241px 1198px #FFF, 1382px 181px #FFF, 1296px 903px #FFF, 131px 1146px #FFF, 1790px 1312px #FFF, 1226px 413px #FFF, 1476px 1536px #FFF, 1699px 1922px #FFF, 410px 385px #FFF, 1316px 350px #FFF, 244px 1693px #FFF, 289px 270px #FFF, 1059px 524px #FFF, 342px 285px #FFF, 1265px 44px #FFF, 505px 585px #FFF, 785px 580px #FFF, 430px 744px #FFF, 1398px 666px #FFF, 612px 987px #FFF, 587px 1898px #FFF, 1591px 1520px #FFF, 806px 1611px #FFF, 1771px 64px #FFF, 1510px 355px #FFF, 77px 1441px #FFF, 583px 1755px #FFF, 1312px 911px #FFF, 1059px 961px #FFF, 1412px 17px #FFF, 1902px 625px #FFF, 1209px 1524px #FFF;
    animation: animStar 50s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      top: 2000px;
      width: 1px;
      height: 1px;
      background: transparent;
      box-shadow: 1119px 861px #FFF, 31px 337px #FFF, 332px 1141px #FFF, 16px 1154px #FFF, 1036px 537px #FFF, 1206px 1779px #FFF, 1232px 220px #FFF, 710px 961px #FFF, 1951px 93px #FFF, 1719px 1399px #FFF, 324px 1260px #FFF, 31px 1419px #FFF, 71px 1306px #FFF, 1567px 911px #FFF, 1000px 1824px #FFF, 728px 1295px #FFF, 1036px 28px #FFF, 173px 344px #FFF, 972px 1582px #FFF, 547px 1369px #FFF, 410px 1966px #FFF, 1491px 776px #FFF, 1875px 55px #FFF, 206px 192px #FFF, 1367px 1537px #FFF, 561px 109px #FFF, 1287px 879px #FFF, 603px 875px #FFF, 588px 256px #FFF, 419px 1027px #FFF, 935px 1836px #FFF, 1636px 1502px #FFF, 1718px 1027px #FFF, 1612px 1815px #FFF, 58px 1124px #FFF, 1767px 635px #FFF, 327px 21px #FFF, 1384px 440px #FFF, 230px 1089px #FFF, 707px 182px #FFF, 525px 239px #FFF, 79px 496px #FFF, 879px 908px #FFF, 540px 545px #FFF, 956px 77px #FFF, 1341px 1309px #FFF, 233px 751px #FFF, 1136px 208px #FFF, 1550px 1441px #FFF, 685px 1810px #FFF, 1553px 1105px #FFF, 1562px 290px #FFF, 1993px 1665px #FFF, 365px 1165px #FFF, 1056px 1912px #FFF, 1028px 1478px #FFF, 893px 994px #FFF, 1236px 750px #FFF, 1583px 1361px #FFF, 971px 805px #FFF, 731px 1288px #FFF, 1066px 1499px #FFF, 1177px 490px #FFF, 1390px 1662px #FFF, 1577px 1849px #FFF, 1945px 1222px #FFF, 218px 1431px #FFF, 618px 142px #FFF, 426px 637px #FFF, 1184px 75px #FFF, 530px 1400px #FFF, 670px 548px #FFF, 1609px 1108px #FFF, 1865px 1778px #FFF, 1786px 1988px #FFF, 1023px 993px #FFF, 711px 840px #FFF, 1641px 1505px #FFF, 1618px 591px #FFF, 42px 1443px #FFF, 951px 383px #FFF, 1818px 196px #FFF, 808px 1005px #FFF, 585px 271px #FFF, 918px 1529px #FFF, 991px 281px #FFF, 594px 1386px #FFF, 831px 468px #FFF, 1109px 745px #FFF, 1623px 1703px #FFF, 1857px 692px #FFF, 1671px 278px #FFF, 1536px 994px #FFF, 1083px 391px #FFF, 212px 1671px #FFF, 306px 422px #FFF, 521px 1265px #FFF, 1007px 750px #FFF, 1385px 1973px #FFF, 1146px 898px #FFF, 508px 1187px #FFF, 10px 1676px #FFF, 1701px 699px #FFF, 1630px 824px #FFF, 535px 1093px #FFF, 1216px 890px #FFF, 1747px 128px #FFF, 1007px 652px #FFF, 410px 200px #FFF, 232px 987px #FFF, 858px 211px #FFF, 53px 720px #FFF, 198px 1857px #FFF, 972px 1981px #FFF, 310px 1548px #FFF, 173px 1384px #FFF, 1490px 1056px #FFF, 464px 1167px #FFF, 1185px 193px #FFF, 1376px 1445px #FFF, 1957px 1055px #FFF, 303px 1941px #FFF, 1276px 1512px #FFF, 422px 1203px #FFF, 416px 651px #FFF, 1315px 1052px #FFF, 971px 1013px #FFF, 1960px 1029px #FFF, 833px 184px #FFF, 1434px 150px #FFF, 642px 1611px #FFF, 1730px 1889px #FFF, 1580px 692px #FFF, 388px 863px #FFF, 1767px 1012px #FFF, 1613px 822px #FFF, 703px 720px #FFF, 573px 241px #FFF, 988px 1466px #FFF, 293px 1394px #FFF, 1744px 1328px #FFF, 594px 1654px #FFF, 1806px 301px #FFF, 1288px 921px #FFF, 679px 430px #FFF, 849px 1568px #FFF, 595px 882px #FFF, 1711px 1015px #FFF, 1644px 679px #FFF, 1281px 1883px #FFF, 1273px 1984px #FFF, 1820px 1482px #FFF, 681px 221px #FFF, 1768px 1974px #FFF, 1360px 833px #FFF, 412px 1886px #FFF, 1240px 1433px #FFF, 1838px 1949px #FFF, 1884px 1571px #FFF, 869px 1102px #FFF, 249px 1521px #FFF, 600px 585px #FFF, 484px 1954px #FFF, 1590px 632px #FFF, 959px 599px #FFF, 308px 528px #FFF, 1401px 802px #FFF, 59px 1624px #FFF, 51px 1109px #FFF, 495px 334px #FFF, 1057px 157px #FFF, 932px 1858px #FFF, 1617px 1047px #FFF, 1197px 848px #FFF, 1608px 1017px #FFF, 1005px 587px #FFF, 1964px 1491px #FFF, 455px 288px #FFF, 159px 698px #FFF, 377px 1339px #FFF, 1837px 304px #FFF, 1215px 6px #FFF, 865px 1138px #FFF, 1218px 1452px #FFF, 1746px 1001px #FFF, 1530px 805px #FFF, 1594px 1980px #FFF, 1774px 646px #FFF, 307px 408px #FFF, 1885px 895px #FFF, 1869px 1305px #FFF, 1177px 1604px #FFF, 797px 1900px #FFF, 1128px 224px #FFF, 690px 490px #FFF, 959px 1283px #FFF, 226px 334px #FFF, 1495px 417px #FFF, 62px 1315px #FFF, 1648px 1383px #FFF, 1911px 414px #FFF, 145px 399px #FFF, 768px 1735px #FFF, 1479px 1807px #FFF, 652px 1950px #FFF, 341px 1283px #FFF, 1064px 1927px #FFF, 1654px 1276px #FFF, 272px 1887px #FFF, 1454px 1088px #FFF, 522px 762px #FFF, 719px 189px #FFF, 194px 1970px #FFF, 672px 5px #FFF, 743px 740px #FFF, 756px 440px #FFF, 669px 1188px #FFF, 1015px 771px #FFF, 1558px 1004px #FFF, 941px 284px #FFF, 568px 1527px #FFF, 168px 1621px #FFF, 1468px 704px #FFF, 420px 145px #FFF, 1223px 1150px #FFF, 1260px 1902px #FFF, 932px 1830px #FFF, 863px 1313px #FFF, 1131px 1735px #FFF, 212px 1261px #FFF, 1478px 925px #FFF, 844px 19px #FFF, 1947px 1704px #FFF, 1534px 1412px #FFF, 1537px 225px #FFF, 1868px 1491px #FFF, 318px 456px #FFF, 1704px 124px #FFF, 378px 1779px #FFF, 876px 251px #FFF, 1829px 1213px #FFF, 524px 1225px #FFF, 205px 1525px #FFF, 1767px 1876px #FFF, 148px 339px #FFF, 1866px 704px #FFF, 1268px 1926px #FFF, 1706px 826px #FFF, 1364px 1149px #FFF, 1630px 1948px #FFF, 564px 271px #FFF, 372px 1874px #FFF, 293px 1172px #FFF, 347px 1941px #FFF, 182px 780px #FFF, 1911px 530px #FFF, 1072px 596px #FFF, 426px 755px #FFF, 772px 851px #FFF, 842px 614px #FFF, 85px 409px #FFF, 1268px 158px #FFF, 1579px 719px #FFF, 1722px 439px #FFF, 172px 1065px #FFF, 1009px 1432px #FFF, 1790px 1377px #FFF, 1601px 367px #FFF, 992px 198px #FFF, 1046px 1155px #FFF, 1161px 473px #FFF, 1118px 729px #FFF, 41px 1926px #FFF, 1216px 1867px #FFF, 1407px 111px #FFF, 628px 649px #FFF, 1206px 408px #FFF, 1176px 1909px #FFF, 1549px 1731px #FFF, 1875px 338px #FFF, 208px 564px #FFF, 1189px 663px #FFF, 1009px 1747px #FFF, 36px 1602px #FFF, 1923px 1311px #FFF, 1093px 1353px #FFF, 977px 986px #FFF, 581px 1927px #FFF, 585px 1435px #FFF, 469px 1310px #FFF, 789px 1692px #FFF, 1416px 1848px #FFF, 151px 758px #FFF, 504px 1978px #FFF, 378px 850px #FFF, 1652px 1446px #FFF, 1485px 1363px #FFF, 1225px 894px #FFF, 250px 1624px #FFF, 1390px 553px #FFF, 1487px 1159px #FFF, 1161px 230px #FFF, 1549px 343px #FFF, 1818px 819px #FFF, 735px 1720px #FFF, 1907px 1938px #FFF, 743px 772px #FFF, 1631px 1749px #FFF, 1885px 1953px #FFF, 1629px 1709px #FFF, 1086px 21px #FFF, 282px 1797px #FFF, 546px 1779px #FFF, 99px 292px #FFF, 592px 1768px #FFF, 1130px 1443px #FFF, 1037px 221px #FFF, 245px 1887px #FFF, 1739px 122px #FFF, 1948px 1848px #FFF, 1087px 670px #FFF, 967px 1723px #FFF, 113px 1645px #FFF, 301px 113px #FFF, 1313px 581px #FFF, 1086px 1929px #FFF, 1989px 52px #FFF, 1421px 594px #FFF, 1357px 1788px #FFF, 637px 862px #FFF, 140px 1628px #FFF, 1406px 865px #FFF, 1594px 976px #FFF, 523px 1933px #FFF, 217px 1120px #FFF, 903px 1248px #FFF, 578px 52px #FFF, 735px 1993px #FFF, 720px 1214px #FFF, 1226px 108px #FFF, 460px 723px #FFF, 509px 344px #FFF, 1498px 1709px #FFF, 485px 1017px #FFF, 279px 1653px #FFF, 217px 1928px #FFF, 450px 752px #FFF, 767px 288px #FFF, 1086px 119px #FFF, 1303px 1656px #FFF, 945px 595px #FFF, 1183px 340px #FFF, 755px 326px #FFF, 1394px 1690px #FFF, 1286px 344px #FFF, 1313px 320px #FFF, 159px 953px #FFF, 502px 860px #FFF, 294px 1909px #FFF, 1595px 1828px #FFF, 1089px 1581px #FFF, 415px 595px #FFF, 1293px 805px #FFF, 605px 525px #FFF, 1679px 21px #FFF, 295px 1181px #FFF, 109px 1954px #FFF, 847px 1335px #FFF, 1338px 1851px #FFF, 228px 1331px #FFF, 1366px 1511px #FFF, 931px 413px #FFF, 1036px 147px #FFF, 475px 540px #FFF, 784px 225px #FFF, 1131px 1845px #FFF, 1339px 1553px #FFF, 1319px 588px #FFF, 665px 1236px #FFF, 1244px 407px #FFF, 609px 1209px #FFF, 1788px 1938px #FFF, 13px 346px #FFF, 781px 1860px #FFF, 877px 965px #FFF, 964px 1143px #FFF, 1307px 1041px #FFF, 1853px 1015px #FFF, 519px 1618px #FFF, 1905px 156px #FFF, 250px 1258px #FFF, 1824px 1199px #FFF, 493px 1780px #FFF, 1479px 9px #FFF, 1688px 500px #FFF, 850px 342px #FFF, 681px 557px #FFF, 8px 454px #FFF, 1653px 630px #FFF, 888px 672px #FFF, 481px 972px #FFF, 188px 1653px #FFF, 1112px 1878px #FFF, 294px 1966px #FFF, 832px 689px #FFF, 870px 1555px #FFF, 382px 724px #FFF, 874px 1561px #FFF, 42px 1041px #FFF, 845px 1169px #FFF, 1842px 1053px #FFF, 538px 1730px #FFF, 1704px 777px #FFF, 930px 290px #FFF, 657px 1715px #FFF, 1147px 1508px #FFF, 1559px 1183px #FFF, 1503px 1097px #FFF, 195px 1495px #FFF, 885px 1597px #FFF, 1494px 1334px #FFF, 1550px 556px #FFF, 399px 1056px #FFF, 883px 1876px #FFF, 592px 1332px #FFF, 624px 1352px #FFF, 923px 1455px #FFF, 1143px 310px #FFF, 1427px 1250px #FFF, 1235px 649px #FFF, 190px 1260px #FFF, 579px 421px #FFF, 508px 592px #FFF, 125px 1625px #FFF, 1915px 1591px #FFF, 1540px 1585px #FFF, 1948px 1819px #FFF, 217px 400px #FFF, 1947px 1516px #FFF, 439px 1553px #FFF, 567px 636px #FFF, 558px 1626px #FFF, 643px 950px #FFF, 646px 392px #FFF, 1389px 642px #FFF, 1739px 318px #FFF, 647px 783px #FFF, 510px 839px #FFF, 1296px 1015px #FFF, 969px 840px #FFF, 1021px 31px #FFF, 1650px 1359px #FFF, 187px 959px #FFF, 1553px 418px #FFF, 764px 1468px #FFF, 542px 23px #FFF, 1061px 1130px #FFF, 545px 1893px #FFF, 156px 381px #FFF, 1167px 1521px #FFF, 1544px 613px #FFF, 1249px 433px #FFF, 1530px 785px #FFF, 351px 736px #FFF, 918px 1076px #FFF, 670px 1826px #FFF, 24px 140px #FFF, 1099px 1967px #FFF, 438px 1566px #FFF, 1959px 1773px #FFF, 1789px 1990px #FFF, 1905px 241px #FFF, 810px 944px #FFF, 1698px 24px #FFF, 245px 616px #FFF, 309px 902px #FFF, 539px 1528px #FFF, 658px 147px #FFF, 344px 1762px #FFF, 921px 311px #FFF, 1591px 1061px #FFF, 1990px 1293px #FFF, 930px 897px #FFF, 642px 518px #FFF, 694px 1276px #FFF, 1530px 484px #FFF, 75px 512px #FFF, 524px 817px #FFF, 884px 697px #FFF, 557px 1052px #FFF, 1342px 660px #FFF, 383px 1596px #FFF, 196px 132px #FFF, 1081px 202px #FFF, 1762px 1322px #FFF, 649px 1037px #FFF, 1125px 1691px #FFF, 1946px 1987px #FFF, 1222px 928px #FFF, 1951px 730px #FFF, 1926px 1225px #FFF, 1038px 960px #FFF, 1895px 1336px #FFF, 1146px 1775px #FFF, 667px 1789px #FFF, 408px 759px #FFF, 1460px 1762px #FFF, 382px 1264px #FFF, 1634px 56px #FFF, 488px 756px #FFF, 1488px 763px #FFF, 1007px 142px #FFF, 86px 1613px #FFF, 708px 1262px #FFF, 563px 1714px #FFF, 1906px 1627px #FFF, 623px 321px #FFF, 561px 69px #FFF, 1193px 1455px #FFF, 2000px 445px #FFF, 555px 658px #FFF, 378px 48px #FFF, 1450px 235px #FFF, 318px 489px #FFF, 1300px 1021px #FFF, 435px 882px #FFF, 1995px 64px #FFF, 1595px 847px #FFF, 651px 313px #FFF, 127px 283px #FFF, 1283px 999px #FFF, 991px 126px #FFF, 1981px 1520px #FFF, 824px 881px #FFF, 1087px 1314px #FFF, 1407px 448px #FFF, 1185px 1604px #FFF, 1218px 1812px #FFF, 1644px 1080px #FFF, 681px 1791px #FFF, 208px 857px #FFF, 909px 984px #FFF, 281px 176px #FFF, 1024px 335px #FFF, 488px 683px #FFF, 1782px 1926px #FFF, 925px 1210px #FFF, 806px 842px #FFF, 323px 246px #FFF, 745px 149px #FFF, 1750px 72px #FFF, 1851px 1789px #FFF, 902px 1957px #FFF, 596px 1875px #FFF, 780px 1918px #FFF, 74px 1819px #FFF, 760px 1401px #FFF, 1575px 5px #FFF, 1523px 1455px #FFF, 1606px 723px #FFF, 355px 1175px #FFF, 496px 1639px #FFF, 309px 82px #FFF, 1904px 1985px #FFF, 464px 277px #FFF, 1770px 1059px #FFF, 207px 1388px #FFF, 204px 749px #FFF, 31px 552px #FFF, 343px 537px #FFF, 1332px 1743px #FFF, 1985px 1459px #FFF, 1531px 892px #FFF, 1464px 647px #FFF, 1456px 539px #FFF, 1311px 1399px #FFF, 1007px 1021px #FFF, 1237px 405px #FFF, 505px 1985px #FFF, 712px 1186px #FFF, 884px 1257px #FFF, 481px 1393px #FFF, 1338px 1530px #FFF, 549px 668px #FFF, 828px 1789px #FFF, 707px 1333px #FFF, 78px 1523px #FFF, 918px 910px #FFF, 1452px 805px #FFF, 1349px 363px #FFF, 324px 709px #FFF, 1473px 1568px #FFF, 543px 1361px #FFF, 1857px 1139px #FFF, 1067px 1229px #FFF, 1534px 1676px #FFF, 1426px 740px #FFF, 1038px 323px #FFF, 479px 1086px #FFF, 28px 667px #FFF, 1427px 262px #FFF, 1920px 242px #FFF, 1935px 1582px #FFF, 1028px 1406px #FFF, 870px 422px #FFF, 384px 90px #FFF, 1912px 1450px #FFF, 800px 1119px #FFF, 1710px 830px #FFF, 627px 8px #FFF, 251px 213px #FFF, 648px 42px #FFF, 1814px 1568px #FFF, 153px 1418px #FFF, 1743px 632px #FFF, 395px 917px #FFF, 1094px 839px #FFF, 1248px 1603px #FFF, 1685px 185px #FFF, 1373px 1170px #FFF, 199px 1891px #FFF, 882px 144px #FFF, 752px 191px #FFF, 878px 1674px #FFF, 1420px 1827px #FFF, 1431px 1025px #FFF, 1367px 1431px #FFF, 497px 1302px #FFF, 1536px 1827px #FFF, 238px 1271px #FFF, 1766px 1905px #FFF, 1075px 1755px #FFF, 1469px 394px #FFF, 1555px 649px #FFF, 551px 1881px #FFF, 1152px 915px #FFF, 904px 1806px #FFF, 1570px 516px #FFF, 714px 990px #FFF, 1594px 448px #FFF, 1072px 1315px #FFF, 1624px 881px #FFF, 848px 1748px #FFF, 538px 315px #FFF, 740px 1998px #FFF, 1317px 1250px #FFF, 133px 776px #FFF, 1549px 952px #FFF, 1368px 1276px #FFF, 270px 381px #FFF, 168px 915px #FFF, 137px 515px #FFF, 1365px 535px #FFF, 1417px 449px #FFF, 1221px 1618px #FFF, 751px 760px #FFF, 1190px 707px #FFF, 176px 1453px #FFF, 101px 1304px #FFF, 232px 486px #FFF, 939px 858px #FFF, 1389px 103px #FFF, 1409px 1242px #FFF, 1821px 1654px #FFF, 387px 605px #FFF, 265px 434px #FFF, 1485px 1527px #FFF, 1599px 980px #FFF, 1241px 1198px #FFF, 1382px 181px #FFF, 1296px 903px #FFF, 131px 1146px #FFF, 1790px 1312px #FFF, 1226px 413px #FFF, 1476px 1536px #FFF, 1699px 1922px #FFF, 410px 385px #FFF, 1316px 350px #FFF, 244px 1693px #FFF, 289px 270px #FFF, 1059px 524px #FFF, 342px 285px #FFF, 1265px 44px #FFF, 505px 585px #FFF, 785px 580px #FFF, 430px 744px #FFF, 1398px 666px #FFF, 612px 987px #FFF, 587px 1898px #FFF, 1591px 1520px #FFF, 806px 1611px #FFF, 1771px 64px #FFF, 1510px 355px #FFF, 77px 1441px #FFF, 583px 1755px #FFF, 1312px 911px #FFF, 1059px 961px #FFF, 1412px 17px #FFF, 1902px 625px #FFF, 1209px 1524px #FFF;
    }
  }

  #stars2 {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: 181px 1610px #FFF, 767px 1292px #FFF, 376px 1047px #FFF, 1363px 1169px #FFF, 1678px 1678px #FFF, 1907px 112px #FFF, 1122px 972px #FFF, 1812px 1584px #FFF, 1694px 1602px #FFF, 1439px 1280px #FFF, 390px 556px #FFF, 187px 1517px #FFF, 1322px 384px #FFF, 509px 1184px #FFF, 1501px 108px #FFF, 674px 1920px #FFF, 646px 578px #FFF, 707px 1781px #FFF, 1284px 922px #FFF, 967px 169px #FFF, 566px 509px #FFF, 78px 1142px #FFF, 131px 1897px #FFF, 1984px 1314px #FFF, 508px 567px #FFF, 1552px 1393px #FFF, 587px 949px #FFF, 122px 1019px #FFF, 403px 1849px #FFF, 826px 991px #FFF, 451px 799px #FFF, 1885px 1055px #FFF, 1120px 1150px #FFF, 319px 336px #FFF, 724px 95px #FFF, 1129px 1989px #FFF, 827px 736px #FFF, 609px 1683px #FFF, 231px 1727px #FFF, 882px 1646px #FFF, 1262px 1974px #FFF, 243px 110px #FFF, 557px 822px #FFF, 1615px 1397px #FFF, 612px 626px #FFF, 66px 1746px #FFF, 1120px 1678px #FFF, 485px 790px #FFF, 1683px 912px #FFF, 233px 1039px #FFF, 535px 364px #FFF, 79px 897px #FFF, 247px 29px #FFF, 1194px 1836px #FFF, 874px 1090px #FFF, 1622px 254px #FFF, 1663px 1658px #FFF, 1835px 1955px #FFF, 578px 1121px #FFF, 853px 1847px #FFF, 1991px 1821px #FFF, 786px 1849px #FFF, 225px 1231px #FFF, 1359px 1856px #FFF, 521px 1985px #FFF, 56px 1275px #FFF, 1654px 1106px #FFF, 1723px 752px #FFF, 1414px 1334px #FFF, 1356px 1757px #FFF, 1788px 10px #FFF, 226px 1731px #FFF, 154px 1587px #FFF, 392px 450px #FFF, 1736px 284px #FFF, 1262px 1710px #FFF, 1793px 937px #FFF, 1855px 719px #FFF, 1594px 1021px #FFF, 1180px 1161px #FFF, 40px 455px #FFF, 205px 150px #FFF, 1339px 415px #FFF, 1023px 1048px #FFF, 1606px 793px #FFF, 1791px 1664px #FFF, 750px 898px #FFF, 215px 1943px #FFF, 414px 1367px #FFF, 1194px 1128px #FFF, 633px 245px #FFF, 708px 236px #FFF, 249px 970px #FFF, 15px 1436px #FFF, 661px 1757px #FFF, 981px 881px #FFF, 138px 1075px #FFF, 475px 282px #FFF, 1483px 947px #FFF, 1821px 9px #FFF, 834px 1571px #FFF, 721px 1457px #FFF, 317px 822px #FFF, 488px 1391px #FFF, 43px 486px #FFF, 914px 251px #FFF, 762px 1985px #FFF, 1165px 1319px #FFF, 1297px 1008px #FFF, 92px 1439px #FFF, 687px 1960px #FFF, 1834px 934px #FFF, 1532px 147px #FFF, 1832px 150px #FFF, 155px 1578px #FFF, 1967px 106px #FFF, 819px 1182px #FFF, 1198px 1398px #FFF, 799px 442px #FFF, 1224px 179px #FFF, 183px 525px #FFF, 613px 1191px #FFF, 374px 1222px #FFF, 70px 1893px #FFF, 450px 1786px #FFF, 6px 377px #FFF, 22px 329px #FFF, 1745px 1688px #FFF, 1245px 538px #FFF, 1572px 441px #FFF, 68px 22px #FFF, 179px 1039px #FFF, 1029px 1391px #FFF, 1167px 1838px #FFF, 1592px 737px #FFF, 1235px 452px #FFF, 1575px 1223px #FFF, 307px 394px #FFF, 779px 1544px #FFF, 730px 1901px #FFF, 1737px 1207px #FFF, 108px 253px #FFF, 102px 724px #FFF, 420px 1516px #FFF, 726px 791px #FFF, 1002px 275px #FFF, 1029px 1873px #FFF, 1540px 1066px #FFF, 1685px 1655px #FFF, 1925px 385px #FFF, 362px 1244px #FFF, 490px 1229px #FFF, 1591px 1670px #FFF, 1306px 663px #FFF, 1034px 1636px #FFF, 1119px 1111px #FFF, 1269px 382px #FFF, 81px 1162px #FFF, 256px 1124px #FFF, 83px 1169px #FFF, 579px 664px #FFF, 1469px 154px #FFF, 1117px 1575px #FFF, 1539px 1670px #FFF, 569px 1286px #FFF, 347px 737px #FFF, 1840px 326px #FFF, 1058px 1321px #FFF, 300px 632px #FFF, 1285px 275px #FFF, 1278px 119px #FFF, 472px 1742px #FFF, 1131px 1716px #FFF, 1790px 866px #FFF, 1018px 730px #FFF, 780px 1267px #FFF, 1358px 1254px #FFF, 1831px 1035px #FFF, 1660px 644px #FFF, 1530px 1796px #FFF, 1771px 1910px #FFF, 1571px 836px #FFF, 526px 203px #FFF, 691px 1149px #FFF, 591px 125px #FFF, 1683px 100px #FFF, 168px 989px #FFF, 1517px 321px #FFF, 819px 291px #FFF, 629px 300px #FFF, 34px 418px #FFF, 1925px 113px #FFF, 1481px 1800px #FFF, 1281px 1888px #FFF, 1760px 1682px #FFF, 1412px 1063px #FFF, 1237px 1410px #FFF, 1791px 43px #FFF, 1892px 316px #FFF, 283px 426px #FFF;
    animation: animStar 100s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      top: 2000px;
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: 181px 1610px #FFF, 767px 1292px #FFF, 376px 1047px #FFF, 1363px 1169px #FFF, 1678px 1678px #FFF, 1907px 112px #FFF, 1122px 972px #FFF, 1812px 1584px #FFF, 1694px 1602px #FFF, 1439px 1280px #FFF, 390px 556px #FFF, 187px 1517px #FFF, 1322px 384px #FFF, 509px 1184px #FFF, 1501px 108px #FFF, 674px 1920px #FFF, 646px 578px #FFF, 707px 1781px #FFF, 1284px 922px #FFF, 967px 169px #FFF, 566px 509px #FFF, 78px 1142px #FFF, 131px 1897px #FFF, 1984px 1314px #FFF, 508px 567px #FFF, 1552px 1393px #FFF, 587px 949px #FFF, 122px 1019px #FFF, 403px 1849px #FFF, 826px 991px #FFF, 451px 799px #FFF, 1885px 1055px #FFF, 1120px 1150px #FFF, 319px 336px #FFF, 724px 95px #FFF, 1129px 1989px #FFF, 827px 736px #FFF, 609px 1683px #FFF, 231px 1727px #FFF, 882px 1646px #FFF, 1262px 1974px #FFF, 243px 110px #FFF, 557px 822px #FFF, 1615px 1397px #FFF, 612px 626px #FFF, 66px 1746px #FFF, 1120px 1678px #FFF, 485px 790px #FFF, 1683px 912px #FFF, 233px 1039px #FFF, 535px 364px #FFF, 79px 897px #FFF, 247px 29px #FFF, 1194px 1836px #FFF, 874px 1090px #FFF, 1622px 254px #FFF, 1663px 1658px #FFF, 1835px 1955px #FFF, 578px 1121px #FFF, 853px 1847px #FFF, 1991px 1821px #FFF, 786px 1849px #FFF, 225px 1231px #FFF, 1359px 1856px #FFF, 521px 1985px #FFF, 56px 1275px #FFF, 1654px 1106px #FFF, 1723px 752px #FFF, 1414px 1334px #FFF, 1356px 1757px #FFF, 1788px 10px #FFF, 226px 1731px #FFF, 154px 1587px #FFF, 392px 450px #FFF, 1736px 284px #FFF, 1262px 1710px #FFF, 1793px 937px #FFF, 1855px 719px #FFF, 1594px 1021px #FFF, 1180px 1161px #FFF, 40px 455px #FFF, 205px 150px #FFF, 1339px 415px #FFF, 1023px 1048px #FFF, 1606px 793px #FFF, 1791px 1664px #FFF, 750px 898px #FFF, 215px 1943px #FFF, 414px 1367px #FFF, 1194px 1128px #FFF, 633px 245px #FFF, 708px 236px #FFF, 249px 970px #FFF, 15px 1436px #FFF, 661px 1757px #FFF, 981px 881px #FFF, 138px 1075px #FFF, 475px 282px #FFF, 1483px 947px #FFF, 1821px 9px #FFF, 834px 1571px #FFF, 721px 1457px #FFF, 317px 822px #FFF, 488px 1391px #FFF, 43px 486px #FFF, 914px 251px #FFF, 762px 1985px #FFF, 1165px 1319px #FFF, 1297px 1008px #FFF, 92px 1439px #FFF, 687px 1960px #FFF, 1834px 934px #FFF, 1532px 147px #FFF, 1832px 150px #FFF, 155px 1578px #FFF, 1967px 106px #FFF, 819px 1182px #FFF, 1198px 1398px #FFF, 799px 442px #FFF, 1224px 179px #FFF, 183px 525px #FFF, 613px 1191px #FFF, 374px 1222px #FFF, 70px 1893px #FFF, 450px 1786px #FFF, 6px 377px #FFF, 22px 329px #FFF, 1745px 1688px #FFF, 1245px 538px #FFF, 1572px 441px #FFF, 68px 22px #FFF, 179px 1039px #FFF, 1029px 1391px #FFF, 1167px 1838px #FFF, 1592px 737px #FFF, 1235px 452px #FFF, 1575px 1223px #FFF, 307px 394px #FFF, 779px 1544px #FFF, 730px 1901px #FFF, 1737px 1207px #FFF, 108px 253px #FFF, 102px 724px #FFF, 420px 1516px #FFF, 726px 791px #FFF, 1002px 275px #FFF, 1029px 1873px #FFF, 1540px 1066px #FFF, 1685px 1655px #FFF, 1925px 385px #FFF, 362px 1244px #FFF, 490px 1229px #FFF, 1591px 1670px #FFF, 1306px 663px #FFF, 1034px 1636px #FFF, 1119px 1111px #FFF, 1269px 382px #FFF, 81px 1162px #FFF, 256px 1124px #FFF, 83px 1169px #FFF, 579px 664px #FFF, 1469px 154px #FFF, 1117px 1575px #FFF, 1539px 1670px #FFF, 569px 1286px #FFF, 347px 737px #FFF, 1840px 326px #FFF, 1058px 1321px #FFF, 300px 632px #FFF, 1285px 275px #FFF, 1278px 119px #FFF, 472px 1742px #FFF, 1131px 1716px #FFF, 1790px 866px #FFF, 1018px 730px #FFF, 780px 1267px #FFF, 1358px 1254px #FFF, 1831px 1035px #FFF, 1660px 644px #FFF, 1530px 1796px #FFF, 1771px 1910px #FFF, 1571px 836px #FFF, 526px 203px #FFF, 691px 1149px #FFF, 591px 125px #FFF, 1683px 100px #FFF, 168px 989px #FFF, 1517px 321px #FFF, 819px 291px #FFF, 629px 300px #FFF, 34px 418px #FFF, 1925px 113px #FFF, 1481px 1800px #FFF, 1281px 1888px #FFF, 1760px 1682px #FFF, 1412px 1063px #FFF, 1237px 1410px #FFF, 1791px 43px #FFF, 1892px 316px #FFF, 283px 426px #FFF;
    }
  }

  #stars3 {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: 177px 564px #FFF, 1509px 81px #FFF, 1948px 1048px #FFF, 715px 173px #FFF, 1549px 1262px #FFF, 1627px 1412px #FFF, 226px 813px #FFF, 1906px 230px #FFF, 1422px 565px #FFF, 260px 721px #FFF, 1669px 977px #FFF, 1579px 449px #FFF, 962px 999px #FFF, 1109px 1660px #FFF, 375px 413px #FFF, 1777px 1426px #FFF, 1736px 945px #FFF, 1446px 1459px #FFF, 1206px 1254px #FFF, 1328px 1513px #FFF, 1224px 1403px #FFF, 534px 1200px #FFF, 1735px 55px #FFF, 1941px 1412px #FFF, 559px 826px #FFF, 848px 213px #FFF, 267px 782px #FFF, 198px 1885px #FFF, 497px 856px #FFF, 1024px 182px #FFF, 584px 1599px #FFF, 1603px 1226px #FFF, 752px 1634px #FFF, 410px 778px #FFF, 2000px 1899px #FFF, 440px 683px #FFF, 1900px 1461px #FFF, 15px 563px #FFF, 1890px 782px #FFF, 1331px 890px #FFF, 240px 527px #FFF, 680px 913px #FFF, 1987px 1729px #FFF, 1515px 1169px #FFF, 604px 219px #FFF, 272px 960px #FFF, 554px 153px #FFF, 1514px 1696px #FFF, 516px 1563px #FFF, 619px 1035px #FFF, 791px 1375px #FFF, 739px 698px #FFF, 1200px 732px #FFF, 1468px 34px #FFF, 1220px 1711px #FFF, 268px 630px #FFF, 1607px 1430px #FFF, 1114px 1309px #FFF, 48px 346px #FFF, 1636px 736px #FFF, 1759px 1492px #FFF, 1731px 1941px #FFF, 1325px 933px #FFF, 1944px 565px #FFF, 1104px 649px #FFF, 1071px 1041px #FFF, 14px 573px #FFF, 1708px 1488px #FFF, 993px 1985px #FFF, 1505px 923px #FFF, 1507px 406px #FFF, 1009px 1243px #FFF, 665px 462px #FFF, 1254px 895px #FFF, 410px 716px #FFF, 294px 1461px #FFF, 1589px 1397px #FFF, 442px 832px #FFF, 1137px 1534px #FFF, 1119px 164px #FFF, 1719px 1980px #FFF, 897px 828px #FFF, 1327px 384px #FFF, 1981px 1697px #FFF, 1749px 1198px #FFF, 1760px 1734px #FFF, 494px 720px #FFF, 611px 775px #FFF, 1006px 1689px #FFF, 1607px 1531px #FFF, 1167px 755px #FFF, 273px 1014px #FFF, 1px 996px #FFF, 1436px 415px #FFF, 1358px 1012px #FFF, 1057px 1892px #FFF, 426px 306px #FFF, 253px 110px #FFF, 458px 1634px #FFF, 1722px 574px #FFF;
    animation: animStar 150s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      top: 2000px;
      width: 3px;
      height: 3px;
      background: transparent;
      box-shadow: 177px 564px #FFF, 1509px 81px #FFF, 1948px 1048px #FFF, 715px 173px #FFF, 1549px 1262px #FFF, 1627px 1412px #FFF, 226px 813px #FFF, 1906px 230px #FFF, 1422px 565px #FFF, 260px 721px #FFF, 1669px 977px #FFF, 1579px 449px #FFF, 962px 999px #FFF, 1109px 1660px #FFF, 375px 413px #FFF, 1777px 1426px #FFF, 1736px 945px #FFF, 1446px 1459px #FFF, 1206px 1254px #FFF, 1328px 1513px #FFF, 1224px 1403px #FFF, 534px 1200px #FFF, 1735px 55px #FFF, 1941px 1412px #FFF, 559px 826px #FFF, 848px 213px #FFF, 267px 782px #FFF, 198px 1885px #FFF, 497px 856px #FFF, 1024px 182px #FFF, 584px 1599px #FFF, 1603px 1226px #FFF, 752px 1634px #FFF, 410px 778px #FFF, 2000px 1899px #FFF, 440px 683px #FFF, 1900px 1461px #FFF, 15px 563px #FFF, 1890px 782px #FFF, 1331px 890px #FFF, 240px 527px #FFF, 680px 913px #FFF, 1987px 1729px #FFF, 1515px 1169px #FFF, 604px 219px #FFF, 272px 960px #FFF, 554px 153px #FFF, 1514px 1696px #FFF, 516px 1563px #FFF, 619px 1035px #FFF, 791px 1375px #FFF, 739px 698px #FFF, 1200px 732px #FFF, 1468px 34px #FFF, 1220px 1711px #FFF, 268px 630px #FFF, 1607px 1430px #FFF, 1114px 1309px #FFF, 48px 346px #FFF, 1636px 736px #FFF, 1759px 1492px #FFF, 1731px 1941px #FFF, 1325px 933px #FFF, 1944px 565px #FFF, 1104px 649px #FFF, 1071px 1041px #FFF, 14px 573px #FFF, 1708px 1488px #FFF, 993px 1985px #FFF, 1505px 923px #FFF, 1507px 406px #FFF, 1009px 1243px #FFF, 665px 462px #FFF, 1254px 895px #FFF, 410px 716px #FFF, 294px 1461px #FFF, 1589px 1397px #FFF, 442px 832px #FFF, 1137px 1534px #FFF, 1119px 164px #FFF, 1719px 1980px #FFF, 897px 828px #FFF, 1327px 384px #FFF, 1981px 1697px #FFF, 1749px 1198px #FFF, 1760px 1734px #FFF, 494px 720px #FFF, 611px 775px #FFF, 1006px 1689px #FFF, 1607px 1531px #FFF, 1167px 755px #FFF, 273px 1014px #FFF, 1px 996px #FFF, 1436px 415px #FFF, 1358px 1012px #FFF, 1057px 1892px #FFF, 426px 306px #FFF, 253px 110px #FFF, 458px 1634px #FFF, 1722px 574px #FFF;
    }
  }
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}

.mask {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 9999999;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-container {
    width: 60%;

    img {
      width: 100%;
    }
  }
}

@media screen and (min-width: 1175px) {
  .max-control {
    width: 100%;
    max-width: 800px;
    margin: 0 auto !important;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    -moz-box-shadow: 5px 4px 9px #333333;
    -webkit-box-shadow: 5px 4px 9px #333333;
    box-shadow: 5px 4px 9px #333333;
  }

  body {
    background-image: url(https://pic4.zhimg.com/v2-33e02d6b40468e6cb548ca33768bced4_r.jpg?source=1940ef5c);
    -webkit-background-size: cover;
    background-size: cover;
    background-attachment: fixed;
  }

  .mask {
    max-width: 500px;
  }
}

</style>
