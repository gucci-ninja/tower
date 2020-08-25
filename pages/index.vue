<template>
  <div id="main">
    <div v-if="$auth.loggedIn">
      <v-col cols="9">
        <div class="board">
          <Card 
            v-for="(note, i) in notes"
            :key="(note, i)"
            :note='note'
            :id='i'
          />
        </div>
      </v-col>
      <v-col cols="3">
        <div class="info">
          <Info/>
        </div>
        <div class="chat-div">
          <Chat></Chat>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Chat from '../components/Chat.vue';
import Card from '../components/Card.vue';
import LandingPage from '../components/LandingPage.vue';
import Info from '../components/Info.vue';
// import db from '../firebase';
export default {
 name: 'App',
  components: {
    Chat,
    Card,
    LandingPage,
    Info,
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
  /* display: inline-block; */
}
body, html {
  /* height: 100%; */
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
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: #F2F2F2;
  background-image: radial-gradient(black 1px, transparent 0);
  background-size: 1.5em 1.5em;
  background-position: -19px -19px;
  border-radius: 1em;
}

.chat-div {
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.info {
  position: fixed;
  top: 1em;
  right: 1em;
}
</style>