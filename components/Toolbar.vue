<template>
  <v-toolbar dense rounded class="toolbar">

    <v-btn 
      @click="addCard()"
      icon>
      <v-icon>mdi-square-rounded</v-icon>
    </v-btn>

    <v-btn 
      @click="addPoll()"
      icon>
      <v-icon>mdi-view-list</v-icon>
    </v-btn>

<!-- 
    <v-btn icon>
      <v-icon>mdi-circle</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-text-recognition</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-pencil</v-icon>
    </v-btn> -->

  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  methods: {
    addCard() {
      var newCardRef = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes/').push();
      newCardRef.set({
        type: 'note',
        x: 150,
        y: 150,
        width: 160,
        height: 60,
        text: 'Sample text',
        color: '#fff',
      });
    },
    addPoll() {
      var newPollRef = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/cards/').push();
      newPollRef.set({
        type: 'poll',
        x: 150,
        y: 150,
        width: 160,
        height: 160,
        title: 'Poll title',
        color: '#fff'
      });
    }
  }
}
</script>

<style scoped>

.toolbar {
  left: 20px;
  top: 20px;
  position: absolute;
  width: 200px;
  z-index: 9;
  line-height: 20px;
  background-color: #2196F3;
  text-align: center;
  color: #fff;
  font-family: 'Comfortaa';
  font-weight: 600;
}
</style>