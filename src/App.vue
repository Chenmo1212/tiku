<template>
  <div id="app" class="max-control">
    <!--<img src="./assets/logo.png">-->
    <router-view/>

    <audio id="media" autoplay :src="musicUrl" @timeupdate="timeupdate"></audio>
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
      }
    },
    computed: {
      ...mapState([
        'musicStatus'
      ]),
    },
    created() {},
    mounted() {

      // 将方法挂载到全局, 子组件通过访问window.nextSong() 即可调用
      window.nextSong = this.nextSong;
      window.preSong = this.preSong;

      const that = this;
      let flag = false;
      if (typeof(localStorage.currentMusicBasicMsg) !== 'undefined'){
        flag = true
      }
      this.fetch163Playlist(2111679838)
        .then(res =>{
          console.log(res);
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
        .catch(err =>{
          console.log(err)
        });
    },
    methods: {
      ...mapActions([
        'setCurrentBasicMsg',
        'setMusicMsg',
      ]),


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

        if (audio.ended){
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
            .catch(err);
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
              break;
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
            .catch(err);
        });
      }
    },


    watch: {
      musicStatus() {
        let audio = document.getElementById('media');
        console.log(audio)
        if (this.musicStatus) {
          if (typeof(localStorage.currentMusicBasicMsg) !== 'undefined') {
            audio.currentTime = JSON.parse(localStorage.currentMusicBasicMsg).currentTime;
          }
          audio.play();
        } else {
          audio.pause();// 暂停
        }
      }
    },
  }
</script>

<style>
  @import "./font/css/font-awesome.min.css";

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
</style>
