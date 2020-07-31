<template>
  <div class="about" :class="{dark: themeMode==='dark'}">
    <div class="header">
      <div class="return">
        <div class="circle">
          <i class="fa fa-angle-left" aria-hidden="true" @click="backHome"></i>
        </div>
        <div class="page-title">关于</div>
      </div>
    </div>

    <div class="content">
      <div class="card">
        <h4>关于 Little Cookie</h4>
        <p>Hi~,长理的同学们，欢迎使用专属于长理的Little Cookie 题库Web App。</p>
        <p>“孩子没娘，说来话长”。2019年暑假整了一个微信小程序之后的很长一段时间都没有好好的拿Vue框架做个什么东西。
          相信一年前的我无论如何也想不到一年后暑假时期的现在我会坐在家里“过着寒假”。</p>
        <p>暑假手痒痒，总想整点什么东西玩玩。上半年整了几乎一学期的 <a href="https://www.zcool.com.cn/article/ZMTEwMjQ3Ng==.html">新拟态</a> PPT。
          相比与扁平化的设计，个人对<a href="https://www.zcool.com.cn/article/ZMTEwMjQ3Ng==.html"> 新拟态 </a>有着几近疯狂的爱好。正好发现学校之前吐司的题库好像瓦特了，
          就有了 <span class="highlight">利用新拟态制作一个题库</span> 的想法。</p>
        <p>嗯，菜鸡一个。捡起了一年没碰的前端，写得代码自然“十分粗糙”，因此在这里就 <span class="highlight">不开源</span>了，给自己留点脸。还有其它一些好玩的项目，
          主页：<a href="https://chenmo1212.site">陈默的小站</a></p>
        <p>该网站的功能有些杂，全凭自己“脑子一抽”设计的，若有使用不便之处，还望海涵。功能上目前仅仅实现了基本功能，还有一些功能将在后续阶段继续开发。现在纳入待办事项的功能有：</p>
        <ol>
          <li>意见反馈功能</li>
          <li>模拟期末考试</li>
          <li>错题本记录</li>
          <li>题目总览显示答案对错</li>
        </ol>
        <p>若您还需要其它功能，或者有很好的建议，还务必请与我个人联系。此外若网站出现Bug，也请与我联系进行反馈。联系方式（QQ）：<a href="http://wpa.qq.com/msgrd?v=3&uin=160594753&site=qq&menu=yes”">160594753</a>。</p>
        <br>
        <p class="end name">陈默</p>
        <p class="end date">2020/07/20</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "about",
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'themeColor',
        'themeMode',
      ]),
    },
    methods: {
      ...mapActions([
        'setSelectedChapter',
      ]),

      // 返回主页
      backHome() {
        this.$router.push({name: 'home'});
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/_handle.scss";

  .about {
    @include background("detail_bg_color1");
    @include font_color("detail_font_color1");
    overflow: hidden;
  }

  .dark {
    .circle,
    .content .card {
      box-shadow: -1px -1px 3px 0 #636363, 1px 1px 3px 0 black !important;
    }
  }
  .header {
    height: 60px;
    line-height: 60px;
    /*background-color: #f4f6f8;*/
    @include background('detail_bg_color1');
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    .return {
      float: left;
      display: flex;
      align-items: center;
      padding-left: 20px;
      width: 80vw;
      overflow: hidden;
      @include font_color("detail_font_color2");

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
        margin-left: 5%;
        text-align: left;
      }
    }

    .full-screen {
      float: right;
      width: 10vw;
    }
  }

  .content {
    padding: 5%;
    text-align: left;

    .card {
      width: 90%;
      margin: 0 auto;
      border-radius: 11px;
      -webkit-box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
      box-shadow: 5px 5px 8px #ebebeb, -5px -5px 8px #ffffff;
      padding: 20px;
    }

    h4 {
      padding: 0;
      margin: 0;
      text-align: center;
    }

    p {
      text-indent: 2em;
      text-align: justify;
      font-size: 14px;
      line-height: 1.8;
    }
    a {
      color: #536dfe;
    }

    .highlight {
      color: #e5693e;
    }
    ol > li {
      font-size: 14px;
      line-height: 1.8;
    }

    .end {
      text-align: right;
    }
  }


  /*html {*/
    /*height: 100%;*/
    /*background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);*/

  /*}*/

</style>
