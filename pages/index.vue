<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700display=swap" rel="stylesheet">
    <LandingPage/>
    <div class="sidebar">
      <whos-online></whos-online>
      <chat></chat>
    </div>
  </div>
</template>

<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js"></script>

<script>
import LandingPage from '../components/LandingPage'
import WhosOnline from '../components/WhosOnline.vue'
import Chat from '../components/Chat.vue'


export default {
  name: 'App',
  components: {
    LandingPage,
    WhosOnline,
    Chat
  }
}
</script>

<style>
body, html {
  height: 100%;
  background-color: #F6F6F2;
  font-family: 'Quicksand', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media only screen and (min-width: 768px) {
  #app {
    /* margin-top: 60px; */

  }
}
</style>
