<template>
  <div v-if="$auth.loggedIn">
    <Toolbar/>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex d-flex md9 sm12>
            <v-card color="#F5F5F5" height="97vh" class="board">
              <Card 
                v-for="(note, i) in notes"
                :key="(note, i)"
                :note='note'
                :id='i'/>
            </v-card>
        </v-flex>
        <v-flex d-flex md3 sm12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <Info/>
            </v-flex>
            <v-flex d-flex xs12>
              <Chat/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Chat from '../components/Chat.vue';
import Card from '../components/Card.vue';
import LandingPage from '../components/LandingPage.vue';
import Info from '../components/Info.vue';
import Toolbar from '../components/Toolbar.vue';

export default {
 name: 'App',
  components: {
    Chat,
    Card,
    LandingPage,
    Info,
    Toolbar,
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

    height: 100%;

  /* display: inline-block; */
}
body, html {
  /* height: 100%; */
  
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
  background: #F2F2F2;
  background-image: radial-gradient(black 1px, transparent 0);
  background-size: 1.5em 1.5em;
  background-position: -19px -19px;
  /* top: 1em;
  left: 0.75em; */
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