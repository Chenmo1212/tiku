<template>
  <div id="app" class="max-control">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
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

  html,body {
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
