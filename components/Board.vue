<template>
  <v-card color="#F5F5F5" height="97vh" class="board">
    <Card
      v-for="(note, i) in boardState"
      :key="(note, i)"
      :note='note'
      :id='i'
    >
    </Card>
  </v-card>
</template>

<script>
import Card from './Card.vue'
import Note from './Note.vue'
export default {
  name: 'Board',
  components: {
    Card,
    Note
  },
  props: {
    boardState: Object
  },
  methods: {
    getBoardState() {
      let app = this;
      var notes = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes');
      notes.on('value', function(snapshot) {
        app.notes = snapshot.val()
      });
    },
    updateBoardState() {
      let app = this;
      var notesRef = this.$fireDb.ref('towers/' + this.$auth.user.towerName + '/notes');
      notesRef.on('child_changed', snapshot => {
        app.notes[snapshot.key] = snapshot.val();
      });
    },
  },
  created() {
    console.log(this.boardState);
    // this.getBoardState();
    // this.updateBoardState();
  }
}
</script>

<style scoped>
.board {
  background: #F2F2F2;
  background-image: radial-gradient(black 1px, transparent 0);
  background-size: 1.5em 1.5em;
  background-position: -19px -19px;
}
</style>