<template>
  <div id="app">
    <div class="sidebar">
      <whos-online></whos-online>
      <chat></chat>
    </div>
  </div>
</template>

<script>
import WhosOnline from '../components/WhosOnline.vue'
import Chat from '../components/Chat.vue'

export default {
  name: 'App',
  components: {
    WhosOnline,
    Chat
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.sidebar {
  float: right;
}
</style>
