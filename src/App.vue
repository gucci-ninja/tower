<template>
  <div id="app">
    <LandingPage/>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage'


export default {
  name: 'App',
  components: {
    LandingPage
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
