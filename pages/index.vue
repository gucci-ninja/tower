<template>
  <div id="app">
    <LandingPage/>
    <div class="sidebar">
      <whos-online></whos-online>
      <chat></chat>
    </div>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage'
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
