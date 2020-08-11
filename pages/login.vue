<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- <div v-if="$auth.loggedIn">
      <h1>you are logged in</h1>
    </div>
    <div v-else> -->
      <LandingPage/>
    <!-- </div> -->
    <Box/>
    <div class="sidebar">
      <h1> {{ users }} </h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import LandingPage from '../components/LandingPage.vue';
import Box from '../components/Box'


export default {
  name: 'App',
  components: {
    LandingPage,
    Box,
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    ...mapActions(["addUser"]),
  },
}
</script>

<style>
body, html {
  height: 100%;
  background-color: #F6F6F2;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
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
