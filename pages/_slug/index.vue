<template>
  <div id="main">
    <div class="right">
      <Chat></Chat>
    </div>
    
  </div>
  
</template>

<script>
import Chat from '../../components/Chat.vue';
export default {
 name: 'App',
  components: {
    Chat,
  },
  validate({ params }) {
    // Must be a tower name
    return /^[a-zA-Z]+$/.test(params.id)
  }
}
</script>

<style scoped>

#main {
  display: inline-block;
}
.right {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>