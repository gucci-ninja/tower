<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
      <BoardForm/>

  </div>
</template>

<script>
import BoardForm from '../components/BoardForm.vue';

export default {
  name: 'App',
  components: {
    BoardForm
  },
}
</script>

<style lang="scss" scoped>

body, html {
  width: 100%;
  min-height: 100vh;
  background-color: black;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
}


#app {
  width: 100%;
  min-height: 100vh;
  background-color: #C7CEEA;
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
