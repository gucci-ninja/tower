<template>
  <div id="main">
    <div v-if="$auth.loggedIn">
      <div class="board">
        <Card 
          v-for="(note, i) in notes"
          :key="(note, i)"
          :note='note'
          :id='i'
        />
      </div>
      <div class="bottom-right">
        <Chat></Chat>
      </div>
    </div>
    <div v-else>
      <LandingPage/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Chat from '../components/Chat.vue';
import Card from '../components/Card.vue';
import LandingPage from '../components/LandingPage.vue';
import db from '../firebase';
export default {
 name: 'App',
  components: {
    Chat,
    Card,
    LandingPage
  },
  data() {
    return {
      notes: {},
    }
  },
  computed: {
    ...mapState(["user"]),
    cnotes() {
      return this.notes;
    }
  },
  methods: {
    ...mapActions(["enterTower", "addUser"]),
    ...mapMutations(["setUser"]),
    getBoardState() {
      let app = this;
      var notes = db.ref('towers/' + this.$auth.user.towerName + '/notes');
      notes.on('value', function(snapshot) {
        app.notes = snapshot.val()
      });
    },
    updateBoardState() {
      let app = this;
      var notesRef = db.ref('towers/' + this.$auth.user.towerName + '/notes');
      notesRef.on('child_changed', snapshot => {
        app.notes[snapshot.key] = snapshot.val();
      });
    },
  },
  async created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login');
    } else { 
      this.addUser(this.$auth.user);
      this.getBoardState();
      this.updateBoardState();
    }
  },
  validate({ params }) {
    // Must be a tower name
    return /^[a-zA-Z]+$/.test(params.id)
  }
}
</script>

<style >
#main {
  display: inline-block;
}
body, html {
  height: 100%;
  background-color: #F6F6F2 !important;
  font-family: 'Quicksand', sans-serif;
}
.bottom-right {
  position: absolute;
  right: 0;
  bottom: 0;
}
.top-right {
  position: absolute;
  right: 0;
  top: 0;
}
.board {
  height: 500px;
  width: 500px;
  position: relative;
  background-color: rgb(245, 237, 245);
}
</style>